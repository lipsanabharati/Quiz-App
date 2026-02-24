import { Link, useNavigate } from 'react-router-dom';
import QuizCard from '../components/quizCard';
import { useState, useEffect } from 'react';
import axios from "axios";

function Home() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log(token);
                if (!token) return;

                const res = await axios.get("http://localhost:5000/api/quiz/", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setQuizzes(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Fetch error:", err);
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* UPDATED HEADER */}
            <header className="p-6 border-b border-gray-100 bg-white/50 backdrop-blur-sm shadow-sm">
                <nav className="max-w-6xl mx-auto flex justify-between items-center">
                    {/* QUIZ SYSTEM TEXT MATCHING LANDING */}
                    <h1 className="text-xl font-bold text-indigo-600 tracking-tight">Quiz System</h1>

                    <button 
                        onClick={handleLogout}
                        className="text-gray-500 hover:text-red-600 font-semibold transition-colors flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </nav>
            </header>

            <main className="max-w-6xl mx-auto p-6 md:p-10">
                {/* HERO SECTION */}
                <section className="mb-12 bg-indigo-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Welcome back! 👋</h2>
                        <p className="text-indigo-100 text-lg max-w-md">Ready to test your knowledge today? Pick a category and test your knowledge.</p>
                    </div>
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-700 rounded-full opacity-20"></div>
                </section>

                <section>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Available Quizzes</h3>
                            <p className="text-gray-500 text-sm mt-1">Explore our latest challenges</p>
                        </div>
                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            {quizzes.length} Quizzes Found
                        </span>
                    </div>

                    {/* QUIZZES GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {quizzes.length > 0 ? (
                            quizzes.map((quiz) => (
                                <QuizCard
                                    key={quiz.quiz_id}
                                    title={quiz.title}
                                    category={quiz.category}
                                    time={`${quiz.time_limit}s`}
                                    link={`/quiz/${quiz.quiz_id}`}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                                <p className="text-gray-400 font-medium italic">No quizzes available right now. Check back later!</p>
                            </div>
                        )}
                    </div>
                </section>

                <footer className="mt-20 py-10 text-center text-gray-400 border-t border-gray-100">
                    <p className="font-medium">&copy; 2026 Quiz System</p>
                </footer>
            </main>
        </div>
    );
}

export default Home;