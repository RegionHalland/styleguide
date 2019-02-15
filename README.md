[![Netlify Status](https://api.netlify.com/api/v1/badges/e6de71e9-aa04-4c54-8562-c68501d3f755/deploy-status)](https://app.netlify.com/sites/regionhalland-styleguide/deploys)

## Lokal utveckling

Få igång en lokal server genom att...

1. Ta hem detta repos.
1. Kör `npm install`
2. Kör `gulp`
3. Terminalen borde nu berätta för dig vilken lokal URL som servern kör på.

## Gulp kommandon

|Kommando|Beskriving|
|--------|----------|
|`gulp`| Startar en lokal utvecklingsmiljö, inkl. browsersync.|
|`gulp version`| Genererar en ny version av komponent-CSS:en (inkl. assets) som läggs i ´/releases/[versionsnummer]/´. Dessa filer bör sedan bli ett NPM paket.|
|`gulp build`| Bygger nya statiska fractal filer. Bygger ***inte*** releasepaketen. |

## Skapande av komponenter

Följ Fractals egna dokumentation för att skapa komponenter.


### Hantering av Javascript och bilder i komponenter
Om det finns bilder eller JS i en komponents mapp så kommer de att kompileras via gulp när du sparar.

#### Bilder
Alla bilder hamnar i ´public/images/components/[komponentensnamn]/fil.jpg´ efter att gulp har kört och kan sedan nyttjas i komponentens .hbs fil t.ex. så här:

`<img src="/images/{{name}}/figure.jpg" alt="{{alt}}">`


#### Javascript

**Bygg med ES6, gulpscriptet ser till att all JS körs genom Babel.**

Finns det `.js` filer i komponentmappen så konkateneras de ihop och sparas i `/public/js/components.js`. Utöver det så bör de fungera out of the box.

## Publicera
Genom att commita i branchen `production` så byggs en ny version av sajten på https://stilguide.regionhalland.se
