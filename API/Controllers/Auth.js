const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const con = require('../mysql');
dotenv.config();

exports.auth_signup = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const surname = req.body.surname;
    const dob = req.body.dob;

    const q = `select * from users where email = '${email}';`;

    con.query(q,(err,results) => {
        if(err){
            res.send({
                success:false,
                message:'error occured'
            });
        }else{
            if(results.length>0){
                res.send({
                    success:false,
                    message:'user already exists'
                })
            }
            else
            {
                bcrypt.hash(password,2,(err,hash) => {
                    const q2 = `insert into users (email,password,name,surname,dob) values ('${email}','${hash}','${name}','${surname}','${dob}');`
                    con.query(q2,(err,results1) => {
                        if(err){
                            res.send({
                                success:false,
                                message:'error occured'
                            });
                        }else{
                            if(results1.affectedRows>0){
                                const q3 = `insert into workout_stats values ('${email}',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);`;
                                con.query(q3,(err,results2) => {
                                    if(err){
                                        res.send({
                                            success:true,
                                            message:'failed to create user 555'
                                        });
                                    }else{
                                        const token = jwt.sign(
                                            {
                                                email:email
                                            },
                                            process.env.JWT_KEY,
                                            {
                                                expiresIn:'1h'
                                            }
                                        )
                                        res.send({
                                            success:true,
                                            message:'user created',
                                            authToken:token,
                                            email:email,
                                            name:name,
                                            surname:surname,
                                            dob:dob
                                        });
                                    }
                                })
                            }else{
                                res.send({
                                    success:true,
                                    message:'failed to create user'
                                });
                            }
                        }
                    })
                })       
            }
        }
    })    
};

exports.auth_signin = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    const q = `select * from users where email = '${email}';`;
    con.query(q,(err,results) => {
        if(err){
            res.send({
                success:false,
                message:'error occured'
            });
        }else{
            if(results.length!==0){
                bcrypt.compare(password, results[0].password, function(err, result) {  
                    if(result===true){
                        const token = jwt.sign(
                            {
                                email:email
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn:'1h'
                            }
                        )
                        res.send({
                            success:true,
                            message:'signin successfull',
                            authToken:token,
                            email:results[0].email,
                            name:results[0].name,
                            surname:results[0].surname,
                            dob:results[0].dob
                        })
                    }else{
                        res.send({
                            success:false,
                            message:'incorrect password'
                        });
                    }
                });
            }
            else
            {
                res.send({
                    success:false,
                    message:'user not found'
                })
            }
        }
    })

};
