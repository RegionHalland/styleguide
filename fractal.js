'use strict';

/*
* Require the path module
*/
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Give your project a title.
 */
fractal.set('project.title', 'Stilguide - Region Halland');
fractal.set('project.title', 'Stilguide - Region Halland');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'components'));
fractal.components.set('default.collated', true);
fractal.components.set('default.prefix', 'rh-'); // default is null
fractal.components.set('default.status', 'wip'); 
/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'));
fractal.web.set('builder.dest', __dirname + '/build');


const mandelbrot = require('@frctl/mandelbrot'); // require the Mandelbrot theme module

// create a new instance with custom config options
const myCustomisedTheme = mandelbrot({
    skin: "blue",
    styles: [
        "default",
        "/css/skin.css"
    ]
    // any other theme configuration values here
});

fractal.web.theme(myCustomisedTheme);
