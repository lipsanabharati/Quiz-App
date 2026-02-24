import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMsg("Please fill all the fields.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email: email,
                    password_hash: password
                }
            );

            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate("/home");
        }
        catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
            else {
                alert("Server Error");
            }
        }
    };

    return (
        <main className="min-h-screen bg-white flex flex-col justify-between font-sans relative overflow-hidden">
            {/* Soft Gradient Background matching Landing/Home */}
            <div className="absolute top-0 left-0 w-full h-full from-indigo-50 via-white to-white -z-10"></div>

            {/* HEADER: Matching Landing Page style */}
            <header className="p-6 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
                <nav className="max-w-6xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold text-indigo-600 tracking-tight">Quiz System</h1>
                    <Link to='/signup' className="px-6 py-2 border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all active:scale-95">
                        Sign Up
                    </Link>
                </nav>
            </header>

            {/* LOGIN CARD */}
            <section className="flex flex-col items-center px-4 py-12">
                <div className="bg-white p-10 rounded-3xl shadow-xl shadow-indigo-100/50 w-full max-w-md border border-gray-100">
                    <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">
                        Welcome Back
                    </h2>
                    <p className="text-gray-500 text-center mb-8 font-medium">Please enter your credentials to login</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">Email</label>
                            <input 
                                type="email" 
                                id='email' 
                                className="p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-gray-800"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="password" className="text-sm font-bold text-gray-700 ml-1">Password</label>
                            <input 
                                type="password" 
                                id='password' 
                                className="p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-gray-800"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>

                        <button 
                            type='submit' 
                            className="mt-4 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]"
                        >
                            Login
                        </button>
                    </form>
                    
                    {msg && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl">
                            <p className="text-red-500 text-sm font-bold text-center">{msg}</p>
                        </div>
                    )}
                </div>
            </section>

            <footer className="p-8 text-center text-gray-400 border-t border-gray-50">
                &copy; 2026 Quiz System
            </footer>
        </main>
    );
}

export default Login;