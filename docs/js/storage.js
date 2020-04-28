class Storage{

	static refreshStorage(nivel, tema, respuesta){
    	window.localStorage.setItem('nivel',nivel);
    	window.localStorage.setItem('tema',tema);
    	this.refreshRespuestas(nivel,respuesta);
    }

    static refreshRespuestas(nivel, respuesta){
    	var respuestas = localStorage.getItem('respuestas');
		respuestas = respuestas ? JSON.parse(respuestas) : {};
		respuestas['nivel '+nivel]=respuesta;
		localStorage.setItem('respuestas', JSON.stringify(respuestas));
    }

    static getNivel(){
    	var nivel = localStorage.getItem('nivel');
    	if(!nivel){
    		nivel= 1;
    	}
    	return nivel;
    }

    static getRespuesta(nivel = this.getNivel()){
    	var respuestas = JSON.parse(localStorage.getItem('respuestas'));
    	if(!respuestas){
    		respuestas= {};
    	}
    	var respuesta="nivel "+nivel;
    	return respuestas[respuesta];
    }

    static getTema(){
    	var tema= localStorage.getItem('tema');
    	if(!tema){
    		tema= 'css/app-dark.css';
    	}
    	return tema;
    }
}