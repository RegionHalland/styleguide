# Form control - Text
Komponenten är en HTML form input text element.

## 1. Struktur
### 1.1. HTML
Huvudstrukturen är:
```
<div>
    <label for="elemId">Text</label>
    <input id="elemId" type="text">
</div>
```
TIP!
* Man kan också använda komponenten utan `<label>` tag. Det beror på JSON filen.
* Glöm inte checka inkommande data när man jobbar med back-end system (Exempel: required, minlength, maxlength, pattern, ...)

### 1.2. JSON data för en variant
Man använder strukturen när man vill rendera komponenten i en annan komponent (Exempel: en atom i en molecules).
```
{
    "name": "",
    "status": "",
    "context": {
        "modifier": "",
        "isDisabled": false,
        "labelData": {
            "text": "",
            "forControlId": "",
            "extendClass": "",
            "requirement": {
                "text": ""
            }
        },
        "controlData": {
            "controlId": "",
            "placeholder":"Placeholder",
            "autocompleteType": "",
            "extendClass": ""
        }
    }
}
```

Man kan också använda extra CSS klasser som ska vara i "extendClass" för att skriva över befintliga CSS klasser i komponenten.

## 2. Referens
* [Including Sub-components](https://fractal.build/guide/components/including-sub-components.html)

## 3. Version
### 1.0.0 (2019-08-20)
* Första version.


## Planerad utveckling
* Bryta isär label och input till separata atomer. Det som syns idag bör vara en molekyl.