# Project Context: CollegeScam.io (formerly PathwiseROI)

## Current Status: v1.4.3 - Bug Fixes Complete

- Fixed white text visibility issues on how-it-works page
- Improved PathBuilder state management for education type selection
- Fixed state synchronization when using comparison cards
- Better handling of input clearing and reset functionality

## Recent Changes

### v1.4.3 (Jan 18, 2025)

- Fixed text color issues on how-it-works page (headings now properly colored)
- Improved PathBuilder component state management
- Fixed education type selection bug that prevented dropdown from working
- Fixed comparison cards state updates (title now updates correctly)
- Better state synchronization between inputs and local state

### v1.4.0 (Jan 18, 2025)

- Complete rebrand from PathwiseROI to CollegeScam.io
- New aggressive truth-focused messaging throughout
- Updated all page titles and metadata
- Changed favicon and branding elements
- Maintained all v1.3 features and fixes

### v1.3.0 Features

- Phase 3 components: Loan Payment Calculator, Career Trajectory Chart, AI Risk Indicator
- Comprehensive test coverage with 76 passing tests
- Premium features and modal
- Responsive design with mobile support
- Analytics integration
- Enhanced user experience

## Key Components

### Core Calculator

- `app/page.tsx` - Main landing page with calculator
- `components/path-builder.tsx` - Education path selection (FIXED IN v1.4.3)
- `components/roi-timeline.tsx` - ROI visualization chart
- `lib/calculator.ts` - Core calculation logic
- `lib/data.json` - Education paths database

### Phase 3 Components

- `components/loan-payment-calculator.tsx` - Student loan analysis
- `components/career-trajectory-chart.tsx` - Career progression visualization
- `components/ai-risk-indicator.tsx` - AI job displacement risk assessment

### Support Pages

- `app/how-it-works/page.tsx` - Explanation page (FIXED TEXT COLOR IN v1.4.3)
- `app/privacy/page.tsx` - Privacy policy
- `app/terms/page.tsx` - Terms of service

## Tech Stack

- Next.js 15.2.4
- React 19
- TypeScript
- Tailwind CSS
- Recharts for visualizations
- Framer Motion for animations
- Jest & React Testing Library

## Testing

- 76 tests passing across 6 test suites
- Coverage for calculator logic, validation, and all major components
- No failing tests

## Deployment

- Hosted on Vercel
- URL: https://pathwise-roi.vercel.app
- GitHub: https://github.com/zandy2test/pathwise-roi

## Known Issues

- None currently (all reported issues fixed in v1.4.3)

## Development Commands

```bash
npm run dev      # Start development server
npm test         # Run tests
npm run build    # Build for production
npm run lint     # Run linting
```

## Next Steps

- Monitor user feedback for any additional issues
- Consider implementing saved calculations feature
- Expand education path database
- Add more detailed career progression data

## Contact

For issues or questions, use the /reportbug command in the chat.

---

Last Updated: January 18, 2025 (v1.4.3)
