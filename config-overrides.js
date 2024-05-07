const {
  override,
  addBabelPlugin,
  addDecoratorsLegacy,
  addWebpackModuleRule,
  addWebpackPlugin,
} = require('customize-cra');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

module.exports = override(
  addBabelPlugin('@stylexjs/babel-plugin'),
  addWebpackModuleRule({
    test: /\.tsx$/,
    include: path.resolve(__dirname, 'src/shared/components'),
    use: ['babel-loader'],
  }),
  addWebpackModuleRule({
    test: /\.(cjs)$/,
    exclude: /@babel(?:\/|\\{1,2})runtime/,
    loader: require.resolve('babel-loader'),
    options: {
      babelrc: false,
      configFile: false,
      compact: false,
      presets: [
        [
          require.resolve('babel-preset-react-app/dependencies'),
          { helpers: true },
        ],
      ],
      cacheDirectory: true,
    },
  }),
  addDecoratorsLegacy(),
  process.env.ANALYZE &&
    addWebpackPlugin(
      new BundleAnalyzerPlugin({
        // Generates stats and starts a server to inspect the bundle on localhost
        analyzerMode: 'server',
        // Host on which `analyzerMode` server will start
        analyzerHost: '127.0.0.1',
        // Port on which `analyzerMode` server will start
        analyzerPort: 8888,
        // Automatically open the report in the default browser
        openAnalyzer: true,
        // Module sizes to show in report by default
        // Should be one of `stat`, `parsed` or `gzip`.
        // See https://webpack.js.org/configuration/stats/
        defaultSizes: 'parsed',
        // Automatically exclude assets from the report that match the specified pattern
        excludeAssets: (assetName) => /.*\.map$/.test(assetName),
        // Patterns that will be used to match against asset names to hide them from the report
        // eslint-disable-next-line no-dupe-keys
        excludeAssets: /\.(map|txt|html)$/,
        // Show a gzip size button on the toolbar that recalculates sizes accordingly
        enableGzip: true,
        // Generate a static HTML file with the bundle report
        reportFilename: 'report.html',
        // Bundle report will be generated in the same folder as bundle files
        reportTitle: 'Bundle Size Analysis',
        // Sort the modules by the specified field
        // Valid fields: 'id', 'name', 'size', 'chunks', 'chunkNames', 'emitted', 'rendered'
        sortBy: 'size',
        // Custom style overrides
        // You can pass valid CSS here as a string
        chartOptions: {
          // Color of the shared modules in the treemap
          sharedModulesColor: 'hsla(220, 50%, 50%, 0.7)',
          // Color of the warning sections
          warningSectionsColor: 'hsla(0, 100%, 50%, 0.5)',
        },
        // Show detailed information about each module when hovering over the treemap
        showModulePath: true,
        // You can use this to add some "cool" factor to your reports. For example:
        // Add a logo or change the title for something unique.
        transformReportHtml: (html) => {
          return html
            .replace(
              '</head>',
              '<style>.report-title { color: #4CAF50; }</style></head>',
            )
            .replace(
              /<title>.*<\/title>/,
              '<title>🚀 Bundle Analysis Report 📦</title>',
            );
        },
      }),
    ),
);
