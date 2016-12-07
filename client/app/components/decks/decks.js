import angular from 'angular';
import uiRouter from 'angular-ui-router';
import decksComponent from './decks.component';

let decksModule = angular.module('decks', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('decks', {
      url: '/decks',
      component: 'decks'
    });
})

.component('decks', decksComponent)

.name;

export default decksModule;
