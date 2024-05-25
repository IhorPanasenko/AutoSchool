import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { warehouseInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import {
    warehousesColumns,
    roomColumns,
    userColumns,
    reservationsColumns,
    studentsColumns,
    citiesColumns,
    studentsWithInstructorRequestColumns,
    instructorsColumns
} from "./datatablesource";
import NewWarehouse from "./pages/newWarehouse/NewWarehouse";

function App() {
    const { darkMode } = useContext(DarkModeContext);

    const ProtectedRoute = ({ children }) => {
        const { user } = useContext(AuthContext);

        if (!user) {
            return <Navigate to="/login" />;
        }

        return children;
    };
    return (
        <div className={darkMode ? "app dark" : "app"}>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route
                            index
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="login" element={<Login />} />
                        <Route path="users">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List columns={userColumns} />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="new"
                                element={
                                    <ProtectedRoute>
                                        <New inputs={userInputs} title="Add New User" />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                        <Route path="students">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List columns={studentsColumns} />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                        <Route path="instructors">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List columns={instructorsColumns} />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                        <Route path="cities">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List columns={citiesColumns} />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>

                        <Route path="students/requests">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List columns={studentsWithInstructorRequestColumns} />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                        <Route path="warehouses">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List columns={warehousesColumns} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path=":warehouseId"
                                element={
                                    <ProtectedRoute>
                                        <Single />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <ProtectedRoute>
                                        <NewWarehouse inputs={warehouseInputs} title="Add New Warehouse" />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                        <Route path="reservations">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List columns={reservationsColumns} />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
