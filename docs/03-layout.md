__INNEHÅLL__
1. [Breakpoints](#1-breakpoints)
2. [Containers](#2-containers)
   * [2.1. rh-container-px](#21-rh-container-px)
   * [2.2. rh-container--auto](#22-rh-container--auto)
   * [2.3. Annan containers](#23-annan-containers)
3. [Grid](#3-grid)
   * [3.1. Elementer i en rad har lika höjd](#31-elementer-i-en-rad-har-lika-h%c3%b6jd)
   * [3.2. Rännor (gutters)](#32-rännor-gutters)
        * [3.2.1. Standard gutters](#321-standard-gutters)
        * [3.2.2. Section gutters](#322-section-gutters)
   * [3.3. Lösning för IE11s rendering ](#32-lösning-för-ie11s-rendering)

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
Standard är utan rännor mellan elementer.

![Grid standard](/images/docs/grid-standard.jpg)

Hudvud struktur:
```
<div class="container">
    <div class="row">
        <div class="col">
            <div class="item">
                <!-- Content 1 -->
            </div>
        </div>

        <div class="col">
            <div class="item">
                <!-- Content 2 -->
            </div>
        </div>
    </div>
</div>
```
__OBS!__ Klassen `container` är bara en förklaring för en grid systems struktur.

### 3.1. Elementer i en rad har lika höjd
- Klassnamn används: 
    * `row-eq-height`
    * `col-item-eq-height`
- Filplats: `/components/scss/_grid.scss`
- Beskrivning: Alla elementer i en rad har samma höjden.

|Klassnamn|Beskrivning|
|---|---|
|`row-eq-height`|Det gör alla kolumner i en rad har samma höjden.|
|`col-item-eq-height`|Det adderar `height: 100%` på `<div>` element som är direkt barn.|

__Användning__
```
// CSS
.item {
    background-color: #f4f4f4;
}

// HTML
<div class="container">
    <div class="row row-eq-height">
        <div class="col col-12 md-col-6 lg-col-4 col-item-eq-height">
            <div class="item">
                <!-- Item 1 -->
            </div>
        </div>
        
        <div class="col col-12 md-col-6 lg-col-4 col-item-eq-height">
            <div class="item">
                <!-- Item 2 -->
            </div>
        </div>
    </div>
</div>
```

### 3.2. Rännor (gutters)
- Filplats: `/components/scss/_grid.scss`
- Beskrivning: Det skapar utrymmen runt om en element.

#### 3.2.1 Standard gutters
![Grid gutters](/images/docs/grid-gutters.jpg)

- Klassnamn används: 
    * `row-gutters`
    * `row-gutters--around`

|Klassnamn|Bredd i em|Bredd i pixel|Beskrivning|
|---|---:|---:|---|
|`row-gutters`|1.4em|22.4px|Det skapar bara rännor mellan elementer __utan__ runt om hela raden.|
|`row-gutters--around`|1.4em|22.4px|Det adderar rännor runt om hela raden.|

__Användning__
```
// CSS
.item {
    background-color: #f4f4f4;
}

// HTML för row-gutters
<div class="rh-overflow--hidden">
    <div class="row row-eq-height row-gutters">
        <div class="col col-12 md-col-6 col-item-eq-height">
            <div class="item">
                <!-- Item 1 -->
            </div>
        </div>

        <div class="col col-12 md-col-6 col-item-eq-height">
            <div class="item">
                <!-- Item 2 -->
            </div>
        </div>
    </div>
</div>

// HTML för row-gutters--around
<div class="rh-overflow--hidden">
    <div class="row row-eq-height row-gutters row-gutters--around">
        <div class="col col-12 md-col-6 col-item-eq-height">
            <div class="item">
                <!-- Item 3 -->
            </div>
        </div>

        <div class="col col-12 md-col-6 col-item-eq-height">
            <div class="item">
                <!-- Item 4 -->
            </div>
        </div>
    </div>
</div>
```
#### 3.2.2 Section gutters

![Section gutters för large och xlarge](/images/docs/section-gutters.jpg)

- Det skapar rännor mellan många sektioner i en sida. Det använder samma princip som standard gutters och det påverkar alla kolumners padding i en rad.
- Klassnamn används: `row-section-gutters`

| Läge |Rännors bredd i em|Rännors bredd i pixel|
|:---:|---:|---:|
|≤ `medium`|0.7em x 2|11.2px x 2 = 22.4px|
|`large`|0.9375em x 2|15px x 2 = 30px|
|`xlarge`|1.875em x 2|30px x 2 = 60px|

__Användning__
```
<div class="rh-overflow--hidden">
    <div class="row row-section-gutters">
        <div class="col col-12 md-col-6">
            <div class="item">
                <!-- Item 1 -->
            </div>
        </div>

        <div class="col col-12 md-col-6">
            <div class="item">
                <!-- Item 2 -->
            </div>
        </div>
    </div>
</div>
```
__TIPS!__ Man kan använda också `rh-overflow--hidden` i container nivå _(eller row nivå)_ för att content i rutsystem inte påverkar annan elementer som är utanför i nåt speciellt läge.

### 3.3 Lösning för IE11s rendering
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
