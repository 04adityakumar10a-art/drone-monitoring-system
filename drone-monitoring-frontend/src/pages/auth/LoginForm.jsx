import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import authService from "../../services/authService";
import { tokenStorage } from "../../utils/tokenStorage";
import { useAuth } from "../../context/AuthContext";

import PasswordInput from "./PasswordInput";
import RememberMe from "./RememberMe";

function LoginForm() {

    const navigate = useNavigate();

    const { setToken } = useAuth();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [remember, setRemember] = useState(true);

    const [loading, setLoading] = useState(false);

    async function login(e) {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await authService.login({

                username,

                password

            });

            const token = res.data.token;

            const refresh = res.data.refreshToken;

            setToken(token);

            if (remember) {

                tokenStorage.setToken(token);

                tokenStorage.setRefresh(refresh);

            }

            navigate("/dashboard");

        }

        catch (err) {

            console.log("========== LOGIN ERROR ==========");

            console.log(err);

            console.log("Status:", err.response?.status);

            console.log("Response:", err.response?.data);

            console.log("Request:", err.config?.data);

            alert("Check console");

        }
        finally {

            setLoading(false);

        }

    }

    return (

        <form onSubmit={login} className="space-y-5">

            <input
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full rounded-xl border border-[#333] bg-[#1A1A1A] px-4 py-3 text-white outline-none focus:border-[#D4AF37]"
            />

            <PasswordInput

                value={password}

                onChange={e => setPassword(e.target.value)}

            />

            <div className="flex items-center justify-between">

                <RememberMe

                    checked={remember}

                    onChange={() => setRemember(!remember)}

                />

                <button

                    type="button"

                    className="text-sm text-[#D4AF37]"

                >

                    Forgot Password?

                </button>

            </div>

            <button

                disabled={loading}

                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#D4AF37] py-3 font-bold text-black transition hover:scale-[1.02]"

            >

                {loading && <Loader2 className="animate-spin" size={18} />}

                Sign In

            </button>

        </form>

    );

}

export default LoginForm;