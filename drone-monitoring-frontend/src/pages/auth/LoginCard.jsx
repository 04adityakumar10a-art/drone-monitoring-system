import { Plane } from "lucide-react";
import LoginForm from "./LoginForm";

function LoginCard() {

    return (

        <div className="rounded-3xl border border-[#262626] bg-[#111111]/90 backdrop-blur-xl">

            <div className="border-b border-[#262626] p-8">

                <div className="flex items-center gap-4">

                    <div className="rounded-2xl bg-[#1A1A1A] p-4">

                        <Plane className="text-[var(--aerion-primary)]rion-primary)]" size={34} />

                    </div>

                    <div>

                        <h1 className="text-3xl font-bold text-white">

                            AERION

                        </h1>

                        <p className="text-gray-400">

                            Fleet Command

                        </p>

                    </div>

                </div>

            </div>

            <div className="p-8">

                <LoginForm />

            </div>

        </div>

    );

}

export default LoginCard;