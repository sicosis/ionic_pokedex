/**
 * Created by Angel Norambuena on 25-04-2016.
 */
angular.module('PokedexApp.filters', [])

  .filter('ImageFilter', function () {
    return function(input) {
      return input.replace('♀', 'f').replace('♂', 'm').replace(/\W+/g, "").toLowerCase();
    };
  });
