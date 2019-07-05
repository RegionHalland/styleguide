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
|Command|Destination|Description|
|---|---|---|
|`gulp buildsites --all`|`/cdn/public`||
|`gulp buildsites --site <sitename>`|`/cdn/public`||
|`gulp releasesites --all`|`/cdn/releases`||
|`gulp releasesites --site <sitename>`|`/cdn/releases`||

### Config
* The main files are `sites.building.js` and `sites.building.json`.
* Change the add-on configs in this file `/sites.building.json` for your reason.
* View the `/gulpfile.js` to know how the add-on is used.

## To-do
* [ ] gulp build
* [ ] gulp build --all
* [ ] gulp build --site sitename
* [ ] gulp release
* [ ] gulp release --all
* [ ] gulp release --site sitename

## Release notes:
### 1.0.0-alpha.1.0.0 (2019-07-05)
* The first version