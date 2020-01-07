import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs'; 


//  #########################################   THIS IS A DYNAMIC WEBPACK.CONFIG WITH LOADER OPTIONS SPECIFIED

export default (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.txt$/,
        use: {
          loader: path.resolve(__dirname, '../src/loader.js'),
          options: options
        }
      }]
    }
  });

  compiler.outputFileSystem = new memoryfs(); // In-memory filesystem

  return new Promise((resolve, reject) => {
    // runs webpack using the config above
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(new Error(stats.toJson().errors));

      resolve(stats);
    });
  });
};