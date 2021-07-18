const con = require('../mysql');

exports.health_tips = (req,res) => {
    const q = `select * from tips`;
    con.query(q,(error,result) => {
        if(error){
            res.send({
                success:false,
                error:error
            });
        }else{
            res.send({
                success:true,
                result:result
            });
        }
    })
}