import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, isGetUserLoading, isAuthenticated } = useUser();

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated && !isGetUserLoading) navigate("/login", { replace: true });
    },
    [isGetUserLoading, isAuthenticated, navigate]
  );

  if (isGetUserLoading) return <Spinner />;

  if (isAuthenticated) return children;
}
