import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Quiz() {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [quizData, setQuizData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    
    // 1. ADD THIS: This was missing in your snippet!
    const [timeLeft, setTimeLeft] = useState(45); 

    // 2. HELPER: Convert "00:00:45" to 45
    const parseTimeToSeconds = (timeStr) => {
        if (!timeStr) return 45; 
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        return (hours * 3600) + (minutes * 60) + seconds;
    };

    // 3. FETCH DATA: One effect is enough
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:5000/api/quiz/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = response.data;
                setQuizData(data);

                // Set initial time from the API response
                if (data.length > 0 && data[0].time_limit) {
                    const totalSeconds = parseTimeToSeconds(data[0].time_limit);
                    setTimeLeft(totalSeconds);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching quiz data:", error);
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id]);

    // 4. THE TIMER HEARTBEAT
    useEffect(() => {
        if (loading || quizData.length === 0) return;

        if (timeLeft <= 0) {
            handleFinishQuiz();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, loading, quizData]); 

    const handleOptionClick = (queId, optionText) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [queId]: optionText 
        }));
    };

    const handleFinishQuiz = () => {
        let score = 0;
        quizData.forEach((item) => {
            // Check if this row is the correct one AND if user selected it
            if (item.is_correct === 1 && selectedAnswers[item.que_id] === item.option_text) {
                score += item.points;
            }
        });

        navigate('/result', { 
            state: { 
                userScore: score,
                title: quizData[0]?.title || "Quiz Result" 
            } 
        });
    };

    if (loading) return <div className="p-10 text-center font-sans text-indigo-600">Loading Quiz...</div>;
    if (!quizData.length) return <div className="p-10 text-center font-sans text-red-500">Quiz not found!</div>;

    return (
        <div className="min-h-screen bg-purple-50 font-sans">
            <nav className="bg-white shadow-sm p-4">
                <div className="max-w-3xl mx-auto text-indigo-600">
                    <Link to="/home">← Back to Home</Link>
                </div>
            </nav>

            <main className="max-w-3xl mx-auto p-6 mt-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-8">{quizData[0]?.title}</h1>

                    {/* TIMER DISPLAY */}
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors mb-6 ${
                        timeLeft <= 10 ? "bg-red-300 text-red-800 animate-pulse" : "bg-indigo-50 text-indigo-600"
                    }`}>
                        <span>⏱️ Time Remaining:</span>
                        <span>
                            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </span>
                    </div>

                    <div className="space-y-4">
                        {quizData.map((item, index) => {
                            const showTitle = index === 0 || quizData[index - 1].que_id !== item.que_id;
                            const isSelected = selectedAnswers[item.que_id] === item.option_text;

                            return (
                                <div key={index} className={showTitle ? "mt-8" : ""}>
                                    {showTitle && (
                                        <p className="text-lg font-semibold text-gray-800 mb-4 pt-4 border-t border-gray-50">
                                            {item.ques_text}
                                        </p>
                                    )}
                                    <button 
                                        onClick={() => handleOptionClick(item.que_id, item.option_text)}
                                        className={`w-full text-left p-4 mb-2 border rounded-xl transition-all ${
                                            isSelected 
                                            ? "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200" 
                                            : "border-gray-200 hover:border-indigo-400"
                                        }`}
                                    >
                                        {item.option_text}
                                    </button>
                                </div>
                            );
                        })}
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