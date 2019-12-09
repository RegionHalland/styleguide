# Versioner av stilguiden och deras ändringar

## 10.1.1 (2019-12-09)
* Atomen "button" har fått separata effekter _(:hover, :active, :focus)_ och det blir enklare och mer flexibel för att justera inställningar.
* Dependencies har uppdaterats _(Fractal, Babel, ESLint o.s.v.)_

## 10.1.0
Ändringar:
* Molekylen "Feedback" renderar button istället för att hårdkoda
* Organismen "Feedback last updated" har fått en ny .hbs-fil utan hårdkodade komponenter.
* Atomen "Heading underlined" har fått större omarbetning
* Organismen "Article group" använder nu atomen "Heading underlined" och har färre egna regler.

## 10.0.0
### Brytande ändringar
#### Atomen "pagination elements"
* `--left` ersätter `-previous`
* `--right` ersätter `next`

#### Molekylen "pagination"
* Klassen `rh-pagination-group` är raderad. Funktionen har tagits över av existerande `rh-pagination-link`.

#### Andra ändringar
* Config och .hbs genomgången på "pagination elements" och "pagination"
* Mindre ändring i labels och dess sökväg.

## 9.9.5
* Breadcrumbs fått status "rework" och planerad utveckling i readme-filen.
* De nu oanvända mapparna "releases" och "sites" har raderats.

## 9.9.4 (2019-11-25)
* Byggmiljö får bättre prestanda och felhantering.
* Uppdaterat filen `site.building.json`.

## 9.9.3
Template "general/content page" korrigerad då en ingående komponent inte längre har prefix.

## 9.9.2 (2019-11-25)
* Fitxat prefix för filnamn i Organisms/__breadcrumbs__ komponent. Det börjar med `breadcrumbs*`.
* Uppdaterat dependencies för byggmiljö _(Babel, ESLint)_.

## 9.9.1
Namngivning av mappar återgått till atoms, molecules, organisms, templates utan "v" efter att alla komponenter flyttat till gitrepon.
OBS! Organisms är nu i pluralform. Se över sökvägar i projekten.

## 9.9.0
### Organismer som flyttat till gitrepon och fått nya sökvägar:
* Article group
* Block group
* Breadcrumbs
* Calendar
* Feedback last updated
* Footer
* Footer group
* Footer logo
* Footer logo group
* Header
* Main nav
* Navigation block group
* Search
* Table
* Toplinks

(Ett antal av dessa har också rensats på prefixet "Rh" i navigationen och sökvägar)

## 9.8.1 (2019-11-22)
* Förbättring av:
    * Grid system.
    * Organism/__rh-breadcrums__ komponent _(settings)_.
    * Byggmiljö får bättre prestanda.

## 9.8.0

### Molekyler som flyttat till gitrepon och fått nya sökvägar:
* Menu
* Menu Mobile
* Messages
* Navigation block
* Navigation card
* News info
* Page nav
* Pagination
* Personal info
* Search elements
* Search external link
* Search external link 1177
* Secondary nav
* Tabs
* Unit info
* Video

(Ett antal av dessa har också rensats på prefixet "Rh" i navigationen och på hänvisningar till gamla github-stories.)

## 9.7.0

### Molekyler som flyttat till gitrepon och fått nya sökvägar:
* Article
* Blurbs
* Calendar Element
* Event card calendar
* Feedback
* Feedback form
* Label Previous
* Last updated
* Linkgroup
* Lists
* Logo sitename

## 9.6.0

### Ändringar
* Menu fått bättre prestanda och stöd för att stänga med esc.
* Cookie notice fått tweakad javascript för bättre prestanda.
* Templates är nu tillgängliga för att visa hur komponenterna fungerar tillsammans på en sida.
* Nytt kommando gulp help.

### Ändrade statusar
* Molekylen "label previous" har fått statusen "Inväntar ombyggnad" och README-fil som inkluderar planerad utveckling
* Molekylen "linkgroup" har fått statusen "Inväntar ombyggnad" och README-fil.
* Molekylen "lists" har fått statusen "Inväntar ombyggnad" och README-fil.
* Molekylen "Logo sitename" fått statusen "Inväntar ombyggnad" och README-fil med planerad utveckling.
* Molekylen "Menu" fått statusen "Inväntar ombyggnad" och README-fil med planerad utveckling.

### Ändrade sökvägar pga flytt till gitrepon - atomerna:
* Badge
* Card
* Filter
* Form
* Form control text
* Form control textare
* Link
* Round button
* Search field
* Text

## 9.5.1
### Byggmiljö
* Ny alternativ när man kör `gulp builds` och `gulp releases`
    * `-o` - Overwrite - Det kommer skriva över befintliga filer.
    * `-m` - Minify - Det minifierar både CSS och JS filer.
* Exempel:
    * `$ gulp builds -s -m -o vuxhalland`
    * `$ gulp releases -s -m vardgivare`

## 9.5.0
### Nya sökvägar
* Atomen "Visual element" har markerats som klar och flyttat till vAtom och ligger i gitrepo
* Molekylen "Cookie notice" omdöpt till "Message cookies", flyttad till gitrepo, tweakad config och fått README

### Ändringar
* Ny status "Fasas ut - end of life" med koden "eol" är nu tillgänglig.
* Ny status "Inväntar ombyggnad" med koden "rework" är nu tillgänglig.
* Statusindikatorerna i vänstermenym är nu solida för bättre synlighet.
* Atomen "Form control text" har fått uppdaterad status och readme.
* Atomen "Form control textarea" fått uppdaterad status och readme.
* Atomen "Link" visar navigationslänkar, status uppdaterad och fått README
* Atomen "Search field" har fått uppdaterad status och en README.
* Atomen "Text" genomgången med config-fil, hbs-fil och skapat README.
* Molekylen "Feedback form" är något justerad och har nu statusen "Inväntar ombyggnad" eftersom den skall flyttas till organismer.
* Dokumentationen nu fått en synligare plats ovanför komponenterna i navigationen.


## 9.4.1
### Ny funktion
* Utilities/__`rh-dp--inline-flex`__

### Förbättring
* `@mixin-components.scss` - Kondition för att generera inne effekter har ändrats från "and" till "or".
* Använda `block` version 1.2.0
* Använda `image-hero` version 1.0.1

## 9.4.0

### Nya sökvägar
* Atomen "Pagination elements" flyttat till gitrepo och fått ny sökväg
* Atomen "Button" flyttat till gitrepo och fått ny sökväg

### Markerade som "End of life"
* Atomen "Form"
* Atomen "Avatar"
* Atomen "Badge"
* Atomen "Round button"
* Molekylen "Article"
* Molekylen "Blurbs"
* Molekylen "Rh personal info"
* Molekylen "Rh unit info"
* Molekylen "Calendar element"
* Organismen "Rh footer"
* Organismen "Rh footer logo"
* Organismen "Rh calendar"

## 9.3.0

* Ny atom introducerad "Heading underlined" - ligger i vAtoms

## 9.2.0
### Komponenter som flyttat till gitrepon och fått nya sökvägar
* Atomen labels
* Molekylen "buttongroup elements"
* Organismen "buttongroup"

## 9.1.0
### Utökningar
* Ny molekyl "Buttongroup elements"

### Ändringar
* Atomen "Labels" fått texten flyttad till configfilen för att kunna skrivas över när man inkluderar atomen i en annan komponent
* Atomen "Button" har fått större text och padding på mindre viewports
* Molekylen "Buttongroup" har nu flyttat till organismer och inkluderar buttongroup elements.

## 9.0.3
### Brytande ändring
* Organism - Komponenten __rh-toplinks__ har bytts namn till __toplinks__

### Förbättring
* Molecules - __navigation-block__ har fått förbättringar.
    * Man kan nu justera beteenden `:hover`, `:active`, `:focus-within` för icon.
    * Det stödjer bättre IE11.

## 9.0.2 ([b99e9716](https://regionhalland.visualstudio.com/public.RhWebStyleguide/_git/RhWebStyleguide/commit/b99e97169a99569cbbcd16033191c2523749f9f2/))
### Förbättring
* Molecules/__block__ - Updaterats till version 1.1.1 -> Komponenten använder ny version av @mixin `create-clickable-element-effect` som finns i Stilguiden från version 9.0.1
* Byggmiljö:
    * Updaterat dependencies till senast versioner.
    * Använda ny paketen: ESLint, jQuery, EditorConfig

## 9.0.1 ([917193ec](https://regionhalland.visualstudio.com/public.RhWebStyleguide/_git/RhWebStyleguide/commit/917193ecf738bd8688bf51f0ec0b340b48a44dc9/))
### Förbättring
* @mixin `create-clickable-element-effect` - Man har nu två alternativ för att välja. Det blir mer flexibel:
    * `effect-outside`
    * `effect-inside`
* Komponenten `navigation-block` - Använda ny @mixin för effekter _(`:active`, `:hover`, `:focus-within`)_.
* Byggmyljö:
    * Bättre felhantering.
    * Tydligare meddelande.

## 9.0.0

### Brytande ändringar

#### Molekylen "rh shortcuts"

* Molekylen flyttat till ett vMolecules och fått ny sökväg
* Ny markup
* Bytt namn till "block shortcuts"
* Fokusbeteende definierat
* Tillgänglighet förbättrad - listan namnges av rubriken
* Readme-fil med versionshistorik och implementeringsråd
* Settings-fil introducerad
* Sass-filen genomgången och strukturerad
* Den blå varianten raderades

### Ej brytande ändringar

* vMolekylen "article block" uppdaterades till 1.0.1 som återställde labels från skiss och tidigare implementation
* Denna dokumentation kompletterades med information om tidigare releaser

## 8.6.0 ([f0dd4a4b](https://dev.azure.com/regionhalland/public.RhWebStyleguide/_git/RhWebStyleguide/commit/f0dd4a4b7a728600871b85608f162d901cac1781?refName=refs%2Fheads%2Fmaster))

### Nya funktioner
* Klickbar element - Det gör hela en element blir klickbar. Man kan skapa elementens beteende
    * `rh-element--clickable`
    * `rh-element--clickable-link`
* Molecules/__navigation-block__ - Det finns en ny variant `Clickable` som kan vara klickbar. Varianterna är nu:
    * Default
    * Clickable
* Organism/__navigation-block-group__ - Det finns en ny variant `Clickable` som varje element kan vara klickbar. Varianterna är nu:
    * Default
    * With container
    * Clickable _(Det har med sig också container för snabb användning)_

### Förbättring
* Molecules/__block__ - Det använder @mixin för att ha konsekvent beteende från Stilguides grunden.

## 8.5.0

### Komponenter flyttade till gitrepos och fått nya sökvägar:
* Contact info 1.0.0 - molekyl
* Filter alphabet 1.0.0 - molekyl

## 8.4.0

### Komponenter flyttade till gitrepos och fått nya sökvägar:
* Article block 1.0.0 - molekyl
* Caption hero 1.0.0 - atom
* Image hero 1.0.0 - molekyl
* Image caption 1.0.0 - molekyl

### Andra ändringar
* Article block 1.0.0 - Introducerat versionshistorik för komponeten under "Notes"


## 8.3.0
Molekyl: Navigation left 1.1.0
* Flyttat till vMolecules i stilguiden - peka om sökvägen till vMolecules vid användning.

## 8.2.0

### Utökningar
Molekyl: Filter alphabet 1.0.0
* Fullt stöd för settingsfil.
* Fokus-beteende introducerat.
* Versionshistorik för komponenten skapad under "Notes".
* Exempelkoden uppdaterad.
* Stöd för `--inactive` som visuellt indikerar inaktiverade val.

## 8.1.5 ([b419de66](https://dev.azure.com/regionhalland/public.RhWebStyleguide/_git/RhWebStyleguide/commit/b419de668e2a5251da4a842c881719faecdf57b1?refName=refs%2Fheads%2Fmaster))
### Ändringar
* "Footer logo group"-organismen justerades för att förbättra logotypernas positionering.

## 8.1.4 ([7560eac5](https://dev.azure.com/regionhalland/public.RhWebStyleguide/_git/RhWebStyleguide/commit/7560eac5455f7c1b78d587a0799559307d213204?refName=refs%2Fheads%2Fmaster))
### Ändringar
* "Footer logo group"-organismen fick den extra varianten "has links".

## 8.1.3 ([d0a3cf9c](https://dev.azure.com/regionhalland/public.RhWebStyleguide/_git/RhWebStyleguide/commit/d0a3cf9c35283d53c925d59ec7b6bf7aedba02e7?refName=refs%2Fheads%2Fmaster))
Merge-konflikt ordnad

## 8.1.2
### Ändringar
* "Contact info"-molekylen fått ändringar för tillgänglighetens skull

## 8.1.1 ([3b2eb1d3](https://dev.azure.com/regionhalland/public.RhWebStyleguide/_git/RhWebStyleguide/commit/3b2eb1d367458051438cba1360c25856b42aa4d3?refName=refs%2Fheads%2Fmaster))
### Ändringar
* "Article block"-molekylen fick bättre utseende på fokus-state vid radbrytning

## 8.1.0
### Ändringar
* "Back to top"-molekylen flyttad till vMolecules och fått en ny sökväg.

## Version 8.0.0

### Beteendebrytande ändringar
* Den extra captionklass som fanns i molekylen "image hero" är borttagen. Används den nya settings-filen för "caption hero" istället.

### Övriga ändringar
#### Atomer
* Avatar visas med korrekt muspekare och två bokstäver istället för ikon.
* Caption hero har fått settingsfil och är markerad som färdig.

#### Molekyler
* Image hero har fått en settingsfil
* Article block 1.0.0: focusstate skapat
* Navigation left 1.1.0: focusstate och readme skapat.

## Version 7.3.0 ([4d6e1dae](https://dev.azure.com/regionhalland/public.RhWebStyleguide/_git/RhWebStyleguide/commit/4d6e1daeef8ca5273908a421923ac4d26752c908?refName=refs%2Fheads%2Fmaster))
Period: 2019-10-18 - 2019-10-22

### Nya komponenter
* Molecules/menu

### Förbättring
* @mixin
    * Det finns nu nya containers:
        * rh-container-py
        * rh-container-p
    * Befintliga containers:
        * rh-container-px
        * rh-container--auto
* Använda många verktyg i Stilguides grunden istället för specifika containers i varje komponent:
    * Organism/block-group
    * Organism/navigation-block-group
    * Organism/footer-group

Det blir bättre prestanda, snabbare för implementation, enklare för underhållning och utveckling samt bättre konsekvent mellan komponenter i Stilguiden.

## 7.2.0
### Utökningar
* Circle button-atomen fått stöd för modifiern --secondary

## 7.1.0
### Ändringar
* Molekylen "back to top" angiven som klar.

## 7.0.0
### Brytande ändringar
* "Iconlink"-molekylen raderad.

## Version 6.1.1 (2019-10-17)
Period: 2019-10-16 - 2019-10-17

### Nya komponenter
* Molecules/contact-info - Det kommer bli en ersättning för komponenten Molecules/rh-unit-info

### Förbättring
* Molecules/article-block - Fixat `<time>` tags beteende på Safari _(både iOS och MacOS)_

### Byggmiljö
* Ny funktion med kommandon `$ gulp dev -r`:
    * Man kan omkompilera filer i `/public` mappen. Exempel:
        * `/public/css/components.css`
        * `/public/css/components.css.map`
        * `/public/js/components.js`
    * Det är använbart när man behöver fixa merge konflikt för parallell brancher eller bara vill omkompilera Stilguiden för senast uppgradering efter man har pullat ner en branch.
* Förbättring för Gulp avvaktning _(*.json adderats)_.

## 6.1.0

## 6.0.1
Versionsnummer i sites building justerat.

## 6.0.0
Samlingsrelease av en längre periods ändringar - släpptes innan 5.2.0, men ligger i otakt pga att branchen 5.2.0 mergats in.

## 5.2.0 (2019-10-15)
Period: 2019-10-01 - 2019-10-15

## Nya komponenter
Vi börjar använda versions formatet `[versionnumber]-[timestamp]` för alpha, beta o.s.v. ([Se mer på design.regionhalland.se](https://design.regionhalland.se/verktyg/versionshantering/))

* Molecules/article-block
* Organism/article-group
* Organism/footer-logo-group

### Förbättring
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

### Byggmiljö
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

## 5.0.0

## 4.2.0

## 4.1.0

## 4.0.0

## 3.0.0

## 2.0.0

## 0.2.0

## 0.1.0


