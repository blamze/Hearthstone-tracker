class LoginController {
  constructor($state,loginService) {
    this.$state = $state;
    this.loginService = loginService;
    this.error;
  }

  login(data) {
    this.loginService.loginIn(data).then((info)=>{
      this.loginService.setUser(info);
      this.$state.go('matches');
    }).catch((data) => {
      this.error = data.data;
    });
  }

  redirect(){
    this.$state.go('registration');
  }
}

export default LoginController;
