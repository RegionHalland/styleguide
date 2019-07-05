const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

const settings = require('./sites.building.json');

const { sites, building } = settings;
const { publicPath, releasePath } = building; // Public path and release path


/* ----------------------------------- HELPERS ------------------------------- */
function getOptionsHelper(key) {
    const argList = process.argv.slice(3),
        argIndex = argList.indexOf(key),
        nextArg = argList[argIndex + 1];

    return (argIndex < 0) ? null : (!nextArg || nextArg[0] === "-") ? true : nextArg;
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


/* --------------------------------------- LOGIC ----------------------------- */
/**
 * @param {callback} cb
 * @param {string} jsFilename
 * @param {array} resource
 * @param {string} destPath is the destination path (public path)
 */
function build_js(cb, jsFilename, jsResources, destPath) {
    return new Promise((resolve, reject) => {
        const jsFullFilename = `${jsFilename}.js`;
        const jsDestPath = destPath;

        src(jsResources)
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

function build_scss(cb, cssFilename, scssResource, destPath) {
    return new Promise((resolve, reject) => {
        const cssFullFilename = `${cssFilename}.css`;
        const cssDestPath = destPath;

        src(scssResource)
            .pipe(sourcemaps.init())
            .pipe(
                sass.sync({ outputStyle: 'compressed' })
                    .on('error', sass.logError)
            )
            .pipe(concat(cssFullFilename))
            .pipe(sourcemaps.write('.'))
            .pipe(dest(cssDestPath))
            .on('end', () => resolve(cssFullFilename))
            .on('error', (error) => reject(error));

        cb();
    });
}

function build_process(cb, name, resources = {}, destPath) {
    return new Promise((resolve, reject) => {
        const filename = name, // Only name and without the extension .css
            { jsComponents, scssComponents } = resources, // Resources definition
            jsSrcList = jsComponents || [],
            scssSrcList = scssComponents || []

        /* Build process */
        if (jsSrcList && jsSrcList.length > 0 && scssSrcList && scssSrcList.length > 0) {
            // Both JS and SCSS files are used in the component(s)
            const buildjs = build_js(cb, filename, jsSrcList, destPath)
                .then((result) => result)
                .catch((error) => error);

            const buildscss = build_scss(cb, filename, scssSrcList, destPath)
                .then((result) => result)
                .catch((error) => error);

            Promise.all([buildjs, buildscss])
                .then((buildFiles) => resolve({
                    filename: filename,
                    result: buildFiles
                }))
                .catch((error) => reject(error));

        } else if (jsSrcList && jsSrcList.length === 0 && scssSrcList && scssSrcList.length > 0) {
            // Only SCSS file is used for the component(s)
            build_scss(cb, filename, scssSrcList, destPath)
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

function release_process(cb, siteInfo = {}, destPath) {
    return new Promise((resolve, reject) => {
        const { name, resources, version } = siteInfo;

        if (name && resources && version) {
            const releaseName = `${name}.${version}`,
                releaseLatestName = `${name}.latest`;

            // Create the files <filename>.<version>.css and <filename>.<version>.js
            const releaseTask = build_process(cb, releaseName, resources, destPath)
                .then(({ result }) => result)
                .catch((error) => error);

            // Create the files <filename>.latest.css and <filename>.latest.js
            const releaseLatestTask = build_process(cb, releaseLatestName, resources, destPath)
                .then(({ result }) => result)
                .catch((error) => error);

            Promise.all([releaseTask, releaseLatestTask])
                .then((results) => resolve(results))
                .catch((error) => reject(error));
        } else {
            reject(new Error('The input data siteInfo is invalid'));
        }
    });
}


/* ----------------------------------- FEATURES ------------------------------ */
function build_styling_for_one_site(cb, sitename) {
    const sitesLength = sites.length;

    if (sitesLength > 0) {
        const siteInfo = findFirstByProperty(sites, 'name', sitename);

        if (siteInfo) {
            const { name, resources } = siteInfo;

            if (name && resources) {
                build_process(cb, name, resources, publicPath)
                    .then(({ result }) => console.log(`\n\x1b[32m✓ Build\x1b[0m -> \x1b[90m/${publicPath}/\x1b[0m -> ${result}`))
                    .catch((error) => console.error(error));
            }
        } else {
            console.error(`\n\x1b[31m✗ Error\x1b[0m The site ${sitename} is not found for building\n`);
        }
    } else {
        console.error(`\n\x1b[31m✗\x1b[0m No site to build`);
    }
}

function build_styling_for_all_sites(cb) {
    const sitesLength = sites.length;

    if (sitesLength > 0) {
        for (let i = 0; i < sitesLength; i++) {
            const { name, resources } = sites[i];

            if (name && resources) {
                build_process(cb, name, resources, publicPath)
                    .then(({ result }) => console.log(`\n\x1b[32m✓ Build\x1b[0m -> \x1b[90m/${publicPath}/\x1b[0m -> ${result}`))
                    .catch((error) => console.error(error));
            } else {
                console.error(`\n\x1b[31m✗\x1b[0m Can not build the site ${name}`);
            }
        }
    } else {
        console.error(`\n\x1b[31m✗\x1b[0m No site to build`);
    }
}

function release_styling_for_one_site(cb, sitename) {
    if (sitename) {
        const siteInfo = findFirstByProperty(sites, 'name', sitename);
        
        if (siteInfo) {
            release_process(cb, siteInfo, releasePath)
                .then((results) => console.log(`\n\x1b[32m✓ Release\x1b[0m -> \x1b[90m/${releasePath}/\x1b[0m -> ${results}`))
                .catch((error) => console.error(error));
        } else {
            console.error(`\n\x1b[31m✗ Error\x1b[0m The site ${sitename} is not found for release\n`);
        }
    } else {
        console.error(`\n\x1b[31m✗\x1b[0m No site to release`);
    }
}

function release_styling_for_all_sites(cb) {
    const sitesLength = sites.length;

    if (sitesLength > 0) {
        for (let i = 0; i < sitesLength; i++) {
            release_process(cb, sites[i], releasePath)
                .then((results) => console.log(`\n\x1b[32m✓ Release\x1b[0m -> \x1b[90m/${releasePath}/\x1b[0m -> ${results}`))
                .catch((error) => console.error(error));
        }
    } else {
        console.error(`\n\x1b[31m✗\x1b[0m No site to release`);
    }
}


/* ---------------------------------- MAIN APP ------------------------------- */
function buildSites(cb) {
    const helpInformation = `The command is \x1b[33mgulp buildsites\x1b[0m \x1b[90m<[--all][--site]> <name>\x1b[0m\n`;

    if (getOptionsHelper("--all")) {
        build_styling_for_all_sites(cb);
    } else if (getOptionsHelper("--site")) {
        const sitename = getOptionsHelper("--site");

        if (typeof sitename === "string") {
            build_styling_for_one_site(cb, sitename);
        } else {
            console.error(`\n\x1b[31m✗ Error\x1b[0m The website\'s name is missing or invalid`);
            console.log(helpInformation);
        }
    } else {
        console.log('\n\x1b[31m✗ Error\x1b[0m Unknown command');
        console.log(helpInformation);
    }

    cb();
}

function releaseSites(cb) {
    const helpInformation = `The command is \x1b[33mgulp releasesites\x1b[0m \x1b[90m<[--all][--site]> <name>\x1b[0m\n`;

    if (getOptionsHelper("--all")) {
        release_styling_for_all_sites(cb);
    } else if (getOptionsHelper("--site")) {
        const sitename = getOptionsHelper("--site");
        if (typeof sitename === "string") {
            release_styling_for_one_site(cb, sitename);
        } else {
            console.error(`\n\x1b[31m✗ Error\x1b[0m The website\'s name is missing or invalid`);
            console.log(helpInformation);
        }
    } else {
        console.log('\n\x1b[31m✗ Error\x1b[0m Unknown command');
        console.log(helpInformation);
    }

    cb();
}

module.exports = {
    buildSites,
    releaseSites
};
