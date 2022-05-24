const fs = require('fs');

const getDirectoryContents = (widgetsDistPath) => {
    return new Promise((resolve, reject) => {
        fs.readdir(widgetsDistPath, (err, files) => {
            if (err) {
                reject(err);
            }

            resolve(files);
        })
    })
}

const cleanDistFolder = (widgetsDistPath) => {
    return new Promise(async (resolve, reject) => {
        const files = await getDirectoryContents(widgetsDistPath);

        for (const fileIndex in files) {
            fs.rm(`${widgetsDistPath}\\${files[fileIndex]}`, { recursive: true}, (err) => {
                if (err) {
                    reject(err);

                    return;
                }
            })
        }

        resolve();
    })
}

module.exports = cleanDistFolder;