module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.keep_fnames = true;
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/scss/_variables.scss";',
      },
    },
  },
};
