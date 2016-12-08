class LoginController {
  constructor($scope, User, $state,loginService) {
    this.User = User;
    this.$state = $state;
    this.loginService = loginService;

  }

  login(data) {
    console.log(data);
    this.loginService.loginIn(data).then((info)=>{
      this.loginService.setUser(info);
      this.loginService.isSignedIn();
    });
  }

  redirect(){
    this.$state.go('registration');
  }
}

export default LoginController;
