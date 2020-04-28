# Proyecto 1:  HTML - CSS - Javascript - DOM

**Fecha de entrega:** 14 de Mayo de 2020 (inclusive).

## **Introducción**

El proyecto consiste en la implementación de una aplicación web utilizando las tencnologías HTML, CSS y Javascript. Se permite la utilización de librerías Javascript Open Source, siempre y cuando se otorguen los créditos correspondientes a el o los autores, incluyendo links a las fuentes originales. También es posible la utilización de frameworks de CSS (como por ejemplo Bootstrap). **No** se permite el uso de frameworks JS (AngularJS, React, VueJS).

El proyecto es individual y se debe elegir uno de los 3 temas mencionados a continuación. Es recomendable, una vez elegido el tema y la aplicación concreta a implementar, consultar con la cátedra para asegurarse que permita cumplir los requisitos mínimos requeridos y a su vez no exceda la complejidad del mismo. 


## **Descripción Tema 1 - Utilidad Online**

El proyecto consiste en la implementación de una aplicación web que represente una herramienta o utilidad sencilla para el usuario. Alguna actividad simple que pueda reducirse a la implementación de un algoritmo y su posterior visualización del resultado en la página.

Ejemplos posibles son aplicaciones que permitan:



*   Determinar cuán segura es una password ([http://www.passwordmeter.com/](http://www.passwordmeter.com/))
*   Determinar si una expresión regular es válida y además permita testear diferentes cadenas ([https://regex101.com/r/NXlPe8/1](https://regex101.com/r/NXlPe8/1)).

Estos son sólo ejemplos como para ilustrar posibles herramientas a implementar. Se pueden usar estos mismos ejemplos, u otras herramientas que sigan esta misma línea. Se debe consultar con la cátedra la utilidad que se desea implementar, para evitar opciones muy complejas y que excedan los objetivos de este primer proyecto.  Los requisitos mínimos son que el usuario pueda ingresar información en un campo de texto y exista un algoritmo que se ejecute sobre dicha entrada y permita visualizar algún resultado de manera interactiva. Además, se debe registrar y mostrar, al menos los últimos 5 valores ingresados en el campo de texto (información almacenada en el navegador del usuario).


## **Descripción Tema 2 - Juego Online**

El proyecto consiste en la implementación de una juego online. La idea es que sea algún juego sencillo, preferentemente individual, que desafíe al usuario a realizar una tarea obteniendo un resultado o puntuación, y permita compartir el resultado con amigos. 

Un posible ejemplo sería un juego en el cual el participante deba eliminar los números del 1 al 50 tocando la pantalla en la “secuencia correcta” (del 1 al 50), como se puede ver [aquí](http://zzzscore.com/1to50/en/). Cualquier variante de este juego (no exactamente el mismo), o preferentemente algún otro juego, está permitido. 

Se debe consultar con la cátedra el juego que se desea implementar, para evitar opciones muy complejas y que excedan los objetivos de este primer proyecto.  Los requisitos mínimos son que exista cierto tipo de interacción sencilla del usuario que provoque modificaciones inmediatas en la página y  que en algún punto se llegue a un resultado o puntuación.


## **Descripción Tema 3 - Covid-19**

El proyecto consiste en la implementación de una aplicación web que permita al usuario visualizar información relacionada al Covid-19, utilizando Javascript y el Document Object Model. La aplicación debe ser visualmente atractiva, mostrando información posiblemente en tablas, gráficos y/o mapas, permitiendo al usuario tomar acciones que modifique la información mostrada.

Se debe utilizar como mínimo información con 2 variables distintas, que permitan al usuario modificarlas y ver cómo se actualizan las tablas, gráficos, y/o mapas. Por ejemplo, se podría tener los datos de la cantidad de casos confirmados, para los últimos 15 días, en al menos 3 países (o ciudades). El usuario debería poder ver toda la información, y filtrar por día y/o país, y eso debería reflejarse inmediatamente en la información mostrada en la aplicación.

 
La información debe ser obtenida de manera estática desde el servidor que almacena los archivos. Opcionalmente, se podría hacer uso de alguna API para obtener información dinámica y actualizada. En caso de realizar esta opción, se debe asegurar el correcto funcionamiento de la aplicación incluso si la API externa deja de funcionar.

## Observaciones	


Es importante lograr un aspecto atractivo de la aplicación y permitir una interacción intuitiva para el usuario. También se evaluará el código generado para lograr el funcionamiento de la aplicación, en especial, es importante la separación del modelo de datos, la visualización y la lógica de la aplicación. Además, la página debe simular una aplicación profesional, de alguna empresa o institución (nombre y logo incluido). 

Además, debe tener al menos dos temas o estilos generales diferentes y el usuario debe poder elegir uno de ellos. El navegador deberá recordar cualquier cambio que el usuario haga en la aplicación para la próxima vez que el mismo usuario acceda a la página.


*   El archivo principal debe denominarse “index.html”
*   Debe ser un documento **válido HTML5**.
*   Deben utilizar archivos **CSS externos válidos **para los estilos de la página.
*   El código Javascript debe estar en uno o más archivos externos al documento HTML. Pueden, y se recomienda, utilizar librerías Javascript para mejorar el aspecto y la usabilidad de la página, siempre y cuando den crédito a los autores apropiadamente.
*   Cualquier aclaración o comentario adicional sobre la página, debe hacerse en el archivo readme.md del repositorio.
*   Deben probar la página en **diferentes navegadores**.


## Modalidad de Entrega

El proyecto deberá ser un fork de este repositorio. Al momento de hacer el fork, la cátedra asignará un docente a cargo de la corrección del mismo, el cual deberá ser agregado como colaborador al proyecto. 

La entrega corresponde a un Pull Request desde el branch "master" al branch "entrega" del fork del usuario del Alumno, asignando al docente a cargo de la corrección. Se debe incluir en el mensaje del PR un link a la aplicación funcionando utilizando GitHub pages.

La corrección del mismo será a través de los comentarios que permite realizar GitHub en su página. Y el resultado del proyecto estará asociado al estado final del PR, que puede ser:

*   Approved: Aprobado :D
*   Request Changes: Re-entrega, se explicará en el mensaje, qué es lo que hay que corregir.