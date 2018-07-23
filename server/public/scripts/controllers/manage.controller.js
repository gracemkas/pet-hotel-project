app.controller('ManageController', ['HotelService', function (HotelService) {
    console.log('Manage Controller has started');
    let self = this;

    self.trainerList = HotelService.trainerList;

    self.addTrainer = function (newTrainer) {
        HotelService.addTrainer(newTrainer);
        self.newTrainer = {};
    };

    self.removeTrainer = function (trainer) {
        if (trainer.count > 0) {
            alert(`You can't delete a trainer with pokemon!`);
        } else {
            HotelService.removeTrainer(trainer.id);
        }
    }

    HotelService.getTrainer();

}]);