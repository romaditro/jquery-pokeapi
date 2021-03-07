$(document).ready(function(){

    const NUMERO_DE_POKEMONES = 100;
    let url_api_pokemon = `https://pokeapi.co/api/v2/pokemon/?limit=${NUMERO_DE_POKEMONES}&offset=0`;
    let poke_nombre;

    //Grafico por defecto. 
    var radarData = {
      labels: ["HP", "Ataque", "Defensa", "Ataque Especial", "Defensa Especial", "Velocidad"],
      datasets: [
          {
              label: "",
              // fillColor: "#FFE0E6",
              // strokeColor: "#FFE0E6",
              // pointColor: "#FFE0E6",
              // pointStrokeColor: "#FFE0E6",
              // pointHighlightFill: "#FFE0E6",
              // pointHighlightStroke: "#FFE0E6",
              borderCapStyle: 'butt',
              borderColor: "#FF6384",
              backgroundColor: "#FFE0E6",
              data: null
          },
      ]
  };

    var radarOptions = {
        scaleShowLine : false,
        angleShowLineOut : true,
        scaleShowLabels : false,
        scaleBeginAtZero : true,
        angleLineColor : "#FFE0E6",
        angleLineWidth : 1,
        pointLabelFontFamily : "'Arial'",
        pointLabelFontStyle : "normal",
        pointLabelFontSize : 10,
        pointLabelFontColor : "#FFE0E6",
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
    let url_api_pokemon_detalle = `https://pokeapi.co/api/v2/pokemon/${selectedPoke}`;

    $.ajax({
      url: url_api_pokemon_detalle,
      type: "GET",
      dataType: "JSON",
      success: function (data) {     
        
        //Imagen
        let img_artwork = "";
        const artwork = data.sprites.other

        $.each(artwork, function(index, item) {
          img_artwork = item.front_default
        });
        $("#img_artwork").attr("src", img_artwork);


        //Orden        
        const pokemonOrden = data.order;
        $("#orden").text(pokemonOrden);

        //Altura
        const pokemonAltura = data.height;
        $("#altura").text(pokemonAltura);


        //Peso
        const pokemonPeso = data.weight;
        $("#peso").text(pokemonPeso);


        //Tipo
        let tipo = [];
        $.each(data.types, function(index, item) {
          tipo.push(item.type.name);
        });

        $("#tipo").text(tipo.join(" / "));


        //Habilidades.
        let habilidades =[];

        $.each(data.abilities, function(index, item) {
          habilidades.push(item.ability.name);
        });
        
        $("#habilidades").text(habilidades.join(" / "));

        //Grafico
        let estadisticas = [];

        $.each(data.stats, function(index, item) {
          estadisticas.push(item.base_stat);
        });

        //Actualizar el grafico.
        myRadarChart.data.datasets[0].data =  estadisticas;
        myRadarChart.update();

      }
    });
  });
});