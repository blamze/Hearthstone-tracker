export default class cardsService {
  constructor($http) {
    this.http = $http;
    this.key = 'X-Mashape-Key';
    this.secret = '2zeR3I90BmmshyueS0ZwlyLp4Z4bp1uNYe4jsnjnqfodgv4Dn0';
  }

  getAllCards() {
      return this.http({
        method: "GET",
        url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/golem?collectible=1",
        // url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards",
        headers : {'X-Mashape-Key': '2zeR3I90BmmshyueS0ZwlyLp4Z4bp1uNYe4jsnjnqfodgv4Dn0'}
      });
  }
  getSearchedCard(options) {
    return this.http({
      method: "GET",
      url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/"+options+"?collectible=1",
      // url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards",
      headers : {'X-Mashape-Key': '2zeR3I90BmmshyueS0ZwlyLp4Z4bp1uNYe4jsnjnqfodgv4Dn0'}
    });
  }

  // getClasses() {
  //   return this.http({
  //     method: "GET",
  //     url: "http://localhost:3300/api/classes",
  //   });
  // }
  //
  // addClass(options) {
  //   return this.http({
  //     method: "POST",
  //     url: "http://localhost:3300/api/classes/new",
  //     data: options
  //   });
  // }
  //
  // editClass(options) {
  //   return this.http({
  //     method: "PUT",
  //     url: "http://localhost:3300/api/classes/edit",
  //     data: options
  //   });
  // }
  //
  // deleteClass(options) {
  //   debugger;
  //   return this.http({
  //     method: "DELETE",
  //     url: "http://localhost:3300/api/classes/delete",
  //     data: options
  //   });
  // }
}
