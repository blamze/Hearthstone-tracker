export default class decksService {
  constructor($http) {
    this.http = $http;
  }

  getDecks() {
    return this.http({
      method: "GET",
      url: "http://localhost:3300/api/decks",
    });
  }

  findDeck(options) {
    return this.http({
      method: "GET",
      url: "http://localhost:3300/api/decks/"+options.classid
    });
  }

  addDeck(options) {
    return this.http({
      method: "POST",
      url: "http://localhost:3300/api/decks/new",
      data: options
    });
  }

  editDeck(options) {
    return this.http({
      method: "PUT",
      url: "http://localhost:3300/api/decks/edit",
      data: options
    });
  }

  deleteDeck(options) {
    return this.http({
      method: "PUT",
      url: "http://localhost:3300/api/decks/delete",
      data: options
    });
  }
}
