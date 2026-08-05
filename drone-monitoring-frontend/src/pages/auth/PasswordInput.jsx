import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function PasswordInput({ value, onChange }) {

    const [show, setShow] = useState(false);

    return (

        <div className="relative">

            <input

                type={show ? "text" : "password"}

                value={value}

                onChange={onChange}

                placeholder="Password"

                className="w-full rounded-xl border border-[#333] bg-[#1A1A1A] px-4 py-3 text-white outline-none focus:border-[#D4AF37]"

            />

            <button

                type="button"

                onClick={() => setShow(!show)}

                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"

            >

                {show ? <EyeOff size={18} /> : <Eye size={18} />}

            </button>

        </div>

    );

}

export default PasswordInput;