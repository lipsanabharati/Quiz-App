import { Link } from 'react-router-dom';

function Landing() {
    return (
        <main className="min-h-screen bg-white flex flex-col justify-between font-sans relative overflow-hidden">
            {/* Soft Gradient Background Element */}
            <div className="absolute top-0 left-0 w-full h-full from-indigo-50 via-white to-white -z-10"></div>

            <header className="p-6 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
                <nav className="max-w-6xl mx-auto flex justify-between items-center">
                    {/* Logo/Name added on the left for balance */}
                    <h1 className="text-xl font-bold text-indigo-600">Quiz System</h1>
                    
                    <div className="flex gap-4">
                        <Link to='/login' className='px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95'>
                            Login
                        </Link>
                        <Link to='/signup' className='px-6 py-2.5 border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all active:scale-95'>
                            Sign Up
                        </Link>
                    </div>
                </nav>
            </header>

            <section className="text-center px-4 py-20">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tight">
                        Welcome to <span className="text-indigo-600">Quiz System...</span>
                    </h1>
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-8">
                        Test Your Knowledge...
                    </h2>

                    <p className="text-xl text-gray-500 font-medium leading-relaxed">
                        Challenge yourself with our quizzes and see how much you know!
                    </p>
                </div>
            </section>

            <footer className="p-8 text-center text-gray-400 border-t border-gray-100">
                &copy; 2026 Quiz System
            </footer>
        </main>
    );
}

export default Landing;