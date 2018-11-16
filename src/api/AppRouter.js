import UserService from './UserService';

class AppRouter {
  constructor(app, router) {
    app.use('/api', router);
    this.router = router;
    this.app = app;
    this.userService = new UserService();
  }

  initApiRoutes() {
    this.router.get('/users', async (req, res) => {
      try {
        const response = await this.userService.getUsers();

        if (response === null || response === []) {
          res.status(404);
        }

        res.json(response);
      } catch (e) {
        res.status(500).json(e);
      }
    });

    this.router.get('/users/:id', async (req, res) => {
      try {
        const response = await this.userService.getById(req.params.id);

        if (response === null || response === []) {
          res.status(404);
        }

        res.json(response);
      } catch (e) {
        res.status(500).json(e);
      }
    });


    this.router.post('/users', async (req, res) => {
      try {
        const response = await this.userService.saveUser(req.body);
        let status;
        if (response.status === 'created') {
          status = 201;
        } else {
          status = 200;
        }

        res.location(`/users/${response.user._id}`)
          .status(status)
          .json(response);
      } catch (e) {
        res.status(500).json(e);
      }
    });

    this.router.delete('/users/:id', async (req, res) => {
      try {
        const response = await this.userService.delete(req.params.id);

        let status;

        if (response.removed > 0) {
          status = 200;
        } else {
          status = 404;
        }

        res.status(status)
          .json(response);
      } catch (e) {
        res.status(500).json(e);
      }
    });
  }
}

export default AppRouter;
