# Sites building add-on
The sites building add-on is using __ONLY__ for the Styleguide application at Region Halland organization.

## Features
* Build a site or all sites.
* Release a site or all sites.

## System requirements
* The minimum supported [Node.js](https://nodejs.org/) version is 8.3.0 (Node.js LTS version is a good choice for the stability).
* [Gulp](https://gulpjs.com/) is installled on global.
* Administrator permission is required by your operating system for the building process.

## Usage
### Command
|Command|Default destination|
|---|---|
|`$ gulp builds <[-option][--alias]> <sitename>`|`/cdn/build`|
|`$ gulp releases <[-option][--alias]> <sitename>`|`/cdn/releases`|

### Options and alias
|Option|Alias|Argument (*)|Description|
|---|---|---|---|
|`-a`|`--all`||All sites|
|`-s`|`--site`|`<sitename>`|A specific site|
|`-u`|`--usage`||View the help information|

(*) Must have

### The special option
The option is only used when you release a specific website. Be careful what you do!

|Option|Alias|Description|
|---|---|---|
|`-o`|`--overwrite`|Overwrite a release of a specific site|

Example:
* `$ gulp releases -s asitename -o`
* `$ gulp releases --site onlyonesite --overwrite`

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
$ gulp builds -u
$ gulp releases -u
```

### Configuration
* The main files are `sites.building.js` and `sites.building.json`.
* Change the configs in `/sites.building.json` for your reason.
* View more in `/gulpfile.js` to know how the add-on works.

## Release notes:
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
