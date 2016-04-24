var PokedexApp = angular.module('PokedexApp', ["ionic"]);

PokedexApp.service('PokedexSvc', ['$http', '$rootScope', PokedexSvc]);

PokedexApp.controller('PokedexCtrl', ['$scope', '$ionicLoading', 'PokedexSvc', '$filter', PokedexCtrl]);

PokedexApp.filter('imageify', function () {
  return function(input) {
    return input.replace('♀', 'f').replace('♂', 'm').replace(/\W+/g, "").toLowerCase();
  };
});

// Function to controller
function PokedexCtrl ($scope, $ionicLoading, PokedexSvc, $filter)
{
  $scope.pokemons = [];
  $scope.numberOfPokemonsToDisplay = 20;

  var urlToImgs = 'assets/img/pokemons/';

  PokedexSvc.loadPokemons();

  $ionicLoading.show({template : 'Loading Pokemons'});
  $scope.$on('PokedexApp.pokemons', function(_, result)
  {
    result.forEach(function(p)
    {
      $scope.pokemons.push({
        id : p.id,
        name : p.name,
        species : p.species,
        img : urlToImgs+$filter('imageify')(p.name)+'.jpg',
        type : p.type
      });
    });
    $ionicLoading.hide();
    $scope.$broadcast('scroll.refreshComplete');
  });
  
  $scope.loadMore = function ()
  {
    if ($scope.pokemons.length > $scope.numberOfPokemonsToDisplay) {
      $scope.numberOfPokemonsToDisplay += 20; // load 5 more pokemons
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
  };

  $scope.reloadPokemons = function ()
  {
    $scope.pokemons = [];
    PokedexSvc.loadPokemons();
  };
}

// Function to service
function PokedexSvc ($http, $rootScope)
{
  this.loadPokemons = function()
  {
    $http.get("data/pokemons.json")
    .success(function(result)
    {
      $rootScope.$broadcast("PokedexApp.pokemons", result);
    });
  };
}
