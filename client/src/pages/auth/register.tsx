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
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

interface RegisterResponse {
  error?: string;
  errors?: { msg: string }[];
}

export default function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
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
        progress: undefined,
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
        progress: undefined,
        theme: "dark",
      });
    }
  }

  async function handleRegister() {
    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), 1000);

    try {
      const response: AxiosResponse<RegisterResponse> = await axios.post(
        `/api/v1/auth/register`,
        { firstName, lastName, email, password }
      );
      if (response.data.error) {
        notification("error", response.data.error);
      } else if (response.data.errors) {
        response.data.errors.forEach((error) => {
          notification("error", error.msg);
        });
      } else {
        notification("success", "Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.errors) {
          error.response.data.errors.forEach((err: { msg: string }) => {
            notification("error", err.msg);
          });
        } else {
          notification(
            "error",
            error.response.data.error || "Registration failed"
          );
        }
      } else {
        notification("error", "Registration failed");
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Task-Manager | Register</title>
      </Helmet>
      <ToastContainer theme="dark" />
      <div className="flex justify-center items-center min-h-screen">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    placeholder="Max"
                    required
                    value={firstName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFirstName(e.target.value)
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    placeholder="Robinson"
                    required
                    value={lastName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setLastName(e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
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
                onClick={handleRegister}
                type="submit"
                className="w-full"
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Please wait..." : "Create an account"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline">
                Sign in
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
