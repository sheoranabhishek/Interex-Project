const Interview = require('../../models/interview');
const User = require('../../models/user');

function createController(){
    return{
        async index(req , res) {
                const users = await User.find();
                return res.render('create' , {users: users});
        },
        createInterview(req , res){
            //we receive the data 
            const { title , description , participants , startTime , endTime , data } = req.body;
            
            if( !title || !startTime || !endTime || !date)
            {
                return res.redirect('/create');
            }
            
            
            const interviewee= (req.body.emails).split(" ,");
            const numberOfparticipants = interviewee.length;

            //validating the length




        }


    }
}

module.exports = createController;