import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { instructorInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import {
    studentsColumns,
    citiesColumns,
    studentsWithInstructorRequestColumns,
    instructorsColumns
} from "./datatablesource";
import NewInstructor from "./pages/newIntructor/NewInstructor";

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
                        <Route
                            path="instructors/new"
                            element={
                                <ProtectedRoute>
                                    <NewInstructor inputs={instructorInputs} title="Add New Instructor" />
                                </ProtectedRoute>
                            }
                        />
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
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
