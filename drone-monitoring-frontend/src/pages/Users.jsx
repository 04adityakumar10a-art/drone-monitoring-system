import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import {
    Activity,
    AlertTriangle,
    Check,
    ChevronDown,
    Edit3,
    KeyRound,
    Mail,
    MoreVertical,
    Plus,
    Search,
    Shield,
    Trash2,
    User,
    UserCheck,
    UserPlus,
    UserRound,
    UserX,
    Users as UsersIcon,
    X
} from "lucide-react";

import api from "../api/axios";


/* =========================================================
   ANIMATION
========================================================= */

const pageVariants = {
    hidden: {
        opacity: 0
    },

    visible: {
        opacity: 1,
        transition: {
            duration: 0.45,
            staggerChildren: 0.07
        }
    }
};


const itemVariants = {
    hidden: {
        opacity: 0,
        y: 18
    },

    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};


/* =========================================================
   GLASS CARD
========================================================= */

function GlassCard({
    children,
    className = ""
}) {

    return (
        <div
            className={`
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/[0.08]
                bg-white/[0.035]
                shadow-[0_20px_70px_rgba(0,0,0,.28)]
                backdrop-blur-2xl
                ${className}
            `}
        >

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-white/[0.04]
                    via-transparent
                    to-transparent
                "
            />

            <div className="relative">
                {children}
            </div>

        </div>
    );
}


/* =========================================================
   ROLE BADGE
========================================================= */

function RoleBadge({ role }) {

    const config = {

        ADMIN: {
            icon: Shield,
            label: "ADMIN",
            className:
                "border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]"
        },

        OPERATOR: {
            icon: Activity,
            label: "OPERATOR",
            className:
                "border-cyan-400/25 bg-cyan-400/10 text-cyan-300"
        },

        VIEWER: {
            icon: UserRound,
            label: "VIEWER",
            className:
                "border-white/10 bg-white/[0.04] text-gray-300"
        }

    };

    const item =
        config[role] || config.VIEWER;

    const Icon = item.icon;

    return (
        <span
            className={`
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                px-3
                py-1.5
                text-[10px]
                font-bold
                tracking-[0.18em]
                ${item.className}
            `}
        >

            <Icon size={12} />

            {item.label}

        </span>
    );
}


/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ enabled }) {

    return (
        <span
            className={`
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                px-3
                py-1.5
                text-[10px]
                font-bold
                tracking-[0.16em]

                ${enabled
                    ? `
                            border-emerald-400/20
                            bg-emerald-400/10
                            text-emerald-400
                        `
                    : `
                            border-red-400/20
                            bg-red-400/10
                            text-red-400
                        `
                }
            `}
        >

            <span
                className={`
                    h-2
                    w-2
                    rounded-full

                    ${enabled
                        ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.7)]"
                        : "bg-red-400"
                    }
                `}
            />

            {enabled
                ? "ACTIVE"
                : "DISABLED"}

        </span>
    );
}


/* =========================================================
   INPUT
========================================================= */

function Input({
    label,
    icon: Icon,
    ...props
}) {

    return (
        <label className="block">

            <span
                className="
                    mb-2
                    block
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-gray-500
                "
            >
                {label}
            </span>

            <div className="relative">

                {Icon && (
                    <Icon
                        size={16}
                        className="
                            pointer-events-none
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-gray-600
                        "
                    />
                )}

                <input
                    {...props}
                    className={`
                        w-full
                        rounded-2xl
                        border
                        border-white/[0.08]
                        bg-white/[0.04]
                        py-3.5
                        pr-4
                        text-sm
                        text-white
                        outline-none
                        transition-all
                        placeholder:text-gray-600
                        focus:border-[#D4AF37]/50
                        focus:bg-white/[0.06]
                        focus:ring-4
                        focus:ring-[#D4AF37]/5
                        ${Icon ? "pl-11" : "pl-4"}
                    `}
                />

            </div>

        </label>
    );
}


/* =========================================================
   SELECT
========================================================= */

function Select({
    label,
    value,
    onChange,
    children
}) {

    return (
        <label className="block">

            {label && (
                <span
                    className="
                        mb-2
                        block
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-gray-500
                    "
                >
                    {label}
                </span>
            )}

            <div className="relative">

                <select
                    value={value}
                    onChange={onChange}
                    className="
                        w-full
                        appearance-none
                        rounded-2xl
                        border
                        border-white/[0.08]
                        bg-[#101214]
                        px-4
                        py-3.5
                        pr-10
                        text-sm
                        text-white
                        outline-none
                        transition
                        focus:border-[#D4AF37]/50
                    "
                >

                    {children}

                </select>

                <ChevronDown
                    size={16}
                    className="
                        pointer-events-none
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-600
                    "
                />

            </div>

        </label>
    );
}


/* =========================================================
   MODAL
========================================================= */

function Modal({
    title,
    eyebrow,
    children,
    onClose
}) {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
                fixed
                inset-0
                z-[100000]
                flex
                items-center
                justify-center
                bg-black/75
                p-4
                backdrop-blur-md
            "
            onMouseDown={(event) => {

                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose();
                }

            }}
        >

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.94,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0
                }}
                exit={{
                    opacity: 0,
                    scale: 0.96,
                    y: 10
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 28
                }}
                className="
                    w-full
                    max-w-lg
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/[0.1]
                    bg-[#0d0f11]/95
                    shadow-[0_30px_120px_rgba(0,0,0,.65)]
                    backdrop-blur-3xl
                "
            >

                <div
                    className="
                        flex
                        items-start
                        justify-between
                        border-b
                        border-white/[0.07]
                        px-6
                        py-5
                    "
                >

                    <div>

                        {eyebrow && (
                            <p
                                className="
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[0.25em]
                                    text-[#D4AF37]
                                "
                            >
                                {eyebrow}
                            </p>
                        )}

                        <h2
                            className="
                                mt-1
                                text-xl
                                font-semibold
                                text-white
                            "
                        >
                            {title}
                        </h2>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-xl
                            p-2
                            text-gray-600
                            transition
                            hover:bg-white/[0.05]
                            hover:text-white
                        "
                    >
                        <X size={18} />
                    </button>

                </div>

                {children}

            </motion.div>

        </motion.div>
    );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
    label,
    value,
    description,
    icon: Icon,
    accent,
    delay
}) {

    const accentClasses = {

        gold: {
            text: "text-[#D4AF37]",
            border: "border-[#D4AF37]/20",
            bg: "bg-[#D4AF37]/10",
            glow: "bg-[#D4AF37]",
            dot: "bg-[#D4AF37]"
        },

        purple: {
            text: "text-purple-400",
            border: "border-purple-400/20",
            bg: "bg-purple-400/10",
            glow: "bg-purple-500",
            dot: "bg-purple-400"
        },

        cyan: {
            text: "text-cyan-400",
            border: "border-cyan-400/20",
            bg: "bg-cyan-400/10",
            glow: "bg-cyan-500",
            dot: "bg-cyan-400"
        },

        green: {
            text: "text-emerald-400",
            border: "border-emerald-400/20",
            bg: "bg-emerald-400/10",
            glow: "bg-emerald-500",
            dot: "bg-emerald-400"
        }

    };

    const colors =
        accentClasses[accent] ||
        accentClasses.gold;

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 25,
                scale: 0.96
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1
            }}
            transition={{
                delay,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{
                y: -5,
                scale: 1.015
            }}
            className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/[0.08]
                bg-[#0d0f10]/80
                p-5
                backdrop-blur-2xl
                shadow-[0_20px_60px_rgba(0,0,0,.25)]
                transition-shadow
                duration-500
                hover:shadow-[0_25px_80px_rgba(0,0,0,.45)]
            "
        >

            <div
                className={`
                    pointer-events-none
                    absolute
                    -right-12
                    -top-12
                    h-32
                    w-32
                    rounded-full
                    blur-3xl
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-25
                    ${colors.glow}
                `}
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    left-0
                    right-0
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-white/[0.14]
                    to-transparent
                "
            />

            <div
                className="
                    relative
                    flex
                    items-start
                    justify-between
                "
            >

                <div>

                    <p
                        className="
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.25em]
                            text-gray-500
                        "
                    >
                        {label}
                    </p>

                    <p
                        className="
                            mt-1
                            text-[10px]
                            text-gray-600
                        "
                    >
                        {description}
                    </p>

                </div>

                <motion.div
                    whileHover={{
                        rotate: 8,
                        scale: 1.08
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 15
                    }}
                    className={`
                        relative
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        ${colors.border}
                        ${colors.bg}
                        ${colors.text}
                    `}
                >

                    <Icon size={19} />

                </motion.div>

            </div>

            <motion.div
                initial={{
                    opacity: 0,
                    y: 10
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    delay: delay + 0.15,
                    duration: 0.4
                }}
                className="
                    relative
                    mt-5
                    text-4xl
                    font-semibold
                    tracking-tight
                    text-white
                "
            >
                {value}
            </motion.div>

            <div
                className="
                    relative
                    mt-5
                    flex
                    items-center
                    gap-2
                "
            >

                <span
                    className={`
                        h-1.5
                        w-1.5
                        rounded-full
                        ${colors.dot}
                    `}
                />

                <span
                    className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-gray-600
                    "
                >
                    Personnel Registry
                </span>

            </div>

        </motion.div>
    );
}


/* =========================================================
   USERS PAGE
========================================================= */

function Users() {

    const currentRole =
        localStorage.getItem("role") ||
        "VIEWER";

    const currentUsername =
        localStorage.getItem("username") ||
        "";

    const [users, setUsers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [busy, setBusy] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const [roleFilter, setRoleFilter] =
        useState("ALL");

    const [statusFilter, setStatusFilter] =
        useState("ALL");

    const [openMenu, setOpenMenu] =
        useState(null);

    const [menuPosition, setMenuPosition] =
        useState({
            top: 0,
            left: 0
        });

    const [modal, setModal] =
        useState(null);

    const [selectedUser, setSelectedUser] =
        useState(null);

    const [toast, setToast] =
        useState(null);

    const [profileForm, setProfileForm] =
        useState({
            username: "",
            email: ""
        });

    const [roleForm, setRoleForm] =
        useState("VIEWER");

    const [passwordForm, setPasswordForm] =
        useState({
            password: "",
            confirmPassword: ""
        });

    const [createForm, setCreateForm] =
        useState({
            username: "",
            email: "",
            password: "",
            role: "VIEWER"
        });


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(
        message,
        type = "success"
    ) {

        setToast({
            message,
            type
        });

        window.setTimeout(() => {
            setToast(null);
        }, 3500);
    }


    /* =====================================================
       LOAD USERS
    ===================================================== */

    async function loadUsers() {

        try {

            setLoading(true);

            const response =
                await api.get("/api/users");

            setUsers(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.error(error);

            showToast(
                error?.response?.data?.message ||
                "Unable to load operators",
                "error"
            );

        } finally {

            setLoading(false);

        }
    }


    useEffect(() => {

        if (
            currentRole === "ADMIN"
        ) {

            loadUsers();

        } else {

            setLoading(false);

        }

    }, [currentRole]);


    /* =====================================================
       CLOSE MENU ON ESC
    ===================================================== */

    useEffect(() => {

        function handleEscape(event) {

            if (
                event.key === "Escape"
            ) {

                setOpenMenu(null);

            }

        }

        window.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {

            window.removeEventListener(
                "keydown",
                handleEscape
            );

        };

    }, []);


    /* =====================================================
       HELPERS
    ===================================================== */

    function closeModal() {

        setModal(null);
        setSelectedUser(null);

    }


    function getErrorMessage(
        error,
        fallback
    ) {

        return (
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            fallback
        );
    }


    function openProfile(user) {

        setSelectedUser(user);

        setProfileForm({
            username:
                user.username || "",
            email:
                user.email || ""
        });

        setOpenMenu(null);
        setModal("profile");
    }


    function openRole(user) {

        setSelectedUser(user);

        setRoleForm(
            user.role || "VIEWER"
        );

        setOpenMenu(null);
        setModal("role");
    }


    function openPassword(user) {

        setSelectedUser(user);

        setPasswordForm({
            password: "",
            confirmPassword: ""
        });

        setOpenMenu(null);
        setModal("password");
    }


    function openDelete(user) {

        setSelectedUser(user);

        setOpenMenu(null);
        setModal("delete");
    }


    function openCreate() {

        setCreateForm({
            username: "",
            email: "",
            password: "",
            role: "VIEWER"
        });

        setModal("create");
    }


    /* =====================================================
       DROPDOWN POSITION
    ===================================================== */

    function openActionMenu(
        event,
        user
    ) {

        event.preventDefault();
        event.stopPropagation();

        if (busy) {
            return;
        }

        if (
            openMenu === user.id
        ) {

            setOpenMenu(null);

            return;
        }

        const rect =
            event.currentTarget
                .getBoundingClientRect();

        const menuWidth = 240;
        const menuHeight = 330;
        const gap = 8;
        const padding = 12;

        let left =
            rect.right -
            menuWidth;

        if (
            left < padding
        ) {

            left = padding;

        }

        if (
            left + menuWidth >
            window.innerWidth -
            padding
        ) {

            left =
                window.innerWidth -
                menuWidth -
                padding;

        }

        const spaceBelow =
            window.innerHeight -
            rect.bottom;

        const spaceAbove =
            rect.top;

        let top;

        if (
            spaceBelow <
            menuHeight &&
            spaceAbove >
            spaceBelow
        ) {

            top =
                rect.top -
                menuHeight -
                gap;

        } else {

            top =
                rect.bottom +
                gap;

        }

        if (
            top < padding
        ) {

            top = padding;

        }

        if (
            top + menuHeight >
            window.innerHeight -
            padding
        ) {

            top =
                Math.max(
                    padding,
                    window.innerHeight -
                    menuHeight -
                    padding
                );

        }

        setMenuPosition({
            top,
            left
        });

        setOpenMenu(user.id);
    }


    /* =====================================================
       CREATE USER
    ===================================================== */

    async function createUser(event) {

        event.preventDefault();

        try {

            setBusy(true);

            await api.post(
                "/api/users",
                {
                    username:
                        createForm.username,
                    email:
                        createForm.email,
                    password:
                        createForm.password,
                    role:
                        createForm.role
                }
            );

            closeModal();

            showToast(
                "Operator created successfully"
            );

            await loadUsers();

        } catch (error) {

            console.error(error);

            showToast(
                getErrorMessage(
                    error,
                    "Unable to create operator"
                ),
                "error"
            );

        } finally {

            setBusy(false);

        }
    }


    /* =====================================================
       UPDATE PROFILE
    ===================================================== */

    async function updateProfile(event) {

        event.preventDefault();

        if (!selectedUser) {
            return;
        }

        try {

            setBusy(true);

            await api.put(
                `/api/users/${selectedUser.id}`,
                {
                    username:
                        profileForm.username,
                    email:
                        profileForm.email
                }
            );

            closeModal();

            showToast(
                "Operator profile updated"
            );

            await loadUsers();

        } catch (error) {

            console.error(error);

            showToast(
                getErrorMessage(
                    error,
                    "Unable to update operator"
                ),
                "error"
            );

        } finally {

            setBusy(false);

        }
    }


    /* =====================================================
       UPDATE ROLE
    ===================================================== */

    async function updateRole() {

        if (!selectedUser) {
            return;
        }

        if (
            roleForm ===
            selectedUser.role
        ) {

            closeModal();

            return;
        }

        try {

            setBusy(true);

            await api.put(
                `/api/users/${selectedUser.id}/role`,
                {
                    role: roleForm
                }
            );

            closeModal();

            showToast(
                "Operator role updated"
            );

            await loadUsers();

        } catch (error) {

            console.error(error);

            showToast(
                getErrorMessage(
                    error,
                    "Unable to update role"
                ),
                "error"
            );

        } finally {

            setBusy(false);

        }
    }


    /* =====================================================
       UPDATE STATUS
    ===================================================== */

    async function toggleStatus(user) {

        setOpenMenu(null);

        try {

            setBusy(true);

            await api.put(
                `/api/users/${user.id}/status`,
                {
                    enabled:
                        !user.enabled
                }
            );

            showToast(
                user.enabled
                    ? "Operator disabled"
                    : "Operator enabled"
            );

            await loadUsers();

        } catch (error) {

            console.error(error);

            showToast(
                getErrorMessage(
                    error,
                    "Unable to update account status"
                ),
                "error"
            );

        } finally {

            setBusy(false);

        }
    }


    /* =====================================================
       UPDATE PASSWORD
    ===================================================== */

    async function updatePassword(
        event
    ) {

        event.preventDefault();

        if (!selectedUser) {
            return;
        }

        if (
            passwordForm.password !==
            passwordForm.confirmPassword
        ) {

            showToast(
                "Passwords do not match",
                "error"
            );

            return;
        }

        if (
            passwordForm.password.length <
            8
        ) {

            showToast(
                "Password must contain at least 8 characters",
                "error"
            );

            return;
        }

        try {

            setBusy(true);

            await api.put(
                `/api/users/${selectedUser.id}/password`,
                {
                    password:
                        passwordForm.password
                }
            );

            closeModal();

            showToast(
                "Password reset successfully"
            );

        } catch (error) {

            console.error(error);

            showToast(
                getErrorMessage(
                    error,
                    "Unable to reset password"
                ),
                "error"
            );

        } finally {

            setBusy(false);

        }
    }


    /* =====================================================
       DELETE USER
    ===================================================== */

    async function deleteUser() {

        if (!selectedUser) {
            return;
        }

        try {

            setBusy(true);

            await api.delete(
                `/api/users/${selectedUser.id}`
            );

            closeModal();

            showToast(
                "Operator deleted successfully"
            );

            await loadUsers();

        } catch (error) {

            console.error(error);

            showToast(
                getErrorMessage(
                    error,
                    "Unable to delete operator"
                ),
                "error"
            );

        } finally {

            setBusy(false);

        }
    }


    /* =====================================================
       FILTERED USERS
    ===================================================== */

    const filteredUsers =
        useMemo(() => {

            const query =
                search
                    .trim()
                    .toLowerCase();

            return users.filter(
                (user) => {

                    const matchesSearch =
                        !query ||
                        user.username
                            ?.toLowerCase()
                            .includes(query) ||
                        user.email
                            ?.toLowerCase()
                            .includes(query);

                    const matchesRole =
                        roleFilter === "ALL" ||
                        user.role ===
                        roleFilter;

                    const matchesStatus =
                        statusFilter ===
                        "ALL" ||
                        (
                            statusFilter ===
                            "ACTIVE" &&
                            user.enabled
                        ) ||
                        (
                            statusFilter ===
                            "DISABLED" &&
                            !user.enabled
                        );

                    return (
                        matchesSearch &&
                        matchesRole &&
                        matchesStatus
                    );
                }
            );

        }, [
            users,
            search,
            roleFilter,
            statusFilter
        ]);


    /* =====================================================
       STATS
    ===================================================== */

    const stats =
        useMemo(() => {

            return {

                total:
                    users.length,

                admins:
                    users.filter(
                        (user) =>
                            user.role ===
                            "ADMIN"
                    ).length,

                operators:
                    users.filter(
                        (user) =>
                            user.role ===
                            "OPERATOR"
                    ).length,

                viewers:
                    users.filter(
                        (user) =>
                            user.role ===
                            "VIEWER"
                    ).length

            };

        }, [users]);


    /* =====================================================
       ACCESS CONTROL
    ===================================================== */

    if (
        currentRole !== "ADMIN"
    ) {

        return (
            <div
                className="
                    flex
                    min-h-[70vh]
                    items-center
                    justify-center
                    p-6
                "
            >

                <GlassCard
                    className="
                        max-w-md
                        p-10
                        text-center
                    "
                >

                    <Shield
                        size={42}
                        className="
                            mx-auto
                            mb-5
                            text-red-400
                        "
                    />

                    <h1
                        className="
                            text-xl
                            font-semibold
                            text-white
                        "
                    >
                        Access Restricted
                    </h1>

                    <p
                        className="
                            mt-3
                            text-sm
                            text-gray-500
                        "
                    >
                        Administrator privileges are
                        required to manage operators.
                    </p>

                </GlassCard>

            </div>
        );
    }


    /* =====================================================
       MAIN UI
    ===================================================== */

    return (
        <motion.div
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            className="
                space-y-6
                pb-10
            "
        >

            {/* =============================================
                HEADER
            ============================================= */}

            <motion.div
                variants={itemVariants}
                className="
                    flex
                    flex-col
                    gap-5
                    lg:flex-row
                    lg:items-end
                    lg:justify-between
                "
            >

                <div>

                    <div
                        className="
                            mb-3
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <span
                            className="
                                h-2
                                w-2
                                rounded-full
                                bg-[#D4AF37]
                                shadow-[0_0_12px_rgba(212,175,55,.8)]
                            "
                        />

                        <span
                            className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.3em]
                                text-[#D4AF37]
                            "
                        >
                            Administration
                        </span>

                    </div>

                    <h1
                        className="
                            text-3xl
                            font-semibold
                            tracking-tight
                            text-white
                            lg:text-4xl
                        "
                    >
                        Operators
                    </h1>

                    <p
                        className="
                            mt-2
                            text-sm
                            text-gray-500
                        "
                    >
                        Manage personnel, permissions
                        and account security.
                    </p>

                </div>


                <motion.button
                    type="button"
                    whileHover={{
                        y: -2,
                        scale: 1.015
                    }}
                    whileTap={{
                        scale: 0.97
                    }}
                    onClick={openCreate}
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-[#D4AF37]
                        px-5
                        py-3
                        text-sm
                        font-bold
                        text-black
                        shadow-[0_0_30px_rgba(212,175,55,.12)]
                        transition
                        hover:shadow-[0_0_45px_rgba(212,175,55,.25)]
                    "
                >

                    <Plus size={17} />

                    Add Operator

                </motion.button>

            </motion.div>


            {/* =============================================
                STATS
            ============================================= */}

            <motion.div
                variants={itemVariants}
                className="
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                    xl:grid-cols-4
                "
            >

                <StatCard
                    label="Total Users"
                    value={stats.total}
                    description="All registered personnel"
                    icon={UsersIcon}
                    accent="gold"
                    delay={0}
                />

                <StatCard
                    label="Administrators"
                    value={stats.admins}
                    description="Full system access"
                    icon={Shield}
                    accent="purple"
                    delay={0.08}
                />

                <StatCard
                    label="Operators"
                    value={stats.operators}
                    description="Mission control access"
                    icon={Activity}
                    accent="cyan"
                    delay={0.16}
                />

                <StatCard
                    label="Viewers"
                    value={stats.viewers}
                    description="Read-only access"
                    icon={UserRound}
                    accent="green"
                    delay={0.24}
                />

            </motion.div>


            {/* =============================================
                MAIN TABLE CARD
            ============================================= */}

            <motion.div
                variants={itemVariants}
            >

                <GlassCard>

                    {/* FILTER BAR */}

                    <div
                        className="
                            flex
                            flex-col
                            gap-3
                            border-b
                            border-white/[0.07]
                            p-5
                            lg:flex-row
                        "
                    >

                        <div
    className="
        relative
        flex-1
    "
>

    <Search
        size={17}
        className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-600
        "
    />

    <input
        value={search}
        onChange={(event) =>
            setSearch(event.target.value)
        }
        placeholder="Search operators..."
        className="
            w-full
            rounded-2xl
            border
            border-white/[0.07]
            bg-white/[0.035]
            py-3.5
            pl-11
            pr-11
            text-sm
            text-white
            outline-none
            placeholder:text-gray-600
            transition-all
            focus:border-[#D4AF37]/40
            focus:bg-white/[0.05]
            focus:ring-4
            focus:ring-[#D4AF37]/5
        "
    />

    {search && (

        <motion.button
            type="button"
            initial={{
                opacity: 0,
                scale: 0.7
            }}
            animate={{
                opacity: 1,
                scale: 1
            }}
            whileHover={{
                scale: 1.08
            }}
            whileTap={{
                scale: 0.9
            }}
            onClick={() => setSearch("")}
            className="
                absolute
                right-3
                top-1/2
                flex
                h-7
                w-7
                -translate-y-1/2
                items-center
                justify-center
                rounded-lg
                text-gray-500
                transition
                hover:bg-white/[0.08]
                hover:text-white
            "
            aria-label="Clear search"
        >

            <X size={14} />

        </motion.button>

    )}

</div>


                        <div
                            className="
                                grid
                                grid-cols-2
                                gap-3
                                lg:w-[360px]
                            "
                        >

                            <Select
                                value={roleFilter}
                                onChange={(event) =>
                                    setRoleFilter(
                                        event.target.value
                                    )
                                }
                            >

                                <option value="ALL">
                                    All Roles
                                </option>

                                <option value="ADMIN">
                                    Administrators
                                </option>

                                <option value="OPERATOR">
                                    Operators
                                </option>

                                <option value="VIEWER">
                                    Viewers
                                </option>

                            </Select>


                            <Select
                                value={statusFilter}
                                onChange={(event) =>
                                    setStatusFilter(
                                        event.target.value
                                    )
                                }
                            >

                                <option value="ALL">
                                    All Status
                                </option>

                                <option value="ACTIVE">
                                    Active
                                </option>

                                <option value="DISABLED">
                                    Disabled
                                </option>

                            </Select>

                        </div>

                    </div>


                    {/* TABLE */}

                    <div
                        className="
                            overflow-x-auto
                        "
                    >

                        <table
                            className="
                                w-full
                                min-w-[900px]
                            "
                        >

                            <thead>

                                <tr
                                    className="
                                        border-b
                                        border-white/[0.06]
                                        text-left
                                    "
                                >

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-[9px]
                                            font-bold
                                            uppercase
                                            tracking-[0.25em]
                                            text-gray-600
                                        "
                                    >
                                        Operator
                                    </th>

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-[9px]
                                            font-bold
                                            uppercase
                                            tracking-[0.25em]
                                            text-gray-600
                                        "
                                    >
                                        Role
                                    </th>

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-[9px]
                                            font-bold
                                            uppercase
                                            tracking-[0.25em]
                                            text-gray-600
                                        "
                                    >
                                        Status
                                    </th>

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-[9px]
                                            font-bold
                                            uppercase
                                            tracking-[0.25em]
                                            text-gray-600
                                        "
                                    >
                                        Created
                                    </th>

                                    <th
                                        className="
                                            w-20
                                            px-6
                                            py-4
                                            text-right
                                            text-[9px]
                                            font-bold
                                            uppercase
                                            tracking-[0.25em]
                                            text-gray-600
                                        "
                                    >
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan={5}
                                            className="
                                                px-6
                                                py-20
                                                text-center
                                            "
                                        >

                                            <div
                                                className="
                                                    mx-auto
                                                    h-8
                                                    w-8
                                                    animate-spin
                                                    rounded-full
                                                    border-2
                                                    border-white/10
                                                    border-t-[#D4AF37]
                                                "
                                            />

                                            <p
                                                className="
                                                    mt-4
                                                    text-xs
                                                    uppercase
                                                    tracking-[0.2em]
                                                    text-gray-600
                                                "
                                            >
                                                Loading operators
                                            </p>

                                        </td>

                                    </tr>

                                ) : filteredUsers.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={5}
                                            className="
                                                px-6
                                                py-20
                                                text-center
                                            "
                                        >

                                            <UsersIcon
                                                size={32}
                                                className="
                                                    mx-auto
                                                    mb-4
                                                    text-gray-700
                                                "
                                            />

                                            <p
                                                className="
                                                    text-sm
                                                    text-gray-500
                                                "
                                            >
                                                No operators found
                                            </p>

                                        </td>

                                    </tr>

                                ) : (

                                    filteredUsers.map(
                                        (user, index) => (

                                            <motion.tr
                                                key={user.id}
                                                initial={{
                                                    opacity: 0,
                                                    y: 8
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0
                                                }}
                                                transition={{
                                                    delay:
                                                        index *
                                                        0.025,
                                                    duration:
                                                        0.3
                                                }}
                                                className="
                                                    group
                                                    border-b
                                                    border-white/[0.045]
                                                    transition-colors
                                                    hover:bg-white/[0.025]
                                                "
                                            >

                                                {/* USER */}

                                                <td
                                                    className="
                                                        px-6
                                                        py-5
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            flex
                                                            items-center
                                                            gap-4
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                flex
                                                                h-10
                                                                w-10
                                                                shrink-0
                                                                items-center
                                                                justify-center
                                                                rounded-2xl
                                                                border
                                                                border-white/[0.07]
                                                                bg-white/[0.04]
                                                                text-sm
                                                                font-semibold
                                                                uppercase
                                                                text-gray-300
                                                            "
                                                        >
                                                            {(
                                                                user.username ||
                                                                "U"
                                                            )
                                                                .charAt(
                                                                    0
                                                                )
                                                                .toUpperCase()}
                                                        </div>

                                                        <div>

                                                            <p
                                                                className="
                                                                    font-semibold
                                                                    text-white
                                                                "
                                                            >
                                                                {user.username}
                                                            </p>

                                                            <p
                                                                className="
                                                                    mt-1
                                                                    flex
                                                                    items-center
                                                                    gap-1.5
                                                                    text-xs
                                                                    text-gray-600
                                                                "
                                                            >

                                                                <Mail
                                                                    size={11}
                                                                />

                                                                {user.email}

                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* ROLE */}

                                                <td
                                                    className="
                                                        px-6
                                                        py-5
                                                    "
                                                >
                                                    <RoleBadge
                                                        role={
                                                            user.role
                                                        }
                                                    />
                                                </td>


                                                {/* STATUS */}

                                                <td
                                                    className="
                                                        px-6
                                                        py-5
                                                    "
                                                >
                                                    <StatusBadge
                                                        enabled={
                                                            user.enabled
                                                        }
                                                    />
                                                </td>


                                                {/* CREATED */}

                                                <td
                                                    className="
                                                        px-6
                                                        py-5
                                                        text-sm
                                                        text-gray-500
                                                    "
                                                >

                                                    {user.createdAt
                                                        ? new Date(
                                                            user.createdAt
                                                        ).toLocaleDateString(
                                                            "en-GB",
                                                            {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric"
                                                            }
                                                        )
                                                        : "—"}

                                                </td>


                                                {/* ACTION */}

                                                <td
                                                    className="
                                                        px-6
                                                        py-5
                                                        text-right
                                                    "
                                                >

                                                    <button
                                                        type="button"
                                                        disabled={busy}
                                                        onMouseDown={(
                                                            event
                                                        ) =>
                                                            openActionMenu(
                                                                event,
                                                                user
                                                            )
                                                        }
                                                        className="
                                                            inline-flex
                                                            h-9
                                                            w-9
                                                            items-center
                                                            justify-center
                                                            rounded-xl
                                                            text-gray-500
                                                            transition-all
                                                            duration-200
                                                            hover:bg-white/[0.08]
                                                            hover:text-white
                                                            hover:scale-110
                                                            active:scale-95
                                                        "
                                                    >

                                                        <MoreVertical
                                                            size={18}
                                                        />

                                                    </button>

                                                </td>

                                            </motion.tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* TABLE FOOTER */}

                    {!loading && (

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                border-t
                                border-white/[0.06]
                                px-6
                                py-4
                                text-[10px]
                                uppercase
                                tracking-[0.15em]
                                text-gray-600
                            "
                        >

                            <span>
                                {filteredUsers.length}
                                {" / "}
                                {users.length}
                                {" operators"}
                            </span>

                            <span>
                                Admin Control
                            </span>

                        </div>

                    )}

                </GlassCard>

            </motion.div>

            {/* =============================================
                PORTALED ACTION MENU
            ============================================= */}

            {openMenu !== null &&
                createPortal(

                    <>
                        {/* OUTSIDE CLICK LAYER */}

                        <div
                            className="
                                fixed
                                inset-0
                                z-[99990]
                            "
                            onMouseDown={() => {
                                setOpenMenu(null);
                            }}
                        />


                        {/* ACTION MENU */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.92,
                                y: -6
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.94,
                                y: -6
                            }}
                            transition={{
                                duration: 0.16,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            style={{
                                position: "fixed",
                                top: menuPosition.top,
                                left: menuPosition.left,
                                width: 240,
                                maxHeight:
                                    "calc(100vh - 24px)"
                            }}
                            onMouseDown={(event) => {
                                event.stopPropagation();
                            }}
                            className="
                                z-[99999]
                                overflow-y-auto
                                overflow-x-hidden
                                rounded-2xl
                                border
                                border-[#D4AF37]/35
                                bg-[#101214]/98
                                p-1.5
                                shadow-[0_30px_120px_rgba(0,0,0,.9)]
                                backdrop-blur-3xl
                            "
                        >

                            {/* GOLD TOP LINE */}

                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    left-5
                                    right-5
                                    top-0
                                    h-px
                                    bg-gradient-to-r
                                    from-transparent
                                    via-[#D4AF37]
                                    to-transparent
                                "
                            />


                            {/* EDIT PROFILE */}

                            <button
                                type="button"
                                onMouseDown={(event) => {

                                    event.stopPropagation();

                                    const user =
                                        users.find(
                                            (item) =>
                                                item.id ===
                                                openMenu
                                        );

                                    if (user) {
                                        openProfile(user);
                                    }

                                }}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-3
                                    py-3
                                    text-left
                                    text-sm
                                    text-gray-300
                                    transition-all
                                    hover:bg-white/[0.07]
                                    hover:text-white
                                "
                            >

                                <Edit3
                                    size={16}
                                    className="text-gray-500"
                                />

                                <span>
                                    Edit Profile
                                </span>

                            </button>


                            {/* CHANGE ROLE */}

                            <button
                                type="button"
                                onMouseDown={(event) => {

                                    event.stopPropagation();

                                    const user =
                                        users.find(
                                            (item) =>
                                                item.id ===
                                                openMenu
                                        );

                                    if (user) {
                                        openRole(user);
                                    }

                                }}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-3
                                    py-3
                                    text-left
                                    text-sm
                                    text-gray-300
                                    transition-all
                                    hover:bg-white/[0.07]
                                    hover:text-white
                                "
                            >

                                <Shield
                                    size={16}
                                    className="text-purple-400"
                                />

                                <span>
                                    Change Role
                                </span>

                            </button>


                            {/* RESET PASSWORD */}

                            <button
                                type="button"
                                onMouseDown={(event) => {

                                    event.stopPropagation();

                                    const user =
                                        users.find(
                                            (item) =>
                                                item.id ===
                                                openMenu
                                        );

                                    if (user) {
                                        openPassword(user);
                                    }

                                }}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-3
                                    py-3
                                    text-left
                                    text-sm
                                    text-gray-300
                                    transition-all
                                    hover:bg-white/[0.07]
                                    hover:text-white
                                "
                            >

                                <KeyRound
                                    size={16}
                                    className="text-cyan-400"
                                />

                                <span>
                                    Reset Password
                                </span>

                            </button>


                            {/* DIVIDER */}

                            <div
                                className="
                                    my-1.5
                                    h-px
                                    bg-white/[0.07]
                                "
                            />


                            {/* ENABLE / DISABLE */}

                            <button
                                type="button"
                                onMouseDown={(event) => {

                                    event.stopPropagation();

                                    const user =
                                        users.find(
                                            (item) =>
                                                item.id ===
                                                openMenu
                                        );

                                    if (user) {
                                        toggleStatus(user);
                                    }

                                }}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-3
                                    py-3
                                    text-left
                                    text-sm
                                    text-gray-300
                                    transition-all
                                    hover:bg-white/[0.07]
                                    hover:text-white
                                "
                            >

                                {users.find(
                                    (item) =>
                                        item.id === openMenu
                                )?.enabled ? (

                                    <UserX
                                        size={16}
                                        className="text-amber-400"
                                    />

                                ) : (

                                    <UserCheck
                                        size={16}
                                        className="text-emerald-400"
                                    />

                                )}

                                <span>

                                    {users.find(
                                        (item) =>
                                            item.id === openMenu
                                    )?.enabled
                                        ? "Disable Account"
                                        : "Enable Account"}

                                </span>

                            </button>


                            {/* DIVIDER */}

                            <div
                                className="
                                    my-1.5
                                    h-px
                                    bg-white/[0.07]
                                "
                            />


                            {/* DELETE */}

                            <button
                                type="button"
                                onMouseDown={(event) => {

                                    event.stopPropagation();

                                    const user =
                                        users.find(
                                            (item) =>
                                                item.id ===
                                                openMenu
                                        );

                                    if (user) {
                                        openDelete(user);
                                    }

                                }}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-3
                                    py-3
                                    text-left
                                    text-sm
                                    text-red-400
                                    transition-all
                                    hover:bg-red-400/10
                                "
                            >

                                <Trash2 size={16} />

                                <span>
                                    Delete Operator
                                </span>

                            </button>

                        </motion.div>

                    </>,

                    document.body
                )}


            {/* =============================================
                MODALS
            ============================================= */}

            <AnimatePresence>

                {/* CREATE USER */}

                {modal === "create" && (

                    <Modal
                        title="Add Operator"
                        eyebrow="Personnel Registry"
                        onClose={closeModal}
                    >

                        <form
                            onSubmit={createUser}
                            className="space-y-5 p-6"
                        >

                            <Input
                                label="Username"
                                icon={User}
                                value={
                                    createForm.username
                                }
                                onChange={(event) =>
                                    setCreateForm(
                                        (previous) => ({
                                            ...previous,
                                            username:
                                                event.target.value
                                        })
                                    )
                                }
                                required
                            />

                            <Input
                                label="Email"
                                icon={Mail}
                                type="email"
                                value={
                                    createForm.email
                                }
                                onChange={(event) =>
                                    setCreateForm(
                                        (previous) => ({
                                            ...previous,
                                            email:
                                                event.target.value
                                        })
                                    )
                                }
                                required
                            />

                            <Input
                                label="Password"
                                icon={KeyRound}
                                type="password"
                                value={
                                    createForm.password
                                }
                                onChange={(event) =>
                                    setCreateForm(
                                        (previous) => ({
                                            ...previous,
                                            password:
                                                event.target.value
                                        })
                                    )
                                }
                                minLength={8}
                                required
                            />

                            <Select
                                label="Role"
                                value={
                                    createForm.role
                                }
                                onChange={(event) =>
                                    setCreateForm(
                                        (previous) => ({
                                            ...previous,
                                            role:
                                                event.target.value
                                        })
                                    )
                                }
                            >

                                <option value="VIEWER">
                                    Viewer
                                </option>

                                <option value="OPERATOR">
                                    Operator
                                </option>

                                <option value="ADMIN">
                                    Administrator
                                </option>

                            </Select>


                            <div className="flex gap-3 pt-2">

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="
                                        flex-1
                                        rounded-2xl
                                        border
                                        border-white/[0.08]
                                        bg-white/[0.035]
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-gray-400
                                        transition
                                        hover:bg-white/[0.06]
                                        hover:text-white
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={busy}
                                    className="
                                        flex-1
                                        rounded-2xl
                                        bg-[#D4AF37]
                                        py-3
                                        text-sm
                                        font-bold
                                        text-black
                                        transition
                                        hover:brightness-110
                                        disabled:opacity-50
                                    "
                                >
                                    {busy
                                        ? "Creating..."
                                        : "Create Operator"}
                                </button>

                            </div>

                        </form>

                    </Modal>

                )}


                {/* EDIT PROFILE */}

                {modal === "profile" && (

                    <Modal
                        title="Edit Profile"
                        eyebrow="Operator Configuration"
                        onClose={closeModal}
                    >

                        <form
                            onSubmit={updateProfile}
                            className="space-y-5 p-6"
                        >

                            <Input
                                label="Username"
                                icon={User}
                                value={
                                    profileForm.username
                                }
                                onChange={(event) =>
                                    setProfileForm(
                                        (previous) => ({
                                            ...previous,
                                            username:
                                                event.target.value
                                        })
                                    )
                                }
                                required
                            />

                            <Input
                                label="Email"
                                icon={Mail}
                                type="email"
                                value={
                                    profileForm.email
                                }
                                onChange={(event) =>
                                    setProfileForm(
                                        (previous) => ({
                                            ...previous,
                                            email:
                                                event.target.value
                                        })
                                    )
                                }
                                required
                            />

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-white/[0.06]
                                    bg-white/[0.025]
                                    p-4
                                "
                            >

                                <p
                                    className="
                                        text-[9px]
                                        uppercase
                                        tracking-[0.2em]
                                        text-gray-600
                                    "
                                >
                                    Current Role
                                </p>

                                <div className="mt-3">

                                    <RoleBadge
                                        role={
                                            selectedUser?.role
                                        }
                                    />

                                </div>

                            </div>


                            <div className="flex gap-3 pt-2">

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="
                                        flex-1
                                        rounded-2xl
                                        border
                                        border-white/[0.08]
                                        bg-white/[0.035]
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-gray-400
                                        transition
                                        hover:bg-white/[0.06]
                                        hover:text-white
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={busy}
                                    className="
                                        flex-1
                                        rounded-2xl
                                        bg-[#D4AF37]
                                        py-3
                                        text-sm
                                        font-bold
                                        text-black
                                        transition
                                        hover:brightness-110
                                        disabled:opacity-50
                                    "
                                >
                                    {busy
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>

                            </div>

                        </form>

                    </Modal>

                )}


                {/* CHANGE ROLE */}

                {modal === "role" && (

                    <Modal
                        title="Change Role"
                        eyebrow="Access Control"
                        onClose={closeModal}
                    >

                        <div className="space-y-5 p-6">

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-white/[0.06]
                                    bg-white/[0.025]
                                    p-4
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-white
                                    "
                                >
                                    {selectedUser?.username}
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-gray-600
                                    "
                                >
                                    {selectedUser?.email}
                                </p>

                            </div>


                            <Select
                                label="System Role"
                                value={roleForm}
                                onChange={(event) =>
                                    setRoleForm(
                                        event.target.value
                                    )
                                }
                            >

                                <option value="VIEWER">
                                    Viewer
                                </option>

                                <option value="OPERATOR">
                                    Operator
                                </option>

                                <option value="ADMIN">
                                    Administrator
                                </option>

                            </Select>


                            <div className="flex gap-3 pt-2">

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="
                                        flex-1
                                        rounded-2xl
                                        border
                                        border-white/[0.08]
                                        bg-white/[0.035]
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-gray-400
                                        transition
                                        hover:bg-white/[0.06]
                                        hover:text-white
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    disabled={busy}
                                    onClick={updateRole}
                                    className="
                                        flex-1
                                        rounded-2xl
                                        bg-[#D4AF37]
                                        py-3
                                        text-sm
                                        font-bold
                                        text-black
                                        transition
                                        hover:brightness-110
                                        disabled:opacity-50
                                    "
                                >
                                    {busy
                                        ? "Updating..."
                                        : "Update Role"}
                                </button>

                            </div>

                        </div>

                    </Modal>

                )}


                {/* RESET PASSWORD */}

                {modal === "password" && (

                    <Modal
                        title="Reset Password"
                        eyebrow="Account Security"
                        onClose={closeModal}
                    >

                        <form
                            onSubmit={updatePassword}
                            className="space-y-5 p-6"
                        >

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-amber-400/10
                                    bg-amber-400/[0.04]
                                    p-4
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-white
                                    "
                                >
                                    {selectedUser?.username}
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-gray-600
                                    "
                                >
                                    Administrator password reset
                                </p>

                            </div>


                            <Input
                                label="New Password"
                                icon={KeyRound}
                                type="password"
                                value={
                                    passwordForm.password
                                }
                                onChange={(event) =>
                                    setPasswordForm(
                                        (previous) => ({
                                            ...previous,
                                            password:
                                                event.target.value
                                        })
                                    )
                                }
                                minLength={8}
                                required
                            />

                            <Input
                                label="Confirm Password"
                                icon={KeyRound}
                                type="password"
                                value={
                                    passwordForm.confirmPassword
                                }
                                onChange={(event) =>
                                    setPasswordForm(
                                        (previous) => ({
                                            ...previous,
                                            confirmPassword:
                                                event.target.value
                                        })
                                    )
                                }
                                minLength={8}
                                required
                            />


                            <div className="flex gap-3 pt-2">

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="
                                        flex-1
                                        rounded-2xl
                                        border
                                        border-white/[0.08]
                                        bg-white/[0.035]
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-gray-400
                                        transition
                                        hover:bg-white/[0.06]
                                        hover:text-white
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={busy}
                                    className="
                                        flex-1
                                        rounded-2xl
                                        bg-[#D4AF37]
                                        py-3
                                        text-sm
                                        font-bold
                                        text-black
                                        transition
                                        hover:brightness-110
                                        disabled:opacity-50
                                    "
                                >
                                    {busy
                                        ? "Updating..."
                                        : "Reset Password"}
                                </button>

                            </div>

                        </form>

                    </Modal>

                )}


                {/* DELETE CONFIRMATION */}

                {modal === "delete" && (

                    <Modal
                        title="Delete Operator"
                        eyebrow="Danger Zone"
                        onClose={closeModal}
                    >

                        <div className="p-6">

                            <div
                                className="
                                    flex
                                    items-start
                                    gap-4
                                    rounded-2xl
                                    border
                                    border-red-400/15
                                    bg-red-400/[0.05]
                                    p-5
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-red-400/10
                                        text-red-400
                                    "
                                >

                                    <AlertTriangle
                                        size={21}
                                    />

                                </div>

                                <div>

                                    <p
                                        className="
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        Delete{" "}
                                        {selectedUser?.username}?
                                    </p>

                                    <p
                                        className="
                                            mt-2
                                            text-sm
                                            leading-6
                                            text-gray-500
                                        "
                                    >
                                        This permanently removes
                                        the operator account and
                                        cannot be undone.
                                    </p>

                                </div>

                            </div>


                            <div
                                className="
                                    mt-6
                                    flex
                                    gap-3
                                "
                            >

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="
                                        flex-1
                                        rounded-2xl
                                        border
                                        border-white/[0.08]
                                        bg-white/[0.035]
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-gray-400
                                        transition
                                        hover:bg-white/[0.06]
                                        hover:text-white
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    disabled={busy}
                                    onClick={deleteUser}
                                    className="
                                        flex-1
                                        rounded-2xl
                                        bg-red-500
                                        py-3
                                        text-sm
                                        font-bold
                                        text-white
                                        transition
                                        hover:bg-red-400
                                        disabled:opacity-50
                                    "
                                >
                                    {busy
                                        ? "Deleting..."
                                        : "Delete Operator"}
                                </button>

                            </div>

                        </div>

                    </Modal>

                )}

            </AnimatePresence>


            {/* =============================================
                TOAST
            ============================================= */}

            <AnimatePresence>

                {toast && (

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                            scale: 0.95
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1
                        }}
                        exit={{
                            opacity: 0,
                            y: 10,
                            scale: 0.95
                        }}
                        className="
                            fixed
                            bottom-6
                            right-6
                            z-[100001]
                            flex
                            max-w-sm
                            items-center
                            gap-3
                            rounded-2xl
                            border
                            border-white/[0.1]
                            bg-[#111315]/95
                            px-4
                            py-3
                            shadow-[0_20px_60px_rgba(0,0,0,.6)]
                            backdrop-blur-2xl
                        "
                    >

                        <div
                            className={`
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-xl
                                ${toast.type ===
                                    "error"
                                    ? "bg-red-400/10 text-red-400"
                                    : "bg-emerald-400/10 text-emerald-400"
                                }
                            `}
                        >

                            {toast.type ===
                                "error" ? (

                                <AlertTriangle
                                    size={16}
                                />

                            ) : (

                                <Check
                                    size={16}
                                />

                            )}

                        </div>

                        <p
                            className="
                                text-sm
                                font-medium
                                text-white
                            "
                        >
                            {toast.message}
                        </p>

                    </motion.div>

                )}

            </AnimatePresence>

        </motion.div>
    );
}


export default Users;