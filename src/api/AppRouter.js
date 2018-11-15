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
      .get(async (req, res) => {
        try {
          let response;

          if(req.query.id){
            response = await this.userService.getById(req.query.id);
          } else{
            response = await this.userService.getUsers();
          }

          if(response === null || response === []){
            res.status(404);
          }

          res.json(response);

        } catch(e) {
          res.status(500).json(e);
        }
      })
      .post(async (req, res) => {
        try {
          let response = await this.userService.saveUser(req.body);
          let status;
          if(response.status === 'created'){
            status = 201;
          } else {
            status = 200;
          }

          res.location(`/users/${response.user._id}`)
            .status(status)
            .json(response);

        } catch(e){
          res.status(500).json(e);
        }
      })
      .delete(async (req, res) => {
        try {
          let response = await this.userService.delete(req.body);
          res.json(response);
        } catch(e){
          res.status(500).json(e);
        }
      });
  }
}

export default AppRouter;
