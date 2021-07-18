const bcrypt = require('bcrypt');
const con = require('../mysql');

exports.user_change_password = (req,res) => {
    
    const email = req.body.email;
    const password = req.body.password;
    const newPassword = req.body.newPassword;

    const q = `select * from users where email = '${email}';`

    con.query(q,(err,results) => {
        if(err){
            res.send({
                success:false,
                message:'error occured'
            })
        }else{
            if(results.length!==0){
                bcrypt.compare(password, results[0].password, function(err, result) {  
                    if(result===true){
                        bcrypt.hash(newPassword,3,(err3,hash) => {
                            if(err3){
                                res.send({
                                    success:false,
                                    message:'failed to change password'
                                });
                            }else{
                                const q2 = `update users set password = '${hash}' where email = '${email}'`;
                                con.query(q2,(err,results) => {
                                    if(err){
                                        res.send({
                                            success:false,
                                            message:'failed to change password'
                                        });
                                    }else{
                                        if(results.changedRows>0){
                                            res.send({
                                                success:true,
                                                message:'password changed successfully'
                                            });
                                        }else{
                                            res.send({
                                                success:false,
                                                message:'failed to change password'
                                            });
                                        }
                                    }
                                })
                            }
                        })
                    }else{
                        res.send({
                            success:false,
                            message:'old password is incorrect'
                        });
                    }
                });
            }else{
                res.send({
                    success:false,
                    message:'failed to change password'
                });
            }
        }
    })
}

exports.user_profile = (req,res) => {
    const email = req.body.email;
    const q = `select * from workout_stats where email = '${email}'`;
    con.query(q,(error,result) => {
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
}

exports.user_update_stats = (req,res) => {
    const email = req.body.email;
    const type = req.body.type;
    const q1 = 'update workout_stats set ';
    const q2 = '`';
    const q3 = type;
    const q4 = '` = ';
    const q5 = '`'
    const q6 = type;
    const q7 = '` + 1 ';
    const q8 = 'where email = ';
    const q9 = `'${email}';`;
    const q = q1+q2+q3+q4+q5+q6+q7+q8+q9;
    con.query(q,(error,result) => {
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
}