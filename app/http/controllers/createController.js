const Interview = require('../../models/interview');
const User = require('../../models/user');

function createController(){
    return{
        async index(req , res) {
                const users = await User.find().sort({"name" : 1});
                return res.render('create' , {users: users});
        },
        async createInterview(req , res){
            //we receive the data 
            const { title , description , participants , startTime , endTime , date } = req.body;
            
            // if( !title || !startTime || !endTime || !date)
            // {
            //     req.flash('error' , 'Please fill the mandatory fields.');              
            //     //sending back the already filled details.
            //     req.flash('title' , title);
            //     req.flash('description' , description);
            //     req.flash('startTime' , startTime);
            //     req.flash('endTime' , endTime);
            //     req.flash('date' , date);
            //     return res.redirect('/create');
            // }

            //validating number of participants 
            const interviewee= (req.body.emails).trim().split(" ,");


            //creating a json object of all the participants found
            const numberOfparticipants = interviewee.length;

            if( numberOfparticipants < 2)
            {
                req.flash('error' , 'Add 2 or more participants to continue.')
                req.flash('title' , title);
                req.flash('description' , description);
                req.flash('startTime' , startTime);
                req.flash('endTime' , endTime);
                req.flash('date' , date);
                res.redirect('/create');
            }

            //checking if end time is less than start time ?
            
            DateFormat 


            //storing the selectedPeople in the array
            var selectedPeople = [];
            for( e of interviewee){
                var eachUser = await User.findOne({"email" : e});
                selectedPeople.push(eachUser);
            } 


            // validating if any of the participants is occupied ? => then we ask to recheck.
            for( i = 0 ; i < selectedPeople.length ;i++)
            {
                if( selectedPeople[i].occupied === 1)
                {
                    req.flash('error' , `User ${interviewee[i]} already has interview scheduled. `  );
                    res.redirect('/create');
                }
            }

            // creating an interview if all above conditions satisfy
            const newInterview = new Interview({
                title: title, 
                description: description , 
                participants: selectedPeople,
                startTime: startTime, 
                endTime: endTime, 
                date: date
            })

            //this will make everything occupied.

            newInterview.save().then( (newInterview) => {
                //sending emails to the members 
                return res.redirect('/');
            }).catch(err => {
                console.log(err);
                req.flash('error' , 'Something went wrong');
                return res.redirect('/create');
            });

        }


    }
}

module.exports = createController;