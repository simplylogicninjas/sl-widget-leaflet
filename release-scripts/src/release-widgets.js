const { exec } = require("child_process");

// npm --prefix ..\widgets\sLAnnotations\ run release

const executeReleaseScript = (widgetsPath, widgetName) => {
    return new Promise((resolve, reject) => {
        const npmCommand = exec(`npm --prefix ${widgetsPath}\\${widgetName}\\ run build`, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }

            if (stderr) {
                reject(stderr);
            }
        })

        npmCommand.on('exit', () => resolve());
    })
}


const releaseWidgets = (widgetsPath, widgets) => {
    return new Promise(async (resolve, reject) => {
        for (const widget of widgets) {
            try {
                await executeReleaseScript(widgetsPath, widget);

                console.log(`${widget} released`);
            } catch (err) {
                reject(err);
            }
        }

        resolve();
    })
}

module.exports = releaseWidgets;