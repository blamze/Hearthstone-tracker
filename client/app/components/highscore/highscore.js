import angular from 'angular';
import uiRouter from 'angular-ui-router';
import highscoreComponent from './highscore.component';

let highscoreModule = angular.module('highscore', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('highscore', {
      url: '/highscore',
      component: 'highscore'
    });
})

.component('highscore', highscoreComponent)

.name;

export default highscoreModule;
