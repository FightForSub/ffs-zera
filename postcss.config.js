module.exports = ({ file, options, env }) => {
    return {
        plugins: {
            "postcss-import": { root: file.dirname },
            "postcss-flexbugs-fixes": true,
            "postcss-normalize": true,
            "postcss-preset-env": {
                stage: 3,
                features: {
                    "nesting-rules": true
                }
            },
            cssnano: env === "production" ? { preset: "default" } : false
        }
    };
};
