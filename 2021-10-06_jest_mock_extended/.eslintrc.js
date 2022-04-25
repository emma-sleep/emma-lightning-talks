module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint/eslint-plugin"],
    extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    rules: {
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                vars: "all",
                args: "all",
                ignoreRestSiblings: true,
            },
        ],
        "@typescript-eslint/interface-name-prefix": "off",
        "max-len": [
            "error",
            {
                code: 150,
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                ignoreStrings: true,
            },
        ],
    },
};
