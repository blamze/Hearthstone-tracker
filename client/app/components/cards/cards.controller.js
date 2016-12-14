class CardsController {
  constructor(cardsService, loginService) {
    this.cardsService = cardsService;
    this.loginService = loginService;
    this.loginService.isSignedIn();
    this.cards = {};
    this.error;
  }

  findCards(option) {
    if(option !== undefined) {
      this.cardsService.getSearchedCard(option.name)
        .then((data) => {
          if(data.data.length === 0) {
            this.error = 'There are no cards with that name';
          } else {
            this.cards = data.data;
            this.error = '';
          }

        })
        .catch(() => {
          this.cards = {};
          this.error = 'Something went wrong! Try again (maybe that card does not exist)';
        });
    } else {
      this.error = 'Insert card name';
    }

  }

}
export default CardsController;
