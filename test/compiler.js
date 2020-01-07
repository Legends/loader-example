import path from 'path';

import webpack from 'webpack';

// eslint-disable-next-line import/no-extraneous-dependencies
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
                    options
                }
            }]
        }
    });

    // eslint-disable-next-line line-comment-position
    // eslint-disable-next-line new-cap    
    compiler.outputFileSystem = new memoryfs();

    return new Promise((resolve, reject) => {
        // runs webpack using the config above
        compiler.run((err, stats) => {
            if (err) reject(err);
            if (stats.hasErrors()) reject(new Error(stats.toJson().errors));

            resolve(stats);
        });
    });
};