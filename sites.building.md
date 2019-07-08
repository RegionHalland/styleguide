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
|`$ gulp builds <[-option][--alias]> <sitename>`|`/cdn/public`|
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
$ gulp builds -a
$ gulp builds -s samplesitename
$ gulp releases -a
$ gulp releases -s othersitename

// Using alias
$ gulp builds --all
$ gulp builds --site samplesitename
$ gulp releases --all
$ gulp releases --site othersitename

// Show the help information
$ gulp builds -u
$ gulp releases -u
```


### Config
* The main files are `sites.building.js` and `sites.building.json`.
* Change the add-on configs in this file `/sites.building.json` for your reason.
* View the `/gulpfile.js` to know how the add-on is used.

## To-Do
* [ ] gulp build
* [ ] gulp build --all
* [ ] gulp build --site sitename
* [ ] gulp release
* [ ] gulp release --all
* [ ] gulp release --site sitename

## Release notes:
### 1.0.0-alpha.1.0.1 (2019-07-08)
* Added new features:
    * Options and alias system.
    * Using only for the release tasks:
        * File checking when a file exists. 
        * A new option `-o` to overwrite a file when it exists.
    * Help information.
* Improved error handling.
* Changed the command to `builds` and `releases`. It's shorter and simpler to run a command.

### 1.0.0-alpha.1.0.0 (2019-07-05)
* The first version.
