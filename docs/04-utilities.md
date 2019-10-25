__INNEHÅLL__
1. [Display](#1-display)
2. [Padding left](#2-padding-left)
3. [Overflow](#3-overflow)
4. [Section gutters](#4-section-gutters)
    * [4.1. section-gutter-lx](#41-section-gutter-lx)
5. [Position](#5-position)
6. [Övriga](#6-övriga)

Filplats: `/components/scss/_utilities.scss`

## 1. Display
* Prefix: `rh-dp*`

|Klassnamn|Fullständigt namn|Beskrivning|
|---|---|---|
|-sm|rh-dp-sm|Det synas f.o.m. `small` läge och ner åt|
|-md|rh-dp-md|-|
|-lg|rh-dp-lg|-|
|-from-sm|rh-dp-from-sm|Det synas f.o.m. `small` läge och upp åt|
|-from-md|rh-dp-from-md|-|
|-from-lg|rh-dp-from-lg|-|
|-from-xl|rh-dp-from-xl|-|
|-only-sm|rh-dp-only-sm|Det synas __bara__ i `small` läge|
|-only-md|rh-dp-only-md|-|
|-only-lg|rh-dp-only-lg|-|
|--show|rh-dp--show|`display: block`|
|--inline-block|rh-dp--inline-block|`display: inline-block`|
|--none|rh-dp--none|`display: none`|

## 2. Padding left
* Prefix: `rh-pl*`
* __Tips!__ Det är användbart för att skapa en meny komponent som har många nivåer.

|Fullständigt klassnamn|Mått i em|mått i pixel|
|---|---:|---:|
|rh-pl-05|0.3125em|5px|
|rh-pl-1|0.625em|10px|
|rh-pl-15|0.9375em|15px|
|rh-pl-2|1.25em|20px|
|rh-pl-25|1.5625em|25px|
|rh-pl-3|1.875em|30px|
|rh-pl-35|2.1875em|35px|
|rh-pl-4|2.5em|40px|
|rh-pl-45|2.8125em|45px|
|rh-pl-5|3.125em|50px|
|rh-pl-55|3.4375em|55px|
|rh-pl-6|3.75em|60px|
|rh-pl-65|4.0625em|65px|
|rh-pl-7|4.375em|70px|
|rh-pl-75|4.6875em|75px|
|rh-pl-8|5em|80px|
|rh-pl-85|5.3125em|85px|
|rh-pl-9|5.625em|90px|
|rh-pl-95|5.9375em|95px|
|rh-pl-10|6.25em|100px|

## 3. Overflow
* Prefix: `rh-overflow*`

|Klassnamn|Fullständigt namn|Beskrivning|
|---|---|---|
|--visible|rh-overflow--visible|`overflow: visible`|
|--auto|rh-overflow--auto|`overflow: auto`|
|--scroll|rh-overflow--scroll|`overflow: scroll`|
|--hidden|rh-overflow--hidden|`overflow: hidden`|

## 4. Section gutters
### 4.1. section-gutter-lx
* Prefix: `rh-section-gutter-lx*`
* Det används för endast lägen `large` och `xlarge`. Det skapar avstånd mellan kolumner.

![Section gutters för large och xlarge](/images/docs/section-gutters.jpg)

|Klassnamn|Fullständigt namn|Avstånd i `large` läge|Avstånd i `xlarge` läge|
|---|---|---:|---:|
|__left-side|rh-section-gutter-lx__left-side|0.9375em (15px)|1.875em (30px)|
|__between-side|rh-section-gutter-lx__between-side|0.9375em - 0.9375em|1.875em - 1.875em|
|__right-side|rh-section-gutter-lx__right-side|0.9375em|1.875em|

## 5. Position

|Klassnamn|Fullständigt namn|Beskrivning|
|---|---|---|
|--static|rh-pos--static|`position: static`|
|--relative|rh-pos--relative|`position: relative`|
|--absolute|rh-pos--absolute|`position: absolute`|
|--fixed|rh-pos--fixed|`position: fixed`|

## 6. Övriga
|Klassnamn|Fullständigt namn|Beskrivning|
|---|---|---|
|-no-scroll|rh-noscroll|Det låser scrollbar|
