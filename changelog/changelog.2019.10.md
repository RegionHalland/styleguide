# Ändringslogg
Period: 2019-10-01 - 2019-10-11

## Nya komponenter
Vi börjar använda version med formatet `1.0.0-201910111300`. ([Se mer på design.regionhalland.se](https://design.regionhalland.se/verktyg/versionshantering/))

* Molecules/article-block
* Organism/article-group
* Organism/footer-logo-group

## Förbättring
* Grid system
    * row-gutters
    * col-item-eq-height
* Verktyg
    * rh-overflow*
    * rh-section-gutter-lx*
* Dokumentation för grid system och verktyg.

## Byggmiljö
* [Browsersync](https://www.browsersync.io/) installeras därför man behöver köra `npm install` för att uppdatera alla npm paket i lokalt efter man pullar ner master branchen.
* `gulpfile.js` har en ny prov funktion som är `DevServe`. Det gäller för endast utveckling och fungerar liknande som man kör `gulp`. Vi hoppas det blir smidigare för:
    * BrowserSync server wrappar runt om Fractal server och tar hand om CSS injektion och omladdning.
    * [SASS + CSS Injecting](https://www.browsersync.io/docs/gulp#gulp-sass-css) - Det laddar inte om hela Stilguiden när man kodar med SASS utan det byter direkt CSS effekt. Ingen omladdning längre.
    * Stilguiden bygger om bara delen som finns ändringar utan bygger allt hela tiden som det gör innan (*.css, *.js, *.image).
    * Resultatet är att Stilguiden fungerar smidigare och snabbare under utveckling.
    * __Användning__ -> Kör `gulp dev` och lokalt server är på `http://localhost:3000/` som vanligt.