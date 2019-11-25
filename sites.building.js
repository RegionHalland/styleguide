const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const fs = require("fs");
const uglify = require('gulp-uglify');

// gulp-sass - Using for forwards-compatibility and explicitly
sass.compiler = require('node-sass');

const settings = require('./sites.building.json');
const styleguideConfig = require('./package.json');

const { sites, building, commonResources } = settings;
const { publicPath, releasePath } = building; // Public path and release path
const styleguideVersion = styleguideConfig.version || '';

const helpMessage = `\n\x1b[33m💡\x1b[0m Run \x1b[33m$ gulp help\x1b[0m to view the help information\n`;

/* ----------------------------------- HELPERS ------------------------------- */
/**
 * @param {string} option is like as -option
 * @param {string} alias is like as --alias
 */
function getOptionsHelper(option, alias) {
    try {
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
    } catch (error) { return error; }
}

function identifyFlag(inputArg) {
    try {
        if (inputArg.charAt(0) === "-" && inputArg.charAt(1) !== "-"
            || inputArg.charAt(0) === "-" && inputArg.charAt(1) === "-"
        ) {
            return true;
        } else {
            return false;
        }
    } catch (error) { return error; }
}

function getCommandParams() {
    try {
        const argList = process.argv.slice(3),
            argListLength = argList.length;

        let mainFlag,
            subFlags = [],
            argument = [];

        for (let i = 0; i < argListLength; ++i) {
            if (identifyFlag(argList[i])) {
                if (i === 0) {
                    mainFlag = argList[i];
                } else {
                    subFlags = subFlags.concat([argList[i]]);
                }

            } else {
                argument = argument.concat([argList[i]]);
            }
        }

        return {
            mainFlag: mainFlag,
            subFlags: subFlags,
            argument: argument
        };
    } catch (error) { return error; }
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

            for (let i = 0; i < objResultLength; ++i) {
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
            return reject(new Error("Input data must be an array"));
        }
    });
}

function showResult(resultPath, result, resultType, options = {}) {
    try {
        let message = "";

        if (isFileExists(resultPath)) {
            message = `\nChosen options -> overwrite: ${options.overWrite ? "\x1b[32m✓ yes\x1b[0m" : "\x1b[31m✗ no\x1b[0m"}` +
                ` - minify: ${options.minify ? "\x1b[32m✓ yes\x1b[0m" : "\x1b[31m✗ no\x1b[0m"}` +
                `\n\n\x1b[32m✓ ${resultType}\x1b[0m -> \x1b[90m/${resultPath}/\x1b[0m -> ${result}`;

        } else {
            message = `\n\x1b[33m? Skipped\x1b[0m -> \x1b[90m/${resultPath}/\x1b[0m -> ${result}`;
        }

        return console.log(message);
    } catch (error) { return error; }
}

/* --------------------------------------- LOGIC ----------------------------- */
/**
 * JS building
 * @param {callback} cb
 * @param {string} jsFilename
 * @param {array} resource
 * @param {string} destPath is the destination path (public path)
 * @param {object} options {overWrite: boolean, minify: boolean}
 */
function jsBuild(cb, jsFilename, jsResources, destPath, options = {}) {
    return new Promise((resolve, reject) => {
        const srcOptions = { allowEmpty: true },
            destOptions = { overwrite: options.overWrite || false }; // False is default

        const jsFullFilename = `${jsFilename}.js`;
        const jsDestPath = destPath;

        src(jsResources, srcOptions)
            .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties']
            }))
            .pipe(concat(jsFullFilename))
            .pipe(sourcemaps.write('.'))
            .pipe(dest(jsDestPath, destOptions))
            .on('end', () => resolve(jsFullFilename))
            .on('error', (err) => reject(err));

        cb();
    });
}

/**
 * JS minification
 * @param {callback} cb
 * @param {string} jsFilename
 * @param {array} resource
 * @param {string} destPath is the destination path (public path)
 * @param {object} options {overWrite: boolean, minify: boolean}
 */
function jsMinify(cb, jsFilename, jsResources, destPath, options = {}) {
    return new Promise((resolve, reject) => {
        const srcOptions = { allowEmpty: true },
            destOptions = { overwrite: options.overWrite || false }; // False is default

        const jsFullFilename = `${jsFilename}.js`;
        const jsDestPath = destPath;

        src(jsResources, srcOptions)
            .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties']
            }))
            .pipe(concat(jsFullFilename))
            .pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(dest(jsDestPath, destOptions))
            .on('end', () => resolve(jsFullFilename))
            .on('error', (err) => reject(err));

        cb();
    });
}

/**
 * SCSS building
 * @param {callback} cb
 * @param {string} cssFilename
 * @param {array} scssResource
 * @param {string} destPath
 * @param {object} options {overWrite: boolean, minify: boolean}
 */
function scssBuild(cb, cssFilename, scssResource, destPath, options = {}) {
    return new Promise((resolve, reject) => {
        const srcOptions = { allowEmpty: true },
            destOptions = { overwrite: options.overWrite || false }; // False is default

        const cssFullFilename = `${cssFilename}.css`;
        const cssDestPath = destPath;

        src(scssResource, srcOptions)
            .pipe(sourcemaps.init())
            .pipe(sass.sync().on('error', (err) => reject(err)))
            .pipe(concat(cssFullFilename))
            .pipe(sourcemaps.write('.'))
            .pipe(dest(cssDestPath, destOptions))
            .on('error', (err) => reject(err))
            .on('end', () => resolve(cssFullFilename));

        cb();
    });
}

/**
 * SCSS minification
 * @param {callback} cb
 * @param {string} cssFilename
 * @param {array} scssResource
 * @param {string} destPath
 * @param {object} options {overWrite: boolean, minify: boolean}
 */
function scssMinify(cb, cssFilename, scssResource, destPath, options = {}) {
    return new Promise((resolve, reject) => {
        const srcOptions = { allowEmpty: true },
            destOptions = { overwrite: options.overWrite || false }; // False is default

        const cssFullFilename = `${cssFilename}.css`;
        const cssDestPath = destPath;

        src(scssResource, srcOptions)
            .pipe(sourcemaps.init())
            .pipe(
                sass.sync({ outputStyle: 'compressed' })
                    .on('error', (err) => reject(err))
            )
            .pipe(concat(cssFullFilename))
            .pipe(sourcemaps.write('.'))
            .pipe(dest(cssDestPath, destOptions))
            .on('error', (err) => reject(err))
            .on('end', () => resolve(cssFullFilename));

        cb();
    });
}

function build_process(cb, name, resources = {}, destPath, options = {}) {
    return new Promise((resolve, reject) => {
        const filename = name, // Only name and without the file extension
            { jsComponents, scssComponents } = resources, // Resources definition
            { commonJsComponents, commonScssComponents } = commonResources;

        let jsSrcList = jsComponents || [],
            scssSrcList = scssComponents || [];

        const { minify } = options;

        /* Prepare data */
        if (commonJsComponents && commonJsComponents.length) {
            jsSrcList = [...commonJsComponents, ...jsSrcList];
        }

        if (commonScssComponents && commonScssComponents.length) {
            scssSrcList = [...commonScssComponents, ...scssSrcList];
        }

        /* Build process */
        if (jsSrcList && jsSrcList.length > 0 && scssSrcList && scssSrcList.length > 0) {
            // Both JS and SCSS files are used in the component(s)
            let buildJs, buildScss;

            if (minify) {
                // With minification
                buildJs = jsMinify(cb, filename, jsSrcList, destPath, options)
                    .then((result) => result)
                    .catch((error) => error);

                buildScss = scssMinify(cb, filename, scssSrcList, destPath, options)
                    .then((result) => result)
                    .catch((error) => error);
            } else {
                // No minification
                buildJs = jsBuild(cb, filename, jsSrcList, destPath, options)
                    .then((result) => result)
                    .catch((error) => error);

                buildScss = scssBuild(cb, filename, scssSrcList, destPath, options)
                    .then((result) => result)
                    .catch((error) => error);
            }

            Promise.all([buildJs, buildScss])
                .then((buildFiles) => {
                    indentifySASSCompilingError(buildFiles)
                        .then(() => resolve({
                            filename: filename,
                            result: buildFiles
                        }))
                        .catch((error) => reject(error));
                })
                .catch((error) => reject(error));

        } else if (jsSrcList && jsSrcList.length === 0 && scssSrcList && scssSrcList.length > 0) {
            // Only SCSS file is used for the component(s)
            if (minify) {
                scssMinify(cb, filename, scssSrcList, destPath, options)
                    .then((cssFilename) => resolve({
                        filename: filename,
                        result: cssFilename
                    }))
                    .catch((error) => reject(error));
            } else {
                scssBuild(cb, filename, scssSrcList, destPath, options)
                    .then((cssFilename) => resolve({
                        filename: filename,
                        result: cssFilename
                    }))
                    .catch((error) => reject(error));
            }

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
function build_styling_for_one_site(cb, sitename, options = {}) {
    if (sitename) {
        const siteInfo = findFirstByProperty(sites, 'name', sitename);

        if (siteInfo) {
            const { name, resources } = siteInfo;

            if (name && resources) {
                const sitePublicPath = `${publicPath}/${name}`;

                build_process(cb, name, resources, sitePublicPath, options)
                    .then(({ result }) => showResult(sitePublicPath, result, "Build", options))
                    .catch((error) => console.error(`\n\x1b[31m✗ Error\x1b[0m An error occurred while building CSS for the site \x1b[33m${name}\x1b[0m\n\n${error.message ? error.message : error}`));
            }
        } else {
            console.error(`\n\x1b[31m✗ Error\x1b[0m The site \x1b[33m${sitename}\x1b[0m is not found for building\n`);
        }
    } else {
        throw new Error("The input variable 'sitename' is missing");
    }
}

function build_styling_for_all_sites(cb, options = {}) {
    const sitesLength = sites.length;

    if (sitesLength) {
        for (let i = 0; i < sitesLength; ++i) {
            const { name, resources } = sites[i];

            if (name && resources) {
                const sitePublicPath = `${publicPath}/${name}`;

                build_process(cb, name, resources, sitePublicPath, options)
                    .then(({ result }) => showResult(sitePublicPath, result, "Build", options))
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
                    .then((results) => showResult(siteReleasePath, results, "Release", options))
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

function release_styling_for_all_sites(cb, options = {}) {
    const sitesLength = sites.length;

    if (sitesLength) {
        for (let i = 0; i < sitesLength; ++i) {
            const siteInfo = sites[i],
                { name, resources } = siteInfo || {};

            if (name && resources) {
                const siteReleasePath = `${releasePath}/${name}`;

                release_process(cb, siteInfo, siteReleasePath, options)
                    .then((results) => showResult(siteReleasePath, results, "Release", options))
                    .catch((error) => console.error(`\n\x1b[31m✗ Error\x1b[0m An error occurred while compiling CSS for the site \x1b[33m${name}\x1b[0m\n\n${error.message ? error.message : error}`));
            } else {
                console.error(`\n\x1b[31m✗\x1b[0m Can not release the site ${name}`);
            }
        }
    } else {
        console.error(`\n\x1b[31m✗\x1b[0m No site to release`);
    }
}

/* ---------------------------------- MAIN ------------------------------- */
function buildSites(cb) {
    const { mainFlag, subFlags, argument } = getCommandParams();
    const options = {
        overWrite: subFlags.includes("-o") || subFlags.includes("--overwrite"), //overwrite - Default is false
        minify: subFlags.includes("-m") || subFlags.includes("--minify") //minify - Default is false
    };

    switch (mainFlag) {
        case "-s":
        case "--site":
            const sitename = argument[0];

            if (typeof sitename === "string") {
                build_styling_for_one_site(cb, sitename, options);
            } else {
                console.error(`\n\x1b[31m✗ Error\x1b[0m The website's name is missing`);
                console.error(helpMessage);
            }

            break;

        case "-a":
        case "--all":
            build_styling_for_all_sites(cb, options);
            break;

        default:
            console.log('\n\x1b[31m✗ Error\x1b[0m Unknown command');
            console.log(helpMessage);

            break;
    }

    cb();
}

function releaseSites(cb) {
    const { mainFlag, subFlags, argument } = getCommandParams();
    const options = {
        overWrite: subFlags.includes("-o") || subFlags.includes("--overwrite"), //overwrite - Default is false
        minify: subFlags.includes("-m") || subFlags.includes("--minify") //minify - Default is false
    };

    switch (mainFlag) {
        case "-s":
        case "--site":
            const sitename = argument[0];

            if (typeof sitename === "string") {
                release_styling_for_one_site(cb, sitename, options);
            } else {
                console.error(`\n\x1b[31m✗ Error\x1b[0m The website's name is missing`);
                console.error(helpMessage);
            }

            break;

        case "-a":
        case "--all":
            release_styling_for_all_sites(cb, options);
            break;

        default:
            console.log('\n\x1b[31m✗ Error\x1b[0m Unknown command');
            console.log(helpMessage);

            break;
    }

    cb();
}

function helpInformation(cb) {
    const helpInformation = `\nUSAGE:` +
        `\n\t$ gulp <task> <-option> \x1b[90m[<-suboption>]\x1b[0m \x1b[33m[<sitename>]\x1b[0m` +
        `\n\nTASKS:` +
        `\n\t\x1b[36mbuilds\x1b[0m\t\tBuilds CSS and JS` +
        `\n\t\x1b[36mreleases\x1b[0m\tReleases CSS and JS with version number` +
        `\n\nOPTIONS:` +
        `\n\t-s\t\x1b[90m--site\x1b[0m\tUsing for a specific site by its name` +
        `\n\t-a\t\x1b[90m--all\x1b[0m\tUsing for all sites` +
        `\n\nSUB OPTIONS:` +
        `\n\t-o\tOverwriting existing files` +
        `\n\t-m\tMinification CSS and JS` +
        `\n\nEXAMPLES:` +
        `\n\t$ gulp builds \x1b[90m-s -o -m\x1b[0m \x1b[33mprojectOne\x1b[0m` +
        `\n\t$ gulp builds \x1b[90m-a -m\x1b[0m` +
        `\n\t$ gulp releases \x1b[90m--site -m\x1b[0m \x1b[33mnewSite\x1b[0m` +
        `\n\t$ gulp releases \x1b[90m--all\x1b[0m\n`;

    console.log(helpInformation);

    cb();
}

module.exports = {
    buildSites,
    releaseSites,
    getOptionsHelper,
    helpInformation
};
