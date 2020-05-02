$(".botonGrilla").mousedown(empiezaSeleccion);
$(".botonGrilla").mouseenter(mouseMove);
$(".botonGrilla").mouseup(finalizaSeleccion);
$(".botonGrilla").on("touchstart", startTurn);
$(".botonGrilla").on("touchmove", touchMove);
$(".botonGrilla").on("touchend", endTurn);  
$("#switch").mousedown(toggleMode);