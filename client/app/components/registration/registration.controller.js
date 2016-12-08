class registrationController {
  constructor(usersService,$state) {
    this.usersService = usersService;
    this.$state = $state;
  };

  saveUser(data) {
    console.log(data);
    this.usersService.addUser(data);
  }
  redirect() {
    this.$state.go('login');
  }
}
export default registrationController;
