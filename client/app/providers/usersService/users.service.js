export default class usersService {
  constructor($http) {
    this.http = $http;
    this.error = { message: '' };
  }
  getUsers() {
    return this.http({
      method: "GET",
      url: "http://localhost:3300/api/users",
    });
  }

  addUser(options) {
    console.log(options);
    return this.http({
      method: "POST",
      url: "http://localhost:3300/api/users",
      data: options
    });
  }

  // addMatch(options) {
  //   return this.http({
  //     method: "POST",
  //     url: "http://localhost:3300/api/matches/new",
  //     data: options
  //   });
  // }
  //
  // editMatch(options) {
  //   return this.http({
  //     method: "PUT",
  //     url: "http://localhost:3300/api/matches/edit",
  //     data: options
  //   });
  // }
  //
  // deleteMatch(options) {
  //   debugger;
  //   return this.http({
  //     method: "DELETE",
  //     url: "http://localhost:3300/api/matches/delete",
  //     data: options
  //   });
  // }

}
