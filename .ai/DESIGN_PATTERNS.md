# PathwiseROI Design Patterns - Nexty.dev Inspired

## 🎨 Visual Language

### Gradients

- **Primary:** Blue to Purple gradient for headers and CTAs
- **Success:** Green to Emerald for positive ROI
- **Warning:** Amber to Orange for premium features
- **Error:** Red to Rose for negative values

### Animations

- **Gradient Flow:** 5s smooth infinite loop for text
- **Number Ticker:** Spring physics for counting animations
- **Shimmer Button:** Subtle shimmer on hover for CTAs
- **Fade In:** Stagger children with 0.1s delay

### Typography

- **Hero:** 4xl-6xl with gradient text
- **Section Headers:** 2xl-3xl bold
- **Body:** base/lg with 1.6 line height
- **Numbers:** Tabular nums for consistency

## 🧩 Component Patterns

### Hero Section

```tsx
<AnimatedGradientHeading>
  Calculate Your Education ROI
</AnimatedGradientHeading>
<CTAButton onClick={navigate}>
  Start Calculating →
</CTAButton>
```

### ROI Display

```tsx
<ROITicker value={calculatedROI} prefix="$" suffix="" delay={0.5} />
```

### Premium CTAs

```tsx
<PremiumButton>Unlock Premium Features</PremiumButton>
```

## 🎯 Interaction Patterns

### Hover States

- Scale 105% on buttons
- Brightness 125% on hover
- Shadow expansion
- Gradient position shift

### Loading States

- Skeleton shimmer
- Pulse animation
- Progressive number counting

### Success States

- Green gradient flash
- Check mark animation
- Confetti burst (optional)

## 📱 Responsive Patterns

### Mobile First

- Stack elements vertically
- Full-width buttons
- Larger touch targets (min 44px)
- Simplified animations

### Desktop Enhancements

- Side-by-side comparisons
- Hover interactions
- Parallax effects
- Advanced animations

## 🎭 Emotional Design

### Trust Building

- Professional gradients
- Smooth animations
- Clear typography
- Consistent spacing

### Engagement

- Interactive number tickers
- Animated buttons
- Progress indicators
- Micro-interactions

### Conversion

- Prominent CTAs
- Urgency indicators
- Social proof
- Value highlighting

## 🚀 Performance Guidelines

### Animation Performance

- Use CSS transforms only
- GPU-accelerated properties
- Will-change hints sparingly
- RequestAnimationFrame for JS

### Bundle Optimization

- Import only needed components
- Lazy load heavy animations
- Tree-shake unused code
- Minimize animation libraries

## 💡 Usage Examples

### Landing Page Hero

```tsx
<section className="min-h-screen flex flex-col items-center justify-center">
  <AnimatedGradientText className="mb-4">New: AI-Powered Insights</AnimatedGradientText>
  <AnimatedGradientHeading className="text-center mb-8">
    Your Education, Your Future, Your ROI
  </AnimatedGradientHeading>
  <CTAButton onClick={startJourney}>Calculate Your Path</CTAButton>
</section>
```

### Results Display

```tsx
<div className="grid gap-8">
  <Card className="p-8">
    <h3 className="text-xl mb-4">10-Year ROI</h3>
    <ROITicker value={roi} prefix="+" suffix="%" />
  </Card>
  <Card className="p-8">
    <h3 className="text-xl mb-4">Net Worth</h3>
    <NumberTicker value={netWorth} prefix="$" />
  </Card>
</div>
```

### Premium Upsell

```tsx
<div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-xl">
  <h2 className="text-2xl font-bold mb-4">Unlock Advanced Features</h2>
  <ul className="mb-6">
    <li>✨ Personalized recommendations</li>
    <li>📊 Detailed analytics</li>
    <li>🎯 Career path optimization</li>
  </ul>
  <PremiumButton className="w-full">Start Free Trial</PremiumButton>
</div>
```

## 🎨 Color Palette

### Primary

- Blue 600: #2563eb
- Purple 600: #9333ea
- Gradient: from-blue-600 via-purple-600 to-blue-600

### Success

- Green 600: #16a34a
- Emerald 600: #059669
- Gradient: from-green-600 to-emerald-600

### Premium

- Amber 500: #f59e0b
- Yellow 500: #eab308
- Gradient: from-amber-500 to-yellow-500

### Neutral

- Background: white/slate-50
- Text: slate-900
- Muted: slate-500

## 🔧 Technical Notes

### Component Structure

- Use 'use client' for interactive components
- Export multiple variants from single file
- Provide sensible defaults
- Accept className overrides

### Animation Timing

- Entrance: 0.3-0.5s ease-out
- Hover: 0.2-0.3s ease
- Continuous: 3-5s infinite
- Spring: damping 50-60, stiffness 90-100

### Accessibility

- Respect prefers-reduced-motion
- Maintain color contrast ratios
- Provide focus states
- Include ARIA labels

---

**Reference:** Nexty.dev aesthetic with PathwiseROI branding
**Updated:** August 14, 2025
