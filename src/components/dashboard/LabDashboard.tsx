import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, QrCode, FlaskConical, BarChart3, Clock, CheckCircle, AlertTriangle, Thermometer, Droplet } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";

interface Product {
  productId: string;
  productName: string;
  location: string;
  temperature: string;
  humidity: string;
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
  const navigate = useNavigate();
  const { account } = useAuth();

  const fetchIPFSData = async () => {
    try {
      const { data } = await axios.get("https://farmerbackend-dev.onrender.com/api/allproductes");
      // Ensure data is always an array and clean i
      console.log(data)
      const cleanedData: Product[] = Array.isArray(data)
        ? data.map(item => ({
            ...item,
            location: item.location && !item.location.includes("undefined") ? item.location : "Unknown",
            images: Array.isArray(item.images) ? item.images : [],
            temperature: item.temperature || "-",
            humidity: item.humidity || "-",
            soilMoisture: item.soilMoisture || "-",
          }))
        : [];
      setProducts(cleanedData);
      console.log("Cleaned Products:", cleanedData);
    } catch (err) {
      console.error("Failed to fetch IPFS data:", err);
    }
  };

  useEffect(() => {
    fetchIPFSData();
  }, []);

  const stats = [
    { label: "Active Tests", value: products.length.toString(), icon: FlaskConical, color: "info" },
    { label: "Total Images", value: products.reduce((acc, p) => acc + (p.images?.length || 0), 0).toString(), icon: CheckCircle, color: "success" },
    { label: "Unique Locations", value: new Set(products.map(p => p.location)).size.toString(), icon: Clock, color: "warning" },
    { label: "QR Codes Generated", value: products.length.toString(), icon: QrCode, color: "primary" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laboratory Dashboard</h1>
          <p className="text-gray-500 mt-1">Herbal Research Lab • License: LAB-2024-001</p>
        </div>
        <Button onClick={() => onNavigate("batch")} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Batch
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx} className="shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.label}</CardTitle>
              <stat.icon
                className={`h-5 w-5 ${
                  stat.color === "success"
                    ? "text-green-500"
                    : stat.color === "warning"
                    ? "text-yellow-500"
                    : stat.color === "info"
                    ? "text-blue-500"
                    : "text-indigo-500"
                }`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle>IPFS Products</CardTitle>
            <CardDescription>Latest products fetched from IPFS</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {products.map(product => (
              <div
                key={product.productId}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                onClick={() => navigate(`/product/${product.productId}`)}
              >
                <div className="flex items-center space-x-4">
                  {product.images?.[0] ? (
                    <img
                      src={`https://ipfs.io/ipfs/${product.images[0]}`}
                      alt={`Product ${product.productId}`}
                      className="h-16 w-16 object-cover rounded border"
                    />
                  ) : (
                    <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">No Img</div>
                  )}
                  <div className="flex flex-col">
                    <div className="font-medium text-lg">{product.productName || "Unnamed Product"}</div>
                    <div className="text-sm text-gray-500">ID: {product.productId || "-"}</div>
                    <div className="text-xs mt-1 text-gray-600">Location: {product.location}</div>
                    <div className="flex gap-3 text-xs mt-1 text-gray-700">
                      <div className="flex items-center gap-1"><Thermometer className="h-3 w-3" /> Temp: {product.temperature}</div>
                      <div className="flex items-center gap-1"><Droplet className="h-3 w-3" /> Humidity: {product.humidity}</div>
                      <div>Soil: {product.soilMoisture}</div>
                    </div>
                    <div className="text-xs mt-1">
                      <a
                        href={`https://ipfs.io/ipfs/${product.ipfsHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {product.ipfsHash?.slice(0, 10)}...
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common laboratory tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" onClick={() => navigate("research")}>
              <FlaskConical className="mr-2 h-4 w-4" /> Enter Research Data
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={() => navigate("analytics")}>
              <BarChart3 className="mr-2 h-4 w-4" /> View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="mt-6 shadow-md border-l-4 border-l-yellow-500">
        <CardHeader className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-yellow-500">System Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-700 space-y-1">
            <p>• Batch BTH-001 heavy metal levels require attention</p>
            <p>• Equipment calibration due in 3 days</p>
            <p>• Monthly compliance report due soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
