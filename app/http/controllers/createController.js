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
        async index(req , res) {
                const users = await User.find().sort({"name" : 1});
                return res.render('create' , {users: users , heading: "Create New" });
        },
        async createInterview(req , res){
            console.log( "Request.body is = " + req.body._id);
            if(req.body._id == '' )
            {
                
            //we receive the data 
            const { title , description , participants , startTime , endTime , date } = req.body;
            console.log(title.length);
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
                    return res.redirect('/create');
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


            //saving the interview to the database.
            newInterview.save().then( (newInterview) => {
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
                        else
                        {
                            console.log('Email sent : ' + info.response);
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
            
                //storing the selectedPeople in the array
                var selectedPeople = [];
                for( e of interviewee){
                    var eachUser = await User.findOne({"email" : e});
                    selectedPeople.push(eachUser);
                } 


                // validating if any of the participants is occupied ? => then we ask to recheck.
                for( i = 0 ; i < selectedPeople.length ;i++)
                {
                    console.log('outside');
                    if( selectedPeople[i].occupied === 1)
                    {
                        console.log('here');
                        req.flash('error' , `User ${interviewee[i]} already has interview scheduled. `  );
                        return res.redirect('/back');
                    }
                }

                // creating an interview if all above conditions satisfy
                const update = {
                    title: title, 
                    description: description , 
                    participants: selectedPeople,
                    startTime: startTime, 
                    endTime: endTime, 
                    date: date
                }

                //this will update the result.
                Interview.findOneAndUpdate({_id: req.body._id} , update , (err , data)=>{
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
                        else
                        {
                            console.log('Email sent : ' + info.response);
                        }
                        });
                }

                    return res.redirect('/all');
                })
            }
  
        },
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
        async markCompleted(req , res)
        {
            if( mongoose.Types.ObjectId.isValid(req.params.id))
            {
                const interview = await Interview.findById(req.params.id);

                const update = {
                    status: 'Completed'
                }

                Interview.findOneAndUpdate({_id: req.body._id} , update , {returnOriginal: false} , (err , data)=>{

                    return res.redirect('/all');
                })
            }
        }

    }
}

module.exports = createController;