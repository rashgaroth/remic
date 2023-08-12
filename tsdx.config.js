const postcss = require('rollup-plugin-postcss');
const { uglify } = require('rollup-plugin-uglify');

module.exports = {
  rollup(config, options) {

    config.plugins.push(
      postcss({
        config: {
          path: './postcss.config.js',
        },
        extensions: ['.css'],
        minimize: true,
        inject: {
          insertAt: 'top',
        },
      })
    );
    config.plugins.push(
      uglify()
    )
    return config;
  },
};