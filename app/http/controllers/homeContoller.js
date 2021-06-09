


function homeController(){
    return{
        upcoming(req , res) {
            res.render('upcoming');
        },
        all( req , res)
        {
            res.render('all')
        }
    }
}

module.exports = homeController;