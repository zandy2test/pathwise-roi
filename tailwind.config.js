/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Premium Truth Engine Colors
        premium: {
          bg: {
            primary: "hsl(var(--color-background-primary))",
            secondary: "hsl(var(--color-background-secondary))",
          },
          accent: {
            primary: "hsl(var(--color-accent-primary))",
            secondary: "hsl(var(--color-accent-secondary))",
          },
          danger: "hsl(var(--color-danger-accent))",
          success: "hsl(var(--color-success-accent))",
          warning: "hsl(var(--color-warning-accent))",
          text: {
            primary: "hsl(var(--color-text-primary))",
            secondary: "hsl(var(--color-text-secondary))",
          },
          glass: "hsl(var(--color-glass-surface))",
          glow: {
            primary: "hsl(var(--color-glow))",
            secondary: "hsl(var(--color-glow-secondary))",
          }
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "gradient-flow": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        "shimmer-button": {
          "0%": {
            "background-position": "0% 0%",
          },
          "100%": {
            "background-position": "200% 0%",
          },
        },
        "aurora": {
          "0%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
          "100%": {
            "background-position": "0% 50%",
          },
        },
        "float": {
          "0%, 100%": {
            "transform": "translateY(0px)",
          },
          "50%": {
            "transform": "translateY(-20px)",
          },
        },
        "glow-pulse": {
          "0%, 100%": {
            "opacity": "1",
          },
          "50%": {
            "opacity": "0.5",
          },
        },
        "spotlight": {
          "0%": {
            "opacity": "0",
            "transform": "translate(-50%, -50%) scale(0.8)",
          },
          "100%": {
            "opacity": "1",
            "transform": "translate(-50%, -50%) scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient-flow": "gradient-flow 5s ease infinite",
        "shimmer-button": "shimmer-button var(--shimmer-duration) linear infinite",
        "aurora": "aurora 15s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "spotlight": "spotlight 0.5s ease-out",
      },
      backgroundImage: {
        "shimmer": "linear-gradient(105deg, transparent 40%, var(--shimmer-color) 50%, transparent 60%)",
      },
      backgroundSize: {
        "shimmer": "200% 100%",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("tailwindcss-animate")
  ],
}
