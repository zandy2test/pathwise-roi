# QUICK REFERENCE - IMMEDIATE ACTION PLAN

## 🚀 COPY-PASTE COMMANDS FOR IMMEDIATE CLEANUP

### Step 1: Remove Dead Code (2 minutes)
```bash
# Remove unused components
git rm components/share-card.tsx
git rm components/share-result-card.tsx

# Remove unused dependency
npm uninstall @vercel/analytics

# Rebuild
npm install

# Commit
git add -A
git commit -m "chore: remove unused components and @vercel/analytics dependency"
```

### Step 2: Archive Old Docs (2 minutes)
```bash
# Create archive directory
mkdir -p docs/archive

# Move old documentation
mv CHANGELOG-VIRAL.md docs/archive/
mv FEEDBACK-IMPLEMENTATION-PLAN.md docs/archive/
mv FILES-FOR-V0.md docs/archive/
mv GIT-COMMIT-MESSAGE.md docs/archive/
mv goldilocks-framework-v1.7.md docs/archive/
mv HANDOFF-PROMPT.md docs/archive/
mv IMPLEMENTATION-LOG-JAN12.md docs/archive/
mv implementation-plan.md docs/archive/
mv pathwise-roi-masterplan-FINAL.md docs/archive/
mv PHASE-4-COMPLETE.md docs/archive/
mv PHASE-4-HANDOFF.md docs/archive/
mv REFACTORING-DOCUMENTATION.md docs/archive/
mv REFACTORING-LOG.md docs/archive/
mv RUN_AUDITS_NOW.md docs/archive/
mv TECHNICAL-IMPLEMENTATION-GUIDE.md docs/archive/
mv TECHNICAL-REVIEW-AND-ACTION-PLAN.md docs/archive/
mv TEST-REPORT-V1.1.0.md docs/archive/
mv v0-audit-and-action-plan.md docs/archive/
mv V0-BUILD-INSTRUCTIONS.md docs/archive/
mv V0-COMPLETE-BUILD-PACKAGE.md docs/archive/
mv VALIDATED-TECHNICAL-REVIEW.md docs/archive/
mv VIRAL-TRANSFORMATION-*.md docs/archive/

# Keep only essential docs in root
# Keeping: README.md, LICENSE, QUICKSTART.md, DEPLOYMENT-CHECKLIST.md

# Commit
git add -A
git commit -m "docs: archive old planning and development documentation"
```

### Step 3: Clean up temp directories (1 minute)
```bash
# Remove temp directory if empty or unnecessary
rm -rf temp-v0-repo/

# Commit
git add -A
git commit -m "chore: remove temporary development directory"
```

### Step 4: Verify Everything Still Works (2 minutes)
```bash
# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build

# Test dev server
npm run dev
# Visit http://localhost:3000 and test calculator
```

## 📝 NEXT PRIORITY: ADD REAL TESTS

### Create Calculator Tests
Create `__tests__/calculator.test.ts`:
```typescript
import { calculateROI, comparePaths } from '@/lib/calculator';
import { educationPaths } from '@/lib/data';

describe('ROI Calculator', () => {
  test('calculates correct ROI for CS degree', () => {
    const result = calculateROI({
      path: 'college_cs',
      location: 'nyc',
      schoolTier: 'average',
      livingCost: 'oncampus',
      scholarships: 0
    });
    
    expect(result.totalCost).toBeGreaterThan(100000);
    expect(result.breakevenMonths).toBeLessThan(60);
    expect(result.netWorth10Years).toBeGreaterThan(0);
  });

  test('calculates correct ROI for trade school', () => {
    const result = calculateROI({
      path: 'trades_plumbing',
      location: 'midwest',
      schoolTier: 'average',
      livingCost: 'withparents',
      scholarships: 0
    });
    
    expect(result.totalCost).toBeLessThan(50000);
    expect(result.breakevenMonths).toBeLessThan(24);
  });

  test('compares paths correctly', () => {
    const comparison = comparePaths(
      {
        path: 'college_liberal_arts',
        location: 'nyc',
        schoolTier: 'premium',
        livingCost: 'oncampus',
        scholarships: 0
      },
      {
        path: 'trades_welding',
        location: 'nyc',
        schoolTier: 'average',
        livingCost: 'withparents',
        scholarships: 0
      }
    );
    
    expect(comparison.winner).toBeDefined();
    expect(comparison.differenceMonths).toBeGreaterThan(0);
  });
});
```

### Create Validation Tests
Create `__tests__/validation.test.ts`:
```typescript
import { validateCalculatorInputs } from '@/lib/validation';

describe('Input Validation', () => {
  test('validates required fields', () => {
    const errors = validateCalculatorInputs({
      path: '',
      location: '',
      schoolTier: '',
      livingCost: '',
      scholarships: 0
    });
    
    expect(errors).toContain('Please select an education path');
    expect(errors).toContain('Please select a location');
  });

  test('validates scholarship amount', () => {
    const errors = validateCalculatorInputs({
      path: 'college_cs',
      location: 'nyc',
      schoolTier: 'average',
      livingCost: 'oncampus',
      scholarships: -1000
    });
    
    expect(errors).toContain('Scholarships cannot be negative');
  });

  test('passes valid inputs', () => {
    const errors = validateCalculatorInputs({
      path: 'college_cs',
      location: 'nyc',
      schoolTier: 'average',
      livingCost: 'oncampus',
      scholarships: 10000
    });
    
    expect(errors).toHaveLength(0);
  });
});
```

### Run Tests
```bash
npm test
```

## 🎯 VERIFICATION CHECKLIST

After cleanup, verify:
- [ ] `npm run build` succeeds
- [ ] `npm run dev` works
- [ ] Calculator still functions
- [ ] No console errors
- [ ] All pages load correctly

## 💡 REMEMBER

1. **Test Before Deleting**: Always verify files are truly unused
2. **Commit Frequently**: Make small, atomic commits
3. **Document Changes**: Update README if needed
4. **Keep Backups**: Archive don't delete if unsure

## 📊 EXPECTED RESULTS

After this cleanup:
- **2 fewer** unused components
- **1 fewer** unused dependency  
- **~25 fewer** documentation files in root
- **Cleaner** repository structure
- **Same** functionality

---

*Time to complete all steps: ~10 minutes*
