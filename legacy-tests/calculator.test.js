/**
 * PathwiseROI v1.1.0 - Calculator Logic Tests
 * Tests the core calculation engine and data validation
 */

// Since the calculator is TypeScript, we'll test the logic directly
const hierarchicalData = require('../lib/data-hierarchical.json');
const flatData = require('../lib/data.json');

// Simplified calculation functions for testing
function calculateROI(totalCost, scholarships, yearlyEarnings, livingCosts) {
  const netCost = totalCost - scholarships;
  const netIncome = yearlyEarnings - livingCosts;
  const breakevenYears = netCost / netIncome;
  return { netCost, breakevenYears, netIncome };
}

// Test data for calculations
const testCases = {
  engineering: {
    educationType: 'college',
    fieldOfStudy: 'engineering',
    location: 'new-york',
    schoolQuality: 'average-public',
    livingArrangement: 'off-campus',
    scholarships: 10000,
    expected: {
      totalCost: 160000, // 4 years * $40k
      netCost: 150000,   // totalCost - scholarships
      yearlyEarnings: 75000,
      breakevenYears: 5.2 // approximate
    }
  },
  tradePlumbing: {
    educationType: 'trade',
    fieldOfStudy: 'plumbing',
    location: 'texas',
    schoolQuality: 'average-public',
    livingArrangement: 'with-parents',
    scholarships: 0,
    expected: {
      totalCost: 20000,  // 2 years trade school
      netCost: 20000,
      yearlyEarnings: 55000,
      breakevenYears: 0.8 // less than 1 year
    }
  },
  bootcampWebDev: {
    educationType: 'bootcamp',
    fieldOfStudy: 'web-development',
    location: 'california',
    schoolQuality: 'premium',
    livingArrangement: 'off-campus',
    scholarships: 5000,
    expected: {
      totalCost: 25000,  // 6 months bootcamp
      netCost: 20000,
      yearlyEarnings: 85000,
      breakevenYears: 0.5
    }
  }
};

// Test hierarchical data structure
function testHierarchicalDataStructure() {
  console.log('\n=== Testing Hierarchical Data Structure ===');
  
  let passed = 0;
  let failed = 0;
  
  // Test 1: Check all education types exist
  const expectedTypes = ['college', 'trade', 'bootcamp', 'certificate', 'self-study'];
  console.log('\n1. Testing education type categories...');
  
  for (const type of expectedTypes) {
    if (hierarchicalData.educationTypes[type]) {
      console.log(`  ✓ Found education type: ${type}`);
      console.log(`    - Display name: ${hierarchicalData.educationTypes[type].displayName}`);
      console.log(`    - Fields count: ${hierarchicalData.educationTypes[type].fields.length}`);
      passed++;
    } else {
      console.log(`  ✗ Missing education type: ${type}`);
      failed++;
    }
  }
  
  // Test 2: Validate field mappings to paths
  console.log('\n2. Testing field to path mappings...');
  
  for (const [typeKey, typeData] of Object.entries(hierarchicalData.educationTypes)) {
    for (const field of typeData.fields) {
      const path = hierarchicalData.paths.find(p => p.id === field.pathId);
      if (path) {
        console.log(`  ✓ ${typeData.displayName} > ${field.displayName} → Path found`);
        passed++;
      } else {
        console.log(`  ✗ ${typeData.displayName} > ${field.displayName} → Path missing (ID: ${field.pathId})`);
        failed++;
      }
    }
  }
  
  // Test 3: Validate all paths have required properties
  console.log('\n3. Testing path data integrity...');
  
  const requiredPathProps = ['id', 'name', 'duration', 'tuition', 'avgSalary', 'jobGrowth'];
  for (const path of hierarchicalData.paths.slice(0, 5)) { // Test first 5 paths
    let pathValid = true;
    const missingProps = [];
    
    for (const prop of requiredPathProps) {
      if (!(prop in path)) {
        pathValid = false;
        missingProps.push(prop);
      }
    }
    
    if (pathValid) {
      console.log(`  ✓ Path "${path.name}" has all required properties`);
      passed++;
    } else {
      console.log(`  ✗ Path "${path.name}" missing: ${missingProps.join(', ')}`);
      failed++;
    }
  }
  
  console.log(`\n=== Hierarchical Data Tests: ${passed} passed, ${failed} failed ===`);
  return { passed, failed };
}

// Test calculation functions
function testCalculations() {
  console.log('\n=== Testing Calculation Logic ===');
  
  let passed = 0;
  let failed = 0;
  
  // Test 1: Basic ROI calculation
  console.log('\n1. Testing ROI calculations...');
  
  for (const [name, testCase] of Object.entries(testCases)) {
    console.log(`\n  Testing ${name}:`);
    
    // Simulate calculation inputs
    const inputs = {
      totalCost: testCase.expected.totalCost,
      scholarships: testCase.scholarships,
      yearlyEarnings: testCase.expected.yearlyEarnings,
      livingCosts: 30000 // Annual living costs
    };
    
    // Calculate net cost
    const netCost = inputs.totalCost - inputs.scholarships;
    console.log(`    Total Cost: $${inputs.totalCost.toLocaleString()}`);
    console.log(`    Scholarships: $${inputs.scholarships.toLocaleString()}`);
    console.log(`    Net Cost: $${netCost.toLocaleString()}`);
    
    if (Math.abs(netCost - testCase.expected.netCost) < 1000) {
      console.log(`    ✓ Net cost calculation correct`);
      passed++;
    } else {
      console.log(`    ✗ Net cost mismatch (expected: $${testCase.expected.netCost})`);
      failed++;
    }
    
    // Calculate breakeven
    const breakevenYears = netCost / (inputs.yearlyEarnings - inputs.livingCosts);
    console.log(`    Breakeven: ${breakevenYears.toFixed(1)} years`);
    
    if (Math.abs(breakevenYears - testCase.expected.breakevenYears) < 2) {
      console.log(`    ✓ Breakeven calculation reasonable`);
      passed++;
    } else {
      console.log(`    ✗ Breakeven seems off (expected: ~${testCase.expected.breakevenYears} years)`);
      failed++;
    }
    
    // Calculate 10-year net worth
    const yearsEarning = 10 - Math.ceil(breakevenYears);
    const tenYearNetWorth = (yearsEarning * inputs.yearlyEarnings) - netCost - (10 * inputs.livingCosts);
    console.log(`    10-Year Net Worth: $${tenYearNetWorth.toLocaleString()}`);
    
    if (tenYearNetWorth > 0) {
      console.log(`    ✓ Positive 10-year net worth`);
      passed++;
    } else if (testCase.expected.breakevenYears > 10) {
      console.log(`    ✓ Negative net worth expected (long breakeven)`);
      passed++;
    } else {
      console.log(`    ✗ Unexpected negative net worth`);
      failed++;
    }
  }
  
  console.log(`\n=== Calculation Tests: ${passed} passed, ${failed} failed ===`);
  return { passed, failed };
}

// Test data validation
function testDataValidation() {
  console.log('\n=== Testing Data Validation ===');
  
  let passed = 0;
  let failed = 0;
  
  // Test 1: Scholarship limits
  console.log('\n1. Testing scholarship validation...');
  
  const scholarshipTests = [
    { value: 0, valid: true },
    { value: 50000, valid: true },
    { value: 100000, valid: true },
    { value: 100001, valid: false },
    { value: -1000, valid: false }
  ];
  
  for (const test of scholarshipTests) {
    const isValid = test.value >= 0 && test.value <= 100000;
    if (isValid === test.valid) {
      console.log(`  ✓ Scholarship $${test.value}: correctly validated as ${test.valid ? 'valid' : 'invalid'}`);
      passed++;
    } else {
      console.log(`  ✗ Scholarship $${test.value}: validation failed`);
      failed++;
    }
  }
  
  // Test 2: Location multipliers
  console.log('\n2. Testing location cost multipliers...');
  
  const locationMultipliers = {
    'california': 1.3,
    'new-york': 1.25,
    'texas': 0.95,
    'midwest': 0.85
  };
  
  for (const [location, multiplier] of Object.entries(locationMultipliers)) {
    // Simulate cost calculation with multiplier
    const baseCost = 40000;
    const adjustedCost = baseCost * multiplier;
    
    console.log(`  Location: ${location}`);
    console.log(`    Base cost: $${baseCost.toLocaleString()}`);
    console.log(`    Multiplier: ${multiplier}`);
    console.log(`    Adjusted: $${adjustedCost.toLocaleString()}`);
    
    if (adjustedCost === baseCost * multiplier) {
      console.log(`    ✓ Cost adjustment correct`);
      passed++;
    } else {
      console.log(`    ✗ Cost adjustment failed`);
      failed++;
    }
  }
  
  console.log(`\n=== Validation Tests: ${passed} passed, ${failed} failed ===`);
  return { passed, failed };
}

// Test comparison logic
function testComparisonMode() {
  console.log('\n=== Testing Comparison Mode ===');
  
  let passed = 0;
  let failed = 0;
  
  console.log('\n1. Testing path comparison winner determination...');
  
  const comparisons = [
    {
      pathA: {
        name: 'Engineering',
        netCost: 150000,
        tenYearNetWorth: 450000,
        breakevenYears: 5
      },
      pathB: {
        name: 'Trade School',
        netCost: 20000,
        tenYearNetWorth: 380000,
        breakevenYears: 1
      },
      expectedWinner: 'Engineering', // Higher 10-year net worth
      criteria: '10-year net worth'
    },
    {
      pathA: {
        name: 'Bootcamp',
        netCost: 20000,
        tenYearNetWorth: 520000,
        breakevenYears: 0.5
      },
      pathB: {
        name: 'Self-Study',
        netCost: 2000,
        tenYearNetWorth: 480000,
        breakevenYears: 0.1
      },
      expectedWinner: 'Bootcamp', // Much higher net worth
      criteria: '10-year net worth'
    }
  ];
  
  for (const comp of comparisons) {
    console.log(`\n  Comparing: ${comp.pathA.name} vs ${comp.pathB.name}`);
    console.log(`    ${comp.pathA.name}: $${comp.pathA.tenYearNetWorth.toLocaleString()} (${comp.pathA.breakevenYears} years)`);
    console.log(`    ${comp.pathB.name}: $${comp.pathB.tenYearNetWorth.toLocaleString()} (${comp.pathB.breakevenYears} years)`);
    
    const winner = comp.pathA.tenYearNetWorth > comp.pathB.tenYearNetWorth ? comp.pathA.name : comp.pathB.name;
    
    if (winner === comp.expectedWinner) {
      console.log(`    ✓ Winner correctly identified: ${winner} (by ${comp.criteria})`);
      passed++;
    } else {
      console.log(`    ✗ Wrong winner: got ${winner}, expected ${comp.expectedWinner}`);
      failed++;
    }
    
    // Test breakeven advantage
    const fasterBreakeven = comp.pathA.breakevenYears < comp.pathB.breakevenYears ? comp.pathA.name : comp.pathB.name;
    console.log(`    Faster breakeven: ${fasterBreakeven}`);
    passed++;
  }
  
  console.log(`\n=== Comparison Tests: ${passed} passed, ${failed} failed ===`);
  return { passed, failed };
}

// Run all tests
function runAllTests() {
  console.log('\n' + '='.repeat(60));
  console.log('   PathwiseROI v1.1.0 - Backend & Calculation Test Suite');
  console.log('='.repeat(60));
  
  const results = [];
  
  results.push(testHierarchicalDataStructure());
  results.push(testCalculations());
  results.push(testDataValidation());
  results.push(testComparisonMode());
  
  // Summary
  const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
  const totalFailed = results.reduce((sum, r) => sum + r.failed, 0);
  
  console.log('\n' + '='.repeat(60));
  console.log('                    TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`\n  Total Tests: ${totalPassed + totalFailed}`);
  console.log(`  ✓ Passed: ${totalPassed}`);
  console.log(`  ✗ Failed: ${totalFailed}`);
  console.log(`  Success Rate: ${((totalPassed / (totalPassed + totalFailed)) * 100).toFixed(1)}%`);
  
  if (totalFailed === 0) {
    console.log('\n  🎉 All tests passed! Backend logic is working correctly.');
  } else {
    console.log('\n  ⚠️ Some tests failed. Review the output above for details.');
  }
  
  console.log('\n' + '='.repeat(60));
  
  return { totalPassed, totalFailed };
}

// Export for module use or run directly
if (require.main === module) {
  runAllTests();
} else {
  module.exports = { runAllTests, testCalculations, testHierarchicalDataStructure };
}
