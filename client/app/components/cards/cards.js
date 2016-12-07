import angular from 'angular';
import uiRouter from 'angular-ui-router';
import cardsComponent from './cards.component';

let cardsModule = angular.module('cards', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('cards', {
      url: '/cards',
      component: 'cards'
    });
})

.component('cards', cardsComponent)

.name;

export default cardsModule;
