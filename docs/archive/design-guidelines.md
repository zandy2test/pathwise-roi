# PathwiseROI - Design Guidelines
*Visual System for Viral Education Calculator*

## Design Philosophy

**Core Principles:**
1. **Controversial but Credible** - Bold claims with professional presentation
2. **Screenshot-Optimized** - Every result should look good when shared
3. **Trust Through Transparency** - Show the doubt, build the trust
4. **Speed Over Beauty** - Fast loading trumps perfect pixels

---

## Color System

### Primary Palette
```css
/* Brand Colors */
--primary-blue: #2563EB;      /* Trustworthy, educational */
--primary-dark: #1E40AF;      /* Hover states, emphasis */
--primary-light: #60A5FA;     /* Backgrounds, subtle elements */

/* Semantic Colors */
--success-green: #10B981;     /* Profitable, positive outcomes */
--warning-yellow: #F59E0B;    /* Caution, medium doubt */
--danger-red: #EF4444;        /* High risk, negative ROI */
--info-purple: #8B5CF6;       /* Tips, additional info */

/* Neutral Palette */
--gray-900: #111827;          /* Primary text */
--gray-700: #374151;          /* Secondary text */
--gray-500: #6B7280;          /* Muted text, borders */
--gray-300: #D1D5DB;          /* Dividers, subtle borders */
--gray-100: #F3F4F6;          /* Backgrounds */
--white: #FFFFFF;             /* Cards, primary background */

/* Special Effects */
--gradient-primary: linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%);
--gradient-profit: linear-gradient(135deg, #10B981 0%, #34D399 100%);
--gradient-debt: linear-gradient(135deg, #EF4444 0%, #F87171 100%);
```

### Doubt Score Colors
```css
/* Risk Level Gradients */
--doubt-low: #10B981;        /* Score 1-3: Safe bet */
--doubt-medium: #F59E0B;     /* Score 4-6: Proceed with caution */
--doubt-high: #EF4444;       /* Score 7-10: High risk */
```

---

## Typography

### Font Stack
```css
/* Headings - Controversial & Bold */
--font-display: 'Clash Display', 'Inter', system-ui, sans-serif;

/* Body Text - Clean & Readable */
--font-body: 'Inter', system-ui, -apple-system, sans-serif;

/* Numbers - Monospace for Calculations */
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
```

### Type Scale
```css
/* Desktop Sizes */
.text-hero {
  font-size: 72px;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.text-h1 {
  font-size: 48px;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.text-h2 {
  font-size: 36px;
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.text-h3 {
  font-size: 24px;
  line-height: 1.4;
  font-weight: 600;
}

.text-body-lg {
  font-size: 18px;
  line-height: 1.6;
  font-weight: 400;
}

.text-body {
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
}

.text-small {
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
}

.text-micro {
  font-size: 12px;
  line-height: 1.4;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Mobile Responsive (reduce by ~20%) */
@media (max-width: 768px) {
  .text-hero { font-size: 48px; }
  .text-h1 { font-size: 36px; }
  .text-h2 { font-size: 28px; }
  .text-h3 { font-size: 20px; }
}
```

---

## Component Specifications

### Buttons

#### Primary Button (CTA)
```css
.btn-primary {
  /* Sizing */
  padding: 16px 32px;
  min-width: 200px;
  height: 56px;
  
  /* Style */
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
  
  /* Hover */
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px rgba(37, 99, 235, 0.3);
  }
  
  /* Active */
  &:active {
    transform: translateY(0);
  }
}
```

#### Secondary Button
```css
.btn-secondary {
  padding: 14px 28px;
  height: 48px;
  background: white;
  color: var(--primary-blue);
  border: 2px solid var(--primary-blue);
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--primary-light);
    background-opacity: 0.1;
  }
}
```

#### Share Button
```css
.btn-share {
  padding: 12px 24px;
  height: 44px;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: 22px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  /* Share Icon */
  svg {
    width: 18px;
    height: 18px;
  }
}
```

### Input Fields

```css
.input-field {
  /* Container */
  .input-wrapper {
    position: relative;
    margin-bottom: 24px;
  }
  
  /* Label */
  .input-label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: var(--gray-700);
  }
  
  /* Input */
  .input {
    width: 100%;
    padding: 14px 16px;
    font-size: 16px;
    border: 2px solid var(--gray-300);
    border-radius: 10px;
    background: white;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
    
    &:hover {
      border-color: var(--gray-500);
    }
  }
  
  /* Help Text */
  .input-help {
    margin-top: 6px;
    font-size: 13px;
    color: var(--gray-500);
  }
}
```

### Dropdowns

```css
.dropdown {
  /* Select Element */
  .select {
    width: 100%;
    padding: 14px 40px 14px 16px;
    font-size: 16px;
    border: 2px solid var(--gray-300);
    border-radius: 10px;
    background: white;
    appearance: none;
    cursor: pointer;
    transition: all 0.2s ease;
    
    /* Custom Arrow */
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 20px;
    
    &:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
    
    &:hover {
      border-color: var(--gray-500);
    }
  }
}
```

### Cards

#### Result Card
```css
.result-card {
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--gray-200);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
}
```

#### Share Card (Social Media Preview)
```css
.share-card {
  width: 1200px;
  height: 630px;
  padding: 60px;
  background: var(--gradient-primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  
  .share-headline {
    font-size: 64px;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 24px;
  }
  
  .share-comparison {
    font-size: 32px;
    font-weight: 400;
    opacity: 0.9;
  }
}
```

### Doubt Score Component

```css
.doubt-score {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: var(--gray-100);
  border-radius: 12px;
  border-left: 4px solid;
  
  /* Dynamic border color based on score */
  &.doubt-low { border-left-color: var(--doubt-low); }
  &.doubt-medium { border-left-color: var(--doubt-medium); }
  &.doubt-high { border-left-color: var(--doubt-high); }
  
  .doubt-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
    
    /* Dynamic background based on score */
    &.low { background: var(--doubt-low); }
    &.medium { background: var(--doubt-medium); }
    &.high { background: var(--doubt-high); }
  }
  
  .doubt-text {
    flex: 1;
    
    .doubt-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--gray-500);
      margin-bottom: 4px;
    }
    
    .doubt-message {
      font-size: 16px;
      font-weight: 500;
      color: var(--gray-900);
    }
  }
}
```

### Timeline Visualization

```css
.timeline {
  position: relative;
  height: 120px;
  margin: 40px 0;
  
  .timeline-track {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gray-300);
    transform: translateY(-50%);
  }
  
  .timeline-progress {
    position: absolute;
    top: 50%;
    left: 0;
    height: 4px;
    transform: translateY(-50%);
    transition: width 1s ease;
    
    /* Debt period (red) */
    &.debt {
      background: var(--gradient-debt);
    }
    
    /* Profit period (green) */
    &.profit {
      background: var(--gradient-profit);
    }
  }
  
  .timeline-marker {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    
    .marker-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: white;
      border: 3px solid var(--primary-blue);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .marker-label {
      position: absolute;
      top: -40px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
    }
    
    .marker-value {
      position: absolute;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 18px;
      font-weight: bold;
      font-family: var(--font-mono);
    }
  }
}
```

### Paywall Modal

```css
.paywall-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  
  .paywall-content {
    width: 90%;
    max-width: 600px;
    padding: 48px;
    background: white;
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    
    .paywall-header {
      text-align: center;
      margin-bottom: 32px;
      
      .paywall-title {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 12px;
      }
      
      .paywall-price {
        font-size: 48px;
        font-weight: 800;
        color: var(--primary-blue);
        margin-bottom: 8px;
      }
      
      .paywall-subtitle {
        font-size: 16px;
        color: var(--gray-600);
      }
    }
    
    .paywall-features {
      margin: 32px 0;
      
      .feature-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 0;
        
        .feature-icon {
          width: 24px;
          height: 24px;
          color: var(--success-green);
        }
        
        .feature-text {
          font-size: 16px;
          color: var(--gray-700);
        }
      }
    }
  }
}
```

---

## Layout System

### Spacing Scale
```css
/* Base unit: 4px */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
```

### Container Widths
```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--space-4);
  
  &.container-sm { max-width: 640px; }
  &.container-md { max-width: 768px; }
  &.container-lg { max-width: 1024px; }
  &.container-xl { max-width: 1280px; }
}
```

### Grid System
```css
.grid {
  display: grid;
  gap: var(--space-6);
  
  &.grid-2 { grid-template-columns: repeat(2, 1fr); }
  &.grid-3 { grid-template-columns: repeat(3, 1fr); }
  &.grid-4 { grid-template-columns: repeat(4, 1fr); }
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    &.grid-2, &.grid-3, &.grid-4 {
      grid-template-columns: 1fr;
    }
  }
}
```

---

## Animation & Transitions

### Hover Effects
```css
/* Standard hover transitions */
.hover-lift {
  transition: transform 0.2s ease;
  &:hover { transform: translateY(-2px); }
}

.hover-scale {
  transition: transform 0.2s ease;
  &:hover { transform: scale(1.05); }
}

.hover-shadow {
  transition: box-shadow 0.2s ease;
  &:hover { box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); }
}
```

### Loading States
```css
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--gray-300);
  border-top-color: var(--primary-blue);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--gray-200) 25%,
    var(--gray-100) 50%,
    var(--gray-200) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### Number Animations
```css
.number-animate {
  animation: countUp 0.5s ease-out;
}

@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Responsive Breakpoints

```css
/* Mobile First Approach */
@media (min-width: 640px) { /* Small tablets */ }
@media (min-width: 768px) { /* Tablets */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large desktop */ }
```

---

## Accessibility Guidelines

1. **Color Contrast**
   - Text on background: minimum 4.5:1 ratio
   - Large text: minimum 3:1 ratio
   - Interactive elements: minimum 3:1 ratio

2. **Focus States**
   ```css
   :focus-visible {
     outline: 2px solid var(--primary-blue);
     outline-offset: 2px;
   }
   ```

3. **Touch Targets**
   - Minimum size: 44x44px
   - Spacing between targets: 8px minimum

4. **Motion Preferences**
   ```css
   @media (prefers-reduced-motion: reduce) {
     * {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

---

## Dark Mode (Post-MVP)
*Not implemented in MVP, but color system is prepared for future dark mode support*

---

*These guidelines prioritize shareability and viral potential. Every component should look good in a screenshot.*
