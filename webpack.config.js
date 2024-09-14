const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    // ... existing configuration ...
    plugins: [
        new NodePolyfillPlugin(),
        // ... other plugins ...
    ],
    resolve: {
        fallback: {
            fs: false, // Ignore fs module
            // ... other fallbacks if needed ...
        },
    },
    // ... existing configuration ...
};
