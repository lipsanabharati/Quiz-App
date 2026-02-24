import { useNavigate, useLocation } from "react-router-dom";

function Result() {
    const navigate = useNavigate();
    const location = useLocation();

    const { userScore, title, attempts } = location.state;
    console.log(attempts);

    return (
        <div className="min-h-screen from-gray-50 via-white to-gray-50 flex flex-col items-center justify-center font-sans p-6">
            
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 max-w-md w-full text-center transition-transform transform hover:scale-[1.01]">
                
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner animate-pulse">
                    🎉
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Quiz Results</h1>
                <p className="text-indigo-600 font-semibold mb-8 italic text-lg">{title}</p>

                <div className="space-y-6 mb-10">
                    {/* SCORE SECTION */}
                    <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all">
                        <p className="text-indigo-100 uppercase text-xs font-bold tracking-widest mb-1">Total Score</p>
                        <h2 className="text-5xl md:text-6xl font-black">{userScore}</h2>
                        <p className="text-indigo-200 text-sm mt-2">Points Earned</p>
                    </div>

                    {/* ATTEMPTS SECTION */}
                    <div className="bg-gray-50 p-5 rounded-2xl flex justify-between items-center border border-gray-100 shadow-sm hover:shadow-md transition-all">
                         <div className="text-left">
                             <p className="text-gray-400 text-xs uppercase font-bold">Your Progress</p>
                             <p className="text-gray-600 font-medium text-lg">Attempt History</p>
                         </div>
                         <div className="bg-white px-4 py-2 rounded-xl shadow-md border border-gray-100">
                             <span className="text-2xl font-bold text-indigo-600">{attempts}</span>
                         </div>
                    </div>
               </div>

                {/* Navigation Actions */}
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => navigate('/home')}
                        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 hover:scale-[1.02] transition-all shadow-lg"
                    >
                        Back to Home
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