const fs = require('fs');
const path = require('path');

const createWidgetDir = (widgetsDistPath, widget) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(`${widgetsDistPath}\\${widget}`, (err) => {
            if (err) {
                reject(err);
            }

            resolve();
        })
    })
}

function copyFolderSync(from, to) {
    fs.mkdirSync(to);
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}

const copyFolder = async (srcPath, destPath) => {
    copyFolderSync(srcPath, destPath);
};

const copyWidgetToDist = async (widgetsPath, widgetsDistPath, widgets) => {
    fs.mkdirSync(`${widgetsDistPath}\\sl`);

    for (const widgetIndex in widgets) {
        const widget = widgets[widgetIndex];
        const srcWidgetPackagePath = `${widgetsPath}\\${widget}\\dist\\tmp\\widgets`;
        const srcWidgetPath = `${widgetsPath}\\${widget}\\dist\\tmp\\widgets\\sl\\${widget}`;

        const destWidgetPackagePath = `${widgetsDistPath}\\${widget}`;
        const destWidgetPath = `${widgetsDistPath}\\sl\\${widget}`;


        await copyFolder(srcWidgetPackagePath, destWidgetPackagePath);
        await copyFolder(srcWidgetPath, destWidgetPath);
    }
}

module.exports = copyWidgetToDist;