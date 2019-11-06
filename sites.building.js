const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const fs = require("fs");

const settings = require('./sites.building.json');
const styleguideConfig = require('./package.json');

const { sites, building } = settings;
const { publicPath, releasePath } = building; // Public path and release path
const styleguideVersion = styleguideConfig.version || '';

/* ----------------------------------- HELPERS ------------------------------- */
/**
 * @param {string} option is like as -option
 * @param {string} alias is like as --alias
 */
function getOptionsHelper(option, alias) {
    const argList = process.argv.slice(3);
    let argIndex = -1; // Not found anything is default

    const optionIndex = argList.indexOf(option),
        aliasIndex = argList.indexOf(alias);

    if (optionIndex > -1) {
        argIndex = optionIndex; // Option is found
    } else if (optionIndex < 0 && aliasIndex > -1) {
        argIndex = aliasIndex; // Alias is found
    }

    if (argIndex < 0) {
        return null;
    } else {
        const nextArg = argList[argIndex + 1];
        return (!nextArg || nextArg[0] === "-") ? true : nextArg;
    }
}

function findFirstByProperty(objectArray, sPropertyName, sSeekingValue) {
    try {
        if (Array.isArray(objectArray)) {
            if (objectArray.length) {
                const result = objectArray.filter((objItem) => objItem[sPropertyName] === sSeekingValue);
                return result.length ? result[0] : null;
            } else {
                return null;
            }
        } else {
            return false;
        }
    } catch (error) { return error; }
}

function isFileExists(fileLocation) {
    return fs.existsSync(fileLocation);
}

function indentifySASSCompilingError(objResult = []) {
    return new Promise((resolve, reject) => {
        if (Array.isArray(objResult)) {
            const objResultLength = objResult.length;
            let hasError = false,
                errorObject;

            for (let i = 0; i < objResultLength; i++) {
                if (objResult[i].name && objResult[i].name === "Error") {
                    hasError = true;
                    errorObject = (objResult[i] instanceof Error) ?
                        objResult[i] :
                        new Error("An error occurred while compiling SASS");
                    break;
                }
            }

            if (!hasError) {
                return resolve();
            }

            return reject(errorObject);

        } else {
            reject(new Error("Input data must be an array"));
        }
    });
}

function showResult(resultPath, result){
    if (isFileExists(resultPath)){
        console.log(`\n\x1b[32m✓ Build\x1b[0m -> \x1b[90m/${resultPath}/\x1b[0m -> ${result}`)
    } else {
        console.log(`\n\x1b[33m? Skipped\x1b[0m -> \x1b[90m/${resultPath}/\x1b[0m -> ${result}`)
    }
}

/* --------------------------------------- LOGIC ----------------------------- */
/**
 * @param {callback} cb
 * @param {string} jsFilename
 * @param {array} resource
 * @param {string} destPath is the destination path (public path)
 */
function build_js(cb, jsFilename, jsResources, destPath, options = {}) {
    return new Promise((resolve, reject) => {
        const gulpOptions = {
            allowEmpty: true,
            overwrite: options.overWrite || false // False is default
        };

        const jsFullFilename = `${jsFilename}.js`;
        const jsDestPath = destPath;

        src(jsResources, gulpOptions)
            .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(concat(jsFullFilename))
            .pipe(sourcemaps.write('.'))
            .pipe(dest(jsDestPath))
            .on('end', () => resolve(jsFullFilename))
            .on('error', (error) => reject(error));

        cb();
    });
}

function build_scss(cb, cssFilename, scssResource, destPath, options = {}) {
    return new Promise((resolve, reject) => {
        const gulpOptions = {
            allowEmpty: true,
            overwrite: options.overWrite || false // False is default
        };

        const cssFullFilename = `${cssFilename}.css`;
        const cssDestPath = destPath;

        src(scssResource, gulpOptions)
            .pipe(sourcemaps.init())
            .pipe(
                sass.sync({ outputStyle: 'compressed' })
                    .on('error', (err) => reject(err))
            )
            .pipe(concat(cssFullFilename))
            .pipe(sourcemaps.write('.'))
            .pipe(dest(cssDestPath))
            .on('end', () => resolve(cssFullFilename))
            .on('error', (error) => reject(error));

        cb();
    });
}

function build_process(cb, name, resources = {}, destPath, options = {}) {
    return new Promise((resolve, reject) => {
        const filename = name, // Only name and without the extension .css
            { jsComponents, scssComponents } = resources, // Resources definition
            jsSrcList = jsComponents || [],
            scssSrcList = scssComponents || []

        /* Build process */
        if (jsSrcList && jsSrcList.length > 0 && scssSrcList && scssSrcList.length > 0) {
            // Both JS and SCSS files are used in the component(s)
            const buildjs = build_js(cb, filename, jsSrcList, destPath, options)
                .then((result) => result)
                .catch((error) => error);

            const buildscss = build_scss(cb, filename, scssSrcList, destPath, options)
                .then((result) => result)
                .catch((error) => error);

            Promise.all([buildjs, buildscss])
                .then((buildFiles) => {
                    indentifySASSCompilingError(buildFiles)
                        .then(() => resolve(buildFiles))
                        .catch((error) => reject(error));
                })
                .catch((error) => reject(error));

        } else if (jsSrcList && jsSrcList.length === 0 && scssSrcList && scssSrcList.length > 0) {
            // Only SCSS file is used for the component(s)
            build_scss(cb, filename, scssSrcList, destPath, options)
                .then((cssFilename) => resolve({
                    filename: filename,
                    result: cssFilename
                }))
                .catch((error) => reject(error));

        } else {
            return reject(`\n\x1b[31m✗\x1b[0m The process is interrupted because the needed files for \x1b[33m${name}\x1b[0m is not found!`);
        }
    });
}

function release_process(cb, siteInfo = {}, destPath, options = {}) {
    return new Promise((resolve, reject) => {
        const { name, resources, version } = siteInfo;
        const { overWrite } = options;

        if (name && resources && version && styleguideVersion) {
            const releaseName = `${name}.${version}-${styleguideVersion}`,
                releaseLatestName = `${name}.latest`;

            if (!overWrite) {
                // Checking if the files exists
                const cssFullFilePath = `${destPath}/${releaseName}.css`,
                    jsFullFilePath = `${destPath}/${releaseName}.js`;

                if (isFileExists(cssFullFilePath)) {
                    return reject(`${cssFullFilePath} exists`);
                } else if (isFileExists(jsFullFilePath)) {
                    return reject(`${jsFullFilePath} exists`);
                }
            }

            /* Create the files:
                <filename>.<version>-<styleguideversion>.css 
                <filename>.<version>-<styleguideversion>.js */
            const releaseTask = build_process(cb, releaseName, resources, destPath, options)
                .then(({ result }) => result)
                .catch((error) => error);

            // Create the files <filename>.latest.css and <filename>.latest.js
            const releaseLatestTask = build_process(cb, releaseLatestName, resources, destPath, options)
                .then(({ result }) => result)
                .catch((error) => error);

            Promise.all([releaseTask, releaseLatestTask])
                .then((results) => {
                    indentifySASSCompilingError(results)
                        .then(() => resolve(results))
                        .catch((error) => reject(error));
                })
                .catch((error) => reject(error));

        } else {
            reject(new Error('The input data siteInfo is invalid'));
        }
    });
}


/* ----------------------------------- FEATURES ------------------------------ */
function build_styling_for_one_site(cb, sitename) {
    if (sitename) {
        const siteInfo = findFirstByProperty(sites, 'name', sitename);

        if (siteInfo) {
            const { name, resources } = siteInfo;

            if (name && resources) {
                const sitePublicPath = `${publicPath}/${name}`;

                build_process(cb, name, resources, sitePublicPath)
                    .then(({ result }) => showResult(sitePublicPath, result))
                    .catch((error) => console.error(`\n\x1b[31m✗ Error\x1b[0m An error occurred while building CSS for the site \x1b[33m${name}\x1b[0m\n\n${error.message ? error.message : error}`));
            }
        } else {
            console.error(`\n\x1b[31m✗ Error\x1b[0m The site ${sitename} is not found for building\n`);
        }
    } else {
        throw new Error("The input variable 'sitename' is missing");
    }
}

function build_styling_for_all_sites(cb) {
    const sitesLength = sites.length;

    if (sitesLength) {
        for (let i = 0; i < sitesLength; i++) {
            const { name, resources } = sites[i];

            if (name && resources) {
                const sitePublicPath = `${publicPath}/${name}`;

                build_process(cb, name, resources, sitePublicPath)
                    .then(({ result }) => showResult(sitePublicPath, result))
                    .catch((error) => console.error(`\n\x1b[31m✗ Error\x1b[0m An error occurred while building CSS for the site \x1b[33m${name}\x1b[0m\n\n${error.message ? error.message : error}`));
            } else {
                console.error(`\n\x1b[31m✗\x1b[0m Can not build the site ${name}`);
            }
        }
    } else {
        console.error(`\n\x1b[31m✗\x1b[0m No site to build`);
    }
}

function release_styling_for_one_site(cb, sitename, options = {}) {
    if (sitename) {
        const siteInfo = findFirstByProperty(sites, 'name', sitename);

        if (siteInfo) {
            const { name, resources } = siteInfo;

            if (name && resources) {
                const siteReleasePath = `${releasePath}/${name}`;

                release_process(cb, siteInfo, siteReleasePath, options)
                    .then((results) => showResult(siteReleasePath, results))
                    .catch((error) => console.error(`\n\x1b[31m✗ Error\x1b[0m An error occurred while compiling CSS for the site \x1b[33m${name}\x1b[0m\n\n${error.message ? error.message : error}`));
            } else {
                console.error(`\n\x1b[31m✗\x1b[0m Can not release the site ${name}`);
            }
        } else {
            console.error(`\n\x1b[31m✗ Error\x1b[0m The site ${sitename} is not found for release\n`);
        }
    } else {
        throw new Error("The input variable 'sitename' is missing");
    }
}

function release_styling_for_all_sites(cb) {
    const sitesLength = sites.length;

    if (sitesLength) {
        for (let i = 0; i < sitesLength; i++) {
            const siteInfo = sites[i],
                { name, resources } = siteInfo || {};

            if (name && resources) {
                const siteReleasePath = `${releasePath}/${name}`;

                release_process(cb, siteInfo, siteReleasePath)
                    .then((results) => showResult(siteReleasePath, results))
                    .catch((error) => console.error(`\n\x1b[31m✗ Error\x1b[0m An error occurred while compiling CSS for the site \x1b[33m${name}\x1b[0m\n\n${error.message ? error.message : error}`));
            } else {
                console.error(`\n\x1b[31m✗\x1b[0m Can not release the site ${name}`);
            }
        }
    } else {
        console.error(`\n\x1b[31m✗\x1b[0m No site to release`);
    }
}

function showHelpInformation(taskType) {
    const mainCommand = `gulp ${taskType}s`;
    const helpCommand = `\x1b[33m💡\x1b[0m Run \x1b[33m$ ${mainCommand} -u\x1b[0m to view the help information\n`;
    const helpInformation = `\nUSAGE: \n\t$ ${mainCommand} \x1b[90m<-option>\x1b[0m \x1b[33m<sitename>\x1b[0m\n` +
        `\nALIAS:\n` +
        `\t\x1b[90m-a\x1b[0m\t--all\t${taskType} all sites\n` +
        `\t\x1b[90m-s\x1b[0m\t--site\t${taskType} a specific site by its name\n` +
        `\nEXAMPLES:\n` +
        `\t$ ${mainCommand} \x1b[90m-a\x1b[0m\n` +
        `\t$ ${mainCommand} \x1b[90m-s\x1b[0m \x1b[33msamplesitename\x1b[0m\n` +
        `\t$ ${mainCommand} \x1b[90m--all\x1b[0m\n` +
        `\t$ ${mainCommand} \x1b[90m--site\x1b[0m \x1b[33mothersitename\x1b[0m\n`;

    return {
        helpCommand,
        helpInformation
    };

}


/* ---------------------------------- MAIN ------------------------------- */
function buildSites(cb) {
    const { helpCommand, helpInformation } = showHelpInformation('build');

    if (getOptionsHelper("-a", "--all")) {
        build_styling_for_all_sites(cb);

    } else if (getOptionsHelper("-s", "--site")) {
        const sitename = getOptionsHelper("-s", "--site");

        if (typeof sitename === "string") {
            build_styling_for_one_site(cb, sitename);
        } else {
            console.error(`\n\x1b[31m✗ Error\x1b[0m The website\'s name is missing`);
            console.error(helpCommand);
        }
    } else if (getOptionsHelper("-u", "--usage")) {
        console.log(helpInformation);
    } else {
        console.log('\n\x1b[31m✗ Error\x1b[0m Unknown command');
        console.log(helpCommand);
    }

    cb();
}

function releaseSites(cb) {
    const { helpCommand, helpInformation } = showHelpInformation('release');

    if (getOptionsHelper("-a", "--all")) {
        release_styling_for_all_sites(cb);

    } else if (getOptionsHelper("-s", "--site")) {
        const sitename = getOptionsHelper("-s", "--site");

        // Special parameter
        const options = {
            overWrite: getOptionsHelper("-o", "--overwrite") || false // Default
        }

        if (typeof sitename === "string") {
            release_styling_for_one_site(cb, sitename, options);
        } else {
            console.error(`\n\x1b[31m✗ Error\x1b[0m The website\'s name is missing`);
            console.log(helpCommand);
        }
    } else if (getOptionsHelper("-u", "--usage")) {
        console.log(helpInformation);
    } else {
        console.log('\n\x1b[31m✗ Error\x1b[0m Unknown command');
        console.log(helpCommand);
    }

    cb();
}

module.exports = {
    buildSites,
    releaseSites,
    getOptionsHelper
};
