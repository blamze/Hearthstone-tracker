import angular from 'angular';
import uiRouter from 'angular-ui-router';
import matchesComponent from './matches.component';
import paging from 'angular-utils-pagination';

let matchesModule = angular.module('matches', [
  uiRouter,
  'angularUtils.directives.dirPagination'
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
