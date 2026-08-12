import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

import {
    Play,
    Square,
    Plane,
    Radio,
    Cpu,
    ShieldCheck
} from "lucide-react";

function SimulatorControls({ selectedDroneId }) {

    const [running, setRunning] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fleetMode, setFleetMode] = useState(false);

    async function startSimulator() {

        try {

            setLoading(true);

            let response;

            if (fleetMode) {

                response = await api.post(
                    "/api/simulator/start/fleet"
                );

            }

            else {

                if (!selectedDroneId) {

                    toast.error("Select a drone first.");
                    return;

                }

                response = await api.post(
                    `/api/simulator/start/${selectedDroneId}`
                );

            }

            toast.success(response.data);

            setRunning(true);

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to start simulator");

        }

        finally {

            setLoading(false);

        }

    }

    async function stopSimulator() {

        try {

            setLoading(true);

            const response = await api.post(
                "/api/simulator/stop"
            );

            toast.success(response.data);

            setRunning(false);

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to stop simulator");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="rounded-2xl border border-[#262626] bg-[#111111]">

            {/* Header */}

            <div className="border-b border-[#262626] p-6">

                <h2 className="text-xl font-bold text-white">

                    Flight Simulator

                </h2>

                <p className="mt-1 text-sm text-gray-400">

                    Control telemetry simulation

                </p>

            </div>

            {/* Status */}

            <div className="border-b border-[#262626] p-6">

                <div className="flex items-center justify-between">

                    <span className="text-gray-400">

                        Simulator Status

                    </span>

                    <div className="flex items-center gap-2">

                        <div

                            className={`h-3 w-3 rounded-full ${
                                running
                                    ? "animate-pulse bg-green-500"
                                    : "bg-red-500"
                            }`}

                        />

                        <span

                            className={`font-semibold ${
                                running
                                    ? "text-green-400"
                                    : "text-red-400"
                            }`}

                        >

                            {

                                running
                                    ? "RUNNING"
                                    : "STOPPED"

                            }

                        </span>

                    </div>

                </div>

            </div>

            {/* Mode */}

            <div className="border-b border-[#262626] p-6">

                <h3 className="mb-4 text-sm uppercase tracking-[0.25em] text-gray-500">

                    Simulation Mode

                </h3>

                <div className="space-y-3">

                    <button

                        onClick={() => setFleetMode(false)}

                        className={`flex w-full items-center justify-between rounded-xl border p-4 transition ${
                            !fleetMode
                                ? "border-[#D4AF37] bg-[var(--aerion-elevated)]"
                                : "border-[#262626] bg-[#0D0D0D]"
                        }`}

                    >

                        <div className="flex items-center gap-3">

                            <Plane
                                size={18}
                                className="text-[var(--aerion-primary)]"
                            />

                            <span className="text-white">

                                Selected Aircraft

                            </span>

                        </div>

                        {

                            !fleetMode &&

                            <ShieldCheck
                                size={18}
                                className="text-[var(--aerion-primary)]"
                            />

                        }

                    </button>

                    <button

                        onClick={() => setFleetMode(true)}

                        className={`flex w-full items-center justify-between rounded-xl border p-4 transition ${
                            fleetMode
                                ? "border-[#D4AF37] bg-[var(--aerion-elevated)]"
                                : "border-[#262626] bg-[#0D0D0D]"
                        }`}

                    >

                        <div className="flex items-center gap-3">

                            <Radio
                                size={18}
                                className="text-[var(--aerion-primary)]"
                            />

                            <span className="text-white">

                                Entire Fleet

                            </span>

                        </div>

                        {

                            fleetMode &&

                            <ShieldCheck
                                size={18}
                                className="text-[var(--aerion-primary)]"
                            />

                        }

                    </button>

                </div>

            </div>

            {/* Selected Drone */}

            <div className="border-b border-[#262626] p-6">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <Cpu
                            size={18}
                            className="text-[var(--aerion-primary)]"
                        />

                        <span className="text-gray-400">

                            Target

                        </span>

                    </div>

                    <span className="text-lg font-bold text-white">

                        {

                            fleetMode

                                ? "Entire Fleet"

                                : selectedDroneId
                                    ? `Drone-${selectedDroneId}`
                                    : "--"

                        }

                    </span>

                </div>

            </div>

            {/* Controls */}

            <div className="grid grid-cols-2 gap-4 p-6">

                <button

                    onClick={startSimulator}

                    disabled={loading || running}

                    className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"

                >

                    <Play size={18} />

                    START

                </button>

                <button

                    onClick={stopSimulator}

                    disabled={loading || !running}

                    className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-4 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"

                >

                    <Square size={18} />

                    STOP

                </button>

            </div>

        </div>

    );

}

export default SimulatorControls;