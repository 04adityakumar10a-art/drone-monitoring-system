import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    EyeIcon,
    EyeSlashIcon,
    UserIcon,
    LockClosedIcon
} from "@heroicons/react/24/outline";

import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

import api from "../api/axios";

import "../styles/login.css";

import loginBg from "../assets/images/login-bg.png";
import logo from "../assets/images/dms-logo.png";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [rememberMe, setRememberMe] = useState(true);

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            setLoading(true);

            const response = await api.post(
                "/api/auth/login",
                {
                    username,
                    password,
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "username",
                response.data.username
            );

            toast.success(
                `Welcome ${response.data.username}!`
            );

            setTimeout(() => {

                navigate("/dashboard");

            }, 700);

        }

        catch (error) {

            console.log(error);

            if (error.response?.status === 401) {

                toast.error(
                    "Invalid username or password."
                );

            }

            else {

                toast.error(
                    "Something went wrong. Please try again."
                );

            }

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <div

                className="login-background relative min-h-screen flex items-center justify-end overflow-hidden"

                style={{

                    backgroundImage: `url(${loginBg})`

                }}

            >

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/25"></div>

                {/* Radar Rings */}

                <div className="absolute right-40 top-1/2 -translate-y-1/2 pointer-events-none">

                    <div className="radar"></div>

                    <div className="radar"></div>

                    <div className="radar"></div>

                </div>

                {/* Login Container */}

                <div className="relative z-20 w-full max-w-lg mr-0 lg:mr-24 px-6 lg:px-0">
                    {/* Glass Card */}

                    <div className="login-card relative overflow-hidden rounded-[32px] border border-cyan-400/20 bg-slate-900/65 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.8)]">

                        {/* Decorative Glow */}

                        <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl"></div>

                        <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-blue-600/20 blur-3xl"></div>

                        {/* Border Glow */}

                        <div className="absolute inset-0 rounded-[32px] border border-white/5"></div>

                        <div className="relative px-10 py-12">

                            {/* Logo */}

                            <div className="flex justify-center">

                                <img

                                    src={logo}

                                    alt="DMS Logo"

                                    className="h-32 w-32 object-contain mx-auto drop-shadow-[0_0_30px_rgba(6,182,212,0.9)] transition-all duration-500 hover:scale-110"

                                />

                            </div>

                            {/* Brand */}

                            <div className="mt-5 text-center">

                                <h1

                                    className="
text-7xl
font-black
tracking-[0.35em]
text-cyan-300
uppercase
select-none
drop-shadow-[0_0_10px_#06b6d4]
"

                                >

                                    DMS

                                </h1>

                                <h2 className="mt-2 text-xl font-semibold tracking-wide text-white">

                                    Drone Monitoring System

                                </h2>

                                <p className="mt-3 text-slate-300">

                                    Secure Real-Time Fleet Command Center

                                </p>

                            </div>

                            {/* Enterprise Badge */}

                            <div className="mt-6 flex justify-center">

                                <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-xs font-bold tracking-[0.3em] uppercase text-cyan-300">

                                    Enterprise Edition

                                </span>

                            </div>

                            {/* Divider */}

                            <div className="my-8 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"></div>

                            {/* Form */}

                            <form

                                onSubmit={handleSubmit}

                                className="space-y-6"

                            >{/* Username */}

                                <div className="relative">

                                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-400" />

                                    <input

                                        type="text"

                                        placeholder="Username"

                                        value={username}

                                        onChange={(e) => setUsername(e.target.value)}

                                        className="
            w-full
            rounded-2xl
            border
            border-slate-600
            bg-slate-800/40
            py-4
            pl-12
            pr-4
            text-white
            placeholder:text-slate-400
            outline-none
            transition-all
            duration-300
            focus:border-cyan-400
            focus:ring-2
            focus:ring-cyan-500/30
        "

                                    />

                                </div>

                                {/* Password */}

                                <div className="relative">

                                    <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-400" />

                                    <input

                                        type={showPassword ? "text" : "password"}

                                        placeholder="Password"

                                        value={password}

                                        onChange={(e) => setPassword(e.target.value)}

                                        className="
            w-full
            rounded-2xl
            border
            border-slate-600
            bg-slate-800/40
            py-4
            pl-12
            pr-12
            text-white
            placeholder:text-slate-400
            outline-none
            transition-all
            duration-300
            focus:border-cyan-400
            focus:ring-2
            focus:ring-cyan-500/30
        "

                                    />

                                    <button

                                        type="button"

                                        onClick={() => setShowPassword(!showPassword)}

                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"

                                    >

                                        {

                                            showPassword

                                                ?

                                                <EyeSlashIcon className="h-5 w-5" />

                                                :

                                                <EyeIcon className="h-5 w-5" />

                                        }

                                    </button>

                                </div>

                                {/* Remember */}

                                <div className="flex items-center justify-between">

                                    <label className="flex items-center gap-2 text-sm text-slate-300">

                                        <input

                                            type="checkbox"

                                            checked={rememberMe}

                                            onChange={(e) => setRememberMe(e.target.checked)}

                                            className="h-4 w-4 accent-cyan-500"

                                        />

                                        Keep me signed in

                                    </label>

                                    <span className="text-xs text-cyan-300">

                                        256-bit JWT

                                    </span>

                                </div>

                                {/* Button */}

                                <button

                                    type="submit"

                                    disabled={loading}

                                    className={`
        group
        relative
        w-full
        overflow-hidden
        rounded-2xl
        py-4
        font-bold
        tracking-wider
        transition-all
        duration-300

        ${loading

                                            ?

                                            "cursor-not-allowed bg-slate-700"

                                            :

                                            "bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-700 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
                                        }

    `}

                                >

                                    {

                                        loading

                                            ?

                                            <div className="flex justify-center items-center gap-3">

                                                <svg

                                                    className="h-5 w-5 animate-spin"

                                                    viewBox="0 0 24 24"

                                                    fill="none"

                                                >

                                                    <circle

                                                        cx="12"

                                                        cy="12"

                                                        r="10"

                                                        stroke="white"

                                                        strokeWidth="3"

                                                        opacity=".3"

                                                    />

                                                    <path

                                                        d="M22 12a10 10 0 00-10-10"

                                                        stroke="white"

                                                        strokeWidth="3"

                                                    />

                                                </svg>

                                                Connecting...

                                            </div>

                                            :

                                            <span>

                                                ACCESS COMMAND CENTER →

                                            </span>

                                    }

                                </button>

                                {/* Footer */}

                                <div className="pt-6">

                                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

                                    <p className="mt-6 text-center text-sm text-slate-400">

                                        Live Telemetry • GPS Tracking • Fleet Analytics

                                    </p>

                                    <p className="mt-2 text-center text-xs text-slate-500">

                                        Version 1.0 •

                                    </p>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Login;