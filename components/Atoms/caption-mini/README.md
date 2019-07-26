# Caption mini
Komponenten är inte en ersättning för `Caption Hero` utan det är en specifik version.

## 1. Struktur
### 1.1. HTML
Huvudstrukturen är:
```
<div class="rh-caption-mini rh-caption-mini--...">
    <p class="rh-caption-mini-text">20 november</p>
</div>
```

### 1.2. JSON data för en variant
Man använder strukturen för `context` när man vill rendera komponenten i en annan komponent (Exempel: en atom i en molecules).

__TIPS!__ Titta gärna komponenten `Event Calendar Block` för att veta hur man gör!

```
{
    "modifier": "",
    "extendClass": "",
    "text": {
        "content": "",
        "extendClass": ""
    }
}
```

Man kan också använda extra CSS klasser som ska vara i "extendClass" för att skriva över befintliga CSS klasser i komponenten.

Om att byta bakgrundsfärg:
* `--square` och `--under-image` ---> Använd `background-color`
* `--has-triangle` ---> Använd `border-...`

## 2. Referens
* [Including Sub-components](https://fractal.build/guide/components/including-sub-components.html)

## 3. Version
### 1.0.0 (2019-08-20)
* Första version.