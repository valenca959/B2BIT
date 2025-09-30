import { useEffect, useState } from 'react';
import { mockGetProfile } from '../services/apiMock';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Profile {
  name: string;
  email: string;
  profile_picture_url: string;
}

const InfoField = ({ label, value }: { label: string, value: string }) => (
    <div className="text-left">
        <label className="block text-sm font-bold text-gray-500 mb-1">{label}</label>
        <div className="bg-gray-100 p-3 rounded-md w-full">
            <p className="text-gray-800">{value}</p>
        </div>
    </div>
);

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockGetProfile()
      .then(data => setProfile(data))
      .catch(() => handleLogout())
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  if (loading || !profile) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-xl">Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
        <header className="flex w-full items-center justify-end bg-white p-4 px-6 shadow-md">
            <Button onClick={handleLogout} className="bg-b2bit-primary text-white hover:bg-b2bit-hover">
                Logout
            </Button>
        </header>

        <main className="flex flex-grow items-center justify-center p-4">
            <Card className="w-full max-w-md rounded-xl p-8 shadow-lg">
                <CardContent className="p-0">
                    <div className="text-center mb-6">
                        <span className="text-sm font-semibold text-gray-600">Profile picture</span>
                        <img 
                            src={profile.profile_picture_url} 
                            alt="Profile" 
                            className="mx-auto mt-2 h-20 w-20 rounded-full"
                        />
                    </div>
                    
                    <div className="space-y-4">
                        <InfoField label="Your Name" value={profile.name} />
                        <InfoField label="Your E-mail" value={profile.email} />
                    </div>
                </CardContent>
            </Card>
        </main>
    </div>
  );
}