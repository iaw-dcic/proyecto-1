$(".botonGrilla").mousedown(empiezaSeleccion);
$(".botonGrilla").mouseenter(mouseMove);
$(".botonGrilla").mouseup(finalizaSeleccion);
$("#switch").mousedown(toggleMode);

$('.nav-link').mousedown(function(){
    cambiarCarousel(getAtributo(this,'number'));
}); 
$('.carousel-control-next').mousedown(nextCarousel);
$('.carousel-control-prev').mousedown(prevCarousel);
$('#carouselNivel').on('slid.bs.carousel', function (event){
    carouselChangeHandler(event);
});
var asd;
var asdparteII;
