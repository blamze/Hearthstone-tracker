export default class loginService {
  constructor($http, $state,$window) {
    this.http = $http;
    this.$state = $state
    this.user = {};
    this.$window = $window;
    console.log(this.user, 'cia turi but useris')
  }

  getUserInfo() {
    return this.$window.sessionStorage.user;
  }

  logOff() {
    this.$window.sessionStorage.clear();;
    this.$state.go('login');
    console.log(this.$window.sessionStorage);
  }

  isSignedIn() {
    console.log('hello');
    if(!this.$window.sessionStorage.getItem('user')) {
    // if(!this.user.isSignedIn) {
      this.$state.go('login');
    }
  }
  setUser(data){
    console.log('ar data', data);
    if(data.data.token) {
      this.$window.sessionStorage.setItem('user', angular.toJson(data.data));
    }
    console.log(this.$window.sessionStorage.user);
  }

  loginIn(user) {
    return this.http({
      method: "POST",
      url: "http://localhost:3300/api/login",
      data: user
    });
  }
}
