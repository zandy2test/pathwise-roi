# Comparison: .clinerules.md vs CLAUDE.md

## Overview

Both files serve as AI assistant instructions but have different scopes and purposes.

## `.clinerules.md` (Global Cline Rules)

**Location**: C:/Users/zakko/OneDrive/Documents/Cline/Rules/
**Scope**: Global - applies to ALL projects when using Cline
**Size**: Concise (~60 lines)

### Pros:

- ✅ Concise and focused
- ✅ Cline-specific (reads automatically)
- ✅ Global application across all projects
- ✅ Clear execution flow
- ✅ Simple confidence levels

### Cons:

- ❌ Less detailed than CLAUDE.md
- ❌ Missing Windows/PowerShell specifics
- ❌ No MCP server details
- ❌ No VS Code shortcuts
- ❌ No commit message templates

### Key Content:

- Ship Fast, Test Smart philosophy
- Execution rules (YARRR! confirmation)
- Basic testing strategy
- MCP server list (brief)
- Confidence levels (1-10)
- Simple commit format

## `CLAUDE.md` (AI-First Development Rules)

**Location**: C:/Dev/
**Scope**: All projects in C:/Dev/
**Size**: Comprehensive (~130 lines)

### Pros:

- ✅ Very detailed and comprehensive
- ✅ Windows/PowerShell environment specifics
- ✅ Detailed MCP configurations with API keys
- ✅ VS Code keyboard shortcuts
- ✅ Performance monitoring guidelines
- ✅ Detailed commit templates with examples
- ✅ Claude Monitor integration

### Cons:

- ❌ More verbose
- ❌ Some redundancy with .clinerules.md
- ❌ Not automatically read by Cline (manual reference)
- ❌ Potentially outdated in places

### Unique Content:

- Windows/PowerShell environment details
- Git safety aliases (gs, glog, gdc)
- Modern tools preferences (ripgrep, bat, fzf)
- Performance monitoring (bundle size, token usage)
- Detailed commit message format with AI attribution
- VS Code shortcuts reference
- PROJECT_CONTEXT.md workflow

## 🎯 Merge Recommendation

### What to ADD to `.clinerules.md` from `CLAUDE.md`:

1. **Windows Environment Snippet** (essential for context):

```markdown
## 💻 ENVIRONMENT

- **Shell**: PowerShell 7 at C:\Dev
- **Git**: Use safety aliases (gs, glog, gdc)
- **Tools**: Prefer ripgrep, bat, fzf when available
```

2. **Performance Monitoring** (useful constraints):

```markdown
## 📦 PERFORMANCE

- Bundle size: <300KB ideal, warn at >500KB
- Build time: Flag if >30s for simple projects
```

3. **VS Code Shortcuts** (quick reference):

```markdown
## ⚡ SHORTCUTS

- Ctrl+Esc: Focus terminal
- Ctrl+K, Ctrl+S: Stage all
- Ctrl+K, Ctrl+C: Commit all
```

4. **Enhanced Commit Format** (better attribution):

```markdown
## 📝 COMMITS

`<type>: <description>` (feat/fix/test/docs/refactor)
Optional: Add "🤖 Generated with Claude" for AI-assisted commits
```

### What NOT to merge:

- Redundant philosophy statements (already covered)
- Duplicate testing strategy (identical)
- Extensive MCP server details (keep brief in .clinerules.md)
- Long examples (keep it concise)

### What to KEEP separate in CLAUDE.md:

- Detailed API key storage (security reference)
- Extended VS Code integration details
- Claude Monitor specifics
- Lengthy workflow descriptions

## Proposed Action Plan

1. **Keep both files** - they serve different purposes
2. **Update .clinerules.md** with essential Windows/PowerShell context
3. **Reference CLAUDE.md** in .clinerules.md for detailed info
4. **Remove redundancy** but maintain both scopes

## Implementation

Would you like me to:

1. Create an updated `.clinerules.md` with the recommended additions?
2. Keep it concise while adding only the most valuable unique content from CLAUDE.md?
3. Add a reference line pointing to CLAUDE.md for extended details?
