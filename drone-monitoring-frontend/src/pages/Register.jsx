import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    UserIcon,
    EnvelopeIcon,
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon
} from "@heroicons/react/24/outline";

import toast from "react-hot-toast";
import api from "../api/axios";

import "../styles/login.css";

import loginBg from "../assets/images/login-bg.png";
import logo from "../assets/images/dms-logo.png";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (form.password !== form.confirmPassword) {

            toast.error("Passwords do not match");

            return;

        }

        try {

            setLoading(true);

            await api.post("/api/auth/register", {

                username: form.username,

                email: form.email,

                password: form.password

            });

            toast.success("Account created successfully");

            setTimeout(() => {

                navigate("/login");

            }, 1200);

        }

        catch (error) {

            if (error.response?.data?.message) {

                toast.error(error.response.data.message);

            }

            else {

                toast.error("Registration failed");

            }

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div

            className="login-background relative flex min-h-screen items-center justify-end overflow-hidden"

            style={{

                backgroundImage: `url(${loginBg})`

            }}

        >

            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20" />

            <div className="relative z-20 mr-0 w-full max-w-lg px-6 lg:mr-24 lg:px-0">

                <div className="overflow-hidden rounded-[32px] border border-cyan-400/20 bg-slate-900/65 backdrop-blur-3xl">

                    <div className="px-10 py-12">

                        <div className="flex justify-center">

                            <img

                                src={logo}

                                alt="AERION"

                                className="h-28 w-28 object-contain"

                            />

                        </div>

                        <h1 className="mt-5 text-center text-5xl font-black tracking-[0.25em] text-cyan-300">

                            REGISTER

                        </h1>

                        <p className="mt-2 text-center text-slate-300">

                            Create your AERION account

                        </p>

                        <form

                            onSubmit={handleSubmit}

                            className="mt-10 space-y-5"

                        >

                            <div className="relative">

                                <UserIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400" />

                                <input

                                    name="username"

                                    placeholder="Username"

                                    value={form.username}

                                    onChange={handleChange}

                                    required

                                    className="w-full rounded-2xl border border-slate-600 bg-slate-800/40 py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-400"

                                />

                            </div>

                            <div className="relative">

                                <EnvelopeIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400" />

                                <input

                                    type="email"

                                    name="email"

                                    placeholder="Email"

                                    value={form.email}

                                    onChange={handleChange}

                                    required

                                    className="w-full rounded-2xl border border-slate-600 bg-slate-800/40 py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-400"

                                />

                            </div>

                            <div className="relative">

                                <LockClosedIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400" />

                                <input

                                    type={showPassword ? "text" : "password"}

                                    name="password"

                                    placeholder="Password"

                                    value={form.password}

                                    onChange={handleChange}

                                    required

                                    className="w-full rounded-2xl border border-slate-600 bg-slate-800/40 py-4 pl-12 pr-12 text-white outline-none focus:border-cyan-400"

                                />

                                <button

                                    type="button"

                                    onClick={() =>

                                        setShowPassword(!showPassword)

                                    }

                                    className="absolute right-4 top-1/2 -translate-y-1/2"

                                >

                                    {

                                        showPassword

                                            ?

                                            <EyeSlashIcon className="h-5 w-5 text-cyan-400" />

                                            :

                                            <EyeIcon className="h-5 w-5 text-cyan-400" />

                                    }

                                </button>

                            </div>

                            <div className="relative">

                                <LockClosedIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400" />

                                <input

                                    type={showConfirmPassword ? "text" : "password"}

                                    name="confirmPassword"

                                    placeholder="Confirm Password"

                                    value={form.confirmPassword}

                                    onChange={handleChange}

                                    required

                                    className="w-full rounded-2xl border border-slate-600 bg-slate-800/40 py-4 pl-12 pr-12 text-white outline-none focus:border-cyan-400"

                                />

                                <button

                                    type="button"

                                    onClick={() =>

                                        setShowConfirmPassword(

                                            !showConfirmPassword

                                        )

                                    }

                                    className="absolute right-4 top-1/2 -translate-y-1/2"

                                >

                                    {

                                        showConfirmPassword

                                            ?

                                            <EyeSlashIcon className="h-5 w-5 text-cyan-400" />

                                            :

                                            <EyeIcon className="h-5 w-5 text-cyan-400" />

                                    }

                                </button>

                            </div>

                            <button

                                type="submit"

                                disabled={loading}

                                className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-700 py-4 font-bold text-white transition hover:-translate-y-1"

                            >

                                {

                                    loading

                                        ?

                                        "Creating Account..."

                                        :

                                        "CREATE ACCOUNT"

                                }

                            </button>

                            <button

                                type="button"

                                onClick={() =>

                                    navigate("/login")

                                }

                                className="w-full text-cyan-300"

                            >

                                Already have an account? Login

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;