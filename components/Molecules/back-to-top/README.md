# Back to top
* Komponents prefix: `rh-back-to-top`
* Filplats: `/components/Molecules/back-to-top`

## 1. Alternativ
* Inbyggd klassen `rh-back-to-top__container` skapas för snabb användning när man vill justera komponentens position.
* `<a>` tag används när man vill att komponenten länkar till en osynlig element som är på högst upp av sidan för användare som inte har JavaScript aktiveras i deras webbläsare. Komponenten fungerar ändå.

## 2. Användning
### 2.1. Exempel 1 (standard):
```
<div id="back-to-top" class="rh-circle-button rh-circle-button--large rh-back-to-top">
    <span class="icon-chevron-up rh-circle-button__icon"></span>
</div>
```
### 2.2. Exempel 2 (`<a>` tag är en alternativ):
```
<a href="#" title="Scrolla till toppen" aria-label="Scrolla till toppen" class="rh-link--navigation">
    <div id="back-to-top" class="rh-circle-button rh-circle-button--large rh-back-to-top">
        <span class="icon-chevron-up rh-circle-button__icon"></span>
    </div>
</a>
```
### 2.3. Exempel 3 (både container och `<a>` tag är alternativ):
```
<div class="rh-back-to-top__container">
    <a href="#" title="Scrolla till toppen" aria-label="Scrolla till toppen" class="rh-link--navigation">
        <div id="back-to-top" class="rh-circle-button rh-circle-button--large rh-back-to-top">
            <span class="icon-chevron-up rh-circle-button__icon"></span>
        </div>
    </a>
</div>
```

## 3. Version
### 1.0.0 (2019-09-26)
* Första version.