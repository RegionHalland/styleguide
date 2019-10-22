# Ändringslogg
* Version 7.3.0
* Period: 2019-10-18 - 2019-10-22

## Nya komponenter
* Molecules/menu

## Förbättring
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