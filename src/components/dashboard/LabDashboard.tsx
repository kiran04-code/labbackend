import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, QrCode, FlaskConical, BarChart3, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";

interface Product {
  productId: string;
  productName: string;
  location: string;
  temperature: string;
  soilMoisture: string;
  type: string;
  ipfsHash: string;
  images: string[];
}

interface LabDashboardProps {
  onNavigate: (view: string) => void;
}

export const LabDashboard = ({ onNavigate }: LabDashboardProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const navgte = useNavigate();
  const {account} = useAuth()
  // Fetch IPFS data
  const fetchIPFSData = async () => {
    try {
      const { data } = await axios.get("https://farmerbackend-dev.onrender.com/api/allproductes");
      setProducts(data);
      console.log(data)
    } catch (err) {
      console.error("Failed to fetch IPFS data:", err);
    }
  };

  useEffect(() => {
    fetchIPFSData();
  }, []);

  // Example static stats
  const stats = [
    { label: "Active Tests", value: products.length.toString(), icon: FlaskConical, color: "info" },
    { label: "Total Images", value: products.reduce((acc, p) => acc + p.images.length, 0).toString(), icon: CheckCircle, color: "success" },
    { label: "Unique Locations", value: new Set(products.map(p => p.location)).size.toString(), icon: Clock, color: "warning" },
    { label: "QR Codes Generated", value: products.length.toString(), icon: QrCode, color: "primary" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Laboratory Dashboard</h1>
          <p className="text-muted-foreground mt-1">Herbal Research Lab • License: LAB-2024-001</p>
        </div>
        <Button onClick={() => onNavigate("batch")} className="bg-gradient-primary hover:bg-primary-hover">
          <Plus className="mr-2 h-4 w-4" /> New Batch
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-lab transition-shadow">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon
                className={`h-4 w-4 ${stat.color === "success"
                    ? "text-success"
                    : stat.color === "warning"
                      ? "text-warning"
                      : stat.color === "info"
                        ? "text-info"
                        : "text-primary"
                  }`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid: IPFS Products + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* IPFS Products */}
        <Card className="lg:col-span-2 shadow-card">
       
          <CardHeader>
            <CardTitle>IPFS Products</CardTitle>
            <CardDescription>Latest products fetched from IPFS</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
        
            {products.map(product => (
              <div
                key={product.productId}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
                onClick={() => navgte(`/product/${product.productId}`)} // Navigate to product page
              >
                <div className="flex items-center space-x-4">
                  {product.images[0] && (
                    <img
                      src={`https://ipfs.io/ipfs/${product.images[0]}`}
                      alt={`Product ${product.productId}`}
                      className="h-16 w-16 object-cover rounded border"
                    />
                  )}
                  <div>
                    <div className="font-medium text-lg">{product.productName}</div>
                    <div className="text-sm text-muted-foreground">ID: {product.productId}</div>
                    <div className="text-xs mt-1">
                      <a
                        href={`https://ipfs.io/ipfs/${product.ipfsHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {product.ipfsHash.slice(0, 10)}...
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common laboratory tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" onClick={() => navgte("research")}>
              <FlaskConical className="mr-2 h-4 w-4" /> Enter Research Data
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={() => navgte("analytics")}>
              <BarChart3 className="mr-2 h-4 w-4" /> View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="mt-6 shadow-card border-l-4 border-l-warning">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <CardTitle className="text-warning">System Alerts</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <p>• Batch BTH-001 heavy metal levels require attention</p>
            <p>• Equipment calibration due in 3 days</p>
            <p>• Monthly compliance report due soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
