angular.module('PokedexApp', ["ionic", "PokedexApp.controllers", "PokedexApp.services", "PokedexApp.filters"])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: "templates/tabs.html"
    })


    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.pokemon-detail', {
      url: '/pokemons/{pokemonId}',
      views: {
        'tab-pokemons': {
          templateUrl: 'templates/pokemon-detail.html',
          controller: 'PokemonDetailCtrl'
        }
      }
    })

    .state('tab.pokemons', {
      url : '/pokemons',
      views : {
        'tab-pokemons' : {
          templateUrl : 'templates/tab-pokemons.html',
          controller : 'PokemonsCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/tab/pokemons');
})

.config(function ($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
});

