# Styleguide 💅🏾

This styleguide contains CSS components and classes is a starting point for websites and services by Region Halland.

<!-- <details><summary><strong>View styleguide structure</strong></summary>
<p> -->


```shell
styleguide/               # → Root
├── src/                  # → Source files
│   ├── fonts/            # → Fonts used
│   ├── icons/            # → Icon source files
│   ├── img/              # → Static images, like Region Halland logo
│   ├── js/               # → Javascript files
│   ├── php/              # → PHP (Presentation purposes only)
│   │   ├── cache/        # → Cached blade files (never edit, never commit)
│   │   ├── views/        # → Blade views
│   │   ├── App.php       # → Build views
│   ├── scss/             # → SCSS Files
├── docs/                 # → Automatically generated docs (never edit)
├── temp/                 # → Locally built assets (never edit, never commit)
├── dist/                 # → Built assets (never edit)
├── .env                  # → Environment variables (never commit)
├── composer.json         # → PHP dependencies
├── composer.lock         # → Composer lock file (never edit)
├── package.json          # → Node.js dependencies and scripts
├── package.lock          # → NPM lock file (never edit)
├── node_modules/         # → Node.js packages (never edit, never commit)
└── vendor/               # → Composer packages (never edit, never commit)
```
<!-- <p>
</details> -->

## Installation

Clone repository and install dependencies:

```sh
$ yarn install
$ composer install
```

Create .env file (required) in root folder:
```sh
$ echo 'PRODUCTION="false"' > .env
```

## Development

Runs a browsersync server and watches for changes:

```sh
$ gulp watch
```

Temporary build files are stored in the `./temp` directory.

## Production

Before pushing changes, compile all files: 

```sh
$ gulp dist
```

:tada: