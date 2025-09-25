import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Microscope, Leaf, Shield } from "lucide-react";

interface AuthLayoutProps {
  onAuthenticated: () => void;
}

export const AuthLayout = ({ onAuthenticated }: AuthLayoutProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-accent/10 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="bg-gradient-primary p-3 rounded-full">
              <Microscope className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="flex items-center space-x-1">
              <Leaf className="h-6 w-6 text-primary" />
              <Shield className="h-6 w-6 text-accent" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Sattva Chain
            </h1>
            <p className="text-muted-foreground mt-1">Laboratory Portal</p>
          </div>
        </div>

        {/* Auth Tabs */}
        <Card className="shadow-lab">
          <CardHeader className="text-center">
            <CardTitle>Laboratory Access</CardTitle>
            <CardDescription>
              Secure portal for herb testing and quality assurance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register Lab</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="lab@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:bg-primary-hover"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="labName">Laboratory Name</Label>
                    <Input id="labName" placeholder="Herbal Research Lab" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licenseId">License ID</Label>
                    <Input id="licenseId" placeholder="LAB-2024-001" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="admin@lab.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="City, State" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:bg-primary-hover"
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Register Laboratory"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Secure • Compliant • Blockchain-Verified
        </p>
      </div>
    </div>
  );
};