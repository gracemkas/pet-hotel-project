app.controller('DashboardController', ['HotelService', function(HotelService){
    console.log('Dashboard Controller has started');
    let self = this;

    self.pokemonList = HotelService.pokemonList;
    self.trainerList = HotelService.trainerList;

    self.addPokemon = function (newPokemon) {
        HotelService.addPokemon(newPokemon);
        self.newPokemon = {};
    };

    self.removePokemon = function (pokemonId) {
        HotelService.removePokemon(pokemonId);
    }

    HotelService.getPokemon();
    HotelService.getTrainer();
  
  }]);