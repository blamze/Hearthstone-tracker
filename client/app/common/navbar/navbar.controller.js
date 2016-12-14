class NavbarController {
  constructor(loginService) {
    this.loginService = loginService;
    this.data =  this.loginService.getUserInfo();
  }

  logOff() {
    this.loginService.logOff();
  }
}

export default NavbarController;
