class Nivel{
	constructor(numero, instrucciones, html,autos,cochera,objetivos,target){
		this.numero= numero;
		this.instrucciones=instrucciones;
		this.html=html;
		this.autos=autos;
		this.cochera=cochera;
		this.objetivos=objetivos;
		this.target=target;
	}

	cumpleObjetivos(entrada){
		var clases= entrada.split(" ");
		var cumple= this.comparar(this.objetivos,clases);
		return cumple; 
	}

	comparar(ar1, ar2) { 
        ar1.sort(); 
        ar2.sort(); 
        var iguales= true;
        if(ar1.length != ar2.length){
            iguales= false; 
        }
        for(var i = 0; i < ar1.length; i++) { 
            if (ar1[i] != ar2[i]){
                iguales= false; 
            }
        } 
        return iguales; 
    } 


}