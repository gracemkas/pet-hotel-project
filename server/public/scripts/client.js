const app = angular.module('PokemonHotelApp', ['ngRoute']);

app.config(function ($routeProvider){
    $routeProvider.when('/', {    
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController as vm'
    })
    .when('/manage', {
        templateUrl : 'views/manage.html',
        controller : 'ManageController as vm'
    })
    .otherwise({
        templateUrl: 'views/error.html'
    })
})