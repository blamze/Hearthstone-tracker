class registrationController {
  constructor(usersService, $state) {
    this.usersService = usersService;
    this.$state = $state;
    this.error = false;
    this.error2 = false;
  };

  saveUser(data) {
    if (data.password === data.repPassword) {
      this.usersService.addUser(data).then((data) => {
        if (data.status === 200) {
          this.redirect();
        } else {
          this.error2 = true;
        }
      });

    } else {
      this.error = true;
    }

  }

  redirect() {
    this.$state.go('login');
  }
}
export default registrationController;
