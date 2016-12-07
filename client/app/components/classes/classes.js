import angular from 'angular';
import uiRouter from 'angular-ui-router';
import classesComponent from './classes.component';

let classesModule = angular.module('classes', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('classes', {
      url: '/classes',
      component: 'classes'
    });
})

.component('classes', classesComponent)

.name;

export default classesModule;
