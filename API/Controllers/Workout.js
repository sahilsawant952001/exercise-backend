const con = require('../mysql');

exports.all_workouts = (req,res) => {
    
    const q = `select * from types;`;

    con.query(q,(error,result) => {
        if(error){
            res.send({
                success:false,
                error:"error occured"
            });
        }else{
            res.send({
                success:true,
                result:result
            });
        }
    })
}

exports.specific_workout = (req,res) => {
    const type_id = req.body.type_id;
    const q = `select * from (workouts inner join exercises on workouts.exercise_id = exercises.exercise_id) where type_id = '${type_id}';`
    
    con.query(q,(error,result) => {
        if(error){
            res.send({
                success:false,
                error:"error occured"
            });
        }else{
            res.send({
                success:true,
                result:result
            });
        }
    })
}