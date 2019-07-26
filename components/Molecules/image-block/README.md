# Image block
Återanvändning:
* Atoms/caption-mini

## 1. Struktur
### 1.1. HTML
Huvudstrukturen är:
```
<div class="">
    <img class="" alt="">
    /* caption-mini rendering är efter <img> tag */
</div>
```

### 1.2. JSON data för en variant
```
{
    "extendClass": "",
    "heroImage": {
        "src": "",
        "alt": "",
        "extendClass": ""
    },
    "caption": {...} // Data för caption-mini komponent
}
```
Man kan också använda extra CSS klasser som ska vara i "extendClass" för att skriva över befintliga CSS klasser i komponenten.

__TIPS!__ Man behöver ha koll på `width-...` för att komponenten kan fungera bra i många olika ställen i en webbsida.

## 2. Referens
* [Including Sub-components](https://fractal.build/guide/components/including-sub-components.html)

## 3. Version
### 1.0.0 (2019-08-20)
* Första version.