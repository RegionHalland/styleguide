__INNEHÅLL__
1. [Breakpoints](#1-breakpoints)
2. [Containers](#2-containers)
   * [2.1. rh-container-px](#21-rh-container-px)
   * [2.2. rh-container--auto](#22-rh-container--auto)
   * [2.3. Annan containers](#23-annan-containers)
3. [Grid](#3-grid)
   * [3.1. Kolumner i en rad har lika höjd](#31-kolumner-i-en-rad-har-lika-h%c3%b6jd)
   * [3.2. Lösning för IE11 ](#32-lösning-för-ie11)

## 1. Breakpoints
| Klassnamn | min-width | Pixel | Beskrivning |
|:---:|---:|---:|---|
||0|<576px|xs - Phones - Standardläge|
|`small`|36em|≥576px|Landscape phones|
|`medium`|48em|≥768px|Tablets|
|`large`|62em|≥992px|Desktops|
|`xlarge`|75em|≥1200px|Large desktops|

__Användning__

Exempel: `@include medium {...}`

## 2. Containers
### 2.1. `rh-container-px`
- Filplats: `/components/scss/_utilities.scss`
- Beskrivning: container har både `padding-left` och `padding-right` för respektive breakpoint.

| Breakpoint | padding-x| Pixel |
|:---:|---:|---:|
|xs|0.7em|11.2px|
|`small`|1em|16px|
|`medium`|1.875em|30px|
|`large`|3.75em|60px|
|`xlarge`|5em|80px|

__Användning__
```
<div class="rh-container-px">
    <!-- Content här -->
</div>
```

### 2.2. `rh-container--auto`
- Filplats: `/components/scss/_utilities.scss`
- Beskrivning: justera en container i mitten med detaljen är nedan.
```
    width: 100%;
    min-width: 20em; //320px
    max-width: 90em; //1440px
    margin-left: auto;
    margin-right: auto;
```

__Användning__
```
<div class="rh-container--auto">
    <!-- Content -->
</div>
```

### 2.3. Annan containers
|Klassnamn|Beskrivning|
|---|---|
|rh-container--center|Justera en container i mitten|
|rh-container--min-width|Applicera __bara__ `min-width: 20em` _(definieras i global)_|
|rh-container--max-width|Applicera bara `max-width: 90em` _(definieras i global)_|

__Användning__
```
<div class="rh-container--center">
    <!-- Content -->
</div>

<div class="rh-container--min-width">
    <!-- Content -->
</div>

<div class="rh-container--max-width">
    <!-- Content -->
</div>
```

## 3. Grid
Hudvud struktur:
```
<div class="container">
    <div class="row">
        <div class="col">
            <!-- Content 1 -->
        </div>

        <div class="col">
            <!-- Content 2 -->
        </div>
    </div>
</div>
```
___OBS!__ Klassen `container` är bara en förklaring för ett grid systems struktur._

### 3.1. Kolumner i en rad har lika höjd
- Klassnamn: `row row-eq-height`
- Filplats: `/components/scss/_grid.scss`
- Beskrivning: Alla kolumner i en rad har samma höjden. Man bör sätta själv `height: 100%` på varje element i griden.

__Användning__
```
// CSS
.item {
    height: 100%;
}

// HTML
<div class="container">
    <div class="row row-eq-height">
        <div class="col col-12 md-col-6 lg-col-4">
            <div class="item">
                <!-- Item 1 -->
            </div>
        </div>
        
        <div class="col col-12 md-col-6 lg-col-4">
            <div class="item">
                <!-- Item 2 -->
            </div>
        </div>
    </div>
</div>
```

### 3.2 Lösning för IE11s rendering
* Anledning: IE11 räknar inte bra när det är odda nummer lik som: 33.3333333333...%. Det renderar om mycket och blinkar när bredden är nära begränsningarna.
* Lösning: `max-width` används för att IE11 renderar bättre. Se mer i filen `/components/scss/_grid.scss`

|Klassnamn|`max-width` (%)|
|:---:|---:|
|*-col-1|8.33%|
|*-col-2|16.66%|
|*-col-3|25%|
|*-col-4|33.33%|
|*-col-5|41.66%|
|*-col-6|50%|
|*-col-7|58.33%|
|*-col-8|66.66%|
|*-col-9|75%|
|*-col-10|83.33%|
|*-col-11|91.66%|
|*-col-12|100%|
