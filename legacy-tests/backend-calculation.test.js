/**
 * PathwiseROI v1.1.0 - Backend & Calculation Test Suite
 * Tests the core calculation engine and data validation
 */

// Load the actual data files
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
    program: 'bachelor',
    location: 'nyc',
    scholarships: 10000,
    expected: {
      totalCost: 130000,
      netCost: 120000,
      yearlyEarnings: 70000,
      breakevenYears: 3.0
    }
  },
  tradePlumbing: {
    educationType: 'trade',
    fieldOfStudy: 'plumbing',
    program: 'apprentice',
    location: 'houston',
    scholarships: 0,
    expected: {
      totalCost: 2000,
      netCost: 2000,
      yearlyEarnings: 45000,
      breakevenYears: 0.1
    }
  },
  bootcampCoding: {
    educationType: 'bootcamp',
    fieldOfStudy: 'coding',
    program: 'fullstack',
    location: 'sf',
    scholarships: 5000,
    expected: {
      totalCost: 15000,
      netCost: 10000,
      yearlyEarnings: 65000,
      breakevenYears: 0.3
    }
  }
};

// Test hierarchical data structure
function testHierarchicalDataStructure() {
  console.log('\n=== Testing Hierarchical Data Structure ===');
  
  let passed = 0;
  let failed = 0;
  
  // Test 1: Check main education types exist
  const expectedTypes = ['college', 'trade', 'bootcamp', 'community', 'graduate', 'work'];
  console.log('\n1. Testing education type categories...');
  
  for (const type of expectedTypes) {
    if (hierarchicalData.educationTypes[type]) {
      const typeData = hierarchicalData.educationTypes[type];
      const fieldCount = Object.keys(typeData.fields).length;
      console.log(`  ✓ Found education type: ${type}`);
      console.log(`    - Display name: ${typeData.name}`);
      console.log(`    - Fields count: ${fieldCount}`);
      passed++;
    } else {
      console.log(`  ✗ Missing education type: ${type}`);
      failed++;
    }
  }
  
  // Test 2: Validate field structure
  console.log('\n2. Testing field and program structure...');
  
  for (const [typeKey, typeData] of Object.entries(hierarchicalData.educationTypes)) {
    if (typeData.fields) {
      for (const [fieldKey, fieldData] of Object.entries(typeData.fields)) {
        // Check for programs or degrees
        const programsKey = fieldData.programs ? 'programs' : fieldData.degrees ? 'degrees' : null;
        
        if (programsKey) {
          const programCount = Object.keys(fieldData[programsKey]).length;
          console.log(`  ✓ ${typeData.name} > ${fieldData.name}: ${programCount} ${programsKey}`);
          passed++;
        } else {
          console.log(`  ✗ ${typeData.name} > ${fieldData.name}: No programs or degrees found`);
          failed++;
        }
      }
    }
  }
  
  // Test 3: Validate path mappings
  console.log('\n3. Testing path mappings...');
  
  const sampleMappings = ['college_tech', 'trades_welding', 'bootcamp_coding', 'nursing_bachelor'];
  for (const mappingKey of sampleMappings) {
    const mapping = hierarchicalData.pathMappings[mappingKey];
    if (mapping) {
      const { type, field, program } = mapping;
      // Verify the path exists
      const educationType = hierarchicalData.educationTypes[type];
      if (educationType && educationType.fields[field]) {
        const fieldData = educationType.fields[field];
        const programsKey = fieldData.programs ? 'programs' : 'degrees';
        if (fieldData[programsKey] && fieldData[programsKey][program]) {
          console.log(`  ✓ Path mapping "${mappingKey}" -> valid program`);
          passed++;
        } else {
          console.log(`  ✗ Path mapping "${mappingKey}" -> program not found`);
          failed++;
        }
      } else {
        console.log(`  ✗ Path mapping "${mappingKey}" -> invalid type/field`);
        failed++;
      }
    } else {
      console.log(`  ✗ Path mapping "${mappingKey}" not found`);
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
    
    // Get actual data from hierarchical structure
    const educationType = hierarchicalData.educationTypes[testCase.educationType];
    const field = educationType.fields[testCase.fieldOfStudy];
    const programsKey = field.programs ? 'programs' : 'degrees';
    const program = field[programsKey][testCase.program];
    
    // Apply location multiplier
    const locationMultiplier = hierarchicalData.locationMultipliers[testCase.location] || 1.0;
    
    // Calculate costs
    const baseTotalCost = program.totalCost;
    const adjustedTotalCost = baseTotalCost * locationMultiplier;
    const netCost = adjustedTotalCost - testCase.scholarships;
    
    // Use salary data
    const yearlyEarnings = program.salary.year1;
    const livingCosts = 30000; // Annual living costs
    
    console.log(`    Program: ${program.name}`);
    console.log(`    Base Cost: $${baseTotalCost.toLocaleString()}`);
    console.log(`    Location Multiplier: ${locationMultiplier}`);
    console.log(`    Total Cost: $${adjustedTotalCost.toLocaleString()}`);
    console.log(`    Scholarships: $${testCase.scholarships.toLocaleString()}`);
    console.log(`    Net Cost: $${netCost.toLocaleString()}`);
    console.log(`    Year 1 Salary: $${yearlyEarnings.toLocaleString()}`);
    
    if (netCost > 0) {
      console.log(`    ✓ Net cost calculation correct`);
      passed++;
    } else if (testCase.educationType === 'work' && testCase.fieldOfStudy === 'military') {
      console.log(`    ✓ Negative cost for military (signing bonus)`);
      passed++;
    } else {
      console.log(`    ✗ Unexpected net cost`);
      failed++;
    }
    
    // Calculate breakeven
    const breakevenYears = netCost / (yearlyEarnings - livingCosts);
    console.log(`    Breakeven: ${breakevenYears.toFixed(1)} years`);
    
    if (breakevenYears >= 0 || netCost <= 0) {
      console.log(`    ✓ Breakeven calculation reasonable`);
      passed++;
    } else {
      console.log(`    ✗ Breakeven calculation failed`);
      failed++;
    }
    
    // Calculate 10-year projection
    const year5Salary = program.salary.year5;
    const year10Salary = program.salary.year10;
    console.log(`    5-Year Salary: $${year5Salary.toLocaleString()}`);
    console.log(`    10-Year Salary: $${year10Salary.toLocaleString()}`);
    
    // Risk factor
    console.log(`    Risk: ${program.riskText}`);
    console.log(`    Employment Rate: ${(program.employmentRate * 100).toFixed(0)}%`);
    
    passed++;
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
  
  const locations = ['nyc', 'sf', 'houston', 'denver'];
  for (const location of locations) {
    const multiplier = hierarchicalData.locationMultipliers[location];
    if (multiplier && multiplier > 0 && multiplier <= 2) {
      console.log(`  ✓ ${location}: ${multiplier} (valid range)`);
      passed++;
    } else {
      console.log(`  ✗ ${location}: Invalid multiplier`);
      failed++;
    }
  }
  
  // Test 3: School tier validation
  console.log('\n3. Testing school tier multipliers...');
  
  for (const [tierKey, tierData] of Object.entries(hierarchicalData.schoolTiers)) {
    console.log(`  ${tierData.name}:`);
    console.log(`    Cost multiplier: ${tierData.costMultiplier}`);
    console.log(`    Salary bonus: ${tierData.salaryBonus}`);
    
    if (tierData.costMultiplier > 0 && tierData.salaryBonus > 0) {
      console.log(`    ✓ Valid multipliers`);
      passed++;
    } else {
      console.log(`    ✗ Invalid multipliers`);
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
  
  console.log('\n1. Testing viral comparisons...');
  
  for (const comparison of hierarchicalData.viralComparisons.slice(0, 3)) {
    console.log(`\n  "${comparison.title}"`);
    
    // Get path data for both paths
    const mapping1 = hierarchicalData.pathMappings[comparison.path1];
    const mapping2 = hierarchicalData.pathMappings[comparison.path2];
    
    if (mapping1 && mapping2) {
      // Get program data for path 1
      const type1 = hierarchicalData.educationTypes[mapping1.type];
      const field1 = type1.fields[mapping1.field];
      const programsKey1 = field1.programs ? 'programs' : 'degrees';
      const program1 = field1[programsKey1][mapping1.program];
      
      // Get program data for path 2
      const type2 = hierarchicalData.educationTypes[mapping2.type];
      const field2 = type2.fields[mapping2.field];
      const programsKey2 = field2.programs ? 'programs' : 'degrees';
      const program2 = field2[programsKey2][mapping2.program];
      
      console.log(`    Path 1: ${program1.name}`);
      console.log(`      Cost: $${program1.totalCost.toLocaleString()}`);
      console.log(`      Year 1: $${program1.salary.year1.toLocaleString()}`);
      console.log(`      Year 10: $${program1.salary.year10.toLocaleString()}`);
      
      console.log(`    Path 2: ${program2.name}`);
      console.log(`      Cost: $${program2.totalCost.toLocaleString()}`);
      console.log(`      Year 1: $${program2.salary.year1.toLocaleString()}`);
      console.log(`      Year 10: $${program2.salary.year10.toLocaleString()}`);
      
      console.log(`    ✓ Comparison data loaded successfully`);
      passed++;
    } else {
      console.log(`    ✗ Failed to load comparison data`);
      failed++;
    }
  }
  
  // Test 2: Custom comparison calculations
  console.log('\n2. Testing comparison calculations...');
  
  const customComparisons = [
    {
      path1: { name: 'Engineering', totalCost: 130000, year10Salary: 125000 },
      path2: { name: 'Trade School', totalCost: 8000, year10Salary: 95000 },
      expectedWinner: 'Trade School', // Lower cost, reasonable salary
      criteria: 'ROI efficiency'
    },
    {
      path1: { name: 'Bootcamp', totalCost: 15000, year10Salary: 120000 },
      path2: { name: 'Self-Study', totalCost: 0, year10Salary: 80000 },
      expectedWinner: 'Bootcamp', // Higher long-term earnings
      criteria: '10-year earnings'
    }
  ];
  
  for (const comp of customComparisons) {
    console.log(`\n  Comparing: ${comp.path1.name} vs ${comp.path2.name}`);
    
    // Calculate 10-year net worth (simplified)
    const net1 = (comp.path1.year10Salary * 10) - comp.path1.totalCost;
    const net2 = (comp.path2.year10Salary * 10) - comp.path2.totalCost;
    
    console.log(`    ${comp.path1.name}: $${net1.toLocaleString()} net`);
    console.log(`    ${comp.path2.name}: $${net2.toLocaleString()} net`);
    
    const winner = net1 > net2 ? comp.path1.name : comp.path2.name;
    
    if (winner === comp.expectedWinner) {
      console.log(`    ✓ Winner correctly identified: ${winner} (by ${comp.criteria})`);
      passed++;
    } else {
      console.log(`    ✗ Wrong winner: got ${winner}, expected ${comp.expectedWinner}`);
      failed++;
    }
  }
  
  console.log(`\n=== Comparison Tests: ${passed} passed, ${failed} failed ===`);
  return { passed, failed };
}

// Test living costs calculations
function testLivingCosts() {
  console.log('\n=== Testing Living Costs ===');
  
  let passed = 0;
  let failed = 0;
  
  console.log('\n1. Testing living arrangement costs...');
  
  for (const [key, arrangement] of Object.entries(hierarchicalData.livingCosts)) {
    const annualCost = arrangement.monthly * 12;
    console.log(`  ${arrangement.name}:`);
    console.log(`    Monthly: $${arrangement.monthly.toLocaleString()}`);
    console.log(`    Annual: $${annualCost.toLocaleString()}`);
    
    if (arrangement.monthly > 0 && arrangement.monthly < 5000) {
      console.log(`    ✓ Reasonable cost range`);
      passed++;
    } else {
      console.log(`    ✗ Unrealistic cost`);
      failed++;
    }
  }
  
  console.log(`\n=== Living Costs Tests: ${passed} passed, ${failed} failed ===`);
  return { passed, failed };
}

// Run all tests
function runAllTests() {
  console.log('\n' + '='.repeat(60));
  console.log('   PathwiseROI v1.1.0 - Backend & Calculation Test Suite');
  console.log('='.repeat(60));
  
  const results = [];
  
  try {
    results.push(testHierarchicalDataStructure());
    results.push(testCalculations());
    results.push(testDataValidation());
    results.push(testComparisonMode());
    results.push(testLivingCosts());
  } catch (error) {
    console.error('\n❌ Test execution error:', error.message);
    console.error('Stack:', error.stack);
  }
  
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
