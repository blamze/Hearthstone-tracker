import angular from 'angular';
import Home from './home/home';
import Classes from './classes/classes';
import Decks from './decks/decks';
import Cards from './cards/cards';
import Registration from './registration/registration';
import Matches from './matches/matches';
import Login from './login/login';
import Highscore from './highscore/highscore';

let componentModule = angular.module('app.components', [
  Home,
  Classes,
  Decks,
  Cards,
  Registration,
  Matches,
  Login,
  Highscore
])

.name;

export default componentModule;
