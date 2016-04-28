/**
 * Created by Angel Norambuena on 25-04-2016.
 */
angular.module('PokedexApp.controllers', [])

  .controller('PokemonsCtrl', function($scope, $ionicLoading, PokedexSvc, $filter) {


    console.log("PokemonsCtrl");

    $scope.pokemons = [];
    $scope.numberOfPokemonsToDisplay = 20;

    var urlToImgs = 'assets/img/pokemons/';

    PokedexSvc.loadPokemons();

    $ionicLoading.show({template : 'Loading Pokemons'});
    $scope.$broadcast('Pokemons', $scope.pokemons); // creo el evento 'Pokemons' para el controlador de 'detailPokemons'

    $scope.$on('PokedexApp.pokemons', function(event, data)
    {
      data.forEach(function(p)
      {
        $scope.pokemons.push({
          id : p.id,
          name : p.name,
          species : p.species,
          img : urlToImgs+$filter('ImageFilter')(p.name)+'.jpg',
          type : p.type
        });
      });
      $ionicLoading.hide();
    });

    $scope.loadMore = function ()
    {
      if ($scope.pokemons.length > $scope.numberOfPokemonsToDisplay) {
        $scope.numberOfPokemonsToDisplay += 20; // load 5 more pokemons
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }
    };

    $scope.clearSearch = function () {
      $scope.searchPoke = "";
    }

  })

  .controller('DashCtrl', function () {

  })

  .controller('PokemonDetailCtrl', function ($scope, $stateParams, PokedexSvc, $filter) {
    $scope.p = {};
    var urlToImgs = 'assets/img/pokemons/';
    PokedexSvc.getPokemon($stateParams.pokemonId);
    $scope.$on('PokedexApp.pokemon', function (event, data) {
      $scope.p = data;
      $scope.p.img=urlToImgs+$filter('ImageFilter')($scope.p.name)+'.jpg';
    });
  });
