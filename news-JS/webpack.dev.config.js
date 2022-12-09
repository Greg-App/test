/* eslint @typescript-eslint/no-var-requires: "off" */
//import path from 'path';
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
    },
};
