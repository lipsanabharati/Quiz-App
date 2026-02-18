import { Link, useNavigate } from "react-router-dom";

function Quiz1() {
    const navigate = useNavigate();

    const handleFinishQuiz = () => {
        navigate('/result');
    };

    return (
        <div className="min-h-screen bg-purple-50 font-sans">
            {/* Minimal Header */}
            <nav className="bg-white shadow-sm p-4">
                <div className="max-w-3xl mx-auto">
                    <Link to="/home" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2">
                        ← Back to Home
                    </Link>
                </div>
            </nav>

            <main className="max-w-3xl mx-auto p-6 mt-8">
                {/* Quiz Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    
                    {/* Title and Metadata */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Basic General Knowledge Quiz</h1>
                        <div className="flex gap-4 text-sm text-gray-500 font-medium bg-gray-50 p-3 rounded-lg">
                            <span className="flex items-center gap-1">📂 Category: <span className="text-indigo-600">GK</span></span>
                            <span className="flex items-center gap-1">⏱️ Time: <span className="text-indigo-600">45s</span></span>
                            <span className="flex items-center gap-1">🏆 Points: <span className="text-indigo-600">5</span></span>
                        </div>
                    </div>

                    <hr className="mb-8 border-gray-100" />

                    {/* Question Section */}
                    <div className="space-y-6">
                        <p className="text-lg font-semibold text-gray-800">
                            <span className="text-indigo-600 mr-2">Question:</span>
                            What is the capital of Bulgaria?
                        </p>

                        {/* Interactive Options */}
                        <div className="grid grid-cols-1 gap-3">
                            {["Cairo", "Helsinki", "Sofia", "Dublin"].map((option, index) => (
                                <button 
                                    key={index}
                                    className="w-full text-left p-4 border border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                                >
                                    <span className="inline-block w-8 h-8 bg-gray-100 group-hover:bg-indigo-600 group-hover:text-white rounded-full text-center leading-8 mr-3 text-sm font-bold transition-colors">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Footer Action */}
                    <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
                        <button 
                            onClick={handleFinishQuiz}
                            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
                        >
                            Finish Quiz
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Quiz1;