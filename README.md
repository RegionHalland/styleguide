# Styleguide

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