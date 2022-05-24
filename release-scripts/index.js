const path = require('path');
const getWidgetDirectories = require('./src/get-widget-directories');
const releaseWidgets = require('./src/release-widgets');
const cleanDistFolder = require('./src/clean-dist-folder');
const copyWidgetToDist = require('./src/copy-widget-to-dist');

const widgetsPath = path.join(__dirname, '..', 'widgets');
const widgetsDistPath = path.join(__dirname, '..', 'widgets-dist');

const releaseAllWidgets = async () => {
    const widgets = await getWidgetDirectories(widgetsPath);

    try {
        await cleanDistFolder(widgetsDistPath);
        await releaseWidgets(widgetsPath, widgets);

        setTimeout(async () => {
            await copyWidgetToDist(widgetsPath, widgetsDistPath, widgets);
        }, 1000);
    } catch (err) {
        console.error('Release failed', err);
    }
}

releaseAllWidgets();