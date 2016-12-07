import angular from 'angular';
import uiRouter from 'angular-ui-router';
import matchesComponent from './matches.component';

let matchesModule = angular.module('matches', [
  uiRouter
])

  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('matches', {
        url: '/matches',
        component: 'matches'
      });
  })

  .component('matches', matchesComponent)

  .name;

export default matchesModule;
