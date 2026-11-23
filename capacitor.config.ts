import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.eurobeat.driftlegend',
  appName: 'Eurobeat Drift Legend',
  webDir: 'dist',
  android: {
    backgroundColor: '#0b1026',
    allowMixedContent: false,
    captureInput: true,
  },
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 800,
      launchAutoHide: true,
      launchFadeOutDuration: 120,
      backgroundColor: '#0b1026',
      splashImmersive: true,
      splashFullScreen: true,
      androidScaleType: 'CENTER_INSIDE',
      showSpinner: false,
    },
  },
};

export default config;
