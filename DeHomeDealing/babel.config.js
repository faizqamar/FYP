module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json",
        ],
        alias: {
          "@hocs": "./app/screens/private/hoc",
          "@hooks": "./app/screens/private/hooks",
          "@styles": "./app/styles/index.ts",
          "@components": "./app/components",
          "@TranslationProvider": "./app/screens/TranslationProvider.tsx",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
