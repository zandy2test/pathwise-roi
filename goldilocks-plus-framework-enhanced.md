# Evidence-Based Technical Audit Framework (Enhanced)

## 1. PRE-FLIGHT DETECTION

**Quick environment check (30 seconds):**
```yaml
PLATFORM: [Auto-detect: Windows/Mac/Linux]
PROJECT_TYPE: [Auto-detect from package.json/requirements.txt/go.mod/etc]
OPERATING_TIER: [0-4 based on available tools]
SESSION_ID: [Timestamp for checkpoint/resume]
```

**Note:** Commands shown will match detected platform. If interrupted, record "Checkpoint at Stage X" and resume from there.

## 2. CAPABILITY ASSESSMENT

Determine your tier based on what you can execute:

| Tier | Capabilities | Audit Mode | Time Estimate |
|------|-------------|------------|---------------|
| 0 | Read code only | Static analysis + verification scripts | 10-15 min |
| 1 | Run code snippets | Isolated testing + static analysis | 15-20 min |
| 2 | Terminal + files + npm | Full project testing | 20-40 min |
| 3 | Tier 2 + browser/network | End-to-end testing | 40-60 min |
| 4 | Tier 3 + production | Complete validation | 60+ min |

**Declare your tier and available tools:**
```yaml
OPERATING TIER: [0-4]
AVAILABLE: [List what you can do]
UNAVAILABLE: [List what you cannot do]
NPM_STATUS: [WORKING/FAILED/UNKNOWN]
```

**Minimum Tier 2 required for full audit. Tier 0-1 provide verification guides.**

## 3. TEST PRIORITIZATION

Focus testing based on risk and impact:

| Priority | Focus Area | Examples |
|----------|------------|----------|
| P1 | Security & Data Loss | Auth bypass, SQL injection, exposed secrets |
| P2 | Core Functionality | Business logic, critical user paths |
| P3 | Performance & Stability | Memory leaks, slow queries, error handling |
| P4 | UI/UX & Polish | Visual bugs, typos, inconsistencies |

## 4. TESTING PROTOCOL

### All Tiers - Foundation Testing
- Review code structure and dependencies
- Identify previous AI's claims to verify
- Generate test plan based on tier and priorities

### Tier 2+ - Incremental Project Testing

**Stage 1: Quick Smoke Test with NPM Escape (< 2 min)**
```bash
# Try npm with timeout and fallback
npm ci --prefer-offline --no-audit --silent && echo "✓ Dependencies OK" || echo "[NPM-FAILED] Proceeding with static analysis"

# If NPM failed, try alternatives (30 sec each):
# yarn install --frozen-lockfile --silent || pnpm install --frozen-lockfile --silent

npm run build --silent && echo "✓ Build OK" || echo "[BUILD-FAILED] Check build scripts"
```

**Stage 2: Core Testing (Required - Adapt if NPM Failed)**

If NPM working:
```bash
npm install          # Capture full output
npm ls --depth=0     # Verify dependency tree
npm audit --audit-level=high  # Security check
npm outdated         # Check for stale dependencies
npm test            # Run test suite if exists
npm run build       # Test production build
npm start           # Test development server
```

If NPM failed - Static fallback:
```bash
# Manual dependency inspection
cat package.json | grep -E "dependencies|scripts"  # Unix
# OR
type package.json | Select-String "dependencies|scripts"  # Windows

# Check for vulnerable versions manually
# Review lock files for security issues
# Analyze source for dependency usage patterns
```

**Stage 3: Security & Environment Scan (Platform-Aware)**
```bash
# Unix/Mac:
git ls-files | xargs grep -E "(api_key|secret|token|password|pwd)" || echo "✓ No secrets"
[ -f .env.example ] && echo "✓ Env template exists" || echo "⚠ No .env.example"

# Windows PowerShell:
git ls-files | Select-String -Pattern "api_key|secret|token|password|pwd"
Test-Path .env.example && echo "✓ Env template exists"

# Check commit history (cross-platform)
git log --oneline -n 20 --grep="secret\|password\|key" 2>/dev/null || echo "✓ Clean history"
```

### Tier 3+ - Advanced Testing (When Available)
- Browser automation for UI flows
- API endpoint testing with actual calls
- Integration testing with external services

### Stop Conditions
- After 3 failed attempts on same test
- When exceeding 2x time estimate
- When missing credentials block progress
- When circular dependencies prevent continuation

## 5. CONFIDENCE LEVELS (Simplified)

**Three clear categories - no percentages:**

- **[TESTED]** - Ran command and observed actual output
- **[ANALYZED]** - Static code analysis only (no runtime verification)
- **[FAILED]** - Could not test due to tool/access limitations

**Special labels for context:**
- **[NPM-FAILED]** - Package manager unavailable, static analysis only
- **[INTERRUPTED]** - Session paused, checkpoint recorded

## 6. EVIDENCE STANDARDS

### For TESTED Claims
- Show actual terminal output (not paraphrased)
- Include specific file:line references
- Provide exact steps to reproduce

### For ANALYZED Areas
- Mark clearly with [ANALYZED]
- Note what prevented testing
- Provide verification script for manual execution

### For FAILED Areas
- Mark clearly with [FAILED] and reason
- Provide executable test script
- Explain what access would enable testing

### Verification Script Template
```bash
#!/bin/bash
# Test: [Component/Feature Name]
# Priority: [P1-P4]
# Platform: [Unix/Windows]
# Expected time: [X minutes]

echo "Testing: [Component]"
EXPECTED="expected_output"
ACTUAL=$(command_to_test 2>&1)

if [[ "$ACTUAL" == *"$EXPECTED"* ]]; then
  echo "✓ PASS: [Component] works as expected"
  exit 0
else
  echo "✗ FAIL: [Component]"
  echo "  Expected: $EXPECTED"
  echo "  Got: $ACTUAL"
  exit 1
fi
```

## 7. ERROR PATTERN RECOGNITION

Common patterns to identify root causes:

| Error Pattern | Likely Issue | Priority | NPM Failed Fallback |
|--------------|--------------|----------|---------------------|
| `Cannot find module` | Missing dependency | P2 | Check package.json manually |
| `EACCES` / `Permission denied` | File permissions | P3 | Note in report |
| `ECONNREFUSED` | Service not running | P2 | Static analysis only |
| `JavaScript heap out of memory` | Memory leak | P1 | Review code for patterns |
| `Unexpected token` | Syntax/Version mismatch | P2 | Check Node version requirements |
| `401`/`403` API errors | Authentication issue | P1 | Review auth implementation |

## 8. REQUIRED DELIVERABLES

### Deliverable Completeness Requirement
This audit should be **comprehensive and complete**. Include ALL relevant context, terminal outputs, architectural analysis, and supporting evidence. Do not abbreviate or summarize evidence for brevity. Full terminal outputs should be included (in an appendix if extensive). The goal is a thorough, evidence-complete audit that could stand alone as a professional technical assessment. Length is not a constraint - comprehensiveness is the priority.

### A. Executive Summary
```markdown
Platform: [Windows/Mac/Linux]
Project Type: [Node.js/React Native/Python/etc]
Tier Level: [X]
NPM Status: [WORKING/FAILED]
Time Spent: [X] minutes
Interruptions: [None/Resumed from Stage X]

Coverage Breakdown:
- TESTED: [X] components
- ANALYZED: [Y] components  
- FAILED: [Z] components

Critical Issues (P1): [Number] tested, [Number] analyzed only
Total Issues by Priority: P1:[X] P2:[Y] P3:[Z] P4:[W]

Key Findings:
1. [TESTED-P1] Most critical confirmed issue
2. [ANALYZED-P2] Most likely functionality issue  
3. [FAILED-P1] Most important untested area
```

### B. Detailed Findings

**For TESTED Issues:**
```markdown
### [TESTED-P{1-4}] Issue Title
- **Location**: file:line
- **Evidence**: [terminal output]
- **Reproduction**: [exact steps]
- **Impact**: [what breaks]
- **Quick Fix**: [if < 5 min fix available]
```

**For ANALYZED Issues:**
- Issue description with [ANALYZED-P{1-4}] label  
- Static analysis evidence
- Why runtime testing failed
- Specific command to verify

**For FAILED Areas:**
- Component/feature with [FAILED-P{1-4}] label
- What tool/access was missing
- Test script for human execution
- Time estimate to verify

### C. Coverage Matrix
| Component | Status | Priority | Method | Notes |
|-----------|--------|----------|--------|-------|
| Authentication | ❌ | P1 | FAILED | Needs credentials |
| Build Process | ✅ | P2 | TESTED | All builds pass |
| API Endpoints | 🔄 | P2 | ANALYZED | NPM failed, static only |
| UI Components | ❌ | P4 | FAILED | Needs browser |

### D. Framework Execution Report
```markdown
Framework Compliance:
- Commands Attempted: [X]
- Commands Succeeded: [Y]
- Commands Failed: [Z]
- Fallbacks Used: [List any]

Tool Failures:
- [Tool]: [Reason for failure]
- [Workaround used if any]

Confidence in Audit Completeness: [High/Medium/Low]
- High: >80% of framework executed, NPM working
- Medium: 50-80% executed or static analysis only
- Low: <50% executed, multiple tool failures
```

### E. Additional Valuable Sections (As Applicable)
Include any additional analyses that provide value:
- **Technical Architecture Overview** - Project structure, tech stack, dependencies
- **Security Assessment Summary** - Best practices checklist, vulnerability overview
- **Operational Readiness** - Development/Production/CI-CD readiness assessment
- **Full Terminal Output Log** - Complete command/response history in appendix
- **Visual Diagrams** - Project structure trees, architecture diagrams if helpful

## 9. CORE PRINCIPLES

1. **Detect first**: Check platform, project type, and tool availability
2. **Test by priority**: P1 security/data issues first
3. **Fail gracefully**: When tools fail, use fallbacks and label clearly
4. **Within capabilities**: Test everything you can
5. **Beyond capabilities**: Provide scripts for humans
6. **Time management**: Stop at 2x estimate or after 3 failures
7. **Always transparent**: Show what worked, what didn't, and why
8. **Evidence over opinion**: Show actual outputs or mark as ANALYZED/FAILED

---

**Success = Maximum P1/P2 verification within constraints + Complete transparency about tool failures and limitations**

**Framework Version**: 1.6 Enhanced (Platform-aware, NPM-resilient, Checkpoint-enabled)
