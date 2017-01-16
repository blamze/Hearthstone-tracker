class ClassesController {
  constructor(classesService, loginService) {
    this.classesService = classesService;
    this.loginService = loginService;
    this.loginService.isSignedIn();
    this.loadClasses();
  }

  loadClasses() {
    this.classesService.getClasses()
      .then((data) => {
        this.classes = data.data.data;
      })
      .catch(() => {
        this.message = 'Error, could not load classes';
      });
  }

  saveClass(data) {
    this.classesService.addClass(data)
      .then(() => {
        this.message = 'New class added';
        this.resetInputs();
        this.loadClasses();
      }).catch(() => {
        this.message = 'Error, something went wrong, try again';
      });
  }

  editClass(data) {
    this.classesService.editClass(data)
      .then(() => {
        this.message = 'Class edited';
        this.resetInputs();
        this.loadClasses();
      }).catch(() => {
        this.message = 'Error, something went wrong, try again';
      });
  }

  deleteClass(data) {
    this.classesService.deleteClass(data)
      .then(() => {
        this.message = 'Class deleted';
        this.resetInputs();
        this.loadClasses();
      }).catch(() => {
        this.message = 'Error, something went wrong, try again';
      });
  }

  deleteMessage() {
    this.message = '';
  }

  resetInputs() {
    this.add = '';
    this.edit = '';
    this.delete = '';
  }
}
export default ClassesController;
