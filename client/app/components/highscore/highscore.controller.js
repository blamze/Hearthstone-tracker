class HighscoreController {
  constructor(usersService, loginService) {
    this.usersService = usersService;
    this.loginService = loginService;
    this.loginService.isSignedIn();
    this.loadHighscore();
  }

  loadHighscore() {
    this.usersService.getHighscore()
      .then((data) => {
        this.highscore = data.data.data;
      })
      .catch(() => {
        this.message = 'Error, could not load highscore';
      });
  }
}
export default HighscoreController;
