Filplats: `/components/scss/_mixin.scss`

## 1. create-container-py
`create-container-py($name, $padding-y: 1.875em, $offset-top: 0, $offset-bottom: 0)`

|Variabel|Data typ|Krav|Beskrivning|
|---|:---:|:---:|---|
|$name|string|obligatorisk|Containers namn|
|$padding-py|string|frivillig|Används för både `padding-top` och `padding-bottom`. `1.875em` _(30px)_ är förval|
|$offset-top|number|frivillig|Används f.o.m. `medium` läge|
|$offset-bottom|number|frivillig|Används f.o.m. `medium` läge|

__Användning__

`@include create-container-py(...)`

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

## 2. create-container-px
`create-container-px($name, $offset-left: 0, $offset-right: 0)`

|Variabel|Data typ|Krav|Beskrivning|
|---|:---:|:---:|---|
|$name|string|obligatorisk|Containers namn|
|$offset-left|number|frivillig|Används f.o.m. `medium` läge|
|$offset-right|number|frivillig|Används f.o.m. `medium` läge|

__Användning__

`@include create-container-px(...)`

## 3. create-container-p
`create-container-p($name, $container-py, $container-px)`

|Variabel|Data typ|Krav|Beskrivning|
|---|:---:|:---:|---|
|$name|string|obligatorisk|Containers namn|
|$container-py|string|obligatorisk|Containers namn|
|$container-px|string|obligatorisk|Containers namn|

__Användning__

`@include create-container-p(...)`

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
