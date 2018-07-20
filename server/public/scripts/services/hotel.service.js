app.service('HotelService', ['$http', function($http) {
    console.log('HotelService has been loaded');
    const self = this;

    self.pokemonList = { list: [] };
    self.trainerList = { list: [] };

    self.addPokemon = function(newPokemon) {
        console.log(`got to pokemon add:`, newPokemon);
        newPokemon.checked_in = 'Yes';
        newPokemon.checked_in_status = 'true';
        $http({
          method: 'POST',
          url: '/hotel/pokemon',
          data: newPokemon
        }).then(function(response){
          console.log('response from router add', response);
            self.getPokemon();
        }).catch(function(err){
          console.log('error from router add', err)
        })
      }

    self.getPokemon = function() {
        $http({
            method: 'GET',
            url:'/hotel/pokemon'
        }).then((response) => {
            console.log('response from router get', response.data);
            self.pokemonList.list = response.data;
        })
        .catch((error) => {
            console.log('error making pokemon get request', error);
        });
    }

    self.removePokemon = function(pokemonId) {
        $http({
            method: 'DELETE',
            url: `/hotel/pokemon/${pokemonId}`
        }).then((response) => {
            self.getPokemon();
        }).catch((error) => {
            console.log('error making rent get request', error);
        });
    }

    self.addTrainer = function(newTrainer) {
        console.log(`got to trainer post:`, newTrainer);
        $http({
          method: 'POST',
          url: '/hotel/trainer',
          data: newTrainer
        }).then(function(response){
          console.log('response from router add', response);
            self.getTrainer();
        }).catch(function(err){
          console.log('error from router add', err)
        })
      }    

      self.getTrainer = function() {
        $http({
            method: 'GET',
            url:'/hotel/trainer'
        }).then((response) => {
            console.log('response from router get', response.data);
            self.trainerList.list = response.data;
        })
        .catch((error) => {
            console.log('error making trainer get request', error);
        });
    }

    self.removeTrainer = function(trainerId) {
        $http({
            method: 'DELETE',
            url: `/hotel/trainer/${trainerId}`
        }).then((response) => {
            self.getTrainer();
        }).catch((error) => {
            console.log('error making rent get request', error);
        });
    }

    self.checkOutPokemon = function (pokemon) {
        console.log('toggle clicked');
        console.log(pokemon);
        pokemon.checked_in_status = !pokemon.checked_in_status;
        if (pokemon.checked_in == 'Yes'){
            pokemon.checked_in = 'No';
        }else{
            pokemon.checked_in = 'Yes';
        }
        console.log('checkoutpokemon', pokemon.checked_in);
        // pokemon.checked_in = 'No';
        $http({
            url: `/hotel`,
            method: 'PUT',
            data: pokemon
        }).then(function (response) {
            console.log('Put Response', response);
            self.getPokemon();
        }).catch(function(err){ 
            console.log('err', err);
        }); 
    };


    // self.editCrewMember = function(crewMemberToEdit, id){
    //     console.log('got to edit', crewMemberToEdit);
    //     $http.put(`/crew/${id}`, crewMemberToEdit).then(function(response){
    //         console.log('response', response);
    //         self.getCrew();
    //     })


}]);