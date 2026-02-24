import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Quiz() {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [quizData, setQuizData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0); 

    // --- PROGRESS LOGIC ---
    // 1. Get all unique question IDs from the data
    const uniqueQueIds = [...new Set(quizData.map(item => item.que_id))];
    const totalQuestions = uniqueQueIds.length;
    
    // 2. Count how many keys (Question IDs) exist in our selectedAnswers state
    const answeredCount = Object.keys(selectedAnswers).length;

    const parseTimeToSeconds = (timeStr) => {
        if (!timeStr) return 45; 
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        return (hours * 3600) + (minutes * 60) + seconds;
    };

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:5000/api/quiz/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = response.data;
                setQuizData(data);
                if (data.length > 0) {
                    setTimeLeft(parseTimeToSeconds(data[0].time_limit));
                }
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id]);

    useEffect(() => {
        if (loading || quizData.length === 0 || timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleFinishQuiz();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, loading, quizData]);

    const handleOptionClick = (queId, optionText) => {
        setSelectedAnswers(prev => ({ ...prev, [queId]: optionText }));
    };

    const handleFinishQuiz = async () => {
        let score = 0;
        quizData.forEach((item) => {
            if (item.is_correct === 1 && selectedAnswers[item.que_id] === item.option_text) {
                score += item.points;
            }
        });

        try {
            const token = localStorage.getItem("token");
            const attemptRes = await axios.get(`http://localhost:5000/api/attempts/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const totalAttempts = attemptRes.data.length || 1;
            navigate('/result', { 
                state: { userScore: score, title: quizData[0]?.title || "Quiz Result", attempts: totalAttempts } 
            });
        } catch (err) {
            navigate('/result', { state: { userScore: score, attempts: 1 } });
        }
    };

    if (loading) return <div className="p-10 text-center font-sans text-indigo-600">Loading Quiz...</div>;

    return (
        <div className="min-h-screen bg-purple-50 font-sans">
            <nav className=" shadow-sm p-4 text-indigo-600 border-b border-gray-100 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-3xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold text-indigo-600 tracking-tight">Quiz System</h1>
                    <Link to="/home" className="hover:text-indigo-800 transition-colors">← Back to Home</Link>
                </div>
            </nav>

            <main className="max-w-3xl mx-auto p-6 mt-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">{quizData[0]?.title}</h1>
                        {/* THE PROGRESS COUNTER */}
                        <div className="bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
                            <span className="text-sm font-bold text-indigo-400 mr-2 uppercase tracking-tight">Progress:</span>
                            <span className="text-lg font-black text-indigo-600">{answeredCount} / {totalQuestions}</span>
                        </div>
                    </div>

                    <div className={`flex items-center gap-2 px-5 py-3 rounded-lg font-bold mb-6 ${
                        timeLeft <= 10 ? "bg-red-100 text-red-600 animate-pulse" : "bg-indigo-50 text-indigo-600"
                    }`}>
                        <span>⏱️ Time Remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                    </div>

                    <div className="space-y-4">
                        {(() => {
                            let questionNumber = 0;
                            let optionIndex = 0;

                            return quizData.map((item, index) => {
                                const showTitle = index === 0 || quizData[index - 1].que_id !== item.que_id;
                                const isSelected = selectedAnswers[item.que_id] === item.option_text;

                                if (showTitle) {
                                    questionNumber++;
                                    optionIndex = 0; 
                                } else {
                                    optionIndex++;
                                }

                                return (
                                    <div key={index} className={showTitle ? "mt-10" : ""}>
                                        {showTitle && (
                                            <p className="text-lg font-semibold text-gray-800 mb-4 pt-4 border-t border-gray-100">
                                                <span className="text-indigo-600 mr-2">{questionNumber}.</span>
                                                {item.ques_text}
                                            </p>
                                        )}
                                        
                                        <button 
                                            onClick={() => handleOptionClick(item.que_id, item.option_text)}
                                            className={`w-full text-left p-4 mb-2 border rounded-xl transition-all flex items-center gap-3 ${
                                                isSelected 
                                                ? "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-100" 
                                                : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                                            }`}
                                        >
                                            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                                                isSelected ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"
                                            }`}>
                                                {String.fromCharCode(65 + optionIndex)}
                                            </span>
                                            {item.option_text}
                                        </button>
                                    </div>
                                );
                            });
                        })()}
                    </div>

                    <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
                        <button onClick={handleFinishQuiz} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg">
                            Finish Quiz
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Quiz;