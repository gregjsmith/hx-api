import UserService from './UserService';

class AppRouter {

  constructor(app, router){
    app.use('/api', router);
    this.router = router;
    this.app = app;
    this.userService = new UserService();
  }

  initApiRoutes(){
    this.router.route('/users')
      .get((req, res) => {
        var response = this.userService.getUsers();
        res.json(response);
      })
      .post((req, res) => {
        var response = this.userService.saveUser(req.body);
        res.json(response);
      });
  }

  initWebRoutes(){
    this.app.get('/', (req, res) => {
      res.status(200).send("Welcome...");
    });
  }
}

export default AppRouter;
