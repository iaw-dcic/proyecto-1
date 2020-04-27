class Juego{
	#justify_content;
	#align_items;
	#wrap;
	#flex_direction;
	#align_content;
	#order;
	#align_self;
	constructor(){
		this.setTooltips();
		this.niveles= [this.nivel1(),this.nivel2(),this.nivel3(),this.nivel4(),this.nivel5(),
					this.nivel6(),this.nivel7(),this.nivel8(),this.nivel9(),this.nivel10(),
					this.nivel11(),this.nivel12()];
		this.ultimoNivel=this.niveles.length;
	}

	setTooltips(){
		this.#justify_content=new Tooltip('justify-content','Alinea los elementos a lo largo del eje principal.',
			['justify-content-start','justify-content-end', 'justify-content-center', 'justify-content-between', 'justify-content-around']);
		this.#align_items= new Tooltip('align-items','Alinea los elementos a lo largo del eje transversal.',
			['align-items-start','align-items-end','align-items-center','align-items-baseline','align-items-stretch']);
		this.#wrap= new Tooltip('wrap','Especifica si los elementos son forzados a una sola linea.',
			['flex-wrap','flex-nowrap','flex-wrap-reverse']);
		this.#flex_direction= new Tooltip('flex-direction','Define la dirección del eje principal.',
			['flex-row','flex-row-reverse','flex-column','flex-column-reverse']);
		this.#align_content= new Tooltip('align-content','Alinea las líneas de un contenedor flex cuando exista más espacio en el eje transversal.',
			['align-content-start','align-content-end','align-content-center','align-content-between','align_content-around']);
		this.#order= new Tooltip('order','Ordena los elementos según su orden.',
			['order-0','order-1','...','order-12']);
		this.#align_self= new Tooltip('align-self','Alinea el elemento dentro del contenedor.',
			['align-self-start','align-self-end','align-self-center','align-self-between','align-self-around']);
	}

	nivel1(){
		var instrucciones='<div id="instrucciones"><p>';
        instrucciones+='Bienvenido a Bootstrap Flex Parking, un juego donde estacionaras autos utilizando Bootstrap Flex.';
        instrucciones+='Guía al auto azul a la cochera indicada,usando la clase '+this.#justify_content.tooltip()+', la cual alinea elementos horizontalmente y acepta los siguientes valores:';
        instrucciones+='</p><ul>';
        instrucciones+='<li>justify-content-start</li>'
        instrucciones+='<li>justify-content-end</li>';
        instrucciones+='<li>justify-content-center</li>';
        instrucciones+='<li>justify-content-between</li>';
        instrucciones+='<li>justify-content-around</li>';
        instrucciones+='</ul><p>';
        instrucciones+='Por ejemplo, justify-content-end moverá el auto a la derecha.</p>';
        instrucciones+='</div>';
		var html='<div id="html">';
		html+='<div class="line-numbers">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</div>';
		html+='<div class="nivel-html">';
		html+='<span class="codigo">&ltdiv id="autos" class="d-flex</span>';
		html+='<input id="clases-input" type="text" name="clases">';
		html+='<span class="codigo">"&gt<br/> &nbsp; &ltdiv class="auto azul"&gt...&lt/div&gt <br/> &lt/div&gt</span>';
		html+='</div>';
		html+='<button id="siguiente" disabled="true" class="animated animation">Siguiente</button>';
		html+='</div>';
		var autos=new Autos(1);
		var cochera=new Cochera([8]);
		var objetivos=['justify-content-end'];

		return new Nivel(1,instrucciones,html,autos,cochera,objetivos,'#autos');
	}

	nivel2(){
		var instrucciones='<div id="instrucciones"><p>';
        instrucciones+='Ahora usa '+this.#align_items.tooltip()+' para reubicar el auto azul donde corresponde. Esta clase alinea los elementos verticalmente:';
        instrucciones+='</p><ul>';
        instrucciones+='<li>align-items-start</li>'
        instrucciones+='<li>align-items-end</li>';
        instrucciones+='<li>align-items-center</li>';
        instrucciones+='<li>align-items-between</li>';
        instrucciones+='<li>align-items-around</li>';
        instrucciones+='</ul><p>';
        instrucciones+='En este caso parece que la cochera indicada se encuentra en el centro.</p>';
        instrucciones+='</div>';
		var html='<div id="html">';
		html+='<div class="line-numbers">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</div>';
		html+='<div class="nivel-html">';
		html+='<span class="codigo">&ltdiv id="autos" class="d-flex</span>';
		html+='<input id="clases-input" type="text" name="clases">';
		html+='<span class="codigo">"&gt<br/> &nbsp; &ltdiv class="auto azul"&gt...&lt/div&gt <br/> &lt/div&gt</span>';
		html+='</div>';
		html+='<button id="siguiente" disabled="true" class="animated animation">Siguiente</button>';
		html+='</div>';
		var autos=new Autos(1);
		var cochera=new Cochera([4]);
		var objetivos=['align-items-center'];

		return new Nivel(2,instrucciones,html,autos,cochera,objetivos,'#autos');
	}

	nivel3(){
		var instrucciones='<div id="instrucciones"><p>';
        instrucciones+='Estaciona el auto azul donde debería, usando una combinación de '+this.#justify_content.tooltip()+' y '+this.#align_items.tooltip()+'.</p>';
        instrucciones+='<p>Si no recuerdas las opciones de alguna clase, siempre puedes pasar el cursor sobre el nombre y se mostrarán.</p>';
        instrucciones+='</div>';
		var html='<div id="html">';
		html+='<div class="line-numbers">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</div>';
		html+='<div class="nivel-html">';
		html+='<span class="codigo">&ltdiv id="autos" class="d-flex</span>';
		html+='<input id="clases-input" type="text" name="clases">';
		html+='<span class="codigo">"&gt<br/> &nbsp; &ltdiv class="auto azul"&gt...&lt/div&gt <br/> &lt/div&gt</span>';
		html+='</div>';
		html+='<button id="siguiente" disabled="true" class="animated animation">Siguiente</button>';
		html+='</div>';
		var autos=new Autos(1);
		var cochera=new Cochera([11]);
		var objetivos=['justify-content-end', 'align-items-end'];

		return new Nivel(3,instrucciones,html,autos,cochera,objetivos,'#autos');
	}

	nivel4(){
		var instrucciones='<div id="instrucciones"><p>';
        instrucciones+='Las ranas necesitan ponerse en el mismo orden que sus hojas de lirio usando '+this.#flex_direction.tooltip()+'. Con esta clase podemos definir la dirección de los elementos en el contenedor, y acepta los siguientes valores:';
        instrucciones+='</p><ul>';
        instrucciones+='<li>flex-row</li>'
        instrucciones+='<li>flex-row-reverse</li>';
        instrucciones+='<li>flex-column</li>';
        instrucciones+='<li>flex-column-reverse</li>';
        instrucciones+='</ul><p>';
        instrucciones+='Para poder estacionar los autos vas a tener que usar '+this.#justify_content.tooltip()+' también. Nota que cuando es una columna, justify-content cambia a vertical y align-items a horizontal.</p>';
        instrucciones+='</div>';
		var html='<div id="html">';
		html+='<div class="line-numbers">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</div>';
		html+='<div class="nivel-html">';
		html+='<span class="codigo">&ltdiv id="autos" class="d-flex</span>';
		html+='<input id="clases-input" type="text" name="clases">';
		html+='<span class="codigo">"&gt<br/> &nbsp; &ltdiv class="auto azul"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto rojo"&gt...&lt/div&gt <br/> &lt/div&gt</span>';
		html+='</div>';
		html+='<button id="siguiente" disabled="true" class="animated animation">Siguiente</button>';
		html+='</div>';
		var autos=new Autos(2);
		var cochera=new Cochera([6],[7]);
		var objetivos=['flex-column', 'justify-content-end'];

		return new Nivel(4,instrucciones,html,autos,cochera,objetivos,'#autos');
	}

	nivel5(){
		var instrucciones='<div id="instrucciones"><p>';
        instrucciones+='Es hora de estacionar los autos usando '+this.#flex_direction.tooltip()+', '+this.#justify_content.tooltip()+', y '+this.#align_items.tooltip()+'. ';
        instrucciones+='Nota que cuando estableces la dirección a una fila o columna invertida, el inicio y el final también se invierten.</p>';
        instrucciones+='</div>';
		var html='<div id="html">';
		html+='<div class="line-numbers">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</div>';
		html+='<div class="nivel-html">';
		html+='<span class="codigo">&ltdiv id="autos" class="d-flex</span>';
		html+='<input id="clases-input" type="text" name="clases">';
		html+='<span class="codigo">"&gt<br/> &nbsp; &ltdiv class="auto"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto rojo"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto amarillo"&gt...&lt/div&gt <br/> &lt/div&gt</span>';
		html+='</div>';
		html+='<button id="siguiente" disabled="true" class="animated animation">Siguiente</button>';
		html+='</div>';
		var autos=new Autos(3);
		var cochera=new Cochera([14],[11],[8]);
		var objetivos=['flex-column-reverse', 'justify-content-between', 'align-items-end'];

		return new Nivel(5,instrucciones,html,autos,cochera,objetivos,'#autos');
	}

	nivel6(){
		var instrucciones='<div id="instrucciones">';
        instrucciones+='<p>Parece que todo se da vuelta, volvamos a intentarlo con más autos.</p>';
        instrucciones+='<p>Puedes utilizar '+this.#justify_content.tooltip()+', '+this.#align_items.tooltip()+' y '+this.#flex_direction.tooltip()+'.</p>';
        instrucciones+='</div>';
		var html='<div id="html">';
		html+='<div class="line-numbers">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</div>';
		html+='<div class="nivel-html">';
		html+='<span class="codigo">&ltdiv id="autos" class="d-flex</span>';
		html+='<input id="clases-input" type="text" name="clases">';
		html+='<span class="codigo">"&gt<br/> &nbsp; &ltdiv class="auto azul"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto azul"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto azul"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto rojo"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto amarillo"&gt...&lt/div&gt <br/> &lt/div&gt</span>';
		html+='</div>';
		html+='<button id="siguiente" disabled="true" class="animated animation">Siguiente</button>';
		html+='</div>';
		var autos=new Autos(5);
		var cochera=new Cochera([11,12,13],[10],[9]);
		var objetivos=['flex-column-reverse', 'justify-content-center', 'align-items-end'];

		return new Nivel(6,instrucciones,html,autos,cochera,objetivos,'#autos');
	}

	nivel7(){
		var instrucciones='<div id="instrucciones"><p>';
        instrucciones+='A veces, invertir el orden de una fila o columna de un contenedor no es suficiente. En esos casos, nosotros podemos ultilizar la clase '+this.#order.tooltip()+' en elementos individuales. Por defecto, los elementos tienen un valor 0, pero podemos ordenarlos con esta clase.';
        instrucciones+='</p><p>El auto azul está desordenado, order-0 no es suficiente.</p>';
        instrucciones+='</div>';
		var html='<div id="html">';
		html+='<div class="line-numbers">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</div>';
		html+='<div class="nivel-html">';
		html+='<span class="codigo">&ltdiv id="autos" class="d-flex flex-column"&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto azul</span>';
		html+='<input id="clases-input" type="text" name="clases">';
		html+='<span class="codigo">&nbsp; "&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto rojo"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto amarillo"&gt...&lt/div&gt <br/> &lt/div&gt</span>';
		html+='</div>';
		html+='<button id="siguiente" disabled="true" class="animated animation">Siguiente</button>';
		html+='</div>';
		var autos=new Autos(3,'flex-column');
		var cochera=new Cochera([3],[1],[2]);
		var objetivos=['order-1'];

		return new Nivel(7,instrucciones,html,autos,cochera,objetivos,'.azul');
	}

	nivel8(){
		var instrucciones='<div id="instrucciones"><p>';
        instrucciones+='Otra clase que puedes utilizar en elementos individuales es '+this.#align_self.tooltip()+'. Esta clase toma los mismos valores de align-items y sus valores son usados para un elemento específico.';
        instrucciones+='</p><p>La camioneta roja solo debe avanzar para llegar a su cochera.</p>';
        instrucciones+='</div>';
		var html='<div id="html">';
		html+='<div class="line-numbers">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</div>';
		html+='<div class="nivel-html">';
		html+='<span class="codigo">&ltdiv id="autos" class="d-flex flex-column"&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto azul</span>';
		html+='<input id="clases-input" type="text" name="clases">';
		html+='<span class="codigo">&nbsp; "&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto rojo"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto amarillo"&gt...&lt/div&gt <br/> &lt/div&gt</span>';
		html+='</div>';
		html+='<button id="siguiente" disabled="true" class="animated animation">Siguiente</button>';
		html+='</div>';
		var autos=new Autos(3,'flex-column justify-content-between');
		var cochera=new Cochera([1],[11],[7]);
		var objetivos=['align-self-end'];

		return new Nivel(8,instrucciones,html,autos,cochera,objetivos,'.rojo');
	}

	nivel9(){
		var instrucciones='<div id="instrucciones"><p>';
        instrucciones+='Combina '+this.#order.tooltip()+' con '+this.#align_self.tooltip()+' para estacionar los autos en su cochera asignada.';
        instrucciones+='</div>';
		var html='<div id="html">';
		html+='<div class="line-numbers">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</div>';
		html+='<div class="nivel-html">';
		html+='<span class="codigo">&ltdiv id="autos" class="d-flex flex-column justify-content-between"&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto azul</span>';
		html+='<input id="clases-input" type="text" name="clases">';
		html+='<span class="codigo">&nbsp; "&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto azul"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto rojo"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto amarillo"&gt...&lt/div&gt <br/> &lt/div&gt</span>';
		html+='</div>';
		html+='<button id="siguiente" disabled="true" class="animated animation">Siguiente</button>';
		html+='</div>';
		var autos=new Autos(3,'flex-column justify-content-between');
		var cochera=new Cochera([14],[1],[4]);
		var objetivos=['align-self-end', 'order-1'];

		return new Nivel(9,instrucciones,html,autos,cochera,objetivos,'.azul');
	}

	nivel10(){
		var instrucciones='<div id="instrucciones"><p>';
        instrucciones+='Por defecto un contenedor que tiene la clase d-flex ajusta los elementos en una sola linea. Para modificar esto podemos usar '+this.#wrap.tooltip()+':';
        instrucciones+='</p><ul>';
        instrucciones+='<li>flex-nowrap</li>'
        instrucciones+='<li>flex-wrap</li>';
        instrucciones+='<li>flex-wrap-reverse</li>';
        instrucciones+='</ul><p>';
        instrucciones+='Resuelve este congestionamiento y organiza los autos en sus cocheras.</p>';
        instrucciones+='</div>';
		var html='<div id="html">';
		html+='<div class="line-numbers">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</div>';
		html+='<div class="nivel-html">';
		html+='<span class="codigo">&ltdiv id="autos" class="d-flex</span>';
		html+='<input id="clases-input" type="text" name="clases">';
		html+='<span class="codigo">"&gt<br/> &nbsp; &ltdiv class="auto azul"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto rojo"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; ...</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto amarillo"&gt...&lt/div&gt <br/> &lt/div&gt</span>';
		html+='</div>';
		html+='<button id="siguiente" disabled="true" class="animated animation">Siguiente</button>';
		html+='</div>';
		var autos=new Autos(8);
		var cochera=new Cochera([1,3,7],[2,4,6],[5,8]);
		var objetivos=['flex-wrap', 'flex-column', 'align-content-between'];

		return new Nivel(10,instrucciones,html,autos,cochera,objetivos,'#autos');
	}

	nivel11(){
		var instrucciones='<div id="instrucciones"><p>';
        instrucciones+='Utilicemos la clase '+this.#wrap.tooltip()+' combinada con las vistas anteriormente para ubicar estos autos en sus lugares. Recuerda que puedes usar '+this.#justify_content.tooltip()+', '+this.#align_content.tooltip()+', '+this.#wrap.tooltip()+', '+this.#flex_direction.tooltip()+' y '+this.#align_items.tooltip()+'.';
        instrucciones+='</div>';
		var html='<div id="html">';
		html+='<div class="line-numbers">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</div>';
		html+='<div class="nivel-html">';
		html+='<span class="codigo">&ltdiv id="autos" class="d-flex</span>';
		html+='<input id="clases-input" type="text" name="clases">';
		html+='<span class="codigo">"&gt<br/> &nbsp; &ltdiv class="auto azul"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto azul"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto azul"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto rojo"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto amarillo"&gt...&lt/div&gt <br/> &lt/div&gt</span>';
		html+='</div>';
		html+='<button id="siguiente" disabled="true" class="animated animation">Siguiente</button>';
		html+='</div>';
		var autos=new Autos(5);
		var cochera=new Cochera([11,12,13],[10],[9]);
		var objetivos=['flex-wrap', 'flex-column-reverse', 'justify-content-center', 'align-content-end'];

		return new Nivel(11,instrucciones,html,autos,cochera,objetivos,'#autos');
	}

	nivel12(){
		var instrucciones='<div id="instrucciones"><p>';
        instrucciones+='Organiza la cochera utilizando las clases que aprendiste:';
        instrucciones+='</p><ul>'; 
        instrucciones+='<li>'+this.#justify_content.tooltip()+'</li>'
        instrucciones+='<li>'+this.#align_content.tooltip()+'</li>';
        instrucciones+='<li>'+this.#align_items.tooltip()+'</li>';
        instrucciones+='<li>'+this.#flex_direction.tooltip()+'</li>';
        instrucciones+='<li>'+this.#wrap.tooltip()+'</li>';
        instrucciones+='</ul>';
        instrucciones+='</div>';
		var html='<div id="html">';
		html+='<div class="line-numbers">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</div>';
		html+='<div class="nivel-html">';
		html+='<span class="codigo">&ltdiv id="autos" class="d-flex</span>';
		html+='<input id="clases-input" type="text" name="clases">';
		html+='<span class="codigo">"&gt<br/> &nbsp; &ltdiv class="auto amarillo"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto azul"&gt...&lt/div&gt</span>';
		html+='<span class="codigo"><br/> &nbsp; ...</span>';
		html+='<span class="codigo"><br/> &nbsp; &ltdiv class="auto amarillo"&gt...&lt/div&gt <br/> &lt/div&gt</span>';
		html+='</div>';
		html+='<button id="siguiente" disabled="true" class="animated animation">Siguiente</button>';
		html+='</div>';
		var autos=new Autos(9);
		var cochera=new Cochera([1,9,12],[10,11,14],[7,8,13]);
		var objetivos=['flex-wrap-reverse', 'flex-column', 'align-content-between' ,'justify-content-between'];

		return new Nivel(12,instrucciones,html,autos,cochera,objetivos,'#autos');
	}

	ganador(){
		var instrucciones='<div id="instrucciones"><p>';
        instrucciones+='¡Ganaste! ahora tienes los conocimientos basicos, y con ellos lograste estacionar todos los autos en una maniobra.';
		var html='<div id="html" class="victoria d-flex justify-content-center align-items-center">';
		html+='<div class="logo-grande"><img src="images/logo.png" id="logo_grande"/></div>';
		html+='</div>';
		var autos=new Autos(8);
		var cochera=new Cochera([1,7,12],[3,8,14],[5,10]);
		var objetivos=[];

		return new Nivel(13,instrucciones,html,autos,cochera,objetivos,'#autos');
	}
}