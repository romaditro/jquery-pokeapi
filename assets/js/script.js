
$(document).ready(function(){

    const NUMERO_DE_POKEMONES = 10;
    let idPokemon = "bulbasaur";

    let url_api_pokemon = `https://pokeapi.co/api/v2/pokemon/?limit=${NUMERO_DE_POKEMONES}&offset=0`;
    let url_api_pokemon_detalle = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;

    console.log(url_api_pokemon);
    


  $.ajax({
    url: url_api_pokemon,
    type: 'GET',
    dataType: 'JSON',
    success: function(data) {
        console.log(data.results);
        let pokemon = data.results;

      for(let i = 0; i < pokemon.length; i++){
        //poke_nombre[i] = poke_name[i].name.toUpperCase()
        
        //$('#select_poke').append('<option value="' + parseInt(parseInt(i) + 1) +'">' + poke_nombre[i] + '</option>');

        const tarjetaPokemon = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png">
            <p>${pokemon[i].name} - ${pokemon[i].url} </p>
        `;

        $('#pokemones').append(tarjetaPokemon);


      }
    }
  });



  //Detalle del Pokemon
  $.ajax({
    url: url_api_pokemon_detalle,
    type: 'GET',
    dataType: 'JSON',
    success: function(data) {
        console.log(data);
       // let pokemon = data.results;

 
    }
  });



});

