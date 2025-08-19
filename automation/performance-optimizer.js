#!/usr/bin/env node
/**
 * CollegeScam.io Performance Optimizer
 * Analyzes monitoring data and suggests optimizations
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs').promises;
const path = require('path');

class PerformanceOptimizer {
  constructor() {
    this.timestamp = new Date().toISOString();
    this.reportDir = './reports';
    this.optimizations = [];
    this.thresholds = {
      performance: {
        excellent: 90,
        good: 70,
        needs_improvement: 50
      },
      loadTime: {
        good: 2000, // 2 seconds
        acceptable: 3000, // 3 seconds
        poor: 4000 // 4+ seconds
      },
      fcp: {
        good: 1000, // 1 second
        acceptable: 2000, // 2 seconds
        poor: 3000 // 3+ seconds
      },
      lcp: {
        good: 2500, // 2.5 seconds
        acceptable: 4000, // 4 seconds
        poor: 4000 // 4+ seconds
      },
      cls: {
        good: 0.1,
        acceptable: 0.25,
        poor: 0.25
      }
    };
  }

  async analyzePerformance() {
    console.log('📊 Starting Performance Analysis');
    console.log(`📅 Timestamp: ${this.timestamp}`);

    try {
      // Read latest performance data
      const performanceData = await this.loadLatestPerformanceData();
      if (!performanceData) {
        throw new Error('No performance data found');
      }

      // Analyze each page and device combination
      const analysis = this.analyzeData(performanceData);
      
      // Generate optimization recommendations
      const recommendations = this.generateRecommendations(analysis);
      
      // Create optimization report
      const report = {
        timestamp: this.timestamp,
        analysis,
        recommendations,
        priorityIssues: recommendations.filter(r => r.priority === 'high'),
        summary: this.generateSummary(analysis, recommendations)
      };

      // Save report
      await this.saveOptimizationReport(report);

      console.log('\n✅ Performance analysis complete!');
      console.log(`📋 Found ${report.priorityIssues.length} high-priority issues`);
      console.log(`💡 Generated ${recommendations.length} optimization recommendations`);

      return report;
    } catch (error) {
      console.error('❌ Performance analysis failed:', error);
      throw error;
    }
  }

  async loadLatestPerformanceData() {
    try {
      const files = await fs.readdir(this.reportDir);
      const performanceFiles = files.filter(f => f.startsWith('performance-') && f.endsWith('.json'));
      
      if (performanceFiles.length === 0) {
        return null;
      }

      // Get the latest file
      performanceFiles.sort();
      const latestFile = performanceFiles[performanceFiles.length - 1];
      
      const data = await fs.readFile(path.join(this.reportDir, latestFile), 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading performance data:', error);
      return null;
    }
  }

  analyzeData(data) {
    const analysis = {
      pages: {},
      overall: {
        averagePerformanceScore: 0,
        averageLoadTime: 0,
        averageFCP: 0,
        averageLCP: 0,
        averageCLS: 0,
        totalTests: 0
      }
    };

    let totalPerformance = 0;
    let totalLoadTime = 0;
    let totalFCP = 0;
    let totalLCP = 0;
    let totalCLS = 0;
    let testCount = 0;

    for (const [pageName, pageData] of Object.entries(data.tests)) {
      analysis.pages[pageName] = {
        devices: {},
        averages: {}
      };

      let pagePerformance = 0;
      let pageLoadTime = 0;
      let pageFCP = 0;
      let pageLCP = 0;
      let pageCLS = 0;
      let pageDevices = 0;

      for (const [deviceName, deviceData] of Object.entries(pageData)) {
        const device = {
          metrics: deviceData.metrics,
          lighthouse: deviceData.lighthouse,
          issues: [],
          score: 'good'
        };

        // Analyze Lighthouse scores
        if (deviceData.lighthouse.performance < this.thresholds.performance.needs_improvement) {
          device.issues.push({
            type: 'lighthouse_performance',
            severity: 'high',
            value: deviceData.lighthouse.performance,
            message: `Low Lighthouse performance score: ${deviceData.lighthouse.performance}/100`
          });
          device.score = 'poor';
        } else if (deviceData.lighthouse.performance < this.thresholds.performance.good) {
          device.issues.push({
            type: 'lighthouse_performance', 
            severity: 'medium',
            value: deviceData.lighthouse.performance,
            message: `Moderate Lighthouse performance score: ${deviceData.lighthouse.performance}/100`
          });
          device.score = 'acceptable';
        }

        // Analyze Core Web Vitals
        if (deviceData.metrics.loadTime > this.thresholds.loadTime.poor) {
          device.issues.push({
            type: 'load_time',
            severity: 'high',
            value: Math.round(deviceData.metrics.loadTime),
            message: `Slow load time: ${Math.round(deviceData.metrics.loadTime)}ms (target: <${this.thresholds.loadTime.good}ms)`
          });
          device.score = 'poor';
        }

        if (deviceData.metrics.firstContentfulPaint > this.thresholds.fcp.poor) {
          device.issues.push({
            type: 'fcp',
            severity: 'high',
            value: Math.round(deviceData.metrics.firstContentfulPaint),
            message: `Slow First Contentful Paint: ${Math.round(deviceData.metrics.firstContentfulPaint)}ms (target: <${this.thresholds.fcp.good}ms)`
          });
        }

        if (deviceData.metrics.largestContentfulPaint > this.thresholds.lcp.poor) {
          device.issues.push({
            type: 'lcp',
            severity: 'high',
            value: Math.round(deviceData.metrics.largestContentfulPaint),
            message: `Slow Largest Contentful Paint: ${Math.round(deviceData.metrics.largestContentfulPaint)}ms (target: <${this.thresholds.lcp.good}ms)`
          });
        }

        if (deviceData.metrics.cumulativeLayoutShift > this.thresholds.cls.poor) {
          device.issues.push({
            type: 'cls',
            severity: 'medium',
            value: deviceData.metrics.cumulativeLayoutShift.toFixed(3),
            message: `High Cumulative Layout Shift: ${deviceData.metrics.cumulativeLayoutShift.toFixed(3)} (target: <${this.thresholds.cls.good})`
          });
        }

        analysis.pages[pageName].devices[deviceName] = device;

        // Accumulate for averages
        pagePerformance += deviceData.lighthouse.performance;
        pageLoadTime += deviceData.metrics.loadTime;
        pageFCP += deviceData.metrics.firstContentfulPaint;
        pageLCP += deviceData.metrics.largestContentfulPaint;
        pageCLS += deviceData.metrics.cumulativeLayoutShift;
        pageDevices++;
      }

      // Calculate page averages
      analysis.pages[pageName].averages = {
        performance: Math.round(pagePerformance / pageDevices),
        loadTime: Math.round(pageLoadTime / pageDevices),
        fcp: Math.round(pageFCP / pageDevices),
        lcp: Math.round(pageLCP / pageDevices),
        cls: (pageCLS / pageDevices).toFixed(3)
      };

      // Accumulate for overall averages
      totalPerformance += pagePerformance;
      totalLoadTime += pageLoadTime;
      totalFCP += pageFCP;
      totalLCP += pageLCP;
      totalCLS += pageCLS;
      testCount += pageDevices;
    }

    // Calculate overall averages
    analysis.overall = {
      averagePerformanceScore: Math.round(totalPerformance / testCount),
      averageLoadTime: Math.round(totalLoadTime / testCount),
      averageFCP: Math.round(totalFCP / testCount),
      averageLCP: Math.round(totalLCP / testCount),
      averageCLS: (totalCLS / testCount).toFixed(3),
      totalTests: testCount
    };

    return analysis;
  }

  generateRecommendations(analysis) {
    const recommendations = [];

    // Global recommendations based on overall performance
    if (analysis.overall.averagePerformanceScore < this.thresholds.performance.good) {
      recommendations.push({
        id: 'overall_performance',
        priority: 'high',
        category: 'Performance',
        title: 'Improve Overall Performance Score',
        description: `Average Lighthouse performance score is ${analysis.overall.averagePerformanceScore}/100. Target: 90+`,
        actions: [
          'Optimize bundle size and remove unused code',
          'Implement code splitting for better loading',
          'Compress and optimize images',
          'Use Next.js Image optimization',
          'Enable compression (gzip/brotli)',
          'Minimize render-blocking resources'
        ],
        impact: 'High - affects all users across all devices'
      });
    }

    if (analysis.overall.averageLoadTime > this.thresholds.loadTime.good) {
      recommendations.push({
        id: 'load_time_optimization',
        priority: 'high',
        category: 'Loading Speed',
        title: 'Reduce Page Load Times',
        description: `Average load time is ${analysis.overall.averageLoadTime}ms. Target: <2000ms`,
        actions: [
          'Implement proper image lazy loading',
          'Reduce JavaScript bundle size',
          'Use CDN for static assets',
          'Optimize server response times',
          'Implement service worker caching',
          'Remove unused CSS and JavaScript'
        ],
        impact: 'High - directly affects user experience'
      });
    }

    // Page-specific recommendations
    for (const [pageName, pageData] of Object.entries(analysis.pages)) {
      const pageIssues = [];
      
      // Collect all issues from devices for this page
      for (const [deviceName, deviceData] of Object.entries(pageData.devices)) {
        pageIssues.push(...deviceData.issues.map(issue => ({
          ...issue,
          device: deviceName
        })));
      }

      // Group issues by type and create recommendations
      const issueGroups = this.groupIssuesByType(pageIssues);
      
      for (const [issueType, issues] of Object.entries(issueGroups)) {
        if (issues.length === 0) continue;

        const severity = issues.some(i => i.severity === 'high') ? 'high' : 'medium';
        
        recommendations.push({
          id: `${pageName}_${issueType}`,
          priority: severity,
          category: this.getCategoryForIssueType(issueType),
          title: `Fix ${this.getIssueTitleForType(issueType)} on ${pageName}`,
          description: `${issues.length} device(s) affected: ${issues.map(i => `${i.device} (${i.value})`).join(', ')}`,
          actions: this.getActionsForIssueType(issueType, pageName),
          impact: `${severity === 'high' ? 'High' : 'Medium'} - affects ${pageName} page performance`
        });
      }
    }

    // Interactive features recommendations (for how-it-works page)
    if (analysis.pages['how-it-works']) {
      let interactionIssues = 0;
      for (const [deviceName, deviceData] of Object.entries(analysis.pages['how-it-works'].devices)) {
        if (deviceData.interactionMetrics) {
          const { expandableCardsFound, expandableCardsWorking } = deviceData.interactionMetrics;
          if (expandableCardsWorking < expandableCardsFound) {
            interactionIssues++;
          }
        }
      }

      if (interactionIssues > 0) {
        recommendations.push({
          id: 'how_it_works_interactions',
          priority: 'medium',
          category: 'User Experience',
          title: 'Fix Interactive Elements on How It Works Page',
          description: `${interactionIssues} device(s) have non-working expandable cards`,
          actions: [
            'Debug click handlers for expandable cards',
            'Test touch events on mobile devices',
            'Ensure proper event delegation',
            'Add loading states for interactions',
            'Test across different screen sizes'
          ],
          impact: 'Medium - affects user engagement with explanatory content'
        });
      }
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  groupIssuesByType(issues) {
    return issues.reduce((groups, issue) => {
      if (!groups[issue.type]) {
        groups[issue.type] = [];
      }
      groups[issue.type].push(issue);
      return groups;
    }, {});
  }

  getCategoryForIssueType(type) {
    const categories = {
      lighthouse_performance: 'Performance',
      load_time: 'Loading Speed',
      fcp: 'Core Web Vitals',
      lcp: 'Core Web Vitals',
      cls: 'Core Web Vitals'
    };
    return categories[type] || 'Performance';
  }

  getIssueTitleForType(type) {
    const titles = {
      lighthouse_performance: 'Lighthouse Performance Score',
      load_time: 'Load Time Issues',
      fcp: 'First Contentful Paint',
      lcp: 'Largest Contentful Paint',
      cls: 'Cumulative Layout Shift'
    };
    return titles[type] || type;
  }

  getActionsForIssueType(type, pageName) {
    const actions = {
      lighthouse_performance: [
        'Run Lighthouse audit for detailed recommendations',
        'Optimize images and reduce file sizes',
        'Minimize unused CSS and JavaScript',
        'Implement proper caching strategies'
      ],
      load_time: [
        'Compress images and use WebP format',
        'Minimize HTTP requests',
        'Use browser caching',
        'Optimize server response time'
      ],
      fcp: [
        'Reduce render-blocking CSS',
        'Optimize font loading',
        'Minimize JavaScript execution time',
        'Use resource hints (preload, prefetch)'
      ],
      lcp: [
        'Optimize largest content element (likely images)',
        'Use lazy loading for below-fold content',
        'Improve server response time',
        'Remove render-blocking JavaScript'
      ],
      cls: [
        'Add size attributes to images and videos',
        'Reserve space for dynamic content',
        'Avoid inserting content above existing content',
        'Use CSS aspect-ratio for consistent layouts'
      ]
    };
    return actions[type] || ['Investigate and optimize performance bottlenecks'];
  }

  generateSummary(analysis, recommendations) {
    const highPriorityCount = recommendations.filter(r => r.priority === 'high').length;
    const mediumPriorityCount = recommendations.filter(r => r.priority === 'medium').length;
    
    let performanceGrade = 'A';
    if (analysis.overall.averagePerformanceScore < 70) performanceGrade = 'C';
    else if (analysis.overall.averagePerformanceScore < 85) performanceGrade = 'B';

    return {
      performanceGrade,
      overallScore: analysis.overall.averagePerformanceScore,
      totalIssues: recommendations.length,
      highPriorityIssues: highPriorityCount,
      mediumPriorityIssues: mediumPriorityCount,
      keyMetrics: {
        loadTime: `${analysis.overall.averageLoadTime}ms`,
        fcp: `${analysis.overall.averageFCP}ms`,
        lcp: `${analysis.overall.averageLCP}ms`,
        cls: analysis.overall.averageCLS
      },
      recommendation: this.getOverallRecommendation(performanceGrade, highPriorityCount)
    };
  }

  getOverallRecommendation(grade, highPriorityIssues) {
    if (grade === 'A' && highPriorityIssues === 0) {
      return 'Excellent performance! Continue monitoring and maintain current optimizations.';
    } else if (grade === 'B' && highPriorityIssues <= 2) {
      return 'Good performance with room for improvement. Focus on high-priority optimizations.';
    } else {
      return 'Performance needs attention. Prioritize fixing high-priority issues for better user experience.';
    }
  }

  async saveOptimizationReport(report) {
    const dateStr = new Date().toISOString().split('T')[0];
    const filePath = path.join(this.reportDir, `optimization-report-${dateStr}.json`);
    await fs.writeFile(filePath, JSON.stringify(report, null, 2), 'utf8');
    console.log(`💾 Optimization report saved: ${filePath}`);

    // Create a markdown summary for easy reading
    const markdownPath = path.join(this.reportDir, `optimization-summary-${dateStr}.md`);
    const markdown = this.generateMarkdownSummary(report);
    await fs.writeFile(markdownPath, markdown, 'utf8');
    console.log(`📝 Markdown summary saved: ${markdownPath}`);
  }

  generateMarkdownSummary(report) {
    const { summary, recommendations } = report;
    
    return `# Performance Optimization Report
**Generated**: ${report.timestamp}

## Overall Performance Grade: ${summary.performanceGrade}

### Key Metrics
- **Performance Score**: ${summary.overallScore}/100
- **Load Time**: ${summary.keyMetrics.loadTime}
- **First Contentful Paint**: ${summary.keyMetrics.fcp}
- **Largest Contentful Paint**: ${summary.keyMetrics.lcp}
- **Cumulative Layout Shift**: ${summary.keyMetrics.cls}

### Issues Summary
- **Total Issues**: ${summary.totalIssues}
- **High Priority**: ${summary.highPriorityIssues}
- **Medium Priority**: ${summary.mediumPriorityIssues}

**Recommendation**: ${summary.recommendation}

## High Priority Issues

${recommendations
  .filter(r => r.priority === 'high')
  .map(r => `### ${r.title}
**Category**: ${r.category}  
**Description**: ${r.description}

**Actions**:
${r.actions.map(action => `- ${action}`).join('\n')}

**Impact**: ${r.impact}
`).join('\n')}

## Medium Priority Issues

${recommendations
  .filter(r => r.priority === 'medium')
  .map(r => `### ${r.title}
**Category**: ${r.category}  
**Description**: ${r.description}

**Actions**:
${r.actions.map(action => `- ${action}`).join('\n')}

**Impact**: ${r.impact}
`).join('\n')}

---
*Next optimization check scheduled for next monitoring cycle*
`;
  }
}

// CLI interface
if (require.main === module) {
  const optimizer = new PerformanceOptimizer();
  optimizer.analyzePerformance().catch(console.error);
}

module.exports = PerformanceOptimizer;