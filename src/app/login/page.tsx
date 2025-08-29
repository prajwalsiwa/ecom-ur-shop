"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn, Github } from "lucide-react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/"; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      password,
      name,
    });

    if (result?.ok) {
      router.replace(from);
       toast.success("Login successful!");
    } else {
          toast.error("Login failed. Please check your credentials.");
    }
  };

 
  const handleOAuthSignIn = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: from }); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Yatri Store</h1>
          <p className="text-gray-500">Log in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Username</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center cursor-pointer bg-gray-800 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign in
            </button>
          </div>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="space-y-2">
          <button
            onClick={() => handleOAuthSignIn("google")}
            className="w-full flex justify-center cursor-pointer py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600"
          >
            Sign in with Google
          </button>

          <button
            onClick={() => handleOAuthSignIn("github")}
            className="w-full gap-2 flex justify-center cursor-pointer py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900"
          >
            <Github size={20} color="black" />
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
