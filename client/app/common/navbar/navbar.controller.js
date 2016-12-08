class NavbarController {
  constructor(loginService) {
    this.name = 'navbar';
    this.loginService = loginService;
  }
  logOff() {
    console.log('logoffina');
    this.loginService.logOff();
  }
}

export default NavbarController;
