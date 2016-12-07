import angular from 'angular';
import Home from './home/home';
import Classes from './classes/classes';
import Decks from './decks/decks';
import Cards from './cards/cards';
import Registration from './registration/registration';
import Matches from './matches/matches';

let componentModule = angular.module('app.components', [
  Home,
  Classes,
  Decks,
  Cards,
  Registration,
  Matches
])

.name;

export default componentModule;
