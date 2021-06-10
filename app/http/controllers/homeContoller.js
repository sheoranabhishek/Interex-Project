const Interview = require("../../models/interview");


function homeController(){
    return{
        async upcoming(req , res) {
            var interviews = await Interview.find({'status' : 'Upcoming'}).populate('participants').sort({timestamp: 1});
            res.render('upcoming' , {interviews: interviews});
        },
        async all( req , res)
        {
            var interviews = await Interview.find().populate('participants').sort({status: -1 });
            res.render('all' , {interviews: interviews});
        }
    }
}

module.exports = homeController;