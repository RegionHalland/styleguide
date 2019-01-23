## Lokal utveckling

Få igång en lokal server genom att köra

1. `npm install`
2. `gulp`


## Köra ett bygge
1. Bygg en ny build genom att köra `gulp build`, då genereras de statiska HTML sidorna som driver sajten.


## Generera en ny version av styleguiden
1. `gulp version` genererar en ny version av komponent-CSS:en (inkl. assets) som läggs i ´/releases/[versionsnummer]/´. Dessa filer bör sedan bli ett NPM paket.


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
Genom att commita i branchen `production` så byggs en ny version av sajten på https://regionhalland-styleguide.netlify.com/index.html
