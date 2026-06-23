#!/usr/bin/env node
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const packageRoot = path.resolve(__dirname, "..");
const skillName = "project-docs-builder";
const payloadEntries = [
  "SKILL.md",
  "agents",
  "references",
  "scripts",
  "README.md",
  "LICENSE",
  "VERSION",
];

const adapterTargets = {
  amazonq: ".amazonq/rules/project-docs-builder.md",
  kiro: ".kiro/steering/project-docs-builder.md",
  cursor: ".cursor/rules/project-docs-builder.mdc",
  copilot: ".github/instructions/project-docs-builder.instructions.md",
  "github-copilot": ".github/instructions/project-docs-builder.instructions.md",
  cline: ".clinerules/project-docs-builder.md",
  roo: ".roo/rules/project-docs-builder.md",
  continue: ".continue/rules/project-docs-builder.md",
  windsurf: ".windsurf/rules/project-docs-builder.md",
  devin: ".devin/rules/project-docs-builder.md",
};

const agentsMdTargets = new Set(["agents", "agents-md", "opencode", "aider", "zed", "junie"]);
const nativeTargets = new Set(["codex", "codex-legacy", "claude", "antigravity", "copilot-skill", "vscode"]);
const adapterAliases = new Set([...Object.keys(adapterTargets), ...agentsMdTargets, "gemini"]);

main(process.argv.slice(2));

function main(argv) {
  const command = argv[0] || "help";
  const rest = argv.slice(1);

  try {
    if (command === "help" || command === "--help" || command === "-h") return printHelp();
    if (command === "paths") return printPaths();
    if (command === "adapters") return printAdapters();
    if (command === "install") return installCommand(rest);
    if (command === "adapter") return adapterCommand(rest);
    if (command === "scaffold") return scaffoldCommand(rest);
    if (command === "version" || command === "--version" || command === "-v") return printVersion();

    fail(`Unknown command: ${command}`);
  } catch (error) {
    fail(error.message);
  }
}

function installCommand(argv) {
  const options = parseOptions(argv);
  const target = (options.positionals[0] || options.target || "codex").toLowerCase();
  const scope = (options.scope || "user").toLowerCase();
  const projectRoot = path.resolve(options.project || process.cwd());

  if (target === "all") {
    for (const nativeTarget of ["codex", "claude", "antigravity"]) {
      installNative(nativeTarget, { ...options, scope, projectRoot });
    }
    return;
  }

  if (nativeTargets.has(target)) {
    return installNative(target, { ...options, scope, projectRoot });
  }

  if (adapterAliases.has(target)) {
    return installAdapter(target, { ...options, projectRoot });
  }

  fail(`Unknown install target: ${target}`);
}

function adapterCommand(argv) {
  const options = parseOptions(argv);
  const target = (options.positionals[0] || options.target || "amazonq").toLowerCase();
  const projectRoot = path.resolve(options.project || process.cwd());
  return installAdapter(target, { ...options, projectRoot });
}

function installNative(target, options) {
  const destination = nativeDestination(target, options.scope, options.projectRoot);
  copySkill(destination, options);
  logDone(options.dryRun, `Installed ${target} skill at ${destination}`);
}

function installAdapter(target, options) {
  const projectRoot = path.resolve(options.projectRoot || process.cwd());
  const localSkillDir = path.join(projectRoot, "tools", skillName);
  copySkill(localSkillDir, options);

  if (agentsMdTargets.has(target)) {
    const agentsPath = path.join(projectRoot, "AGENTS.md");
    writeMarkedBlock(agentsPath, adapterBlock("tools/project-docs-builder"), options);
    return logDone(options.dryRun, `Installed AGENTS.md adapter at ${agentsPath}`);
  }

  if (target === "gemini") {
    const geminiPath = path.join(projectRoot, "GEMINI.md");
    writeMarkedBlock(geminiPath, adapterBlock("tools/project-docs-builder"), options);
    return logDone(options.dryRun, `Installed GEMINI.md adapter at ${geminiPath}`);
  }

  const relativePath = adapterTargets[target];
  if (!relativePath) fail(`Unknown adapter target: ${target}`);

  const filePath = path.join(projectRoot, relativePath);
  let content = adapterBlock("tools/project-docs-builder");
  if (target === "copilot" || target === "github-copilot") {
    content = `---\napplyTo: "**"\n---\n\n${content}`;
  }
  writeFileSafe(filePath, content, options);
  logDone(options.dryRun, `Installed ${target} adapter at ${filePath}`);
}

function scaffoldCommand(argv) {
  const options = parseOptions(argv);
  const destination = path.resolve(options.positionals[0] || process.cwd());
  const level = options.level || "full";
  const script = path.join(packageRoot, "scripts", "scaffold_docs_pack.py");
  const args = [script, destination, "--level", level];
  if (options.dryRun) args.push("--dry-run");

  const python = findPython();
  if (!python) {
    fail("Python was not found. Install Python or run scripts/scaffold_docs_pack.py manually from the repository.");
  }

  const result = spawnSync(python, args, { stdio: "inherit" });
  process.exitCode = result.status || 0;
}

function nativeDestination(target, scope, projectRoot) {
  if (target === "codex-legacy") return path.join(os.homedir(), ".codex", "skills", skillName);
  if (target === "copilot-skill" || target === "vscode") {
    return path.join(projectRoot, ".github", "skills", skillName);
  }

  if (scope === "project") {
    if (target === "claude") return path.join(projectRoot, ".claude", "skills", skillName);
    if (target === "codex" || target === "antigravity") return path.join(projectRoot, ".agents", "skills", skillName);
  }

  if (target === "codex") return path.join(os.homedir(), ".agents", "skills", skillName);
  if (target === "claude") return path.join(os.homedir(), ".claude", "skills", skillName);
  if (target === "antigravity") return path.join(os.homedir(), ".gemini", "config", "skills", skillName);

  fail(`Unsupported native target/scope pair: ${target}/${scope}`);
}

function copySkill(destination, options) {
  if (options.dryRun) return log(`Would copy skill payload to ${destination}`);
  if (fs.existsSync(destination)) {
    if (!options.force) fail(`${destination} already exists. Re-run with --force to replace it.`);
    fs.rmSync(destination, { recursive: true, force: true });
  }
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of payloadEntries) {
    const source = path.join(packageRoot, entry);
    if (!fs.existsSync(source)) continue;
    const target = path.join(destination, entry);
    fs.cpSync(source, target, { recursive: true });
  }
}

function adapterBlock(relativeSkillPath) {
  return [
    "# Project Docs Builder",
    "",
    "When asked to create, review, update, or audit project documentation, use the Project Docs Builder workflow.",
    "",
    `Read \`${relativeSkillPath}/SKILL.md\` first. Load only the referenced files under \`${relativeSkillPath}/references/\` that match the task.`,
    "",
    "Create implementation-grade docs, not summaries. Keep product, requirements, architecture, data, API, UX, testing, deployment, operations, and AI-agent docs consistent with each other.",
    "",
  ].join("\n");
}

function writeMarkedBlock(filePath, block, options) {
  const start = "<!-- project-docs-builder:start -->";
  const end = "<!-- project-docs-builder:end -->";
  const wrapped = `${start}\n${block.trim()}\n${end}\n`;
  const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
  let next = existing;

  if (existing.includes(start) && existing.includes(end)) {
    next = existing.replace(new RegExp(`${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}\\n?`), wrapped);
  } else {
    next = `${existing.trimEnd()}${existing.trim() ? "\n\n" : ""}${wrapped}`;
  }

  writeFileSafe(filePath, next, { ...options, allowExisting: true });
}

function writeFileSafe(filePath, content, options) {
  if (options.dryRun) return log(`Would write ${filePath}`);
  if (fs.existsSync(filePath) && !options.force && !options.allowExisting) {
    fail(`${filePath} already exists. Re-run with --force to replace it.`);
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.endsWith("\n") ? content : `${content}\n`, "utf8");
}

function parseOptions(argv) {
  const options = { positionals: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--force") options.force = true;
    else if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--target") options.target = valueFor(argv, ++index, arg);
    else if (arg === "--scope") options.scope = valueFor(argv, ++index, arg);
    else if (arg === "--project") options.project = valueFor(argv, ++index, arg);
    else if (arg === "--level") options.level = valueFor(argv, ++index, arg);
    else if (arg.startsWith("--")) fail(`Unknown option: ${arg}`);
    else options.positionals.push(arg);
  }
  return options;
}

function valueFor(argv, index, option) {
  if (!argv[index]) fail(`${option} requires a value.`);
  return argv[index];
}

function findPython() {
  for (const candidate of ["python", "python3"]) {
    const result = spawnSync(candidate, ["--version"], { stdio: "ignore" });
    if (result.status === 0) return candidate;
  }
  return null;
}

function printPaths() {
  const home = os.homedir();
  console.log([
    "Native skill paths:",
    `  Codex user:          ${path.join(home, ".agents", "skills", skillName)}`,
    `  Codex legacy user:   ${path.join(home, ".codex", "skills", skillName)}`,
    `  Claude Code user:    ${path.join(home, ".claude", "skills", skillName)}`,
    `  Antigravity user:    ${path.join(home, ".gemini", "config", "skills", skillName)}`,
    `  Project shared:      ${path.join(process.cwd(), ".agents", "skills", skillName)}`,
    `  VS Code/Copilot:     ${path.join(process.cwd(), ".github", "skills", skillName)}`,
  ].join("\n"));
}

function printAdapters() {
  console.log([
    "Rule/instruction adapter targets:",
    ...Object.keys(adapterTargets).map((name) => `  ${name.padEnd(14)} ${adapterTargets[name]}`),
    "  agents-md      AGENTS.md",
    "  gemini         GEMINI.md",
  ].join("\n"));
}

function printVersion() {
  const versionPath = path.join(packageRoot, "VERSION");
  console.log(fs.readFileSync(versionPath, "utf8").trim());
}

function printHelp() {
  console.log(`Project Docs Builder

Usage:
  project-docs-builder install [target] [--scope user|project] [--project path] [--force] [--dry-run]
  project-docs-builder adapter [target] [--project path] [--force] [--dry-run]
  project-docs-builder scaffold [path] [--level lite|full|enterprise] [--dry-run]
  project-docs-builder paths
  project-docs-builder adapters

Native targets:
  codex, codex-legacy, claude, antigravity, copilot-skill, vscode, all

Adapter targets:
  amazonq, kiro, cursor, copilot, github-copilot, gemini, windsurf,
  devin, cline, roo, continue, agents-md, opencode, aider, zed, junie

Examples:
  npx project-docs-builder install codex
  npx project-docs-builder install claude --scope project
  npx project-docs-builder install amazonq --project .
  npx project-docs-builder scaffold . --level full --dry-run
`);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function log(message) {
  console.log(message);
}

function logDone(dryRun, message) {
  console.log(`${dryRun ? "Dry run:" : "Done:"} ${message}`);
}

function fail(message) {
  console.error(`project-docs-builder: ${message}`);
  process.exit(1);
}
