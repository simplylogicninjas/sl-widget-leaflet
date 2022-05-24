const fs = require('fs');

const getWidgetDirectories = (widgetsPath) => {
    return new Promise((resolve, reject) => {
        fs.readdir(widgetsPath, (err, files) => {
            if (err) {
                reject(err);
            }

            resolve(files);
        })
    })
}

module.exports = getWidgetDirectories;