# Ändringslogg
Period: 2019-10-01 - 2019-10-15

## Nya komponenter
Vi börjar använda versions formatet `[versionnumber]-[timestamp]` för alpha, beta o.s.v. ([Se mer på design.regionhalland.se](https://design.regionhalland.se/verktyg/versionshantering/))

* Molecules/article-block
* Organism/article-group
* Organism/footer-logo-group

## Förbättring
* Atoms/pagination-elements - en ny klass `--current` skapas för återanvändning.
* Molecules/message - Använda inställningar
* Grid system
    * [row-gutters](/docs/03-layout.md#321-standard-gutters)
    * [col-item-eq-height](/docs/03-layout.md#321-standard-gutters)
    * [row-section-gutters](/docs/03-layout.md#322-section-gutters)
* Verktyg
    * [rh-overflow*](/docs/04-utilities.md#3-overflow)
    * [rh-section-gutter-lx*](/docs/04-utilities.md#41-section-gutter-lx)
* Dokumentation för grid system och verktyg.

## Byggmiljö
* [BrowserSync](https://www.browsersync.io/) installeras därför man behöver köra `$ npm install` för att uppdatera alla npm paket i lokalt efter man har pullat ner master branchen.
* `/gulpfile.js` har en ny prov funktion som är __DevServe__. Det gäller för __endast utveckling__ och fungerar liknande som man kör `gulp` som vanligt. Det kommer bli smidigare för:
    * BrowserSync server fungerar tillsamans med Fractal server:
        * Fractal sköter back-end.
        * BrowserSync sköter front-end _([CSS injektion](https://www.browsersync.io/docs/gulp#gulp-sass-css) och omladdning)_.
    * Stilguiden ombygger bara delen som finns ändringar utan bygger allt hela tiden som det har gjort innan. Det är nu separata komplikationer och gäller för respektive filformat _(*.css, *.hbs, *.js, *.md, *.{svg,png,gif,jpg})_.
* __Målet__ är att Stilguiden fungerar smidigare, snabbare och har en bättre prestanda under utveckling.
* __Användning:__
    * Kör `$ gulp dev` för att starta utveckling server.
    * Lokalt server är på `http://localhost:3000/` som vanligt.
