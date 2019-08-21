# Caption hero

## Versionhistorik
#### 2019-08-21 (0.0.0)
* Använt `position: relative` för små skärm (SM mode) och `position: absolute` för andra skärmstorlekar.
    * "Caption" hamnas under herobilden i mobil läge.
    * "Caption" hamnas över herobilden i andra större skärmstorlekar.
* Använt `extendClass` i konfig filen för att man kan påverka komponentens beteende när det renderas i annan komponent (Exempel: en atom i en molecules).