class registrationController {
  constructor(usersService) {
    this.usersService = usersService;
  };

  saveUser(data) {
    console.log(data);
    this.usersService.addUser(data);
  }
}
export default registrationController;
