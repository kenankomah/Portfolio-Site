//ROUTES
myApp.config(function ($routeProvider){

    $routeProvider
    
    .when('/', {
      	templateUrl: 'views/home.html',
        controller: 'homeController'    
    })
    
    .when('/currencies-table', {
        templateUrl: 'views/currencies-table.html',
        controller: 'homeController'  
    })
                      
});