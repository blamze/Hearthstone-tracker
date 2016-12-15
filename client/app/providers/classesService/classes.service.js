export default class classesService {
  constructor($http) {
    this.$http = $http;
  }

  getClasses() {
    return this.$http({
      method: "GET",
      url: "http://localhost:3300/api/classes",
    });
  }

  addClass(options) {
    return this.$http({
      method: "POST",
      url: "http://localhost:3300/api/classes/new",
      data: options
    });
  }

  editClass(options) {
    return this.$http({
      method: "PUT",
      url: "http://localhost:3300/api/classes/edit",
      data: options
    });
  }

  deleteClass(options) {
    return this.$http({
      method: "PUT",
      url: "http://localhost:3300/api/classes/delete",
      data: options
    });
  }
}
