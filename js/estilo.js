if(localStorage.getItem("tema")==null)
    localStorage.setItem("tema","uno");

var tema=localStorage.getItem('tema');
    if(tema=='uno'){
        document.getElementById("proporciones").style.backgroundColor="#EBFAFF";
        document.getElementById("proporciones").style.color="#337ab7";
        document.getElementById("repeticiones").style.color="#337ab7";
        document.getElementById("quienessomos").style.color="#337ab7";
        document.getElementById("analizador").style.backgroundColor="#EBFAFF";
        document.getElementById("analizador").style.color="#337ab7";
        document.getElementById("page-top").style.fontFamily="Galada";
    }
    else{
        document.getElementById("proporciones").style.backgroundColor="#375386";
        document.getElementById("proporciones").style.color="#EBFAFF";
        document.getElementById("repeticiones").style.color="#737E91";
        document.getElementById("analizador").style.backgroundColor="#375386";
        document.getElementById("analizador").style.color="#EBFAFF";
        document.getElementById("page-top").style.fontFamily="Cuprum";
        document.getElementById("quienessomos").style.color="#737E91";
    }

function estilo(){
    var tema=localStorage.getItem('tema');
    if(tema=='dos'){
        document.getElementById("proporciones").style.backgroundColor="#EBFAFF";
        document.getElementById("proporciones").style.color="#337ab7";
        document.getElementById("repeticiones").style.color="#337ab7";
        document.getElementById("quienessomos").style.color="#337ab7";
        document.getElementById("analizador").style.backgroundColor="#EBFAFF";
        document.getElementById("analizador").style.color="#337ab7";
        document.getElementById("page-top").style.fontFamily="Galada";
        localStorage.setItem("tema","uno");
    }
    else{
        document.getElementById("proporciones").style.backgroundColor="#375386";
        document.getElementById("proporciones").style.color="#EBFAFF";
        document.getElementById("repeticiones").style.color="#737E91";
        document.getElementById("analizador").style.backgroundColor="#375386";
        document.getElementById("analizador").style.color="#EBFAFF";
        document.getElementById("page-top").style.fontFamily="Cuprum";
        document.getElementById("quienessomos").style.color="#737E91";
        localStorage.setItem("tema","dos");
    }
}