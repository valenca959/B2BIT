import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {


  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4 sm:p-6">
      
      <Card className="w-full max-w-sm rounded-xl shadow-xl p-8"> 
        <CardContent className="flex flex-col items-center p-0">
          
          <h1 className="text-4xl font-bold mb-8 mt-4">
            <span className="text-b2bit-primary">b2b</span>
            <span className="text-b2bit-secondary">it</span>
          </h1>

          <form className="w-full space-y-4">
            
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="@gmail.com"
                className="bg-input-background border-none focus:ring-b2bit-primary" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="************"
                className="bg-input-background border-none focus:ring-b2bit-primary"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-b2bit-primary hover:bg-blue-900 text-white font-semibold py-2 mt-6"
            >
              Sign In
            </Button>

          </form>
          
        </CardContent>
      </Card>
      
    </div>
  );
}