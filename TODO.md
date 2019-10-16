# TODO

## Ersättning

### Komponenter
Komponenterna kommer ersättas i nästa major version. De finns parallella tills alla sajter uppgraderas till passande version.

_OBS! Det kommer bli en stor brytning._

|Grupp|Namn|Ersättas av|Status|
|---|---|---|---|
|__Atoms__|round-button|circle-button|-|
||form|form-control-text|-|
||form|form-control-textarea|-|
|__Molecules__|blurbs|block|-|
||linkgroup|_Förbättring eller ersättning?_|-|
||navigation-card|navigation-block|-|
||rh-shortcuts|_Förbättring eller ersättning?_|-|
||rh-unit-info|contact-info|-|
|__Organism__|rh-footer|footer-group|-|
||rh-footer-logo|footer-logo-group|-|

### Container
Specifika container för komponenterna kommer också ersättas av generella container som är inbyggda i rutsystem _(grid system)_.

_OBS! Det kommer __inte__ bli någon brytning._

* row-eq-height
* row-gutters
* row-section-gutters
* col-item-eq-height

|Grupp|Namn|Användning av|Status|
|---|---|---|---|
|__Organism__|block-group|`row-gutters`|-|
||footer-group|`row-section-gutters`|-|
||navigation-block-group|`row-gutters`|-|

## Liknande komponenter
Komponenterna har liknande beteende och behövs ordning.

|Grupp||Namn|Förslag|
|---|---|---|---|
|__Molecules__|Grupp 1|iconlink|Användning av Atoms/circle-button|
|||label-previous|Användning av Atoms/circle-button|
||Grupp 2|rh-search-external-link|Behållning|
|||rh-search-external-link-1177|Använding av rh-search-external-link med SCSS inställningar|

## Otydlig komponent
Komponenter behövs ha tydligare exempel _(*.hbs)_ för att det blir enklare att förstå hur det fungerar.
|Grupp|Namn|
|---|---|
|Molecules|article|