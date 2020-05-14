

  fetch("https://pomber.github.io/covid19/timeseries.json")
    .then( res => res.json())
    .then( datos => {
      tabla(datos)
      // datos["Uruguay"].forEach(({ date, confirmed, recovered, deaths }) =>
      // console.log(`${date} active cases: ${confirmed} - ${recovered} - ${deaths}`));
    })

    function tabla(datos, buscar){

      var buscar = document.getElementById("search").value;;
      datos["Argentina"].forEach((datos, i) => {


        if (i> 99) {
          mostrar.innerHTML += `

              <tr >
                  <td>${i}</td>
                  <td>${ datos.date }</td>
                  <td>${ datos.confirmed}</td>
                  <td>${ datos.recovered }</td>
                  <td>${ datos.deaths }</td>
                </tr>
          `
        } else {
          console.log("No hay datos que mostrar");
        }

      });


    }
