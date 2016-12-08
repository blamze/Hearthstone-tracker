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
}
