import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

function Quiz() {
    const { quizId } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                // Axios automatically converts the response to JSON
                const response = await axios.get(`http://localhost:5000/api/quiz/${quizId}`);
                
                // In Axios, the data is inside the 'data' property
                setQuizData(response.data); 
                setLoading(false);
            } catch (error) {
                console.error("Error fetching quiz data:", error);
                // Check if it's a 404 or server error
                if (error.response && error.response.status === 404) {
                    alert("Quiz not found!");
                }
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [quizId]);

    const handleOptionClick = (questionIndex, optionText) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionIndex]: optionText
        }));
    };

    const handleFinishQuiz = () => {
        let score = 0;
        quiz.questions.forEach((q, index) => {
            if (selectedAnswers[index] === q.correct_ans) {
                score += quiz.points;
            }
        });

        navigate('/result', { 
            state: { 
                userScore: score, 
                totalPossible: quiz.questions.length * quiz.points,
                title: quiz.title 
            } 
        });
    };

    if (loading) return <div className="p-10 text-center font-sans text-indigo-600">Loading Quiz...</div>;
    if (!quiz) return <div className="p-10 text-center font-sans text-red-500">Quiz not found!</div>;

    return (
        <div className="min-h-screen bg-purple-50 font-sans">
            <nav className="bg-white shadow-sm p-4">
                <div className="max-w-3xl mx-auto">
                    <Link to="/home" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2">
                        ← Back to Home
                    </Link>
                </div>
            </nav>

            <main className="max-w-3xl mx-auto p-6 mt-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">{quiz.title}</h1>
                        <div className="flex gap-4 text-sm text-gray-500 font-medium bg-gray-50 p-3 rounded-lg">
                            <span>📂 Category: <span className="text-indigo-600">{quiz.category}</span></span>
                            <span>⏱️ Time: <span className="text-indigo-600">{quiz.time_limit}</span></span>
                            <span>🏆 Points: <span className="text-indigo-600">{quiz.points}</span></span>
                        </div>
                    </div>

                    <hr className="mb-8 border-gray-100" />

                    <div className="space-y-10">
                        {quiz.questions && quiz.questions.map((q, qIndex) => (
                            <div key={qIndex} className="space-y-4">
                                <p className="text-lg font-semibold text-gray-800">
                                    <span className="text-indigo-600 mr-2">Question {qIndex + 1}:</span>
                                    {q.ques_text}
                                </p>
                                <div className="grid grid-cols-1 gap-3">
                                    {q.options.map((option, index) => {
                                        const isSelected = selectedAnswers[qIndex] === option;
                                        return (
                                            <button 
                                                key={index}
                                                onClick={() => handleOptionClick(qIndex, option)}
                                                className={`w-full text-left p-4 border rounded-xl transition-all flex items-center ${
                                                    isSelected 
                                                    ? "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200" 
                                                    : "border-gray-200 hover:border-indigo-400 hover:bg-gray-50"
                                                }`}
                                            >
                                                <span className={`inline-block w-8 h-8 rounded-full text-center leading-8 mr-3 text-sm font-bold ${
                                                    isSelected ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"
                                                }`}>
                                                    {String.fromCharCode(65 + index)}
                                                </span>
                                                {option}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
                        <button 
                            onClick={handleFinishQuiz}
                            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg"
                        >
                            Finish Quiz
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Quiz;