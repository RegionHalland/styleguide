# Ändringslogg
* Version 8.6.0
* Period: 2019-10-29 - 2019-10-31

## Nya funktioner
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

## Förbättring
* Molecules/__block__ - Det använder @mixin för att ha konsekvent beteende från Stilguides grunden.