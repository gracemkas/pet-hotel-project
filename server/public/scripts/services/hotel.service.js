app.service('HotelService', ['$http', function ($http) {
    console.log('HotelService has been loaded');
    const self = this;

    self.pokemonList = {
        list: []
    };
    self.trainerList = {
        list: []
    };

    self.addPokemon = function (newPokemon) {
        console.log(`got to pokemon add:`, newPokemon);
        newPokemon.checked_in = new Date();
        newPokemon.checked_in_status = 'true';
        $http({
            method: 'POST',
            url: '/hotel/pokemon',
            data: newPokemon
        }).then(function (response) {
            console.log('response from router add', response);
            self.getPokemon();
        }).catch(function (err) {
            console.log('error from router add', err)
        })
    }

    self.getPokemon = function () {
        $http({
                method: 'GET',
                url: '/hotel/pokemon'
            }).then((response) => {
                console.log('response from router get', response.data);

                console.log('NAME FROM GET', response.data);
                let newPokemonList = [];

                for (pokemon of response.data) {
                    console.log(pokemon);
                    self.getGif(pokemon);
                    newPokemonList.push(pokemon);
                }
                self.pokemonList.list = newPokemonList;
                console.log(newPokemonList);
            })
            .catch((error) => {
                console.log('error making pokemon get request', error);
            });
    }

    self.getGif = function (pokemon) {
        console.log('pokemon: ', pokemon);
        $http.get(`http://api.giphy.com/v1/gifs/search?q=${pokemon.name}&api_key=1ObiKnAdRFuplIEFWzKfx3KJw1NxBuCp&limit=1`)
            .then(function (response) {
                pokemon.image = response.data.data;
                console.log('getGif', response.data.data);
            }).catch(function (err) {
                console.log('error from search get', err);
            })
    }

    self.removePokemon = function (pokemonId) {
        $http({
            method: 'DELETE',
            url: `/hotel/pokemon/${pokemonId}`
        }).then((response) => {
            self.getPokemon();
        }).catch((error) => {
            console.log('error making rent get request', error);
        });
    }

    self.addTrainer = function (newTrainer) {
        console.log(`got to trainer post:`, newTrainer);
        $http({
            method: 'POST',
            url: '/hotel/trainer',
            data: newTrainer
        }).then(function (response) {
            console.log('response from router add', response);
            self.getTrainer();
        }).catch(function (err) {
            console.log('error from router add', err)
        })
    }

    self.getTrainer = function () {
        $http({
                method: 'GET',
                url: '/hotel/trainer'
            }).then((response) => {
                console.log('response from router get', response.data);
                self.trainerList.list = response.data;
            })
            .catch((error) => {
                console.log('error making trainer get request', error);
            });
    }

    self.removeTrainer = function (trainerId) {
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
        if (pokemon.checked_in != 'No') {
            pokemon.checked_in = 'No';
        } else {
            pokemon.checked_in = new Date();
        }
        console.log('checkoutpokemon', pokemon.checked_in);
        $http({
            url: `/hotel`,
            method: 'PUT',
            data: pokemon
        }).then(function (response) {
            console.log('Put Response', response);
            self.getPokemon();
        }).catch(function (err) {
            console.log('err', err);
        });
    };



}]);