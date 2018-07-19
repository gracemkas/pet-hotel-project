app.controller('ManageController', ['HotelService', function(HotelService){
    console.log('Manage Controller has started');
    let self = this;

    self.trainerList = HotelService.trainerList;

    self.addTrainer = function (newTrainer) {
        HotelService.addTrainer(newTrainer);
        self.newTrainer = {};
    };

    self.removeTrainer = function (pokemonId) {
        HotelService.removeTrainer(pokemonId);
    }

    HotelService.getTrainer();
  
  }]);