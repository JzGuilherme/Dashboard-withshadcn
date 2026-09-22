import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import Page from "./app/page/Page";
import { ThemeProvider} from "@/components/theme-provider";
import AuthPage from "./app/auth/AuthPage";

export default function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  );
}

function AppRoutes() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("workspace-session") === "authenticated",
  )

  function handleAuthenticated() {
    setIsAuthenticated(true)
    navigate("/dashboard")
  }

  function handleSignOut() {
    localStorage.removeItem("workspace-session")
    setIsAuthenticated(false)
    navigate("/login")
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <AuthPage onAuthenticated={handleAuthenticated} />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Page onSignOut={handleSignOut} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  )
}