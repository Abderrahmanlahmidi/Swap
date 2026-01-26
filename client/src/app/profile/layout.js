'use client';

import ProtectedRoute from "../components/auth/ProtectedRoute";
import ProfilePage from "./page";

export default function ProfileLayout({ children }) {
    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    );
}
