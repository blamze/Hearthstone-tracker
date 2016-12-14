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

  getHighscore() {
    return this.http({
      method: "GET",
      url: "http://localhost:3300/api/users/highscore",
    });
  }

  addPointsToUser(options) {
    return this.http({
      method: "PUT",
      url: "http://localhost:3300/api/users/add",
      data: options
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
