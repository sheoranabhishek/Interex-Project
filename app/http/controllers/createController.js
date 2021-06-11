const Interview = require('../../models/interview');
const User = require('../../models/user');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
var transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});


function createController(){
    return{
        //get to /Create
        async index(req , res) {
                const users = await User.find().sort({"name" : 1});
                return res.render('create' , {users: users , heading: "Create New" });
        },
        // POST to createNewInterview or update the existing interview
        async createInterview(req , res){

                //if the request is from the create new interview page
            if(req.body._id == '' )
            {
                
            //we receive the data 
            const { title , description , participants , startTime , endTime , date } = req.body;
            if( !title.trim() || !startTime || !endTime || !date)
            {
                req.flash('error' , 'Please fill the mandatory fields.');              
                //sending back the already filled details.
                req.flash('title' , title);
                req.flash('description' , description);
                req.flash('startTime' , startTime);
                req.flash('endTime' , endTime);
                req.flash('date' , date);
                return res.redirect('/create');
            }

            //validating number of participants 
            const interviewee= (req.body.emails).trim().split(" ,");
            if( interviewee.length < 2)
            {
                req.flash('error' , 'Add 2 or more participants to continue.')
                req.flash('title' , title);
                req.flash('description' , description);
                req.flash('startTime' , startTime);
                req.flash('endTime' , endTime);
                req.flash('date' , date);
                return res.redirect('/create');
            }

            //checking if end time is less than start time ?
            var start = parseInt(startTime.replace(':' , '') , 10);
            var end = parseInt(endTime.replace(':' , '') , 10);
            if( start >= end && end!=0 )
            {

                req.flash('error' , 'Start time must be less than End time.');
                //we have to return a message and redirect 
                req.flash('title' , title);
                req.flash('description' , description);
                req.flash('startTime' , startTime);
                req.flash('endTime' , endTime);
                req.flash('date' , date);
                return res.redirect('/create');
            }


        
            //storing the selectedPeople in the array
            var selectedPeople = [];
            for( e of interviewee){
                var eachUser = await User.findOne({"email" : e});
                selectedPeople.push(eachUser);
            } 

            
            // validating if any of the participants is occupied ? => then we ask to recheck.
            for( i = 0 ; i < selectedPeople.length ;i++)
            {
                if( selectedPeople[i].occupied == true)
                {
                    req.flash('error' , `User ${interviewee[i]} already has interview scheduled. `  );
                    return res.redirect('/create');
                }
            }
            
            //converting the string date to date object
            var dateModified = new Date(date);
            


            // creating an interview if all above conditions satisfy
            const newInterview = new Interview({
                title: title, 
                description: description , 
                participants: selectedPeople,
                startTime: startTime, 
                endTime: endTime, 
                date: dateModified
            })


            //saving the interview to the database.
            newInterview.save().then( (newInterview) => {

                //marking the users occupied 
                for( user of newInterview.participants)
                {
                    update = {occupied: true};
                    User.findOneAndUpdate({email: user.email}, update , (err , data)=>{
                        if( err)
                        {
                            console.log(err);
                        }
                    } )
                }

                //sending emails to the members 
                for(email of interviewee)
                {
                    var mailOptions = {
                        from: process.env.EMAIL,
                        to: email,
                        subject: 'Email from Interview Scheduler',
                        text: `Hi , Your Interview has been scheduled from ${startTime} to ${endTime} on the date ${date}. The interview is about ${title} : ${description}.  All the Best. `
                    }
                    transporter.sendMail(mailOptions , (error , info )=> {
                        if( error)
                        {
                            console.log(error);
                        }
                        });
                }
                return res.redirect('/');
            }).catch(err => {
                console.log(err);
                req.flash('error' , 'Something went wrong');
                return res.redirect('/create');
            });

            }
                //if the request is from the update interview page
            else{
 
                //we receive the data 
                const { title , description , participants , startTime , endTime , date } = req.body;
                
                if( !title || !startTime || !endTime || !date)
                {
                    req.flash('error' , 'Please fill the mandatory fields.');              
                    //sending back the already filled details.
                    req.flash('title' , title);
                    req.flash('description' , description);
                    req.flash('startTime' , startTime);
                    req.flash('endTime' , endTime);
                    req.flash('date' , date);
                    return res.redirect('back');
                }

                //validating number of participants 
                const interviewee= (req.body.emails).trim().split(" ,");
                if( interviewee.length < 2)
                {
                    req.flash('error' , 'Add 2 or more participants to continue.')
                    req.flash('title' , title);
                    req.flash('description' , description);
                    req.flash('startTime' , startTime);
                    req.flash('endTime' , endTime);
                    req.flash('date' , date);
                    return res.redirect('/back');
                }

                //checking if end time is less than start time ?
                var start = parseInt(startTime.replace(':' , '') , 10);
                var end = parseInt(endTime.replace(':' , '') , 10);
                if( start >= end && end!=0 )
                {

                    req.flash('error' , 'Start time must be less than End time.');
                    //we have to return a message and redirect 
                    req.flash('title' , title);
                    req.flash('description' , description);
                    req.flash('startTime' , startTime);
                    req.flash('endTime' , endTime);
                    req.flash('date' , date);
                    return res.redirect('/create');
                }
            
                //storing the selectedPeople in the array
                var selectedPeople = [];
                for( e of interviewee){
                    var eachUser = await User.findOne({"email" : e});
                    selectedPeople.push(eachUser);
                } 


                // validating if any of the participants is occupied ? => then we ask to recheck.
                for( i = 0 ; i < selectedPeople.length ;i++)
                {
                    if( selectedPeople[i].occupied == true)
                    {
                        req.flash('error' , `User ${interviewee[i]} already has interview scheduled. `  );
                        return res.redirect('back');
                    }
                }

                var dateModified = new Date(date);

                // creating an interview if all above conditions satisfy
                const update = {
                    title: title, 
                    description: description , 
                    participants: selectedPeople,
                    startTime: startTime, 
                    endTime: endTime, 
                    date: dateModified
                }

                //this will update the result.
                Interview.findOneAndUpdate({_id: req.body._id} , update , (err , data)=>{
                //marking all user occupied.
                for( user of selectedPeople)
                {
                    let updateNew = {occupied: true};
                    User.findOneAndUpdate({email: user.email}, updateNew , (err , data)=>{
                        if( err )
                        {
                            console.log(err);
                        }

                    } )
                }         
                //sending email of updation
                for(email of interviewee)
                {
                    var mailOptions = {
                        from: process.env.EMAIL,
                        to: email,
                        subject: 'Email from Interview Scheduler',
                        text: `Hi , Your Interview scheduled has been revised from ${startTime} to ${endTime} on the date ${date}. The interview is about ${title} : ${description}.  All the Best. `
                    }
                    transporter.sendMail(mailOptions , (error , info )=> {
                        if( error)
                        {
                            console.log(error);
                        }
                        });
                }
                    return res.redirect('/all');
                })
            }
  
        },
        // GET to update a specific interview
        async update(req , res){
            if( mongoose.Types.ObjectId.isValid(req.params.id))
            {
                const interview = await Interview.findById(req.params.id);
                const users = await User.find().sort({"name" : 1});
                req.flash('idOfInterview',interview._id);
                req.flash('title' , interview.title);
                req.flash('description' , interview.description);
                req.flash('startTime' , interview.startTime);
                req.flash('endTime' , interview.endTime);
                req.flash('date' , interview.date);
                res.render('create' , {heading: "Edit Interview" , users: users  });
            }
              
        },
        // POST to mark interview as completed
        async markCompleted(req , res)
        {
            if( mongoose.Types.ObjectId.isValid(req.params.id))
            {
                const interview = await Interview.findById(req.params.id).populate('participants');
                const update = {
                    status: 'Completed' , 
                }


                Interview.findOneAndUpdate({_id: req.body._id} , update , {returnOriginal: false} , (err , data)=>{

                    //marking all the users unoccupied !
                    for( user of interview.participants)
                    {
                        let updateNew = {occupied: false};
                        User.findOneAndUpdate({email: user.email}, updateNew , (err , data)=>{
    
                            if( err)
                            {
                                console.data(err);
                            }

                        } )
                    }

                    
                    return res.redirect('/all');
                })
            }
        },
        // Delete a completed interview
        async delete(req , res)
        {
            if( mongoose.Types.ObjectId.isValid(req.params.id))
            {
                const interview = await Interview.findById(req.params.id);
                Interview.findOneAndDelete({_id: req.body._id} , (err , data)=>{  
                    return res.redirect('/all');
                })
            }
        }

    }
}



module.exports = createController;