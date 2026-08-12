import { motion } from "motion/react";

import {
    MagnifyingGlassIcon,
    PlusIcon,
    ArrowPathIcon,
    AdjustmentsHorizontalIcon
} from "@heroicons/react/24/outline";

function SearchBar({
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    manufacturerFilter,
    setManufacturerFilter,
    batteryFilter,
    setBatteryFilter,
    manufacturers = [],
    onAddDrone
}) {
    const role = localStorage.getItem("role");

    function resetFilters() {
        setSearch("");
        setStatusFilter("ALL");
        setManufacturerFilter("ALL");
        setBatteryFilter("ALL");
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8 overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0B0B0B] shadow-[0_25px_80px_rgba(0,0,0,.35)]"
        >
            {/* Gold glow */}

            <div
                className="pointer-events-none absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-[#D4AF37]/[0.045] blur-[140px]"
            />

            {/* Cyan glow */}

            <div
                className="pointer-events-none absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-cyan-500/[0.025] blur-[120px]"
            />

            {/* Grid */}

            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />

            <div className="relative z-10 p-5 lg:p-6">

                {/* Header */}

                <div className="mb-6 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D4AF37]/15 bg-[#D4AF37]/[0.06]">
                            <AdjustmentsHorizontalIcon className="h-5 w-5 text-[var(--aerion-primary)]" />
                        </div>

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--aerion-primary)]">
                                FLEET CONTROL
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Search and filter aircraft
                            </p>
                        </div>

                    </div>

                    <div className="hidden items-center gap-2 sm:flex">

                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-600">
                            Fleet data connected
                        </span>

                    </div>

                </div>

                {/* Controls */}

                <div className="grid gap-4 xl:grid-cols-[2fr_1fr_1fr_1fr_auto_auto]">

                    {/* Search */}

                    <div>

                        <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-600">
                            Fleet Search
                        </label>

                        <div className="relative">

                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--aerion-primary)]" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search aircraft, model or manufacturer..."
                                className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.025] pl-12 pr-4 text-sm text-white outline-none placeholder:text-gray-600 transition-all duration-300 hover:border-white/[0.13] focus:border-[#D4AF37]/40 focus:bg-white/[0.04]"
                            />

                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-semibold uppercase tracking-wider text-gray-600 hover:text-white"
                                >
                                    Clear
                                </button>
                            )}

                        </div>

                    </div>

                    {/* Status */}

                    <FilterSelect
                        label="Status"
                        value={statusFilter}
                        onChange={setStatusFilter}
                    >
                        <option value="ALL">All Status</option>
                        <option value="AVAILABLE">Available</option>
                        <option value="IN_FLIGHT">In Flight</option>
                        <option value="MAINTENANCE">Maintenance</option>
                        <option value="OFFLINE">Offline</option>
                    </FilterSelect>

                    {/* Manufacturer */}

                    <FilterSelect
                        label="Manufacturer"
                        value={manufacturerFilter}
                        onChange={setManufacturerFilter}
                    >
                        {manufacturers.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </FilterSelect>

                    {/* Battery */}

                    <FilterSelect
                        label="Battery"
                        value={batteryFilter}
                        onChange={setBatteryFilter}
                    >
                        <option value="ALL">All Levels</option>
                        <option value="HIGH">High · 75%+</option>
                        <option value="MEDIUM">Medium · 40–74%</option>
                        <option value="LOW">Low · &lt;40%</option>
                    </FilterSelect>

                    {/* Reset */}

                    <motion.button
                        type="button"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={resetFilters}
                        className="mt-auto flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 text-xs font-semibold text-gray-500 transition-all hover:border-[#D4AF37]/30 hover:text-[var(--aerion-primary)]"
                    >
                        <ArrowPathIcon className="h-4 w-4" />
                        Reset
                    </motion.button>

                    {/* Add */}

                    {role === "ADMIN" && (
                        <motion.button
                            type="button"
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={onAddDrone}
                            className="mt-auto flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-6 text-sm font-semibold text-black transition-all hover:bg-[#E2C04A] hover:shadow-[0_12px_40px_rgba(212,175,55,.20)]"
                        >
                            <PlusIcon className="h-5 w-5" />
                            Add Drone
                        </motion.button>
                    )}

                </div>

                {/* Active filters */}

                <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/[0.05] pt-4">

                    <span className="text-[9px] uppercase tracking-[0.2em] text-gray-700">
                        Active filters
                    </span>

                    <FilterBadge
                        label="Status"
                        value={statusFilter}
                        active={statusFilter !== "ALL"}
                    />

                    <FilterBadge
                        label="Manufacturer"
                        value={manufacturerFilter}
                        active={manufacturerFilter !== "ALL"}
                    />

                    <FilterBadge
                        label="Battery"
                        value={batteryFilter}
                        active={batteryFilter !== "ALL"}
                    />

                    {search && (
                        <FilterBadge
                            label="Search"
                            value={`"${search}"`}
                            active={true}
                        />
                    )}

                </div>

            </div>

            {/* Gold accent */}

            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1 }}
                className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#D4AF37]/40"
            />

        </motion.section>
    );
}


/* =========================================
   FILTER SELECT
========================================= */

function FilterSelect({
    label,
    value,
    onChange,
    children
}) {
    return (
        <div>

            <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-600">
                {label}
            </label>

            <div className="relative">

                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-12 w-full appearance-none rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 pr-10 text-sm text-gray-300 outline-none transition-all hover:border-white/[0.13] focus:border-[#D4AF37]/40"
                >
                    {children}
                </select>

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
                    ▼
                </span>

            </div>

        </div>
    );
}


/* =========================================
   FILTER BADGE
========================================= */

function FilterBadge({
    label,
    value,
    active
}) {
    const containerClass = active
        ? "border-[#D4AF37]/20 bg-[#D4AF37]/[0.06] text-[var(--aerion-primary)]"
        : "border-white/[0.05] bg-white/[0.015] text-gray-700";

    const valueClass = active
        ? "text-gray-300"
        : "text-gray-700";

    return (
        <div
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] transition-all ${containerClass}`}
        >
            <span className="uppercase tracking-wider">
                {label}
            </span>

            <span className={valueClass}>
                {value}
            </span>
        </div>
    );
}

export default SearchBar;