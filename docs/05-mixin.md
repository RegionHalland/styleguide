__INNEHÅLL__
1. [create-container-px](#1-create-container-px)
2. [create-container-py](#2-create-container-py)
3. [create-container-p](#3-create-container-p)
4. [iOSNoIncreaseFontSize](#4-iOSNoIncreaseFontSize)
5. [create-clickable-element-effect](#5-create-clickable-element-effect)

Filplats:
* `/components/scss/_mixin.scss`
* `/components/scss/_mixin-components.scss`

## 1. create-container-px
`create-container-px($name, $offset-left: 0, $offset-right: 0)`

|Variabel|Datatyp|Krav|Beskrivning|
|---|:---:|:---:|---|
|$name|string|obligatorisk|Containers namn|
|$offset-left|number|frivillig|Används f.o.m. `medium` läge|
|$offset-right|number|frivillig|Används f.o.m. `medium` läge|

__Användning__

`@include create-container-px(...) { //Extra styling }`

## 2. create-container-py
`create-container-py($name, $padding-y: 1.875em, $offset-top: 0, $offset-bottom: 0)`

|Variabel|Datatyp|Krav|Beskrivning|
|---|:---:|:---:|---|
|$name|string|obligatorisk|Containers namn|
|$padding-py|string|frivillig|Används för både `padding-top` och `padding-bottom`. `1.875em` _(30px)_ är förval|
|$offset-top|number|frivillig|Används f.o.m. `medium` läge|
|$offset-bottom|number|frivillig|Används f.o.m. `medium` läge|

__Användning__

`@include create-container-py(...) { //Extra styling }`

__Exempel__

```
//Standard användning
@include create-container-py('rh-container__feedback', 1em)

//Extra beteende
@include create-container-py('rh-container__feedback', 1em) {
    //Man kan skapa extra beteende här
    @include xlarge {
        padding-top: 3.75em; //60px
        padding-bottom: 3.75em;
    }
}
```

## 3. create-container-p
`create-container-p($name, $container-py, $container-px)`

|Variabel|Datatyp|Krav|Beskrivning|
|---|:---:|:---:|---|
|$name|string|obligatorisk|Containers namn|
|$container-py|string|obligatorisk|Containers namn|
|$container-px|string|obligatorisk|Containers namn|

__Användning__

`@include create-container-p(...) { //Extra styling }`

## 4. iOSNoIncreaseFontSize
Safari på iOS kommer ökar automatisk font-zise när användare vänder sin telefon till liggande läge.

__Användning__

`@include iOSNoIncreaseFontSize`

__Exempel__
```
//SCSS kod
.footer {
    @include iOSNoIncreaseFontSize;

    padding: 1em;
    color: blue;
    font-size: 1.2em;
}
```

## 5. create-clickable-element-effect
Funktionen genererar beteendena för en klickbar komponent _(block element)_:
* `:hover`
* `:active`
* `:focus-within` _(En klickbar komponent använder `<div>` tag därför `:focus-within` används istället för `:focus`)_

Standard struktur för en klickbar element:
```
<div class="rh-element--clickable">
    <a href="#" class="rh-element--clickable-link"></a>

    <!-- Elements innehåll -->
    <div>
        <!-- Titel -->
        <!-- Beskrivning -->
    </div>
</div>
```

|Variabel|Datatyp|Krav|Beskrivning|
|---|:---:|:---:|---|
|$element-box-classname|string|obligatorisk|Klassnamn använts till `<div>` tag som är runt om elementen _(container)_|
|$element-title-classname|string|obligatorisk|Klassnamn använts till elements titel|
|$element-description-classname|string|obligatorisk|Klassnamn använts till elements beskrivning|
|$box-effect-outside|boolean|frivillig|Aktivera effekt som är runt om komponenten|
|$content-effect-inside|boolean|frivillig|Aktivera effekt som är för innehåll i komponenten|
|$box-border-top-styling|string|frivillig||
|$box-border-right-styling|string|frivillig||
|$box-border-bottom-styling|string|frivillig||
|$box-border-left-styling|string|frivillig||
|$box-shadow-styling|string|frivillig||
|$box-shadow-focus-styling|string|frivillig||
|$title-text-color|string|frivillig||
|$title-text-decoration|string|frivillig||
|$description-text-color|string|frivillig||
|$description-text-decoration|string|frivillig||

__Användning__

`@include create-clickable-element-effect(...) { //Extra styling }`

__TIPS!__ Se `block` och `navigation-block` för att veta mer om hur man använder funktionen.