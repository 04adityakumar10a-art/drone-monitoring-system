import { useState } from "react";
import {
    Play,
    Square,
    Radio,
    Cpu,
    Satellite
} from "lucide-react";
import api from "../../../api/axios";

function SimulatorPanel({ selectedDroneId }) {

    const [loading, setLoading] = useState(false);

    const [mode, setMode] = useState("SIMULATOR");

    const role = localStorage.getItem("role");

    if (role === "VIEWER") {
        return null;
    }

    /* ============================
       SWITCH TO SIMULATOR
    ============================ */

    async function switchSimulator() {

        try {

            setLoading(true);

            // Stop currently running provider
            await api.post("/api/telemetry/stop");

            // Switch provider
            await api.post("/api/telemetry/mode/fleet");

            setMode("SIMULATOR");

        } catch (e) {

            console.error(e);

        } finally {

            setLoading(false);

        }

    }

    /* ============================
       SWITCH TO REAL DRONE
    ============================ */

    async function switchReal() {

        try {

            setLoading(true);

            // Stop simulator first
            await api.post("/api/telemetry/stop");

            // Switch provider
            await api.post("/api/telemetry/mode/real");

            setMode("REAL");

        } catch (e) {

            console.error(e);

        } finally {

            setLoading(false);

        }

    }

    /* ============================
       START FLEET
    ============================ */

    async function startFleet() {

        if (mode !== "SIMULATOR") return;

        try {

            setLoading(true);

            await api.post("/api/telemetry/start");

        } catch (e) {

            console.error(e);

        } finally {

            setLoading(false);

        }

    }

    /* ============================
       START SELECTED DRONE
    ============================ */

    async function startDrone() {

        if (!selectedDroneId) return;

        if (mode !== "SIMULATOR") return;

        try {

            setLoading(true);

            await api.post(
                `/api/telemetry/mode/drone/${selectedDroneId}`
            );

            await api.post("/api/telemetry/start");

        } catch (e) {

            console.error(e);

        } finally {

            setLoading(false);

        }

    }

    /* ============================
       STOP
    ============================ */

    async function stopSimulator() {

        try {

            setLoading(true);

            await api.post("/api/telemetry/stop");

        } catch (e) {

            console.error(e);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="rounded-2xl border border-[var(--aerion-border)] bg-[var(--aerion-elevated)] p-5">

            <h2 className="mb-5 text-lg font-semibold text-white">

                Telemetry Provider

            </h2>

            {/* MODE SWITCH */}

            <div className="mb-6 flex gap-2">

                <button

                    disabled={loading}

                    onClick={switchSimulator}

                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 font-semibold transition

                        ${mode === "SIMULATOR"

                            ? "bg-[#D4AF37] text-black"

                            : "bg-[#252525] text-white hover:bg-[#303030]"}

                    `}
                >

                    <Cpu size={18} />

                    Simulator

                </button>

                <button

                    disabled={loading}

                    onClick={switchReal}

                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 font-semibold transition

                        ${mode === "REAL"

                            ? "bg-cyan-500 text-white"

                            : "bg-[#252525] text-white hover:bg-[#303030]"}

                    `}
                >

                    <Satellite size={18} />

                    Real Drone

                </button>

            </div>

            {/* STATUS */}

            <div className="mb-5 rounded-xl border border-[#2b2b2b] bg-[#121212] p-4">

                <div className="text-xs uppercase tracking-[0.2em] text-gray-500">

                    Current Provider

                </div>

                <div className="mt-2 text-lg font-semibold text-white">

                    {mode === "SIMULATOR"

                        ? "Simulator"

                        : "Real Drone"}

                </div>

            </div>

            {/* CONTROLS */}

            {

                mode === "SIMULATOR"

                    ?

                    (

                        <div className="space-y-3">

                            <button

                                disabled={loading}

                                onClick={startFleet}

                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-white transition hover:bg-green-700"

                            >

                                <Play size={18} />

                                Start Fleet Simulator

                            </button>

                            <button

                                disabled={!selectedDroneId || loading}

                                onClick={startDrone}

                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-white transition hover:bg-blue-700"

                            >

                                <Radio size={18} />

                                Start Selected Drone

                            </button>

                            <button

                                disabled={loading}

                                onClick={stopSimulator}

                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-white transition hover:bg-red-700"

                            >

                                <Square size={18} />

                                Stop Simulator

                            </button>

                        </div>

                    )

                    :

                    (

                        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-6 text-center">

                            <Satellite
                                size={34}
                                className="mx-auto mb-3 text-cyan-400"
                            />

                            <h3 className="text-lg font-semibold text-cyan-400">

                                Real Drone Mode

                            </h3>

                            <p className="mt-2 text-sm text-gray-400">

                                Waiting for a PX4 / ArduPilot / DJI telemetry source.

                            </p>

                            <button

                                disabled={loading}

                                onClick={stopSimulator}

                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-white transition hover:bg-red-700"

                            >

                                <Square size={18} />

                                Disconnect

                            </button>

                        </div>

                    )

            }

        </div>

    );

}

export default SimulatorPanel;