class Tooltip{
	constructor(nombre, descripcion, objetos){
		this.nombre=nombre;
		this.descripcion=descripcion;
		this.objetos=objetos;
	}

	tooltip(){
		var tooltipObject='<code class="ayuda" title="<p> '+ this.descripcion +'</p>';
		this.objetos.forEach(objeto => tooltipObject+='<code>'+ objeto + '</code> &nbsp;' );
		tooltipObject+='" data-html="true" data-toggle="tooltip" data-placement="bottom" >'+this.nombre+'</code>';
		return tooltipObject;
	}
}