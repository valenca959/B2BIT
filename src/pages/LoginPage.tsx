// src/pages/LoginPage.tsx (VERSÃO COM O LOGO ATUALIZADO)

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { mockLogin } from "../services/apiMock";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import logoImage from '../assets/b2bit.png';

const loginSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await mockLogin(values.email, values.password);
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      navigate("/profile", { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Falha na autenticação.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 font-sans">
      <Card className="w-[380px] rounded-xl p-10 text-center shadow-lg">
        <CardContent className="p-0">

          <img
            src={logoImage}
            alt="B2B IT Logo"
            className="mx-auto mb-8 w-40"
          />

          {error && (
            <Alert variant="destructive" className="mb-4 text-left">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
            <div className="space-y-1">
              <Label htmlFor="email" className="font-bold">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="@gmail.com"
                {...register("email")}
                className="bg-gray-100"
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="************"
                {...register("password")}
                className="bg-gray-100"
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-b2bit-primary text-lg hover:bg-b2bit-hover" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}