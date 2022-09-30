const express = require("express");
const controllers = require("../app/controllers");
const validations = require("../app/validations");

const appRouter = express.Router();
const apiRouter = express.Router();

/** Mount GET / handler */
appRouter.get("/", controllers.main.index);

/**
 * TODO: Implement your own API
 *       implementations
 */
apiRouter.get("/api/v1/posts", controllers.api.v1.post.list);
apiRouter.post("/api/v1/posts", controllers.api.v1.post.create);
apiRouter.put("/api/v1/posts/:id", controllers.api.v1.post.setPost, controllers.api.v1.post.update);
apiRouter.get("/api/v1/posts/:id", controllers.api.v1.post.setPost, controllers.api.v1.post.show);
apiRouter.delete("/api/v1/posts/:id", controllers.api.v1.post.setPost, controllers.api.v1.post.destroy);

// auth
apiRouter.get("/auth/", controllers.api.v1.userController.index);
apiRouter.post("/auth/register", controllers.api.v1.userController.register);
apiRouter.post("/auth/login", controllers.api.v1.userController.login);

// news
apiRouter.get("/api/v1/news", controllers.api.v1.newsController.findAllNews);
apiRouter.post("/api/v1/news", validations.news.createNewsValidate, validations.checkValidate, controllers.api.v1.newsController.createNews);
apiRouter.put("/api/v1/news/:id", controllers.api.v1.newsController.updateNews);
apiRouter.delete("/api/v1/news/:id", controllers.api.v1.newsController.deleteNews);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error("The Industrial Revolution and its consequences have been a disaster for the human race.");
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
appRouter.get("/errors", () => {
  throw new Error("The Industrial Revolution and its consequences have been a disaster for the human race.");
});

appRouter.use(apiRouter);

/** Mount Not Found Handler */
appRouter.use(controllers.main.onLost);

/** Mount Exception Handler */
appRouter.use(controllers.main.onError);

module.exports = appRouter;
