class ClassesController {
  constructor(classesService, loginService) {
    this.classesService = classesService;
    this.loginService = loginService;
    this.classes;

    this.classesService.getClasses()
      .then((data) => {
        this.classes = data.data.data;
      })
      .catch((error) => {
        this.error.message = error.data;
      });

    this.loginService.isSignedIn();
  }

  saveClass(data) {
    this.classesService.addClass(data);
    window.location.reload();
  };

  editClass(data) {
    this.classesService.editClass(data);
    window.location.reload();
  };

  deleteClass(data) {
    this.classesService.deleteClass(data);
    window.location.reload();
  };
}
export default ClassesController;
