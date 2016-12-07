import angular from 'angular';
import Navbar from './navbar/navbar';
import User from './user/user';
import Login from './login/login';

let commonModule = angular.module('app.common', [
  Navbar,
  User,
  Login
])

.name;

export default commonModule;
