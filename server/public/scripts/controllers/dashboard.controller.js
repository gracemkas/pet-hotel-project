app.controller('DashboardController', ['HotelService', function(HotelService){
    console.log('Dashboard Controller has started');
    let self = this;

    self.pokemonList = HotelService.pokemonList;
    self.trainerList = HotelService.trainerList;
    self.CurrentDate = new Date();


    self.addPokemon = function (newPokemon) {
        HotelService.addPokemon(newPokemon);
        self.newPokemon = {};
    };

    self.removePokemon = function (pokemonId) {
        HotelService.removePokemon(pokemonId);
    }

    self.checkOutPokemon = function(pokemon) {
        HotelService.checkOutPokemon(pokemon);  
    }

    self.checkInPokemon = function(pokemonId) {
        HotelService.checkOutPokemon(pokemonId);
    }

    HotelService.getPokemon();
    HotelService.getTrainer();
  
  }]);