# Ändringslogg
Period: 2019-10-16 - 2019-10-xx

## Nya komponenter
* Molecules/contact-info - Det kommer bli en ersättning för komponenten Molecules/rh-unit-info

## Förbättring
* Molecules/article-block - Fixat `<time>` tags beteende på Safari _(både iOS och MacOS)_

## Byggmiljö
* Ny funktion med kommandon `$ gulp dev -r`:
    * Man kan omkompilera filer i `/public` mappen. Exempel:
        * `/public/css/components.css`
        * `/public/css/components.css.map`
        * `/public/js/components.js`
    * Det är använbart när man behöver fixa merge konflikt för parallell brancher eller bara vill omkompilera Stilguiden för senast uppgradering efter man har pullat ner en branch.
* Förbättring för Gulp avvaktning _(*.json adderats)_.