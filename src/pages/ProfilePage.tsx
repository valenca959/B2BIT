import { useEffect, useState } from 'react';
import { mockGetProfile } from '@/services/apiMock';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';

interface Profile {
  name: string;
  email: string;
  profile_picture_url: string;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockGetProfile()
      .then(data => setProfile(data))
      .catch(error => {
        console.error("Erro ao carregar perfil:", error);
        handleLogout();
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login', { replace: true });
  };

  if (loading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <p className="text-xl text-b2bit-primary">Buscando perfil...</p>
        </div>
    );
  }

  if (!profile) {
    return (
        <div className="flex h-screen items-center justify-center">
            <p className="text-xl text-destructive">Não foi possível carregar o perfil.</p>
            <Button onClick={handleLogout} className="ml-4 bg-b2bit-primary">Voltar para Login</Button>
        </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
        
        <Button 
            onClick={handleLogout} 
            className="absolute top-4 right-4 bg-b2bit-primary hover:bg-blue-900"
            variant="default"
        >
            <LogOut className="mr-2 h-4 w-4" /> 
            Logout
        </Button>

        <Card className="w-full max-w-md rounded-xl shadow-xl p-8 text-center">
            <CardContent className="p-0 space-y-4">
                
                <img 
                    src={profile.profile_picture_url} 
                    alt="Profile Picture" 
                    className="h-32 w-32 rounded-full mx-auto mb-4 border-4 border-b2bit-primary shadow-md"
                />

                <h2 className="text-3xl font-bold text-b2bit-primary">{profile.name}</h2>
                
                <p className="text-gray-600 text-lg">{profile.email}</p>
                
                <p className="text-sm text-gray-400 mt-6">
                    Bem-vindo(a) à sua página de perfil.
                </p>

            </CardContent>
        </Card>
    </div>
  );
}