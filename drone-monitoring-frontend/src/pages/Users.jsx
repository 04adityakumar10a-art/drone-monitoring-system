import { useEffect, useMemo, useState } from "react";

import { Settings2 } from "lucide-react";

import api from "../api/axios";

import toast from "react-hot-toast";

import {
    X,
    Plus,
    Mail,
    Lock,
    UserRound
} from "lucide-react";

import {
    Users as UsersIcon,
    Shield,
    UserCog,
    Eye,
    Search,
    Save,
    Crown,
    Wrench,
    User
} from "lucide-react";

function QuickChip({

    label,

    value,

    icon,

    color = "text-[#D4AF37]",

    border = "border-[#D4AF37]/20",

    bg = "bg-[#D4AF37]/10"

}) {

    return (

        <div
            className={`
                flex
                items-center
                gap-5
                min-w-[210px]
                rounded-2xl
                border
                ${border}
                ${bg}
                px-6
                py-5
                transition-all
                duration-300
                hover:-translate-y-0.5
            `}
        >

            {/* Icon */}

            <div
                className={`
                    flex
                    h-14
                    w-14
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#111111]/70
                    ${color}
                `}
            >

                {icon}

            </div>

            {/* Text */}

            <div className="flex flex-col justify-center">

                <span
                    className={`
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[0.22em]
                        ${color}
                    `}
                >

                    {label}

                </span>

                <span className="mt-2 text-4xl font-black leading-none text-white">

                    {value}

                </span>

            </div>

        </div>

    );

}
function StatCard({

    title,

    value,

    icon

}) {

    return (

        <div className="rounded-2xl border border-[#232323] bg-[#111111] p-5">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500">

                        {title}

                    </p>

                    <h2 className="mt-3 text-4xl font-bold font-medium text-white">

                        {value}

                    </h2>

                </div>

                <div className="rounded-2xl bg-[#171717] p-3 text-[#D4AF37]">

                    {icon}

                </div>

            </div>

        </div>

    );

}
function RoleBadge({ role }) {

    const config = {

        ADMIN: {
            icon: Crown,
            color: "text-[#D4AF37]",
            bg: "bg-[#D4AF37]/10",
            border: "border-[#D4AF37]/20"
        },

        OPERATOR: {
            icon: Wrench,
            color: "text-sky-400",
            bg: "bg-sky-500/10",
            border: "border-sky-500/20"
        },

        VIEWER: {
            icon: Eye,
            color: "text-gray-300",
            bg: "bg-gray-500/10",
            border: "border-gray-500/20"
        }

    };

    const item = config[role];

    const Icon = item.icon;

    return (

        <div
            className={`
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                px-4
                py-2
                text-xs
                font-semibold
                tracking-[0.15em]
                uppercase
                ${item.bg}
                ${item.border}
                ${item.color}
            `}
        >

            <Icon size={13} />

            {role}

        </div>

    );

}

function MetricItem({

    icon,

    label,

    value,

    color

}) {

    return (

        <div className="flex items-center gap-3">

            <div className={`${color}`}>

                {icon}

            </div>

            <div className="flex items-center gap-2">

                <span className="text-sm text-gray-400">

                    {label}

                </span>

                <span className={`text-xl font-bold ${color}`}>

                    {value}

                </span>

            </div>

        </div>

    );

}
function Users() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [sortBy, setSortBy] = useState("NEWEST");
    const [editingUserId, setEditingUserId] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const [creating, setCreating] = useState(false);

    const [newUser, setNewUser] = useState({

        username: "",

        email: "",

        password: "",

        role: "VIEWER"

    });
    useEffect(() => {

        fetchUsers();

    }, []);

    async function fetchUsers() {

        try {

            const response = await api.get("/api/users");

            setUsers(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Failed to fetch users");

        }

    }

    async function updateRole(id, role) {

        try {

            await api.put(`/api/users/${id}/role`, {

                role

            });

            toast.success("Role updated successfully");

            fetchUsers();

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to update role");

        }

    }

    async function createUser() {

        try {

            setCreating(true);

            await api.post("/api/users", newUser);

            toast.success("User created successfully");

            setShowCreateModal(false);

            setNewUser({

                username: "",

                email: "",

                password: "",

                role: "VIEWER"

            });

            fetchUsers();

        }

        catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.message ||

                "Failed to create user"

            );

        }

        finally {

            setCreating(false);

        }

    }

    const totalUsers = users.length;

    const adminCount = useMemo(

        () => users.filter(

            user => user.role === "ADMIN"

        ).length,

        [users]

    );

    const operatorCount = useMemo(

        () => users.filter(

            user => user.role === "OPERATOR"

        ).length,

        [users]

    );

    const viewerCount = useMemo(

        () => users.filter(

            user => user.role === "VIEWER"

        ).length,

        [users]

    );

    const filteredUsers = users
        .filter((user) => {

            const matchesSearch =
                user.username.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase());

            const matchesRole =
                roleFilter === "ALL" ||
                user.role === roleFilter;

            const matchesStatus =
                statusFilter === "ALL" ||
                (statusFilter === "ENABLED"
                    ? user.enabled
                    : !user.enabled);

            return matchesSearch && matchesRole && matchesStatus;

        })
        .sort((a, b) => {

            switch (sortBy) {

                case "OLDEST":
                    return new Date(a.createdAt) - new Date(b.createdAt);

                case "USERNAME":
                    return a.username.localeCompare(b.username);

                case "ROLE":
                    return a.role.localeCompare(b.role);

                case "NEWEST":
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt);

            }

        });

    return (

        <div className="space-y-6">

            <div
                className="
        rounded-3xl
        border
        border-[#D4AF37]/10
        bg-[#111111]/45
        backdrop-blur-2xl
        shadow-[0_0_40px_rgba(212,175,55,0.08)]
        p-7
    "
            >

                {/* Header */}

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-5">

                        <div
                            className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-[#D4AF37]/20
                    bg-[#181818]/70
                "
                        >

                            <UsersIcon
                                size={30}
                                className="text-[#D4AF37]"
                            />

                        </div>

                        <div>

                            <h1 className="text-3xl font-bold font-medium text-white">

                                Operator Management

                            </h1>

                            <p className="mt-1 text-sm text-gray-400">

                                Manage platform users, permissions and access levels

                            </p>

                        </div>

                    </div>

                    <button

                        onClick={() => setShowCreateModal(true)}

                        className="
        inline-flex
        items-center
        gap-3
        rounded-2xl
        bg-[#D4AF37]
        px-6
        py-3
        font-semibold
        text-black
        transition-all
        duration-300
        hover:scale-105
    "

                    >

                        <Plus size={18} />

                        Add User

                    </button>

                </div>

                {/* System Indicators */}

                <div className="mt-7">

                    <div className="flex flex-wrap items-center gap-5">

                        <MetricItem
                            icon={<UsersIcon size={18} />}
                            label="Total Users"
                            value={totalUsers}
                            color="text-[#D4AF37]"
                        />

                        <div className="h-6 w-px bg-[#2A2A2A]" />

                        <MetricItem
                            icon={<Shield size={18} />}
                            label="Admins"
                            value={adminCount}
                            color="text-red-400"
                        />

                        <div className="h-6 w-px bg-[#2A2A2A]" />

                        <MetricItem
                            icon={<UserCog size={18} />}
                            label="Operators"
                            value={operatorCount}
                            color="text-sky-400"
                        />

                        <div className="h-6 w-px bg-[#2A2A2A]" />

                        <MetricItem
                            icon={<Eye size={18} />}
                            label="Viewers"
                            value={viewerCount}
                            color="text-gray-300"
                        />

                    </div>

                </div>
                <div className="my-7 border-t border-[#262626]" />
                {/* Toolbar */}

                <div className="mt-7 border-t border-[#2A2A2A] pt-6">

                    <div className="flex flex-wrap items-center gapx-7 py-5">

                        {/* Search */}

                        <div className="relative flex-1 min-w-[320px]">

                            <Search

                                size={18}

                                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"

                            />

                            <input
                                value={search}

                                onChange={(e) => setSearch(e.target.value)}

                                type="text"

                                placeholder="Search username or email..."

                                className="
                    h-12
                    w-full
                    rounded-2xl
                    border
                    border-[#2A2A2A]
                    bg-[#171717]/70
                    pl-12
                    pr-4
                    font-medium text-white
                    placeholder:text-gray-500
                    outline-none
                    transition-all
                    duration-300
                    focus:border-[#D4AF37]
                    focus:ring-2
                    focus:ring-[#D4AF37]/20
                "

                            />

                        </div>

                        {/* Role */}

                        <select
                            value={roleFilter}

                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="
                h-12
                rounded-2xl
                border
                border-[#2A2A2A]
                bg-[#171717]/70
                px-5
                font-medium text-white
                outline-none
                transition
                focus:border-[#D4AF37]
            "

                        >

                            <option>All Roles</option>

                            <option>ADMIN</option>

                            <option>OPERATOR</option>

                            <option>VIEWER</option>

                        </select>

                        {/* Status */}

                        <select
                            value={statusFilter}

                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="
                h-12
                rounded-2xl
                border
                border-[#2A2A2A]
                bg-[#171717]/70
                px-5
                font-medium text-white
                outline-none
                transition
                focus:border-[#D4AF37]
            "

                        >

                            <option value="ALL">All Status</option>

                            <option>Enabled</option>

                            <option>Disabled</option>

                        </select>

                        {/* Sort */}

                        <select

                            value={sortBy}

                            onChange={(e) => setSortBy(e.target.value)}

                            className="
                h-12
                rounded-2xl
                border
                border-[#2A2A2A]
                bg-[#171717]/70
                px-5
                font-medium text-white
                outline-none
                transition
                focus:border-[#D4AF37]
            "

                        >
                            <option value="NEWEST">Newest</option>
                            <option value="OLDEST">Oldest</option>
                            <option value="USERNAME">Username (A-Z)</option>
                            <option value="ROLE">Role</option>
                        </select>

                    </div>

                </div>

            </div>

            <div
                className="
        overflow-hidden
        rounded-3xl
        border
        border-[#232323]
        bg-[#111111]/70
        backdrop-blur-xl
        shadow-[0_0_30px_rgba(0,0,0,.25)]
    "
            >

                <table className="w-full">

                    <thead className="border-b border-[#232323] bg-[#171717]">

                        <tr>

                            <th
                                className="
        px-7
        py-5
        text-left
        text-xs
        font-semibold
        uppercase
        tracking-[0.28em]
        text-[#D4AF37]
    "
                            >

                                Username

                            </th>

                            <th className="px-7 py-5 text-left font-medium text-white">

                                Email

                            </th>

                            <th className="px-7 py-5 text-left font-medium text-white">

                                Role

                            </th>

                            <th className="px-7 py-5 text-left font-medium text-white">

                                Status

                            </th>

                            <th className="px-7 py-5 text-left font-medium text-white">

                                Created

                            </th>

                            <th className="px-7 py-5 text-center font-medium text-white">

                                Action

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredUsers.map(user => (

                            <tr
                                key={user.id}
                                className="
        border-b
        border-[#1F1F1F]
        transition-all
        duration-300
        hover:bg-[#171717]
        hover:shadow-[inset_4px_0_0_#D4AF37]
    "
                            >
                                <td className="px-7 py-5 font-medium text-white">

                                    {user.username}

                                </td>

                                <td className="px-7 py-5 text-gray-300">

                                    {user.email}

                                </td>

                                <td className="px-7 py-5">

                                    {editingUserId === user.id ? (

                                        <select

                                            value={user.role}

                                            onChange={(e) => {

                                                setUsers(

                                                    users.map(u =>

                                                        u.id === user.id

                                                            ? {

                                                                ...u,

                                                                role: e.target.value

                                                            }

                                                            : u

                                                    )

                                                );

                                            }}

                                            className="
            rounded-xl
            border
            border-[#2A2A2A]
            bg-[#171717]
            px-4
            py-2
            text-white
            outline-none
            focus:border-[#D4AF37]
        "

                                        >

                                            <option value="ADMIN">ADMIN</option>

                                            <option value="OPERATOR">OPERATOR</option>

                                            <option value="VIEWER">VIEWER</option>

                                        </select>

                                    ) : (

                                        <RoleBadge role={user.role} />

                                    )}
                                </td>

                                <td className="px-7 py-5">

                                    <span
                                        className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-4
        py-2
        text-xs
        font-semibold
        uppercase
        tracking-[0.18em]
        ${user.enabled
                                                ? "bg-green-500/10 text-green-400"
                                                : "bg-red-500/10 text-red-400"
                                            }
    `}
                                    >

                                        <span className="h-2 w-2 rounded-full bg-current"></span>

                                        {user.enabled ? "Enabled" : "Disabled"}

                                    </span>

                                </td>

                                <td className="px-7 py-5 text-gray-300">

                                    {user.createdAt.substring(0, 10)}

                                </td>

                                <td className="px-7 py-5 text-center">

                                    {editingUserId === user.id ? (

                                        <button

                                            onClick={() => {

                                                updateRole(

                                                    user.id,

                                                    user.role

                                                );

                                                setEditingUserId(null);

                                            }}

                                            className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-[#D4AF37]/20
            bg-[#D4AF37]/10
            px-4
            py-2
            text-[#D4AF37]
            transition-all
            hover:bg-[#D4AF37]
            hover:text-black
        "

                                        >

                                            <Save size={16} />

                                            Save

                                        </button>

                                    ) : (

                                        <button
                                            onClick={() => setEditingUserId(user.id)}
                                            className="
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        border-[#D4AF37]/20
        bg-[#D4AF37]/10
        px-4
        py-2
        text-sm
        font-semibold
        text-[#D4AF37]
        transition-all
        hover:border-[#D4AF37]
        hover:bg-[#D4AF37]
        hover:text-black
    "
                                        >
                                            <Settings2 size={16} />
                                            Manage
                                        </button>

                                    )}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
            {
                showCreateModal && (

                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

                        <div className="w-full max-w-xl rounded-3xl border border-[#2A2A2A] bg-[#111111] shadow-2xl">

                            {/* Header */}

                            <div className="flex items-center justify-between border-b border-[#262626] px-8 py-6">

                                <div>

                                    <h2 className="text-2xl font-bold text-white">

                                        Create User

                                    </h2>

                                    <p className="mt-1 text-sm text-gray-400">

                                        Add a new user to the AERION platform

                                    </p>

                                </div>

                                <button

                                    onClick={() => setShowCreateModal(false)}

                                    className="rounded-xl p-2 text-gray-400 transition hover:bg-[#1A1A1A] hover:text-white"

                                >

                                    <X size={20} />

                                </button>

                            </div>

                            {/* Body */}

                            <div className="space-y-6 p-8">

                                {/* Username */}

                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-300">

                                        Username

                                    </label>

                                    <div className="relative">

                                        <UserRound
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        />

                                        <input

                                            value={newUser.username}

                                            onChange={(e) =>
                                                setNewUser({
                                                    ...newUser,
                                                    username: e.target.value
                                                })
                                            }

                                            className="h-12 w-full rounded-2xl border border-[#2A2A2A] bg-[#171717] pl-12 pr-4 text-white outline-none transition focus:border-[#D4AF37]"

                                            placeholder="Username"

                                        />

                                    </div>

                                </div>

                                {/* Email */}

                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-300">

                                        Email

                                    </label>

                                    <div className="relative">

                                        <Mail
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        />

                                        <input

                                            type="email"

                                            value={newUser.email}

                                            onChange={(e) =>
                                                setNewUser({
                                                    ...newUser,
                                                    email: e.target.value
                                                })
                                            }

                                            className="h-12 w-full rounded-2xl border border-[#2A2A2A] bg-[#171717] pl-12 pr-4 text-white outline-none transition focus:border-[#D4AF37]"

                                            placeholder="Email"

                                        />

                                    </div>

                                </div>

                                {/* Password */}

                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-300">

                                        Password

                                    </label>

                                    <div className="relative">

                                        <Lock
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        />

                                        <input

                                            type="password"

                                            value={newUser.password}

                                            onChange={(e) =>
                                                setNewUser({
                                                    ...newUser,
                                                    password: e.target.value
                                                })
                                            }

                                            className="h-12 w-full rounded-2xl border border-[#2A2A2A] bg-[#171717] pl-12 pr-4 text-white outline-none transition focus:border-[#D4AF37]"

                                            placeholder="Password"

                                        />

                                    </div>

                                </div>

                                {/* Role */}

                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-300">

                                        Role

                                    </label>

                                    <select

                                        value={newUser.role}

                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                role: e.target.value
                                            })
                                        }

                                        className="h-12 w-full rounded-2xl border border-[#2A2A2A] bg-[#171717] px-4 text-white outline-none transition focus:border-[#D4AF37]"

                                    >

                                        <option value="ADMIN">

                                            ADMIN

                                        </option>

                                        <option value="OPERATOR">

                                            OPERATOR

                                        </option>

                                        <option value="VIEWER">

                                            VIEWER

                                        </option>

                                    </select>

                                </div>

                            </div>

                            {/* Footer */}

                            <div className="flex justify-end gap-4 border-t border-[#262626] px-8 py-6">

                                <button

                                    onClick={() => setShowCreateModal(false)}

                                    className="rounded-xl border border-[#2A2A2A] px-6 py-3 text-white transition hover:bg-[#1A1A1A]"

                                >

                                    Cancel

                                </button>

                                <button

                                    onClick={createUser}

                                    disabled={creating}

                                    className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-black transition hover:scale-105 disabled:opacity-60"

                                >

                                    {

                                        creating

                                            ? "Creating..."

                                            : "Create User"

                                    }

                                </button>

                            </div>

                        </div>

                    </div>

                )
            }
        </div>

    );

}

export default Users;