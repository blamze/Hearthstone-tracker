class NavbarController {
  constructor(loginService) {
    this.loginService = loginService;
  }

  logOff() {
    this.loginService.logOff();
  }
}

export default NavbarController;
