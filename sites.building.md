# Sites building add-on
The sites building add-on is using __ONLY__ for the Styleguide application at Region Halland organization.

## Features
* Building (*)
* Release (*)
* Minification for both CSS and JS during compiling.
* Automatic including common resources _(SCSS and JS)_.

_(*) Using for a specific site or all sites_.

## System requirements
* The minimum supported [Node.js](https://nodejs.org/) version is __8.9.0__ _(Node.js LTS version is a good choice for the stability)_.
* [Gulp](https://gulpjs.com/) is installled on global.
* Administrator permission is required by your operating system for the building process.

## Usage
`$ gulp <task> <-option> [<-suboption>] [<sitename>]`

### Tasks
|Task|Description|
|---|---|
|`builds`|Building|
|`releases`|Release|
|`help`|View the help information|

### Options
|Option|Alias|Using with (*)|Description|
|---|---|---|---|
|`-s`|`--site`|`<sitename>`|A specific site|
|`-a`|`--all`||All sites|

_(*) Must have_

### Sub options
Beware using with the options are below:

|Sub option|Description|
|---|---|
|`-o`|Overwrite existing files |
|`-m`|Minify both CSS and JS|

Example for using sub options:
* `$ gulp builds -s -m -o projectX`
* `$ gulp releases -s -m nextProject`
* `$ gulp releases --site -m lastProject` _(Using alias)_

### Examples
```
$ gulp builds -a                   // Builds all sites
$ gulp builds -s samplesitename    // Builds a specific site
$ gulp releases -a                 // Releases all sites
$ gulp releases -s othersitename   // Releases a specific site

// Using alias
$ gulp builds --all
$ gulp builds --site samplesitename
$ gulp releases --all
$ gulp releases --site othersitename

// Show the help information
$ gulp help
```

### Configuration
* The main files are `sites.building.js` and `sites.building.json`.
* Change the configs in `/sites.building.json` for your reason.
* View more in `/gulpfile.js` to know how the add-on works.

## Release notes:
### 1.3.0 (2019-11-14)
* [__New__] New command `$ gulp help`
    * Removed `$ gulp builds -u`
    * Removed `$ gulp releases -u`
* [__Improvement__] Improved the help information.

### 1.2.0 (2019-11-13)
* [__New__] Automatic including common resources _(SCSS and JS)_.

### 1.1.0 (2019-11-13)
* [__New__] Minifies CSS and JS when:
    * Building - `$ gulp builds ...`.
    * Release - `$ gulp releases ...`.
* Updated README.md

### 1.0.1 (2019-08-07)
* [__Improvement__]
    * Changed the release file's name to the below structure:
        * `<sitename>.<version>-<styleguideversion>.<extension>`
        * Example: `anewsite.1.0.1-5.1.0.css` and `anewsite.1.0.1-5.1.0.js`
    * Updated README.md

### 1.0.0 (2019-07-17)
* The first version

### 1.0.0-alpha.1.0.1 (2019-07-08)
* [__New__] Added the new features:
    * Options and alias system.
    * Using only for the release tasks:
        * File checking when a file exists.
        * A new option `-o` to overwrite a file when it exists.
    * Help information.
* [__Improvement__]
    * Improved error handling.
    * Changed the command to `builds` and `releases`. It's shorter and simpler to run a command.

### 1.0.0-alpha.1.0.0 (2019-07-05)
* The test version.
