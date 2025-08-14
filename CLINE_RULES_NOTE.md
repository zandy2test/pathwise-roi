# 📝 Cline Rules Configuration Note

## Current Setup

This project uses the **global Cline rules** located at:
`C:\Dev\Cline\Rules\.clinerules`

## If You Need Project-Specific Rules

If PathwiseROI needs custom AI behavior rules in the future:

1. Create a `.clinerules` file in this project root
2. Add your project-specific rules
3. These will override/extend the global rules

## Example Project-Specific Rules

You might want project-specific rules for:

- Special testing requirements for ROI calculations
- Custom commit message formats for this project
- Project-specific file handling rules
- Unique deployment or build processes

## Global Rules Philosophy

The global rules follow "SHIP FAST, TEST SMART":

- MVPs first, iterate based on feedback
- Test business logic, skip tests for docs/config
- Complete implementations (no lazy TODOs)
- Confidence-based branching

---

**Note created:** January 14, 2025  
**Reason:** Consolidated to single global rules file for consistency  
**Previous state:** This project may have had its own `.clinerules` file
