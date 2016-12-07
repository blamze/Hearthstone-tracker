import template from './cards.html';
import controller from './cards.controller';
import './cards.styl';

let cardsComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller
};

export default cardsComponent;
