---
layout: post
title: Surcando los mares en verano
date: 2016-09-01 19:35
author: TheFireRed
description: "En verano es precisamente cuando tengo más tiempo libre. También me preocupa la ley de economía expresiva."
comments: true
categories: 
- Noticias
tags:
- Etrian Odyssey III
---

En las últimas dos semanas he hecho numerosos avances en la traducción de diálogos: empecé con 57 archivos pendientes por traducir y ya he reducido esa cifra a 37. Aunque he ido informando de todas las novedades por Twitter y GitHub, me gustaría explicar detalladamente en un artículo las novedades.

- La carpeta **Mission**, que contiene 13 misiones, está completamente traducida. Podrían considerarse los diálogos que forman parte de la historia principal en la ciudad y dentro del laberinto.
- La carpeta **Dungeon** es bastante más amplia, con 28 archivos (aunque me atrevería a decir que más de uno son archivos *debug* que no deberían aparecer en el juego). Como podríais deducir, incluyen los diálogos de todas las descripciones y acontecimientos que ocurren en el laberinto si no están ligadas a una misión o a un encargo. La carpeta estaría completamente traducida si no fuera por el archivo DUN_26F, que pese a su nombre, ¡es en realidad la exploración del mar en barco! Ocupa el espacio equivalente a unas 15 plantas del laberinto. Uff.
- He abierto [31 informes](https://github.com/AegisTrad/EO3es/issues) con cosas que tengo que corregir en un futuro. Sin embargo, hay uno que me preocupa más que el resto: [*«Cuestión de género y número»*](https://github.com/AegisTrad/EO3es/issues/9). En resumen, mi problema reside en cómo *abordar* el género y número de los adjetivos y verbos cuando los diálogos hacen referencia al grupo. Al principio consideré que el jugador crearía un equipo «mixto» y por esa razón utilicé masculino plural siguiendo la ley lingüística de economía expresiva ([→ consultar Diccionario panhispánico de dudas, género, 2.2.1)](http://lema.rae.es/dpd/?key=g%C3%A9nero). Pero a medio camino me di cuenta de que el jugador podría, en su lugar, crear un equipo exclusivamente formado por mujeres; por tanto, la traducción de diálogos ahora está reescrita para que los adjetivos y verbos *no exijan masculino*. He ahí mi encrucijada de reescribir los primeros párrafos «mixtos» como la segunda proposición. En efecto, reescribiré todos estos fragmentos, pero al menos me gustaría saber lo que opináis vosotros antes de leer concienzudamente el corpus de la traducción del primer *Etrian Odyssey* y de cambiarlos. Os dejo una muestra real de ambas propuestas:

![]({{ site.url }}/img/posts/eo3_genero_a.png)

Primer caso: el grupo «es mixto» y utilizo masculino plural.

![]({{ site.url }}/img/posts/eo3_genero_b.png)

Segundo caso: no están «cansados», sino que sienten fatiga, y por tanto evito emplear un adjetivo masculino.

- Similar al caso anterior, la clase *Farmer* usará la palabra *Agrícola*. El juego hace distinción entre *Príncipe* y *Princesa*, pero no para otras clases. Ahora que lo pienso, lo más probable es que *Buccaneer* tenga que cambiarse a *Pirata*...

Los archivos que quedan pendientes por traducir son los siguientes:

```
Dungeon         DUN_26F.txt                    2%  
Event           quest_explain.txt              35% 
Facility        Guild.txt                      20% 
Facility        Minato.txt                     35% 
Facility        Shop.txt                       35% 
Facility        Touti.txt                      10% 
Facility        Touti2.txt                     0%  
Facility        Yadoya.txt                     0%  
Facility        Yadoya2.txt                    0%  
InterfaceFile   dictionary_enemy_explain.txt   0%  
Item            equipitemexpbattle.txt         10% 
Item            useitemexpbattle.txt           0%  
Quest           QUE_007.txt                    0%  
Quest           QUE_008.txt                    0%  
Quest           QUE_012.txt                    0%  
Quest           QUE_014.txt                    0%  
Quest           QUE_021.txt                    0%  
Quest           QUE_022.txt                    0%  
Quest           QUE_023.txt                    0%  
Quest           QUE_024.txt                    0%  
Quest           QUE_025.txt                    0%  
Quest           QUE_026.txt                    0%  
Quest           QUE_031.txt                    0%  
Quest           QUE_032.txt                    0%  
Quest           QUE_033.txt                    0%  
Quest           QUE_034.txt                    0%  
Quest           QUE_036.txt                    0%  
Quest           QUE_037.txt                    0%  
Quest           QUE_038.txt                    0%  
Quest           QUE_039.txt                    0%  
Quest           QUE_040.txt                    0%  
Quest           QUE_042.txt                    0%  
Quest           QUE_043.txt                    0%  
Quest           QUE_044.txt                    0%  
Quest           QUE_045.txt                    0%  
Quest           QUE_046.txt                    0%  
Quest           QUE_048.txt                    0%  
```

- Vemos que la mayoría forman parte de la carpeta **Quest**, que son las misiones opcionales o semi-obligatorias del Bistró mariposa. En ella están los diálogos de Meli con su peculiar acento y los diálogos dentro del laberinto referentes a los encargos. Es muy divertido encontrar formas de que Meli se exprese de forma chispeante y vivaz en español. Los próximos archivos a traducir, probablemente, serán estos.
- La carpeta **Facility** son los edificios de la ciudad y los diálogos de los personajes que residen en ellos. Son bastante largos, puesto que tienen una cosa nueva que decir cada vez que desciendes una planta.
- **DUN_26**, como ya he explicado, es el mapa que hay que explorar del mar, y es también muy largo.
- Y los dos archivos restantes forman parte de la interfaz del juego; aparte de definiciones y palabras clave que tengo que recopilar, no tienen nada interesante que comentar.

Si sigo manteniendo esta racha de actualizaciones, es muy probable que en septiembre haya terminado con todos *o casi todos* los diálogos. El paso siguiente sería reorganizar los archivos traducidos y reprogramar la herramienta de extracción y reinserción de diálogos en el juego. Mientras JuDelCo se encarga de eso, yo procederé a recopilar los archivos de imágenes y a buscar a un grafista experimentado.

Os animo a participar en los comentarios del blog, GitHub o Twitter. Leo todos y cada uno de los comentarios que publicáis y procuro responder si tenéis algo que comentar. ¡Espero veros pronto!