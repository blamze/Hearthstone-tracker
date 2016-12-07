import usersService from './users.service.js';

export default angular.module('app.usersService', [])
  .service('usersService', usersService);
