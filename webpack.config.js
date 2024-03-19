const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const pages = ["index", "forms", "grids"];

const plugins = [];
pages.map((page) => {
    plugins.push(
        new HtmlWebpackPlugin({
            inject: true,
            template: __dirname + `/src/${page}.html`,
            filename: `${page}.html`,
            chunks: [page],
        })
    );
});

module.exports = {
    entry: pages.reduce((config, page) => {
        config[page] = __dirname + `/src/${page}.js`;
        return config;
    }, {}),
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};
