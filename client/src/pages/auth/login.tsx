import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { AxiosResponse } from "axios";
import { useAuth } from "@/context/AuthContext";
import { Helmet } from "react-helmet";

interface LoginResponse {
  token?: string;
  user?: {
    email: string;
    firstName: string;
    lastName: string;
    groupId: number;
  };
  error?: string;
  errors?: { msg: string }[];
}

export default function Login() {
  const { setAuthData } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  function notification(type: "error" | "success", message: string) {
    if (type === "error") {
      return toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "dark",
      });
    } else if (type === "success") {
      return toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "dark",
      });
    }
  }

  async function handleLogin() {
    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), 1000);

    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(
        `/api/v1/auth/login`,
        { email, password }
      );
      if (response.data.token && response.data.user) {
        setAuthData({
          token: response.data.token,
          email: response.data.user.email,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          groupId: response.data.user.groupId,
        });
        notification("success", "Login successful!");
      } else if (response.data.errors) {
        response.data.errors.forEach((error) => {
          notification("error", error.msg);
        });
      } else {
        notification("error", response.data.error || "Login failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.errors) {
          error.response.data.errors.forEach((err: { msg: string }) => {
            notification("error", err.msg);
          });
        } else {
          notification("error", error.response.data.error || "Login failed");
        }
      } else {
        notification("error", "Login failed");
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Task-Manager | Login</title>
      </Helmet>
      <ToastContainer theme="dark" />
      <div className="flex justify-center items-center min-h-screen">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@domain.com"
                  required
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
              </div>
              <Button
                onClick={handleLogin}
                type="submit"
                className="w-full"
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Please wait..." : "Login"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline">
                Sign up
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
