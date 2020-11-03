module.exports = {
  lintOnSave: false,
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    i18n: {
      locale: "en,fr",
      fallbackLocale: "en,fr",
      localeDir: "locales",
      enableInSFC: true
    }
  }
};
