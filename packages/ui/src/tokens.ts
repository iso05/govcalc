export const tokens = {
  colors: {
    primary: {
      DEFAULT: '#0F172A', // Deep slate navy
      light: '#1E293B',
      dark: '#020617',
      hover: '#1E293B',
    },
    accent: {
      blue: '#2563EB',    // Royal blue accent
      emerald: '#059669', // Muted trust green
    },
    neutral: {
      white: '#FFFFFF',
      surface: '#F8FAFC', // Slate 50
      card: '#FFFFFF',
      border: '#E2E8F0',  // Slate 200
      borderSubtle: '#F1F5F9',
      textMain: '#0F172A', // Slate 900
      textMuted: '#64748B',// Slate 500
      textSubtle: '#94A3B8'// Slate 400
    },
    status: {
      verified: {
        bg: '#ECFDF5',
        text: '#065F46',
        border: '#A7F3D0',
      },
      review: {
        bg: '#FFFBEB',
        text: '#92400E',
        border: '#FDE68A',
      },
      conflict: {
        bg: '#FEF2F2',
        text: '#991B1B',
        border: '#FECACA',
      }
    },
    premium: {
      badgeBg: '#F8FAFC',
      badgeText: '#0F172A',
      badgeBorder: '#CBD5E1',
    }
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  }
} as const;
