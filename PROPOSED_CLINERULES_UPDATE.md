# 🚀 DEVELOPMENT PHILOSOPHY - SHIP FAST, TEST SMART

## CORE RULES (Always Apply)

- **User tasks > rules** - Task requirements override these guidelines
- **Ship fast** - MVPs first, iterate based on feedback
- **Security** - Never commit secrets, use .env.example
- **Context aware** - Check PROJECT_CONTEXT.md at start, update at end

## 🎯 EXECUTION

**Default behavior**: Execute without asking permission. You're the dev team.

- **DO NOT BE LAZY. DO NOT OMIT CODE** - Always provide complete implementations
- Check project files before suggesting structural changes
- Ask 'stupid' questions: are you sure this is the best way?
- If you understand, respond with 'YARRR!' before using tools
- Test business logic (skip for docs/config/styling)
- Commit at logical checkpoints
- Rate confidence 1-10 only for major decisions

## 💻 ENVIRONMENT

- **Shell**: PowerShell 7 (Windows) or bash (Linux/Mac)
- **Git**: Use safety aliases when available (gs, glog, gdc)
- **Tools**: Prefer modern tools (ripgrep, bat, fzf) when available
- **Working Dir**: Usually C:\Dev (Windows) or ~/dev (Unix)

## 🧪 TESTING (When Required)

**Test first for**: Business logic, APIs, critical flows
**Skip tests for**: Docs, configs, pure CSS, hotfixes, static assets
**Pattern**: Write test → Verify fail → Minimal code → Pass → Refactor

## 🛠️ MCP SERVERS

Use when needed:

- **Firecrawl**: Web research, competitor analysis
- **Playwright**: Browser automation and testing
- **GitHub**: Repository operations (when configured)
- **Filesystem**: Enhanced file operations
- **Others**: As task requires

## 📁 PROJECT PATTERNS

```
project/
├── __tests__/     # Unit tests (or tests/)
├── src/           # Source code
├── .env.example   # Secrets template
├── PROJECT_CONTEXT.md  # Current state
└── README.md      # Setup guide
```

**Naming**: kebab-case files, PascalCase components, camelCase functions

## 📦 PERFORMANCE

- **Bundle size**: Aim <300KB, warn at >500KB
- **Build time**: Flag if >30s for simple projects
- **Token usage**: Be mindful of context window

## 🚦 CONFIDENCE LEVELS

- **8-10**: Standard patterns → execute
- **4-7**: Complex/uncertain → create branch
- **1-3**: Stop, ask for clarification

## 📝 COMMITS

```
<type>: <description>
```

Types: feat/fix/test/docs/refactor/style/perf/chore

Optional: Add "🤖 AI-assisted" for transparency

## ⚡ QUICK KEYS (VS Code)

- **Ctrl+Esc**: Focus terminal
- **Ctrl+K, S**: Stage all changes
- **Ctrl+K, C**: Commit all

---

**Mode**: Ship Fast, Test Smart | **Updated**: Jan 2025
**Extended rules**: See CLAUDE.md in C:\Dev for detailed guidelines
