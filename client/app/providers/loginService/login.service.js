export default class loginService {
  constructor($http, $state,$window) {
    this.http = $http;
    this.$state = $state
    this.user = {};
    this.$window = $window;
  }

  getUserInfo() {
    return this.$window.sessionStorage.user;
  }

  logOff() {
    this.$window.sessionStorage.clear();;
    this.$state.go('login');
  }

  isSignedIn() {
    if(!this.$window.sessionStorage.getItem('user')) {
    // if(!this.user.isSignedIn) {
      this.$state.go('login');
    }
  }
  setUser(data){
    if(data.data.token) {
      this.$window.sessionStorage.setItem('user', angular.toJson(data.data));
    }
  }

  loginIn(user) {
    return this.http({
      method: "POST",
      url: "http://localhost:3300/api/login",
      data: user
    });
  }
}
