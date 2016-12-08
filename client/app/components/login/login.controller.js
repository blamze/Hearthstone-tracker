class LoginController {
  constructor($state,loginService) {
    this.$state = $state;
    this.loginService = loginService;
  }

  login(data) {
    this.loginService.loginIn(data).then((info)=>{
      this.loginService.setUser(info);
      this.$state.go('matches');
    });
  }

  redirect(){
    this.$state.go('registration');
  }
}

export default LoginController;
