import { useNavigate } from "react-router-dom";

function Result() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans p-6">
            
            {/* Result Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 max-w-md w-full text-center">
                
                {/* Success Icon Placeholder */}
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                    🎉
                </div>

                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Quiz Results</h1>
                <p className="text-indigo-600 font-semibold mb-8 italic">Basic General Knowledge</p>

                <div className="space-y-4 mb-10">
                    <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center">
                        <span className="text-gray-500 font-medium">Total Score</span>
                        <span className="text-2xl font-bold text-gray-900">5 Pts</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-2xl text-left">
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Attempts</p>
                            <p className="text-lg font-bold text-gray-800">4 Times</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-2xl text-left">
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Time Taken</p>
                            <p className="text-lg font-bold text-gray-800">40s</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Actions */}
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => navigate('/home')}
                        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                    >
                        Take Another Quiz
                    </button>
                    
                    <button 
                        onClick={() => navigate('/quiz1')}
                        className="w-full bg-white text-indigo-600 border-2 border-indigo-50 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all"
                    >
                        Re-take Quiz 1
                    </button>
                </div>
            </div>

            <footer className="mt-10 text-gray-400 text-sm">
                &copy; 2026 Quiz System
            </footer>
        </div>
    );
}

export default Result;