import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import DroneList from "../pages/DroneList";
import DroneDetails from "../pages/DroneDetails";
import Users from "../pages/Users";
import Settings from "../pages/Settings/Settings";

import MissionControl from "../pages/MissionControl/MissionControl";
import Analytics from "../pages/Analytics/Analytics";
import Reports from "../pages/Reports/Reports";

import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/ProtectedRoute";

import DashboardLayout from "../layouts/DashboardLayout";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* PUBLIC */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* MISSION CONTROL */}

                <Route
                    path="/mission-control"
                    element={
                        <ProtectedRoute>
                            <MissionControl />
                        </ProtectedRoute>
                    }
                />

                {/* DASHBOARD */}

                <Route
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/drones"
                        element={<DroneList />}
                    />

                    <Route
                        path="/drones/:id"
                        element={<DroneDetails />}
                    />

                    <Route
                        path="/analytics"
                        element={<Analytics />}
                    />

                    <Route
                        path="/reports"
                        element={<Reports />}
                    />

                    <Route
                        path="/users"
                        element={<Users />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings />}
                    />

                </Route>

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;