# Block group
Komponents prefix: `rh-block-group*`

## 1. Container
Det används bara för komponenten `block-group`.

- Prefix: `rh-block-group__container-*`
- Filplats: `/components/Organism/block-group/_block-group.scss`
- Anledning:
    * `padding-*` används för uttryme mellan elementer i griden.
    * Det kommer blir mer `padding` än vi vill ha på komponenten när vi applicerar klassen `rh-container-px` och beteende är skildnad med de andra komponenter som har också `rh-container-px` runt om.
    * Därför __"offset"__ beräknas dynamisk för att komponentens beteende är lik som andra komponenter i en webb sida.

__OBS__! Komponenten har bara `padding-bottom` i sm-läget och ner åt därför “offset” __beräknas inte__.

### 1.1. `rh-block-group__container-px`
Beteende är liknande som `rh-container-px` är i global men "offset" beräknas __dynamisk__ för grid system _(Det gäller bara för `padding-left` och `padding-right`)_.

__Användning__
```
<div class="clearfix rh-block-group__container-px">
    <!-- Content här -->
</div>
```

### 1.2. `rh-block-group__container-py`
"Offset" beräknas __dynamisk__ för grid system _(Det gäller bara för `padding-top` och `padding-bottom`)_.

__Användning__
```
<div class="clearfix rh-block-group__container-py">
    <!-- Content här -->
</div>
```

### 1.3. `rh-block-group__container-p`
Klassen är __en förlänging__ av två klasserna som är ovan vid snabbt användning av komponenten. Det ger samma beteende med standard bakgrundsfärg.

__Användning__
```
<div class="clearfix rh-block-group__container-p">
    <!-- Content här -->
</div>
```