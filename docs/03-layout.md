__INNEHÅLL__
1. [Breakpoints](#1-breakpoints)
2. [Containers](#2-containers)
   * [2.1. rh-container-px](#21-rh-container-px)
   * [2.2. rh-container--auto](#22-rh-container--auto)
   * [2.3. Annan containers](#23-annan-containers)
3. [Grid](#3-grid)
   * [3.1. Kolumner i en rad har lika höjd](#31-kolumner-i-en-rad-har-lika-h%c3%b6jd)

## 1. Breakpoints
| Klassnamn | min-width | Pixel | Beskrivning |
|:---:|---:|---:|---|
|xs|0|< 576px |"Mobile first" - xs är standardläge|
|`small`|36em|>= 576px| |
|`medium`|48em|>= 768px| |
|`large`|62em|>= 992px| |
|`xlarge`|75em|>= 1200px| |

__Användning__

`@include medium {...}`

## 2. Containers
### 2.1. `rh-container-px`
- Filplats: `/components/scss/_utilities.scss`
- Beskrivning: container med både `padding-left` och `padding-right` för respektive breakpoint.

| Breakpoint | padding-x| Pixel |
|:---:|---:|---:|
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
- Beskrivning: container är i mitten av användares skärm med detaljen är nedan.
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
    <!-- Content här -->
</div>
```

### 2.3. Annan containers
- `rh-container--center`: aligna en container i mitten av användares skärm.
- `rh-container--min-width`: applicera bara `min-width: 20em;` som definieras i global.
- `rh-container--max-width`: applicera bara `max-width: 90em;` som definieras i global.

__Användning__
```
<div class="rh-container--center">
    <!-- Content här -->
</div>

<div class="rh-container--min-width">
    <!-- Content här -->
</div>

<div class="rh-container--max-width">
    <!-- Content här -->
</div>
```

## 3. Grid

### 3.1. Kolumner i en rad har lika höjd
- Klassnamn: `row row-eq-height`
- Filplats: `/components/scss/_grid.scss`
- Beskrivning: Alla kolumner har samma höjden i en rad. Man bör sätta själv `height: 100%` på varje element i griden.

__Användning__
```
<div class="clearfix row row-eq-height">
    <div class="col col-12 md-col-6 lg-col-4">
        <!-- Element 1 -->
    </div>
    
    <div class="col col-12 md-col-6 lg-col-4">
        <!-- Element 2 -->
    </div>
</div>
```