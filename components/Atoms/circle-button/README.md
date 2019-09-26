# Circle button
* Prefix: `rh-circle-button*`

## 1. Varianter
|Klassnamn|Fullständigt namn|Em|Pixel|
|---|---|---:|---:|
|`--small`|`rh-circle-button--small`|1.875em|30px|
|`--medium`|`rh-circle-button--medium`|2.1875em|35px|
|`--large`|`rh-circle-button--large`|2.5em|40px|
|`--xlarge`|`rh-circle-button--xlarge`|3.125em|50px|

## 2. Effects
|Klassnamn|Fullständigt namn|
|---|---|
|`--border`|`rh-circle-button--border`|
|:hover selector|-|
|:active selector|-|

## 3. Ikon
* `rh-circle-button__icon` används för att kontrollera ikons storlek när man använder storlekarna `large` och `xlarge`.

## 4. Användning
* `rh-circle-button <variantnamn> [effect]`

Exempel:

```
<div class="rh-circle-button rh-circle-button--small">
    <span class="icon-plus"></span>
</div>

<div class="rh-circle-button rh-circle-button--large rh-circle-button--border">
    <span class="icon-arrow-right rh-circle-button__icon"></span>
</div>
```

## 5. Version
### 1.0.0 (2019-09-25)
* Första version.