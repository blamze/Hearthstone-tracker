import NavbarModule from './navbar'

describe('Navbar', () => {
  let $rootScope, $state, $location, $componentController, $compile, loginService;

  beforeEach(window.module(NavbarModule));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    loginService = $injector.get('loginService');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    let controller;
    beforeEach(() => {
      controller = $componentController('navbar', {
        $scope: $rootScope.$new()
      });
    });

    it('has a name property', () => {
      expect(controller).to.have.property('name');
    });
  });

  describe('View', () => {
    // view layer specs.
    let scope, template;

    beforeEach(() => {
      scope = $rootScope.$new();
      template = $compile('<navbar></navbar>')(scope);
      scope.$apply();
    });

    it('has name in template', () => {
      expect(template.find('a').html()).to.eq('Hearthstone statistics');
    });

  });
});
