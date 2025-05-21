
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const { user } = useAuth();


  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen flex flex-col bg-hotel-light-bg">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-hotel-blue mb-6">Mi Perfil</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="flex flex-col items-center pb-2">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="bg-hotel-blue text-white text-xl">
                    {user ? getInitials(user.name) : "?"}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-gray-500">{user?.email}</p>
              </CardHeader>
              <CardContent>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">ID de Usuario</h3>
                    <p className="text-sm">{user?.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Miembro desde</h3>
                    <p className="text-sm">Mayo 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold">Información Personal</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Nombre completo</h3>
                    <p>{user?.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Correo electrónico</h3>
                    <p>{user?.email}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Preferencias</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Idioma</h4>
                      <p>Español</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Moneda</h4>
                      <p>USD ($)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;