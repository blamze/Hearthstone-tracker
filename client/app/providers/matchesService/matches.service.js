export default class UsersService {
  constructor($http) {
    this.http = $http;
    this.matches = [];
    this.error = { message: '' };
  }
  getMatches() {
    return this.http({
      method: "GET",
      url: "http://localhost:3300/api/matches",
    });
  }

}
