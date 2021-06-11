const createController = require("../app/http/controllers/createController");
const homeController = require("../app/http/controllers/homeContoller");
const statusContoller = require("../app/http/controllers/statusController");



function initRoutes(app){
    
    app.get("/create" , createController().index );
    app.post("/createInterview" , createController().createInterview);
    app.get("/all", homeController().all);
    app.get("/", homeController().upcoming);
    // app.post("/statusUpdate", statusContoller().update );
    app.get("/:id",createController().update);
    app.post("/markcompleted/:id" ,createController().markCompleted);
    app.post("/delete/:id" ,createController().delete);

}
  


module.exports = initRoutes;