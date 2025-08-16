# Technical Debt Log - PathwiseROI

## Last Updated: August 16, 2025

This document tracks known technical issues that don't block functionality but should be addressed in future iterations.

## 🟡 Non-Critical Warnings

### React Test Environment Warnings

**Impact**: Test environment only, no production impact
**Priority**: Low

1. **SVG Property Casing Warning**
   - **Issue**: `linearGradient` should be `linearGradient` in React DOM
   - **Location**: Components using SVG gradients
   - **Fix**: Update SVG property names to React conventions
   - **Workaround**: Tests pass despite warnings

2. **React act() Warnings**
   - **Issue**: Some test components trigger act() warnings
   - **Location**: `__tests__/components/` various files
   - **Fix**: Wrap state updates in act() or use waitFor
   - **Workaround**: Tests pass and functionality works

### Development Environment

1. **MCP Settings Format Warning**
   - **Issue**: "Invalid MCP settings format" in Cline/VS Code
   - **Location**: VS Code settings.json
   - **Impact**: MCP servers still function correctly
   - **Fix**: Review JSON syntax in MCP configuration
   - **Priority**: Very Low (doesn't affect functionality)

## 🔧 Performance Optimizations

### Test Suite Performance

**Current**: ~30 seconds for full test suite
**Target**: <15 seconds
**Suggestions**:

- Consider test parallelization
- Mock heavy dependencies
- Use test.skip for integration tests in watch mode
- Optimize beforeEach/afterEach hooks

### Bundle Size

**Current**: 308 kB first load JS
**Acceptable**: Yes, but could be optimized
**Opportunities**:

- Lazy load Recharts library
- Code split premium components
- Tree-shake unused utilities

## 🏗️ Architecture Improvements

### Missing Backend Infrastructure

**Current State**: All calculations client-side
**Issues**:

- No data persistence
- Limited scalability
- Exposed business logic
  **Future Solution**: Node.js/Python API service

### Limited Error Handling

**Current**: Basic try-catch blocks
**Missing**:

- Error boundaries for component failures
- Centralized error logging
- User-friendly error messages
- Recovery mechanisms

### No Offline Support

**Current**: Requires internet connection
**Missing**:

- Service worker implementation
- Offline calculation capability
- Cache management
- PWA manifest

## 🎨 UI/UX Improvements

### Premium Features

**Status**: Placeholder only
**Needed**:

- Actual premium feature implementation
- Payment integration
- User authentication
- Feature gating logic

### Social Sharing

**Current**: Clipboard copy only
**Missing**:

- Real Twitter/X integration
- LinkedIn sharing
- Facebook sharing
- Share preview cards

### Mobile Experience

**Current**: Responsive but not optimized
**Improvements Needed**:

- Touch gesture support
- Mobile-specific navigation
- Optimized chart rendering
- Better form input handling

## 📊 Analytics & Monitoring

### Limited Analytics

**Current**: Basic GA4 page views
**Missing**:

- Event tracking for calculations
- Conversion funnel analysis
- User journey mapping
- Error tracking (Sentry/Rollbar)

### No Performance Monitoring

**Missing**:

- Real User Monitoring (RUM)
- Core Web Vitals tracking
- API response time monitoring
- Client-side error reporting

## 🔒 Security Considerations

### Input Validation

**Current**: Basic client-side validation
**Needed**:

- Server-side validation (when backend added)
- Input sanitization
- Rate limiting
- CSRF protection

### Data Privacy

**Current**: No user data stored
**Future Considerations**:

- GDPR compliance for EU users
- Cookie consent management
- Privacy policy implementation
- Data retention policies

## 📝 Documentation Gaps

### API Documentation

**Status**: Not applicable yet
**Future Need**: When backend is implemented

### Component Documentation

**Current**: Basic inline comments
**Needed**:

- Storybook for component library
- JSDoc comments
- Architecture decision records (ADRs)

## 🚀 Deployment & DevOps

### CI/CD Enhancements

**Current**: Basic Vercel deployment
**Missing**:

- Automated E2E tests in CI
- Performance budget checks
- Lighthouse CI integration
- Staging environment

### Monitoring

**Missing**:

- Uptime monitoring
- Performance alerting
- Error rate tracking
- Deployment rollback strategy

## Priority Matrix

### High Priority (Next Sprint)

1. Implement actual premium features
2. Add proper error boundaries
3. Enhance mobile UX

### Medium Priority (Next Quarter)

1. Backend API development
2. Performance optimizations
3. Enhanced analytics

### Low Priority (Backlog)

1. Fix test warnings
2. PWA implementation
3. Storybook setup
4. MCP settings cleanup

## Notes for Future Developers

- All technical debt items are documented but non-blocking
- The application is production-ready despite these items
- Prioritize based on user feedback and business needs
- Consider addressing related items together for efficiency

---

**Remember**: Technical debt is normal and manageable. This log ensures transparency and helps with planning future improvements.
