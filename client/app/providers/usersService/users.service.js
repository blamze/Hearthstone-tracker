export default class usersService {
  constructor($http) {
    this.http = $http;
  }
  getUsers() {
    return this.http({
      method: "GET",
      url: "http://localhost:3300/api/users",
    });
  }

  addUser(options) {
    return this.http({
      method: "POST",
      url: "http://localhost:3300/api/users",
      data: options
    });
  }
}
