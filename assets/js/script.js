
$(document).ready(function(){

    const NUMERO_DE_POKEMONES = 10;
    let idPokemon = "bulbasaur";

    let url_api_pokemon = `https://pokeapi.co/api/v2/pokemon/?limit=${NUMERO_DE_POKEMONES}&offset=0`;
    let url_api_pokemon_detalle = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
  

    let poke_nombre;

    //Grafico por defecto.

    
    var radarData = {
      labels: ["HP", "Ataque", "Defensa", "Ataque Especial", "Defensa Especial", "Velocidad"],
      datasets: [
          {
              label: "",
              fillColor: "#FF00BF",
              strokeColor: "#FF00BF",
              pointColor: "#FF00BF",
              pointStrokeColor: "#FF00BF",
              pointHighlightFill: "#E9CAD0",
              pointHighlightStroke: "#E9CAD0",
              data: [0,0,0,0,0,0]
          },
      ]
  };

    var radarOptions = {
        scaleShowLine : false,
        angleShowLineOut : true,
        scaleShowLabels : false,
        scaleBeginAtZero : true,
        angleLineColor : "#E9CAD0",
        angleLineWidth : 1,
        pointLabelFontFamily : "'Arial'",
        pointLabelFontStyle : "normal",
        pointLabelFontSize : 10,
        pointLabelFontColor : "#E9CAD0",
        pointDot : false,
        pointDotRadius : 2,
        pointDotStrokeWidth : 1,
        pointHitDetectionRadius : 20,
        datasetStroke : true,
        datasetStrokeWidth : 1,
        datasetFill : false,
    };

  var ctx = document.getElementById("radarChart").getContext("2d");

  var myRadarChart = new Chart(ctx, {
    type: 'radar',
    data: radarData,
    options: radarOptions
  });


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
        
        //Tipo
        let tipo = data.types[0].type.name;
        //tipo += " - " + data.types[1].type.name;

        $("#tipo").text(tipo);


        //Habilidades.
        let habilidades = data.abilities[0].ability.name;
        //habilidades += " - " + data.abilities[1].ability.name;

        $("#habilidades").text(habilidades);


        const pokemonAltura = data.height;
        $("#altura").text(pokemonAltura);

        const pokemonPeso = data.weight;
        $("#peso").text(pokemonPeso);



        //Grafico
        let estadisticas = [];

        estadisticas.push(parseInt(data.stats[0].base_stat)); 
        estadisticas.push(parseInt(data.stats[1].base_stat)); 
        estadisticas.push(parseInt(data.stats[2].base_stat)); 
        estadisticas.push(parseInt(data.stats[3].base_stat)); 
        estadisticas.push(parseInt(data.stats[4].base_stat)); 
        estadisticas.push(parseInt(data.stats[5].base_stat)); 

        console.log(estadisticas);

        myRadarChart.data.datasets[0].data =  estadisticas;
        myRadarChart.update();

      }
    });
  });



});

