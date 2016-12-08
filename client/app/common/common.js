import angular from 'angular';
import Navbar from './navbar/navbar';
import User from './user/user';
import Login from './login/login';

let commonModule = angular.module('app.common', [
  Login,
  Navbar,
  User
])

.name;

export default commonModule;
