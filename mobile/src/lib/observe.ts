import { Observe } from 'expo-observe';

export default Observe.configure({
  environment: process.env.APP_ENV || 'development',
  integrations: {
    'expo-router': true,
  },
  dispatchInDebug: __DEV__,
  sampleRate: 1,
  dispatchingEnabled: true,
});
