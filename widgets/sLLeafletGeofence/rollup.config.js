import typescript from "@rollup/plugin-typescript";

export default args => {
    const result = args.configDefaultConfig;

    result.forEach(config => {
        const plugins = config.plugins || [];

        plugins.push(
            typescript({
                include: [
                    './**/*.ts+(|x)',
                    '../../shared/types/*.ts'
                ],
                noEmitOnError: !args.watch,
                sourceMap: config.sourceMaps,
                inlineSources: config.sourceMaps,
                target: "es2019"
            })
        )

        config.inlineDynamicImports = true;
    })

    return result;
}