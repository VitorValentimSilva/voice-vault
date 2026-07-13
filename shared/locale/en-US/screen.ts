const screen = {
  notFound: {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
  },
  errorBoundary: {
    title: 'An Error Occurred',
    description: 'Something went wrong and the app was unable to complete this action.',
    persistentErrorHint: 'If this continues to happen, please contact support for assistance.',
  },
  splash: {
    title: 'Welcome to Voice Vault',
    description: 'The most secure voice recording app in the world.',
  },
} as const;

export default screen;
