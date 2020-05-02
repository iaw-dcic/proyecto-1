$(".botonGrilla").mousedown(empiezaSeleccion);
$(".botonGrilla").mouseenter(mouseMove);
$(".botonGrilla").mouseup(finalizaSeleccion);
$("#switch").mousedown(toggleMode);
$(".botonGrilla").on("touchstart", startTurn);
$(".botonGrilla").on("touchmove", touchMove);
$(".botonGrilla").on("touchend", endTurn);  
