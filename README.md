# Styleguide 💅🏾

This styleguide contains CSS components and classes is a starting point for websites and services by Region Halland.

<details><summary><strong>View styleguide structure</strong></summary>
<p>


```sh
styleguide/                    # → Root
├── src/                       # → Source files
│   ├── fonts/                 # → Fonts used
│   ├── icons/                 # → Icon source files
│   ├── img/                   # → Static images, like Region Halland logo
│   ├── js/                    # → Javascript files
│   ├── php/                   # → PHP (Presentation purposes only)
│   │   ├── cache/             # → Cached blade files (never edit, never commit)
│   │   ├── views/             # → Blade views
│   │   ├── App.php            # → Build views
│   ├── scss/                  # → SCSS Files
│   │   ├── main.scss          # → Styleguide entry file
│   │   ├── presentation.scss  # → Presentational SCSS Entry file
│   │   ├── base/              # → Reset and font declarations
│   │   ├── components/        # → Components
│   │   ├── config/            # → Utility classes
│   │   ├── mixins/            # → Mixins
│   │   ├── presentation/      # → Presentational css (not compiled)
│   │   ├── settings/          # → Variables
│   ├── icons-template.scss    # → (Presentational only) Template for icons
├── docs/                      # → Automatically generated docs (never edit)
├── temp/                      # → Locally built assets (never edit, never commit)
├── dist/                      # → Built assets (never edit)
├── .env                       # → Environment variables (never commit)
├── composer.json              # → PHP dependencies
├── composer.lock              # → Composer lock file (never edit)
├── package.json               # → Node.js dependencies and scripts
├── package.lock               # → NPM lock file (never edit)
├── node_modules/              # → Node.js packages (never edit, never commit)
└── vendor/                    # → Composer packages (never edit, never commit)
```

<p>
</details>

## Requirements

* [Virtualbox](https://www.virtualbox.org/) >= v5.1.28 
* [Vagrant](https://www.vagrantup.com/) >= v2.0.2 
* [Composer](https://getcomposer.org/)
* [Homestead](https://laravel.com/docs/5.6/homestead) >= v5.6.0
* [Node](https://nodejs.org/en/) >= v6.0.0 
* [Yarn](https://yarnpkg.com/) >= v1.1.0 


## Getting started

1. Clone the repository and install dependencies:
```sh
$ git clone https://github.com/RegionHalland/styleguide.git
$ cd styleguide
$ composer install && yarn
```

2. Open your Homestead.yaml file (in `~/Homestead/Homestead.yaml`) and add a new entry: 
```yaml
...
 sites:    
  - map: styleguide.test
    to: /home/vagrant/<path to your project>/styleguide.test
...
```

4. Apply your changes by running the following from your `Homestead` directory:
```sh
$ homestead provision
```

5. Create an `.env` file in root folder of your project (where you cloned the styleguide repository):
```sh
$ echo 'PRODUCTION="false"' > .env
```

6. Build commands:
* `gulp watch` — Watch for changes and compile assets when file changes are made.
* `gulp dist` — Compile, optimize and outputs files to the `dist/` directory


## Development

Running `gulp watch` starts a Browsersync session at `http://localhost:3000`. Temporary build files are stored in the `./temp` directory. :tada:

### DSS

We use DSS to document components and classes. [The official docs](https://github.com/DSSWG/DSS) explain the syntax well.

### Icons

Gulp looks for `.svg` files in `styleguide/src/icons/`, cleans them up (removing width, height etc) and compiles them into a spritesheet. The icons should have a viewbox dividable by 8.

If your project uses jQuery, you can use the following snippet to inject the deployed spritesheet into your project:

```js
(function($) {
	$.get('//regionhalland.github.io/styleguide/dist/icons/sprite.svg', function(data) {
		var div = document.createElement('div');
		div.className = 'display-none';
		div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
		document.body.insertBefore(div, document.body.childNodes[0]);
	});
})( jQuery );
```

### Using the Styleguide (CORS)

Our Wordpress theme [Halland](https://github.com/RegionHalland/halland) looks for a local installation of this styleguide at `http://styleguide.test`. Follow these instructions to allow CORS requests to your local installation.

1. SSH into your Homestead server and edit the styleguides nginx config:
```sh
$ cd ~/Homestead
$ homestead ssh
$ sudo nano /etc/nginx/sites-enabled/styleguide.test
```

2. Place the headers in the server block of the nginx config:
```nginx
# Allow CORS
add_header 'Access-Control-Allow-Origin' '*' always;
add_header 'Access-Control-Allow-Credentials' 'true' always;
add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
add_header 'Access-Control-Allow-Headers' 'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With' always;
```

3. Reload the nginx config.
```sh
$ sudo service nginx reload
```

## Deployment

The styleguide is currently served via Github Pages and publishes whatever is in the `gh-pages` branch. Since Github Pages only supports static files, the `dist/` folder are not built server-side and has to be commited.

1. Before pushing changes, build all files for production:
```sh
$ gulp dist
```

2. If you are not on `master`, merge your branch into `master`:
```sh
$ git checkout master
$ git merge <your-branch>
```

3. Merge `master` into the `gh-pages` branch:
```sh
$ git checkout gh-pages
$ git rebase master
$ git push origin gh-pages
$ git checkout master
```

It might take a few minutes for Github to deploy.
