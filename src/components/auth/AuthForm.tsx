"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AuthFormProps {
  initialMode?: "login" | "register";
}

export default function AuthForm({ initialMode = "login" }: AuthFormProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would handle authentication
    // For now, just redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <Card className="w-full max-w-md bg-background border shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          249 Market
        </CardTitle>
        <CardDescription className="text-center">
          {mode === "login"
            ? "Sign in to your account"
            : "Create a new account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={mode}
          onValueChange={(value) => setMode(value as "login" | "register")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            {mode === "register" && (
              <div className="mb-4">
                <Label htmlFor="role">Register as</Label>
                <Select
                  value={role}
                  onValueChange={(value) =>
                    setRole(value as "customer" | "vendor")
                  }
                >
                  <SelectTrigger id="role" className="w-full mt-1">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-4">
              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" required />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {mode === "login" && (
                    <Button
                      variant="link"
                      className="px-0 font-normal h-auto"
                      type="button"
                    >
                      Forgot password?
                    </Button>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              {mode === "register" && role === "vendor" && (
                <div className="space-y-2">
                  <Label htmlFor="marketName">Market Name</Label>
                  <Input
                    id="marketName"
                    placeholder="Enter your market name"
                    required
                  />
                </div>
              )}
            </div>

            <Button className="w-full mt-6" type="submit">
              {mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground text-center">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <Button
            variant="link"
            className="p-0 h-auto font-normal"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
