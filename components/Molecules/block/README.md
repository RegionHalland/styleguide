# Block
* Komponents prefix: `rh-block*`
* Filplats: `/components/Molecules/block`

## 1. Varianter
|Namn|Beskrivning|
|---|---|
|Default|Endast rubrik är klickbar|
|Clickable|Hela puffen är klickbar|

## 2. Användning
Man kan återanvända `Clickable` funktion i andra komponenter för att de blir klickbar med att använda klasserna `rh-block--clickable` och `rh-block--clickable-link`.

### 2.1. Default (Standard)
* Använd `Default` template.

### 2.2. Clickable (Hela puffen är klickbar)
* Använd `Clickable` template.
* Standard beteende aktiveras automatiska av klassen `rh-block--clickable` och man kan också justera i komponentens inställningar.
    * :hover
    * :active
    * :focus-within

__Huvud principen:__
* En `<div>` är container och det är runt om komponenten med `position: relative;`.
* En länk `<a>` tag ska ligga ovan på hela div:n med `position: absolute; z-index: 1;`.

__Implementation:__

Användning av standard beteende:
```
<div class="rh-block--clickable">
    <a href="#" class="rh-block--clickable-link"></a>

    <div>
        <!-- Komponents innehåll -->
    </div>
</div>
```

Återanvändning i andra komponenter _(Man får bygga själv beteenden :hover, :active, :focus-within när man inte använder klassen `rh-block--clickable`)_:

```
<div class="rh-pos--relative">
    <a href="#" class="rh-block--clickable-link"></a>

    <div>
        <!-- Komponents innehåll -->
    </div>
</div>
```

## 3. Version
### 1.0.0 (2019-09-30)
* Första version.