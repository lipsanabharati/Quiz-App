const db=require("../config/config");

//to select all the quizes
exports.selectAllQuiz=(callback)=>{
    const sql="SELECT * from quiz";
    db.query(sql,(err,results)=>{
        if(err) return callback(err);
        callback(null,results);
    });
};

exports.getAQuiz=(quiz_id,callback)=>{
    const sql="SELECT questions.que_id,questions.quiz_id,questions.ques_text,questions.points,options.option_id,options.option_text,options.is_correct FROM questions INNER JOIN options ON questions.que_id = options.que_id WHERE questions.quiz_id = ?";
    db.query(sql,[quiz_id],(err,results)=>{
        if(err) return callback(err);
        callback(null,results);
    });
};

exports.getAttempts=(quiz_id,user_id,callback)=>{
    const sql="SELECT COUNT(attempt_id) AS total_attempts from attempts WHERE user_id=? AND quiz_id=?;";
    db.query(sql,[user_id,quiz_id],(err,results)=>{
        if(err) return callback(err);
        callback(null,results);
    });
};
