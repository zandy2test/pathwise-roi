# PathwiseROI 🎓💰

Calculate when your education investment pays off. Compare college degrees, trade schools, bootcamps, and work paths to find your optimal education ROI.

## 🚀 Live Demo

Visit [pathwiseroi.com](https://pathwiseroi.com) (coming soon)

## 📚 Overview

PathwiseROI is an education investment calculator that helps students and parents make data-driven decisions about education paths. It calculates the break-even point for different education investments and provides clear, actionable insights.

### Key Features

- **ROI Calculator**: Calculate when your education investment breaks even with 10-year projections
- **Path Comparison**: Compare multiple education paths side-by-side with winner determination
- **Timeline Visualization**: Interactive graphs showing your journey from debt to profitability
- **Share Cards**: Generate beautiful social media cards (1200x630px) to share your results
- **Real Data**: Based on actual salary data and education costs for 20+ paths
- **Location Intelligence**: Salary adjustments for 30+ cities
- **Mobile Responsive**: Works perfectly on all devices
- **Analytics**: Comprehensive event tracking and conversion monitoring

## 🛠 Tech Stack

- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Radix UI (via shadcn/ui)
- **Graphs**: Recharts for timeline visualizations
- **Deployment**: Vercel
- **Analytics**: Custom analytics system + Vercel Analytics ready

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/zandy2test/pathwise-roi.git
   cd pathwise-roi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next

3. **Environment Variables**
   Add any required environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_GA_ID` (optional, for Google Analytics)

4. **Deploy**
   Click "Deploy" and Vercel will build and deploy your application

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
pathwise-roi/
├── app/                   # Next.js app directory
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Single-page application (all modes)
│   ├── privacy/          # Privacy policy page
│   ├── terms/            # Terms of service page
│   ├── how-it-works/     # How it works guide
│   └── sitemap.ts        # Sitemap generation
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── path-builder.tsx # Reusable form component
│   ├── roi-timeline.tsx # Timeline graph component
│   ├── share-card.tsx   # Canvas share card generator
│   └── footer.tsx       # Site footer
├── lib/                 # Utility functions
│   ├── calculator.ts    # ROI calculation logic
│   ├── analytics.ts     # Analytics tracking system
│   ├── validation.ts    # Form validation
│   ├── data.json       # Education paths data
│   └── types.ts        # TypeScript interfaces
├── public/             # Static assets
└── vercel.json         # Vercel configuration
```

## 🔧 Configuration

### SEO & Metadata

Edit `app/layout.tsx` to update:
- Site title and description
- Open Graph images
- Twitter cards
- Meta keywords

### Data Sources

Education paths and salary data are stored in `lib/data.json`. Update this file to:
- Add new education paths
- Modify salary ranges
- Update location multipliers
- Change school tiers

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run automated tests with Vitest

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Built with ❤️ for students everywhere
