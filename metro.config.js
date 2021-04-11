/* eslint-disable @typescript-eslint/no-var-requires */
// "Cannot use import statement outside a module", so we have to use require
// This code is for react-native-svg-transformer: https://github.com/kristerkari/react-native-svg-transformer
const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig(__dirname);
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer')
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg']
    }
  };
})();
