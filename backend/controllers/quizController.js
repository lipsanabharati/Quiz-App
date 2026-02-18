const Quiz=require("../models/quizModel");

exports.showAllQuiz=(req,res)=>{
    Quiz.selectAllQuiz((err,quiz)=>{
       //database error
       if(err)
        {
            console.log(err);
            return res.status(500).json({
                message:"database error"
            })
        } 

        //send success response
        res.status(200).json(quiz);
    })
}

exports.showQuiz=(req,res)=>{

    const {quiz_id}=req.params;
    Quiz.getAQuiz(quiz_id,(err,quiz)=>{
        if(err)
        {
            console.log(err);
            return res.status(500).json({
                message:"database error"
            })
        }

        if(!quiz||quiz.length===0)
        {
            return res.status(404).json({
                message:"quiz not found"
            })
        }

        res.status(200).json(quiz);

    })
}

exports.showAttempts=(req,res)=>{
    
    const {quiz_id}=req.params;
    const user_id=req.user.id;

    Quiz.getAttempts(quiz_id,user_id,(err,attempts)=>{
        
        if(err)
        {
            console.log(err);
            return res.status(500).json(
                {
                    message:"database error"
                }
            )
        }

        res.status(200).json(attempts);
    })

}