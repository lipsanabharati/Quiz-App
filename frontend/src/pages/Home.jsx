import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <header className="bg-white shadow-sm p-4">
                <nav className="max-w-5xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold text-indigo-600">QuizSystem</h1>
                    <div className="flex gap-4">
                        <Link to='/login' className='text-gray-600 hover:text-indigo-600 font-medium transition'>Login</Link>
                        <Link to='/signup' className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition'>Sign Up</Link>
                    </div>
                </nav>
            </header>

            <main className="max-w-5xl mx-auto p-8">
                <section className="mb-10">
                    <h2 className="text-3xl font-extrabold text-gray-800">Welcome, user!</h2>
                    <p className="text-gray-600 mt-2">This is your main dashboard page. Ready to take a quiz?</p>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-gray-700 mb-6 border-b pb-2">Available Quizzes</h3>
                    
                    {/* Quiz Card */}
                    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition max-w-sm">
                        <h4 className="text-lg font-bold text-gray-800 mb-4">Basic General Knowledge</h4>
                        <ul className="text-sm text-gray-600 space-y-2 mb-6">
                            <li className="flex justify-between">
                                <span className="font-semibold text-gray-500">Category:</span> 
                                <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs font-bold uppercase">GK</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="font-semibold text-gray-500">Time Limit:</span> 
                                <span>45 seconds</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="font-semibold text-gray-500">Points:</span> 
                                <span>5</span>
                            </li>
                        </ul>
                        <Link 
                            to='/quiz1' 
                            className='block text-center bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition'
                        >
                            Start Quiz
                        </Link>
                    </div>
                </section>

                <footer className="mt-20 py-8 text-center text-gray-400 border-t border-gray-100">
                    &copy; 2026 QuizSystem
                </footer>
            </main>
        </div>
    );
}

export default Home;