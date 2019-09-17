Filplats: `/components/scss/_mixin.scss`

## 1. create-container-py
```create-container-py($name, $padding-y, $offset-top, $offset-bottom)```

|Variabel|Data typ|Krav|Beskrivning|
|---|:---:|:---:|---|
|$name|string|obligatorisk|Containers namn|
|$padding-py|string|frivillig|Används för både `padding-top` och `padding-bottom`|
|$offset-top|number|frivillig|Användbart med grid system|
|$offset-bottom|number|frivillig|Användbart med grid system|

__Användning__

`@include create-container-py(...)`

__Exempel__

``@include create-container-py('rh-container__feedback', 1em)``

## 2. create-container-px
`create-container-px($name, $offset-left: 0, $offset-right: 0)`

|Variabel|Data typ|Krav|Beskrivning|
|---|:---:|:---:|---|
|$name|string|obligatorisk|Containers namn|
|$offset-left|number|frivillig|Användbart med grid system|
|$offset-right|number|frivillig|Användbart med grid system|

__Användning__

`@include create-container-px(...)`

## 3. create-container-p
```create-container-p($name, $container-py, $container-px)```

|Variabel|Data typ|Krav|Beskrivning|
|---|:---:|:---:|---|
|$name|string|obligatorisk|Containers namn|
|$container-py|string|obligatorisk|Containers namn|
|$container-px|string|obligatorisk|Containers namn|

__Användning__

`@include create-container-p(...)`