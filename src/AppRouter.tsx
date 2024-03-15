// AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllUsersPage from "@/components/AllUsersPage";
import SavedUsersGrid from "./components/SavedUsersGrid";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AllUsersPage />} />
                <Route path="/saved" element={<SavedUsersGrid />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
