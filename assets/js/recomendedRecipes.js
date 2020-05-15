var recipeTitle = document.getElementById("recipeTitle");
var recipeIngredients = document.getElementById("recipeIngredients");
var recepiteText = document.getElementById("recipeText");
var recipeImage = document.getElementById("recipeImage");

var nombres = [
    "Budín",
    "Pan tradicional",
    "Pan de pancho",
    "Galletas con chocolate",
    "Queso asado",
    "Fideos"
]

var recetas = [
"Meter la harina, azucar, aceite, leche, y huevos en un bol y mezclar con una batidora. Luego a añadir una o dos cucharadas de escencia de vainilla y mezclar nuevamente. En un molde (de budín preferentemente pero podría ser cualquiera) colocar la mezcla. Con una cucharra recoger dulce de leche e ir colocandolo a gusto entre la mezcla. Colocar en el horno a temperatura media/baja hasta que al insertar un cuchillo este salga limpio.",
"Poner el agua en un bol grande y añadir la levadura, mezclar bien con un tenedor y opcionalmente añadir un poco de azúcar para despertar la levadura. Dejar reposar entre 5 y 10m hasta que empiece a burbujear. Luego añadir la mayoría de la harina al agua, dejando un poco en el paquete, y sal a gusto. Mezclar el agua y la harina (con un tenedor o a mano), utilizando la harina que sobró en el paquete si la mezcla se pega mucho a las manos. Cuando se forme una masa llevarlo a la mesada y amasar energéticamente por unos minutos. Enharinar un poco la masa resultante y formar una bola llevando las manos de cada lado de la masa hacia abajo de la misma. Dejar la masa en un bol previamente aceitado cubierto con un repasador durante 1h/1h30m o hasta que se duplique su tamaño. Cuando esto haya pasado darle un golpe con el puño para que colapse y amasar nuevamente. Lo que sigue es determinar el tamaño, con este kg de harina se pueden hacer dos hogazas grandes, pero el tamaño de cada pan y la forma de los mismos queda a su gusto. Enharinar una bandeja para horno, amasar nuevamente cada pan y dejarlo reposar en la bandeja durante 30m/1h, tener en cuenta que su tamaño se va a duplicar, por lo que sería ideal separarlos lo suficiente como para que no se peguen entre si cuando esto ocurra. Colocarlos en el horno a 180°C durante aproximadamente 30m, esto puede variar dependiendo de cada horno pero el truco está en darle golpecitos al pan al retirarlo del horno, si se oye hueco entonces está listo. Finalmente dejar que los panes se enfrien y fin! ya están listos.",
"Combinar la leche, el agua, y la levadura. Mezclar y dejar reposar por aproximadamente 8m. En un bol combinar la harina, azúcar, y sal, y mezclar hasta que esten bien combinados. Ahora incorporar de a poco el juguito de levadura e ir mezclando en el proceso. Cuando todo este bien combinado, sin dejar de mezclar añadir 1 huevo y 1 yema de huevo. Continuar mezclando hasta que la masa se vuelva suave y entonces agregar la manteca. Cuando todo este mezclado darle forma de bola y dejarlo reposar en un bol aceitado y cubrir con papel film. Cuando se duplique su tamaño retirar el fil y darle un golpe con el puño para que colapse. En una mesada enharinada, estirar, y dividir en la cantidad de panes que se deseen. Darles forma de bola y dejar reposar bajo una toalla húmeda y dejar reposar por 10m. Luego cuidadosamente darle a cada bola forma de cilindro con aproximadamente 13cm de largo. Cubrir una bandeja con papel manteca (o enmantecar y enharinar) y ubicar los panes separados por 0.5cm aproximadamente, la idea es que se toquen cuando leven mas tarde, para esto cubrir con otra fuente o papel film y dejar a temperatura ambiente por 45m. Cuando pase este tiempo pincelar los panes con una mezcla de huevo y un poco de agua y entonces meterlos en un horno precalentado a 190°C por 15m/20m o hasta que se dore la parte superior del pan. Retirar del horno y opcionalmente pincelarlos esta vez con un poco de manteca derretida.",
"Mezclar la harina, sal, y bicarbonato en un bol y mezclar hasta que estén bien combinados. Derretir la manteca sin quemarla, por otro lado trozar el chocolate en trozos medianos/pequeños. En otro bol poner la azúcar morena y la blanca y combinar, luego añadir la manteca y mezclar suavemente. Cuando este combinado añadir un huevo entero y, cuando eso se mezcle, una yema de huevo. Añadir la mezcla de harina y cuando esto se mezcle incorporar el chocolate y asegurarse de que esten bien distribuidos en la mezcla. Cubril el bol con papel film dejando que el papel toque la superficie de la mezcla, dejar en la heladera por 30m/45m o dejarlo una noche entera para mas firmeza y sabor. Formar bolas de tamaño mediano y ubicarlas en una bandeja cubierta con papel manteca, teniendo en cuenta que al cocinarse van a aplanarse bastante por lo que es necesario dejar lugar. Colocar en el horno a 176°C por 12m-15m. Durante la cocción se puede levantar la bandeja 2/3cm y dejarla caer, esto impide que la galleta se leve y le da un toque más 'masticable' al final, hacer esto dos o tres veces. Finalmente ya están listas para comer!",
"Esta es una receta, 'receta'. Es algo súper simple pero bueno tenía que completar 6 y no iba a quemar todos mis aces. Estos ingredientes son los ideales pero ¿quién tiene queso raclette? además, todavía no llegue al punto de hacer pan de masa madre en esta cuarentena así que bueno. De todas formas esto es altamente personalizable entonces usar su pan y quesos disponibles/preferidos. Entonces, enmantecar un lado de cada pan y rallar 20gr de cada queso o hasta saciar sus necesidades de queso, luego mezclarlos todos. En una sarten fría colocar un pan con el lado enmantecado hacia abajo, ubicar la mezcla de quesos encima del pan presionando para que se queden en su lugar y colocar el otro pan arriba del queso con el lado enmantecado hacia arriba. Colocar la sartén a fuego medio y tostar por 5/10m o hasta que esté dorado/marrón y dar vuelta, repetir del otro lado. Finalmente disfrutar del paraíso quesero.",
"En un bol colocar la harina (1/2 puñados por persona) y un poco de agua simplemente para formar la masa. Mezclar bien y en una mesada estirar la masa con un rodillo hasta que se pueda ver la mano a través de ella. Enharinar la parte superior abundantemente y enrollarla suavemente sin aplicar presion. Cuando esté enrollada cortarla dejando 1cm entre cada corte, levantar la masa formando una 'jaula' con los dedos y sacudir para separar los fideos. Si quedan muy largos al final pueden cortarse a la mitad o a su gusto. Finalmente hervirlos, teniendo en cuenta que la pasta fresca se cocina más rápido, y comer."
];

var ingredientes = [
"2 huevos, 1 taza de azúcar, 1/2 taza de aceite, 1/2 taza de leche, 2 tazas de harina leudante, dulce de leche, esencia de vainilla.",
"650 ml agua tibia, 1 sobre de levadura, 1kg harina 0000 o para pan, sal, aceite.",
"120ml agua tibia, 120ml leche tibia, 9gr de levadura, 525gr harina para pan o 0000, 15gr azúcar, 7gr sal fina, 3 huevos, 35gr manteca sin sal.",
"112gr manteca sin sal, 2 huevos, 1 chocolate negro en barra, 200gr harina para todo uso, 3gr sal pura, 4gr bicarbonato de sodio, 200gr azucar morena, 112gr azucar blanca.",
"pan de masa madre, manteca, queso Cheddar, queso Raclette, queso Gouda.",
"1kg harina 0000, agua."
];

function showRecommended(index){

    var imageName = "assets/img/recomendaciones/recommended"+index+".png";
    
    recipeImage.src = imageName;
    recipeTitle.innerText = nombres[index];
    recipeIngredients.innerText = ingredientes[index];
    recepiteText.innerText = recetas[index];
}