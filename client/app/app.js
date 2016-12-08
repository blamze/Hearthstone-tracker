import angular from 'angular';
import uiRouter from 'angular-ui-router';

import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'normalize.css';

import matchesServiceComponent from './providers/matchesService/service.js';
import classesServiceComponent from './providers/classesService/service.js';
import decksServiceComponent from './providers/decksService/service.js';
import cardsServiceComponent from './providers/cardsService/service.js';
import usersServiceComponent from './providers/usersService/service.js';
import loginServiceComponent from './providers/loginService/service.js';

import '../bower_components/stormpath-sdk-angularjs/dist/stormpath-sdk-angularjs.js';
// import {stormpath.templates} from '../bower_components/stormpath-sdk-angularjs/dist/stormpath-sdk-angularjs.tpls.js';



angular.module('app', [
    uiRouter,
    Common,
    Components,
  matchesServiceComponent.name,
  classesServiceComponent.name,
  decksServiceComponent.name,
  cardsServiceComponent.name,
  usersServiceComponent.name,
  loginServiceComponent.name
  ])
  .config(($locationProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
  })

  .component('app', AppComponent);
