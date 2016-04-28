/**
 * Created by Angel Norambuena on 25-04-2016.
 */
angular.module('PokedexApp.services', [])

  .factory('PokedexSvc', function ($http, $rootScope) {

    var loadPokemons = function()
    {
      $http.get("data/pokemons.json")
        .success(function(result)
        {
          $rootScope.$broadcast("PokedexApp.pokemons", result);
        });
    };

    var getPokemon = function(id){
      $http.get('data/pokemons.json')
        .success(function(result)
        {
          result.forEach(function(p){
            if (p.id == id){
              $rootScope.$broadcast("PokedexApp.pokemon", p);
            }
          });
        });
    };

    return {
      loadPokemons : loadPokemons,
      getPokemon : getPokemon
    };
  });
