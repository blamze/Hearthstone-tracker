export default class loginService {
  constructor($window,$state,$http) {
    this.user = {};
    this.$window = $window;
    this.$state = $state;
    this.$http = $http;
  }

  getUserInfo() {
    var data = JSON.parse(this.$window.sessionStorage.getItem('user'));
    return data;
  }

  logOff() {
    this.$window.sessionStorage.clear();;
    this.$state.go('login');
  }

  isSignedIn() {
    if(!this.$window.sessionStorage.getItem('user')) {
      this.$state.go('login');
    }
  }
  setUser(data){
    if(data.data.token) {
      this.$window.sessionStorage.setItem('user', angular.toJson(data.data));
    }
  }

  loginIn(user) {
    return this.$http({
      method: "POST",
      url: "http://localhost:3300/api/login",
      data: user
    });
  }
}
