class NavbarController {
  constructor(loginService,$window) {
    this.loginService = loginService;
    this.$window = $window;
    this.username =  JSON.parse(this.$window.sessionStorage.getItem('user'));
  }

  logOff() {
    this.loginService.logOff();
  }
}

export default NavbarController;
