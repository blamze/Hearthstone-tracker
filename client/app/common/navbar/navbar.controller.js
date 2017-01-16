class NavbarController {
  constructor(loginService) {
    this.loginService = loginService;
    this.data =  this.loginService.getUserInfo();
    this.name = 'vardas';
  }

  logOff() {
    this.loginService.logOff();
  }
}

export default NavbarController;
