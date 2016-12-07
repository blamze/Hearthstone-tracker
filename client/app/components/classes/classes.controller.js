class ClassesController {
  constructor(classesService) {
    this.classesService = classesService;
    this.classes;

    var promise = this.classesService.getClasses();
    console.log(promise);
    promise
      .then((data) => {
        this.classes = data.data.data;
        console.log(this.classes, " turetu buti classes");
      })
      .catch((error) => {
        // this.error.message = error.data;
      });
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
