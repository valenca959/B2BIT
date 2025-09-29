import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { mockLogin } from "@/services/apiMock";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


const loginSchema = z.object({
  email: z.string().email("E-mail inválido. Por favor, use um formato válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type LoginFormValues = z.infer<typeof loginSchema>;


export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, register, formState } = form;
  const { errors } = formState;


  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await mockLogin(values.email, values.password);

      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);

      navigate("/profile", { replace: true });
    } catch (err: any) {
      const errorMessage = 
        err?.response?.data?.detail || 
        "Falha na autenticação. Por favor, verifique suas credenciais.";
        
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4 sm:p-6">
      
      <Card className="w-full max-w-sm rounded-xl shadow-xl p-8"> 
        <CardContent className="flex flex-col items-center p-0">
          
          <h1 className="text-4xl font-bold mb-8 mt-4">
            <span className="text-b2bit-primary">b2b</span>
            <span className="text-b2bit-secondary">it</span>
          </h1>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Erro ao Entrar</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="@gmail.com"
                {...register("email")}
                className={`bg-input-background border-none focus:ring-b2bit-primary ${errors.email ? 'ring-2 ring-destructive' : ''}`}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="************"
                {...register("password")}
                className={`bg-input-background border-none focus:ring-b2bit-primary ${errors.password ? 'ring-2 ring-destructive' : ''}`}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-b2bit-primary hover:bg-blue-900 text-white font-semibold py-2 mt-6"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Sign In"}
            </Button>

          </form>
          
        </CardContent>
      </Card>
      
    </div>
  );
}