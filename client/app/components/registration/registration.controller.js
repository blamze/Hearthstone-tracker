class registrationController {
  constructor(usersService, $state) {
    this.usersService = usersService;
    this.$state = $state;
    this.data;
    this.error;
  };

  saveUser(data) {
    if (data.password!== undefined && data.repPassword !== undefined && data.password === data.repPassword) {
      this.usersService.addUser(data).then((data) => {
        if (data.status === 200) {
          this.redirect();
        }
      })
        .catch((errorMessage) => {
          this.error = errorMessage.data;
        });
    } else {
      this.error = 'Passwords do not match';
    }

  }

  redirect() {
    this.$state.go('login');
  }
}
export default registrationController;
