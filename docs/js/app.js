jQuery(document).ready(function($){

	var juego= new Juego();
	setearNivel(Storage.getNivel());
	setearTema();

	function setearTema(){
		if(checkCSS()){
			$('.config-btn').removeClass('active');
			$($("[dir='"+Storage.getTema()+"']")).addClass('active');
			changeCSS(Storage.getTema());
		}
	}

	function setearNivel(numero){
		nivel= juego.niveles[numero-1];
		$('#nivel-actual').text(nivel.numero);
		$('#instrucciones').replaceWith($.parseHTML(nivel.instrucciones));
		$('#html').replaceWith($.parseHTML(nivel.html));
		$('#cochera').replaceWith($.parseHTML(nivel.cochera.pintarCochera()));
		$('#autos').replaceWith($.parseHTML(nivel.autos.crearAutos()));
		$('#clases-input').val(Storage.getRespuesta(nivel.numero));
		actualizarElementos();
		$('#clases-input').trigger('keyup');
	}

	function setearGanador(){
		ganador= juego.ganador();
		$('#niveles').hide();
		$('#instrucciones').replaceWith($.parseHTML(ganador.instrucciones));
		$('#html').replaceWith($.parseHTML(ganador.html));
		$('#cochera').replaceWith($.parseHTML(ganador.cochera.pintarCochera()));
		$('#autos').replaceWith($.parseHTML(ganador.autos.crearAutos()));
	}

	function siguienteNivel(superado){
		$(document).trigger('cambio-nivel');
		if(nivel.numero<juego.ultimoNivel){
			setearNivel(nivel.numero+1);
		}else{
			if(superado){
				setearGanador();
			}
		}
	}

	function nivelAnterior(){
		$(document).trigger('cambio-nivel');
		if(nivel.numero>1){
			setearNivel(nivel.numero-1);
		}
	}

	function actualizarElementos(){
		$('.ayuda').tooltip();
		$('#clases-input').keyup(function(){
			var val= $(this).val();
			var target= $(nivel.target);
			var clasesOriginales= target.data("clases");
			target.removeClass();
			target.addClass(clasesOriginales);
			target.addClass(val);
			if(nivel.cumpleObjetivos(val)){
				$('#siguiente').prop('disabled',false);
			}else{
				$('#siguiente').prop('disabled',true);
			}
		});

		$('#siguiente').click(function(){
			siguienteNivel(true);
		});
	}

	$('.flecha-izq').click(function(){
		nivelAnterior();
	});

	$('.flecha-der').click(function(){
		siguienteNivel(false);
	});

	function checkCSS(){
		return $('#css-style').attr('href') != Storage.getTema();
	}

	function changeCSS(cssFile) {
	    $('#css-style').replaceWith('<link id="css-style" rel="stylesheet" href="'+cssFile+'">');
	}

	var createPopoverMenu = function () {
        var $pop = $('#configuracion');
        $pop.popover({
            placement: 'top',
            trigger: 'manual',
            html: true,
            content: function () {
                return $('#menu-config').html();
            }
        }).on('shown.bs.popover', function(e) {
            var current_popover = '#' + $(e.target).attr('aria-describedby');
            var $cur_pop = $(current_popover);

            $cur_pop.addClass('config-pop');
          	
            $("html").on("mouseup", function (e) {
			    if (!$(e.target).parents('.popover').length > 0) {
			        $(".popover").each(function () {
			            $pop.popover("hide");
			        });
			    }
			});

			$('.config-btn').click(function(){
				if(! $(this).hasClass('active')){
					$('.config-btn').removeClass('active');
					$($(this).attr('role')).addClass('active');
					changeCSS($(this).attr('dir'));
				}
			});

        });
        return $pop;
    };

    createPopoverMenu().click(function(){
    	$(this).popover('show');
    });
	
    $(document).on('cambio-nivel', function(){
	Storage.refreshStorage(nivel.numero, $('#css-style').attr('href'), $('#clases-input').val());
    });

    $(window).on("beforeunload", function(){
    	Storage.refreshStorage(nivel.numero, $('#css-style').attr('href'), $('#clases-input').val());
    });
});
