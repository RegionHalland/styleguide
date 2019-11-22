# Molekylen "Menu"
* Komponents prefix: `rh-menu`
* Filplats: `/components/Molecules/menu`

## Planerad utveckling
* Menyn måste kunna hanteras med tangentbord
* Gå igenom fokus-states och säkerställ att de är synliga

## Versionshistorik
* 1.0.0.20191119 Satt statusen "rework" och uppdaterat READMEn med planerad utveckling

## 1. Krav
`<body>` tag
* `overflow-x: hidden`
* `height: 101vh` för att webbsidan har alltid scrollbar.

Exempel:
```
// CSS
body {
    overflow-x: hidden;
    height: 101vh; //Eller 101%
}
```

## 2. Implementation
Det är två separata sektioner som man behöver göra för menyn:
* Huvudknapp
* Menyns innehåll

Elementerna måste ha sitt eget `id`:
* `rh-menu-main-button`
* `rh-menu-close-button`
* `rh-menu-body`

### 2.1. Huvudknapp
Attributet `id` är viktigt och måste ha. Se koden är nedan

```
<div id="rh-menu-main-button" class="rh-circle-button rh-circle-button--large">
    <span class="icon-menu rh-circle-button__icon"></span>
</div>
```

### 2.2. Menyns innehåll
Många inställningar kan justeras i filen `*.settings.scss`
* `z-index`
* Menyns storlek
* Top bars storlek
* Botten bars storlek
* o.s.v.

#### 2.3. Huvudstruktur
```
<div class="rh-menu__overlay"></div>

<div id="rh-menu-body" class="rh-menu__body">
    <div class="rh-menu__top-bar"></div>

    <!-- Item list -->
    <div>
        <!-- An item -->
        <div class="rh-menu__item">
            <a class="rh-link--navigation">Text</a>
            <div id="" class="rh-circle-button rh-circle-button--small rh-menu__item-button">
                <span class="icon-plus"></span>
            </div>
        </div>

        <div id="" class="rh-menu__item-sub-container">
            <!-- Sub item 1 -->
            <!-- Sub item 2 -->
            <!-- Sub item N -->
        </div>
        <!-- An item -->
    </div>

    <div class="offset-bottom"></div>
</div>

```
__OBS!__ Klasserna som har använts är bara huvudklasser och menyn behöver också många andra klasser för att fungera som det ska.

## 3. Versionhistorik
### 1.0.0-201911181340 (2019-11-18)
* [__Ny__] - Man kan använda "ESC" knappen på tangenbordet för att stänga menyn.
* [__Förbättring__] Använda `e.preventDefault()` för huvudknappen för prestandar och enkelhet för implementation till `<a>` tag.