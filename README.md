## Lokal utveckling

Få igång en lokal server genom att...

1. Ta hem detta repos.
1. Kör `npm install`
2. Kör `npm composer install`
2. Kör `gulp`
3. Terminalen borde nu berätta för dig vilken lokal URL som servern kör på.

## Gulp kommandon

|Kommando|Beskriving|
|--------|----------|
|`gulp`| Startar en lokal utvecklingsmiljö, inkl. browsersync.|
|`gulp version`| Genererar en ny version av komponent-CSS:en (inkl. assets) som läggs i ´/releases/[versionsnummer]/´.
|`gulp build`| Bygger nya statiska fractal filer. Bygger ***inte*** releasepaketen. |

## Skapande av komponenter

Följ Fractals egna dokumentation för att skapa komponenter.


### Hantering av Javascript och bilder i komponenter
Om det finns bilder i en komponents mapp så kommer de att kompileras via gulp när du sparar.
Komponenter som innehåller javascript behöver läggas till i filen sites-building.json.

#### Bilder
Alla bilder hamnar i ´public/images/components/[komponentensnamn]/fil.jpg´ efter att gulp har kört och kan sedan nyttjas i komponentens .hbs fil t.ex. så här:

`<img src="/images/{{name}}/figure.jpg" alt="{{alt}}">`


#### Javascript

Vi använder för närvarande jQuery för att bygga js för våra komponenter. 

## Publicera
Genom att commita i branchen `production` på github (obs! inte på azure) så byggs en ny version av sajten på https://stilguide.regionhalland.se

## Att bygga stilguiden för enskilda webbplatser
Se instruktionerna i sites.building.md.
