import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, QrCode, FlaskConical, BarChart3, Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface LabDashboardProps {
  onNavigate: (view: string) => void;
}

export const LabDashboard = ({ onNavigate }: LabDashboardProps) => {
  const stats = [
    { label: "Active Tests", value: "12", icon: FlaskConical, color: "info" },
    { label: "Completed Today", value: "8", icon: CheckCircle, color: "success" },
    { label: "Pending Results", value: "3", icon: Clock, color: "warning" },
    { label: "QR Codes Generated", value: "245", icon: QrCode, color: "primary" },
  ];

  const recentBatches = [
    { id: "BTH-001", herb: "Ashwagandha", status: "Testing", created: "2 hours ago" },
    { id: "BTH-002", herb: "Turmeric", status: "Completed", created: "5 hours ago" },
    { id: "BTH-003", herb: "Brahmi", status: "QR Generated", created: "1 day ago" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Laboratory Dashboard</h1>
            <p className="text-muted-foreground mt-1">Herbal Research Lab • License: LAB-2024-001</p>
          </div>
          <Button 
            onClick={() => onNavigate("batch")}
            className="bg-gradient-primary hover:bg-primary-hover"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Batch
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-lab transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${
                stat.color === 'success' ? 'text-success' :
                stat.color === 'warning' ? 'text-warning' :
                stat.color === 'info' ? 'text-info' :
                'text-primary'
              }`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Batches */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle>Recent Batches</CardTitle>
            <CardDescription>Latest herb testing batches and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBatches.map((batch) => (
                <div key={batch.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-primary p-2 rounded-lg">
                      <FlaskConical className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{batch.id}</div>
                      <div className="text-sm text-muted-foreground">{batch.herb}</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant={
                      batch.status === 'Completed' ? 'default' :
                      batch.status === 'Testing' ? 'secondary' :
                      'outline'
                    }>
                      {batch.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground">{batch.created}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common laboratory tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => onNavigate("batch")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Batch
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => onNavigate("research")}
            >
              <FlaskConical className="mr-2 h-4 w-4" />
              Enter Research Data
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => onNavigate("analytics")}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
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