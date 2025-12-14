import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Props = {
  children: JSX.Element;
};

export default function ProtectedRoute({ children }: Props) {
  const { data, isLoading, isError } = useAuth();

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
