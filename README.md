# PathwiseROI 🎓💰

> **"Welders make more than lawyers until age 35"** - Find out when your education actually pays off.

## What is PathwiseROI?

PathwiseROI is an education ROI calculator that reveals the true payback time of different career paths. It cuts through traditional assumptions about education with data-driven comparisons that often surprise users.

### Key Features
- **Instant ROI Calculation**: Compare 50+ career paths across education types
- **Doubt Score™**: Honest risk assessment for each path
- **Visual Timeline**: See your debt-to-profit journey
- **Shareable Comparisons**: Generate viral comparison cards
- **No BS Approach**: Real data, uncomfortable truths

## Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS
- **Hosting**: Vercel
- **Analytics**: Mixpanel, Supabase
- **Payments**: Stripe Payment Links
- **PDF Generation**: React-to-PDF

## Project Status

🚧 **Pre-Launch Phase** - Building MVP for 72-hour validation sprint

### Current Progress
- ✅ Project architecture and planning complete
- ✅ Data structures defined
- ✅ UI/UX flow designed
- 🔄 Implementation in progress
- ⏳ Launch targeted for next week

## Quick Start

```bash
# Clone the repository
git clone https://github.com/[your-username]/pathwise-roi.git
cd pathwise-roi

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Run development server
npm run dev

# Open http://localhost:3000
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Analytics
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PAYMENTS=false
```

## Documentation

- [Implementation Plan](./implementation-plan.md) - Technical roadmap
- [Design Guidelines](./design-guidelines.md) - UI/UX principles
- [App Flow](./app-flow-and-pages.md) - User journey and page structure
- [Data Structure](./data-structure-consolidated.json) - Core data models
- [Quick Start Guide](./QUICKSTART.md) - Development setup

## The Hypothesis

**"People will use and share a tool that shows education payback time with controversial comparisons"**

Success Metrics (72-hour validation):
- 5,000+ users
- 15%+ share rate
- 10+ payments

## Core Calculations

The app analyzes:
- Total education costs (tuition + living + opportunity cost)
- Career earning trajectories
- Time to breakeven
- 10-year wealth projections
- Risk factors ("Doubt Score")

## Disclaimer

This tool provides estimates based on aggregated data. Individual results vary significantly. Not financial advice. Always consider multiple factors when making education decisions.

## Contributing

This is currently a solo MVP sprint. Post-launch, contributions will be welcome via:
- Bug reports
- Feature suggestions
- Data accuracy improvements
- UI/UX enhancements

## License

MIT License - See [LICENSE](./LICENSE) file

## Contact

- GitHub: [@[your-username]](https://github.com/[your-username])
- Project URL: [Coming Soon]

---

**Mission:** Build and launch a viral education ROI calculator in one weekend to validate demand.

**Philosophy:** Ship beats perfect. Controversy beats safe. Speed beats strategy. Data beats opinions.

🚀 *Ready to reveal uncomfortable truths about education ROI*
