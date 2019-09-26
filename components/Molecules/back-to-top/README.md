# Back to top
* Komponents prefix: `rh-back-to-top`
* Filplats: `/components/Molecules/back-to-top`

## 1. Notis
Man kan också använda `<a>` tag runt om ikonen för att länka till en osynlig element som ligger på högst upp av sidan när användare inte har aktiverat JavaScript i deras webbläsare.

## 2. Användning
```
<div id="back-to-top" alt="Scrolla till toppen" aria-label="Scrolla till toppen" class="rh-circle-button rh-circle-button--large rh-back-to-top">
    <span class="icon-chevron-up rh-circle-button__icon"></span>
</div>
```
Eller
```
<a href="#">
    <div id="back-to-top" alt="Scrolla till toppen" aria-label="Scrolla till toppen" class="rh-circle-button rh-circle-button--large rh-back-to-top">
        <span class="icon-chevron-up rh-circle-button__icon"></span>
    </div>
</a>
```

## 3. Version
### 1.0.0 (2019-09-26)
* Första version.