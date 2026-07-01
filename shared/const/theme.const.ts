import { DarkTheme, DefaultTheme } from 'expo-router/react-navigation';

export const THEME = {
  light: {
    background: 'hsl(252 100% 98%)',
    foreground: 'hsl(252 34% 13%)',

    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(252 34% 13%)',

    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(252 34% 13%)',

    primary: 'hsl(256 72% 56%)',
    primaryForeground: 'hsl(0 0% 100%)',

    secondary: 'hsl(252 100% 95%)',
    secondaryForeground: 'hsl(252 34% 13%)',

    muted: 'hsl(252 100% 96%)',
    mutedForeground: 'hsl(252 15% 44%)',

    accent: 'hsl(173 100% 24%)',
    accentForeground: 'hsl(0 0% 100%)',

    destructive: 'hsl(0 72% 51%)',
    destructiveForeground: 'hsl(0 0% 100%)',

    border: 'hsl(252 35% 89%)',
    input: 'hsl(252 35% 89%)',
    ring: 'hsl(256 72% 56%)',

    radius: '0.875rem',

    backgroundDeep: 'hsl(252 100% 96%)',
    surfaceElevated: 'hsl(0 0% 100%)',
    surfaceHover: 'hsl(252 100% 97%)',
    tabBar: 'hsl(0 0% 100%)',

    inputBg: 'hsl(252 100% 99%)',
    inputPlaceholder: 'hsl(252 12% 54%)',
    inputFocusBorder: 'hsl(256 72% 56%)',

    success: 'hsl(142 76% 30%)',
    successForeground: 'hsl(0 0% 100%)',

    warning: 'hsl(38 92% 33%)',
    warningForeground: 'hsl(0 0% 100%)',

    info: 'hsl(196 85% 35%)',
    infoForeground: 'hsl(0 0% 100%)',

    iconDefault: 'hsl(252 10% 54%)',
    iconActive: 'hsl(256 72% 56%)',

    recording: 'hsl(0 72% 51%)',
    recordingBg: 'hsl(0 72% 51%)',

    waveformBar: 'hsl(256 72% 56%)',
    waveformBarActive: 'hsl(173 100% 24%)',
    waveformTrack: 'hsl(252 100% 94%)',

    progressTrack: 'hsl(252 30% 90%)',
    progressFill: 'hsl(256 72% 56%)',
    progressWarn: 'hsl(38 92% 33%)',
    progressCritical: 'hsl(0 72% 51%)',

    skeletonBase: 'hsl(252 100% 96%)',
    skeletonShimmer: 'hsl(252 30% 90%)',

    overlay: 'rgba(29, 26, 43, 0.72)',

    avatarBg: 'hsl(252 100% 96%)',
    avatarText: 'hsl(256 72% 42%)',
    avatarOnline: 'hsl(142 76% 30%)',

    planPro: 'hsl(35 95% 33%)',
    planProSoftBg: 'rgba(199, 125, 0, 0.12)',
    planFree: 'hsl(256 72% 56%)',
    planFreeSoftBg: 'rgba(107, 63, 224, 0.12)',

    transcriptText: 'hsl(252 34% 13%)',
    transcriptTimestamp: 'hsl(252 15% 44%)',
    transcriptHighlight: 'hsl(256 72% 56%)',
    transcriptSpeaker: 'hsl(252 100% 95%)',
    transcriptSpeakerText: 'hsl(256 72% 42%)',

    chart1: 'hsl(256 72% 56%)',
    chart2: 'hsl(173 100% 24%)',
    chart3: 'hsl(142 76% 30%)',
    chart4: 'hsl(38 92% 33%)',
    chart5: 'hsl(0 72% 51%)',

    logo: {
      bgStart: '#F2EEFF',
      bgEnd: '#DCE5FF',
      waveStart: '#6258FF',
      waveEnd: '#28C7B9',
      ellipseFill: 'rgba(98,88,255,0.05)',
      shieldFill: 'rgba(98,88,255,0.09)',
      shieldStroke: '#6258FF',
    },

    gradients: {
      screenBackground: ['#F8FAFF', '#EEF4FF', '#ECFBF8'],
      surface: ['#FFFFFF', '#F5F7FF'],
      hero: ['#6258FF', '#8B7DFF', '#28C7B9'],
      premium: ['#C47B11', '#E6A01E', '#FFD36A'],
      cardGlow: ['rgba(98,88,255,0.14)', 'rgba(40,199,185,0.10)'],
    },
  },

  dark: {
    background: 'hsl(251 44% 7%)',
    foreground: 'hsl(252 100% 96%)',

    card: 'hsl(251 38% 11%)',
    cardForeground: 'hsl(252 100% 96%)',

    popover: 'hsl(251 38% 11%)',
    popoverForeground: 'hsl(252 100% 96%)',

    primary: 'hsl(253 90% 70%)',
    primaryForeground: 'hsl(251 44% 7%)',

    secondary: 'hsl(255 35% 16%)',
    secondaryForeground: 'hsl(252 100% 96%)',

    muted: 'hsl(255 35% 16%)',
    mutedForeground: 'hsl(260 30% 60%)',

    accent: 'hsl(173 100% 35%)',
    accentForeground: 'hsl(251 44% 7%)',

    destructive: 'hsl(0 84% 50%)',
    destructiveForeground: 'hsl(0 0% 100%)',

    border: 'hsl(255 28% 21%)',
    input: 'hsl(255 28% 21%)',
    ring: 'hsl(253 90% 70%)',

    radius: '0.875rem',

    backgroundDeep: 'hsl(251 44% 5%)',
    surfaceElevated: 'hsl(251 38% 11%)',
    surfaceHover: 'hsl(255 35% 16%)',
    tabBar: 'hsl(251 38% 11%)',

    inputBg: 'hsl(251 38% 11%)',
    inputPlaceholder: 'hsl(260 22% 51%)',
    inputFocusBorder: 'hsl(253 90% 70%)',

    success: 'hsl(142 76% 30%)',
    successForeground: 'hsl(0 0% 100%)',

    warning: 'hsl(38 92% 33%)',
    warningForeground: 'hsl(0 0% 100%)',

    info: 'hsl(196 85% 35%)',
    infoForeground: 'hsl(0 0% 100%)',

    iconDefault: 'hsl(260 22% 51%)',
    iconActive: 'hsl(253 90% 70%)',

    recording: 'hsl(0 84% 50%)',
    recordingBg: 'hsl(0 84% 50%)',

    waveformBar: 'hsl(253 90% 70%)',
    waveformBarActive: 'hsl(173 100% 35%)',
    waveformTrack: 'hsl(255 35% 16%)',

    progressTrack: 'hsl(255 35% 16%)',
    progressFill: 'hsl(253 90% 70%)',
    progressWarn: 'hsl(38 92% 33%)',
    progressCritical: 'hsl(0 84% 50%)',

    skeletonBase: 'hsl(255 35% 16%)',
    skeletonShimmer: 'hsl(255 28% 21%)',

    overlay: 'rgba(6, 5, 16, 0.72)',

    avatarBg: 'hsl(255 28% 21%)',
    avatarText: 'hsl(253 90% 72%)',
    avatarOnline: 'hsl(142 76% 30%)',

    planPro: 'hsl(35 95% 33%)',
    planProSoftBg: 'rgba(199, 125, 0, 0.16)',
    planFree: 'hsl(253 90% 70%)',
    planFreeSoftBg: 'rgba(139, 110, 247, 0.16)',

    transcriptText: 'hsl(252 100% 96%)',
    transcriptTimestamp: 'hsl(260 30% 60%)',
    transcriptHighlight: 'hsl(253 90% 70%)',
    transcriptSpeaker: 'hsl(255 35% 16%)',
    transcriptSpeakerText: 'hsl(253 90% 72%)',

    chart1: 'hsl(253 90% 70%)',
    chart2: 'hsl(173 100% 35%)',
    chart3: 'hsl(142 76% 30%)',
    chart4: 'hsl(38 92% 33%)',
    chart5: 'hsl(0 84% 50%)',

    logo: {
      bgStart: '#1B1737',
      bgEnd: '#2C255E',
      waveStart: '#8B7DFF',
      waveEnd: '#2DD4BF',
      ellipseFill: 'rgba(179,156,255,0.07)',
      shieldFill: 'rgba(139,125,255,0.16)',
      shieldStroke: '#8B7DFF',
    },

    gradients: {
      screenBackground: ['#0B1020', '#11172C', '#071C1B'],
      surface: ['#12192B', '#0D1322'],
      hero: ['#8B7DFF', '#B59CFF', '#2DD4BF'],
      premium: ['#C77D1A', '#E39A26', '#FFD66B'],
      cardGlow: ['rgba(139,125,255,0.18)', 'rgba(45,212,191,0.12)'],
    },
  },
} as const;

export const NAV_THEME = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};

export type GradientKey = keyof typeof THEME.light.gradients;

export type ThemePreference = 'system' | 'light' | 'dark';

export const DEFAULT_THEME_PREFERENCE: ThemePreference = 'system';
