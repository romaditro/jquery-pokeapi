
$(document).ready(function(){

    const NUMERO_DE_POKEMONES = 10;
    let idPokemon = "bulbasaur";

    let url_api_pokemon = `https://pokeapi.co/api/v2/pokemon/?limit=${NUMERO_DE_POKEMONES}&offset=0`;
    let url_api_pokemon_detalle = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
  

    let poke_nombre;

  $.ajax({
    url: url_api_pokemon,
    type: 'GET',
    dataType: 'JSON',
    success: function(data) {
        //console.log(data.results);
        let pokemon = data.results;
        

        $('#select-pokeapi').append('<option value="0">Seleccione un Pokemon</option>');
        for(let i = 0; i < pokemon.length; i++){
          poke_nombre = pokemon[i].name.toUpperCase()
        
          $('#select-pokeapi').append('<option value="' + parseInt(parseInt(i) + 1) +'">' + poke_nombre + '</option>');
      }
    }
  });



  //Capturar evento onchangue del select
  
  $("#select-pokeapi").on("change", function (v) {
    const selectedPoke = v.target.value;
    //console.log("selectedPoke: " + selectedPoke);

    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${selectedPoke}`,
      type: "GET",
      dataType: "JSON",
      success: function (data) {       
        const pokemonOrden = data.order;
        $("#orden").text(pokemonOrden);

        const spriteFront = data.sprites.back_default;

        const artwork = data.sprites.other
        
        let img_artwork = "";
 
        $.each(artwork, function(index, item) {
          img_artwork = item.front_default
        });
        $("#img_artwork").attr("src", img_artwork);


        //Caracteristicas.
        const tipo = data.types;
        console.log(JSON.stringify(tipo));

        const pokemonAltura = data.height;
        $("#altura").text(pokemonAltura);

        const pokemonPeso = data.weight;
        $("#peso").text(pokemonPeso);
      }
    });
  });



    var radarData = {
      labels: ["HP", "Ataque", "Defensa", "Ataque Especial", "Defensa Especial", "Velocidad", "Running"],
      datasets: [
          {
              label: "My First dataset",
              fillColor: "rgba(98,203,49,0.2)",
              strokeColor: "rgba(98,203,49,1)",
              pointColor: "rgba(98,203,49,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "#62cb31",
              data: [65, 59, 66, 45, 56, 55, 40]
          },
      ]
  };

    var radarOptions = {
        scaleShowLine : true,
        angleShowLineOut : true,
        scaleShowLabels : false,
        scaleBeginAtZero : true,
        angleLineColor : "rgba(0,0,0,.1)",
        angleLineWidth : 1,
        pointLabelFontFamily : "'Arial'",
        pointLabelFontStyle : "normal",
        pointLabelFontSize : 10,
        pointLabelFontColor : "#666",
        pointDot : true,
        pointDotRadius : 2,
        pointDotStrokeWidth : 1,
        pointHitDetectionRadius : 20,
        datasetStroke : true,
        datasetStrokeWidth : 1,
        datasetFill : true,
    };

  var ctx = document.getElementById("radarChart").getContext("2d");
 
  //var myNewChart = new Chart(ctx).Radar(radarData, radarOptions);

  var myRadarChart = new Chart(ctx, {
    type: 'radar',
    data: radarData,
    options: radarOptions
});


});

