import { useEffect, useState } from "react";

import api from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import toast from "react-hot-toast";

function Users() {

    const [users, setUsers] = useState([]);

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

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold text-white mb-8">

                User Management

            </h1>

            <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden">

                <table className="w-full">

                    <thead className="bg-slate-700">

                        <tr>

                            <th className="p-4 text-left text-white">

                                Username

                            </th>

                            <th className="p-4 text-left text-white">

                                Email

                            </th>

                            <th className="p-4 text-left text-white">

                                Role

                            </th>

                            <th className="p-4 text-left text-white">

                                Status

                            </th>

                            <th className="p-4 text-left text-white">

                                Created

                            </th>

                            <th className="p-4 text-center text-white">

                                Action

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map(user => (

                            <tr
                                key={user.id}
                                className="border-b border-slate-700 hover:bg-slate-700 transition">

                                <td className="p-4 text-white">

                                    {user.username}

                                </td>

                                <td className="p-4 text-gray-300">

                                    {user.email}

                                </td>

                                <td className="p-4">

                                    <select

                                        value={user.role}

                                        onChange={(e) => {

                                            const updatedUsers = users.map(u =>

                                                u.id === user.id

                                                    ? { ...u, role: e.target.value }

                                                    : u

                                            );

                                            setUsers(updatedUsers);

                                        }}

                                        className="bg-slate-700 text-white rounded px-3 py-2"

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

                                </td>

                                <td className="p-4">

                                    {user.enabled ? (

                                        <span className="text-green-400">

                                            Enabled

                                        </span>

                                    ) : (

                                        <span className="text-red-400">

                                            Disabled

                                        </span>

                                    )}

                                </td>

                                <td className="p-4 text-gray-300">

                                    {user.createdAt.substring(0, 10)}

                                </td>

                                <td className="p-4 text-center">

                                    <button

                                        onClick={() =>

                                            updateRole(

                                                user.id,

                                                user.role

                                            )

                                        }

                                        className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-white"

                                    >

                                        Update

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </DashboardLayout>

    );

}

export default Users;