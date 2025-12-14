import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

/* =======================
   VALIDATION SCHEMA
======================= */
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterForm = z.infer<typeof schema>;

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await API.post("/auth/register", data);
      navigate("/login");
    } catch (err: any) {
      alert(
        err?.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Register
        </h2>

        {/* NAME */}
        <input
          {...register("name")}
          placeholder="Name"
          className="border p-2 w-full mb-1"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mb-2">
            {errors.name.message}
          </p>
        )}

        {/* EMAIL */}
        <input
          {...register("email")}
          placeholder="Email"
          className="border p-2 w-full mb-1"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">
            {errors.email.message}
          </p>
        )}

        {/* PASSWORD */}
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="border p-2 w-full mb-1"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-3">
            {errors.password.message}
          </p>
        )}

        {/* SUBMIT */}
        <button
          disabled={isSubmitting}
          className="bg-green-600 text-white w-full py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
