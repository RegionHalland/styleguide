# Block
* Komponents prefix: `rh-block*`
* Filplats: `/components/Molecules/block`

## 1. Varianter
|Namn|Beskrivning|
|---|---|
|Default|Endast rubrik är klickbar|
|Clickable|Hela puffen är klickbar|

## 2. Användning
Man kan kontrollera komponenten via variabel `$block__box--isClickable` i filen `block.settings.scss`.

### 2.1. Default (Standard)
* Inaktivera variabel `$block__box--isClickable: false;` i filen `block.settings.scss`.
* Använd `Default` template.

### 2.2. Clickable (Hela puffen är klickbar)
* Aktivera variabel `$block__box--isClickable: true;` i filen `block.settings.scss`.
* Många andra beteende aktiveras automatiska och man kan också justera i komponentens inställningar.
* Använd `Clickable` template.

## 3. Version
### 1.0.0 (2019-09-30)
* Första version.