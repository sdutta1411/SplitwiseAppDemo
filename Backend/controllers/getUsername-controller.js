const connection = require('../config');

module.exports.getusername=function(req,res){

    let email=req.body.email;
   
    console.log(email);
    
    connection.query('SELECT username FROM users WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'There are some error with query'
            })
      }else{
        if(results.length >0){
                res.json({
                    status:true,
                    username:results
                })         
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
      }
    });
}