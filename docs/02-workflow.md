Komponenter för RegionHalland.se
Arbetsdokument över processen för skapande av komponenter

# Riktlinjer
* Riktlinjerna för hur kodning ska ske är baserat på VGRegionens stilguide (http://stilguiden.vgregion.se/). Specifikt då avsnitten om SASS/CSS. 

# Arbetsprocess
* Kolla på komponenterna i den ordning som de är prioriterade i en särskild spalt i general-repot
* Hitta komponenterna i Figma
* Bryta ut sådant i första komponenten som skall vara atomer och börja med att implementera dessa i sass (t.ex. en rh-button). Lägg koden i fractal
* Prefixar allt med SASS kod med "rh-" och namnger i övrigt enligt BEM
* Bygger komponenten som SASS i fractal
* Tweaka eventuellt beroende på QA från Viktor och Frida + teamets synpunkter. 
* Gör en release (troligen till NPM-paket) som teamet kan konsumera för att implementera den nya komponenten på regionhalland.se (Semantisk versionsnumrering gäller - semver.org). Görs troligen av teamet på Region Halland.
* Gå till nästa komponent. Se om några existerande atomer kan användas eller om några nya kan skönjas. 
* Implementera nästa komponent. (Upprepa tills det är slut på nya komponenter)
* RH team - När allt är färdigt så har vi ett bibliotek med egen SASS-kod som kompilerar till en release med CSS vi kan lägga på NPM (m.fl.). Dessutom en färdig mall för markupen som exponeras på webbplatsen.
* RH team – När en ny version ska ut på siten så Mergar man först in den branch man arbetat med till production, för att få ut komponenterna till Stilguide.regionhalland.se
