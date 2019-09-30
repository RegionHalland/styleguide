# Circle button
* Komponenten justerar automatiskt ikon i mitten och det ger bara en grund form för en flexibel återanvändning.
* Komponents prefix: `rh-circle-button*`
* Filplats: `/components/Atoms/circle-button`

## 1. Varianter
|Klassnamn|Fullständigt namn|Mått i em|Mått i pixel|
|---|---|---:|---:|
|`--small`|`rh-circle-button--small`|1.875em|30px|
|`--medium`|`rh-circle-button--medium`|2.1875em|35px|
|`--large`|`rh-circle-button--large`|2.5em|40px|
|`--xlarge`|`rh-circle-button--xlarge`|3.125em|50px|

## 2. Effekt
|Klassnamn|Fullständigt namn|Beskrivning|
|---|---|---|
|`--border`|`rh-circle-button--border`|"Border" är runt om komponenten. Standard är utan "border"|
|:hover selector||Det kan kontrolleras via inställningar|
|:active selector||Det kan kontrolleras via inställningar|

## 3. Ikon
Klassen `rh-circle-button__icon` används för att man kan kontrollera ikons stil _(storlek, färg o.s.v.)_. Klassen behövs också när man använder storlekarna `large` och `xlarge`.

Exempel:
```
<div class="rh-circle-button rh-circle-button--large">
    <span class="icon-arrow-right rh-circle-button__icon"></span>
</div>
```

Man kan också justera ikons position genom att skapa en ny CSS klass och påverka `padding*` property.

Exempel:
```
.align-icon {
    padding-top: 0.1em;
}

<div class="rh-circle-button rh-circle-button--medium align-icon">
    <span class="icon-arrow-right"></span>
</div>
```

## 4. Användning
`rh-circle-button <variantnamn> [effect]`

### 4.1. Standard
```
<div class="rh-circle-button rh-circle-button--small">
    <span class="icon-plus"></span>
</div>
```

### 4.2. Border
```
<div class="rh-circle-button rh-circle-button--large rh-circle-button--border">
    <span class="icon-arrow-right rh-circle-button__icon"></span>
</div>
```

### 4.3. Länkbar
Man kan också använda `<a>` tag runt om komponenten för att det blir länkbar.
```
<a href="#">
    <div class="rh-circle-button rh-circle-button--small">
        <span class="icon-plus"></span>
    </div>
</a>
```

## 5. Version
### 1.0.0 (2019-09-25)
* Första version.