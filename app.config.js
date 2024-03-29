import 'dotenv/config'; // this import automatically merges environment variables from .env file with process.env

export default {
  expo: {
    name: 'umi-feeds-app',
    slug: 'umi-feeds-app',
    version: '1.0.1',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'umifeeds',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      '**/*'
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'org.bitsofgood.umifeeds',
      buildNumber: '1.0.1'
    },
    android: {
      package: 'org.bitsofgood.umifeeds',
      versionCode: 2,
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#FFFFFF'
      },
      config: {
        googleMaps: {
          apiKey: 'AIzaSyCzsET6HCV4T5y-xd8DEHabQETMvGp33hc'
        }
      },
      useNextNotificationsApi: true
    },
    web: {
      favicon: './assets/images/favicon.png'
    },
    extra: {
      AXIOS_BASEURL: process.env.AXIOS_BASEURL,
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    }
  }
};
