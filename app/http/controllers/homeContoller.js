const Interview = require("../../models/interview");


function homeController(){
    return{
        async upcoming(req , res) {
            var interviews = await Interview.find({'status' : 'Upcoming'}).populate('participants');
            res.render('upcoming' , {interviews: interviews});
        },
        async all( req , res)
        {
            var interviews = await Interview.find().populate('participants');
            res.render('all' , {interviews: interviews});
        }
    }
}

module.exports = homeController;