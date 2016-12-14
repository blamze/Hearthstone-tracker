import angular from 'angular';
import uiRouter from 'angular-ui-router';
import decksComponent from './decks.component';
import paging from 'angular-utils-pagination';

let decksModule = angular.module('decks', [
  uiRouter,
  'angularUtils.directives.dirPagination'
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
