const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },

        surface: {
          DEFAULT: 'hsl(var(--surface-elevated))',
          hover: 'hsl(var(--surface-hover))',
          deep: 'hsl(var(--background-deep))',
        },

        tabBar: 'hsl(var(--tab-bar))',

        inputBg: 'hsl(var(--input-bg))',
        inputPlaceholder: 'hsl(var(--input-placeholder))',
        inputFocusBorder: 'hsl(var(--input-focus-border))',

        iconDefault: 'hsl(var(--icon-default))',
        iconActive: 'hsl(var(--icon-active))',

        recording: {
          DEFAULT: 'hsl(var(--recording))',
          bg: 'hsl(var(--recording-bg))',
        },

        waveform: {
          bar: 'hsl(var(--waveform-bar))',
          active: 'hsl(var(--waveform-bar-active))',
          track: 'hsl(var(--waveform-track))',
        },

        progress: {
          track: 'hsl(var(--progress-track))',
          fill: 'hsl(var(--progress-fill))',
          warn: 'hsl(var(--progress-warn))',
          critical: 'hsl(var(--progress-critical))',
        },

        skeleton: {
          base: 'hsl(var(--skeleton-base))',
          shimmer: 'hsl(var(--skeleton-shimmer))',
        },

        overlay: 'hsl(var(--overlay))',

        avatar: {
          bg: 'hsl(var(--avatar-bg))',
          text: 'hsl(var(--avatar-text))',
          online: 'hsl(var(--avatar-online))',
        },

        plan: {
          pro: 'hsl(var(--plan-pro))',
          proSoftBg: 'hsl(var(--plan-pro-soft-bg))',
          free: 'hsl(var(--plan-free))',
          freeSoftBg: 'hsl(var(--plan-free-soft-bg))',
        },

        transcript: {
          text: 'hsl(var(--transcript-text))',
          timestamp: 'hsl(var(--transcript-timestamp))',
          highlight: 'hsl(var(--transcript-highlight))',
          speaker: 'hsl(var(--transcript-speaker))',
          speakerText: 'hsl(var(--transcript-speaker-text))',
        },

        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      borderWidth: {
        hairline: hairlineWidth(),
      },

      boxShadow: {
        soft: 'var(--shadow-soft)',
        glow: 'var(--shadow-glow)',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },

      fontFamily: {
        sans: ['PlusJakartaSans'],
      },

      fontWeight: {
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('tailwindcss-animate')],
};
