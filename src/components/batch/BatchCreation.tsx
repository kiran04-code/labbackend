import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, QrCode, Download, Share } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BatchCreationProps {
  onNavigate: (view: string) => void;
}

export const BatchCreation = ({ onNavigate }: BatchCreationProps) => {
  const [batchId, setBatchId] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);

  const generateBatchId = () => {
    const id = `BTH-${Date.now().toString().slice(-6)}`;
    setBatchId(id);
  };

  const handleGenerateQR = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchId) generateBatchId();
    setQrGenerated(true);
    toast({
      title: "QR Code Generated",
      description: `Batch ${batchId || "BTH-" + Date.now().toString().slice(-6)} QR code created successfully.`
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate("dashboard")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Create New Batch</h1>
        <p className="text-muted-foreground mt-1">Generate a new testing batch with QR code</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Batch Creation Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Batch Information</CardTitle>
            <CardDescription>Enter details for the new herb testing batch</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerateQR} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batchId">Batch ID</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="batchId" 
                      value={batchId}
                      onChange={(e) => setBatchId(e.target.value)}
                      placeholder="BTH-001234" 
                    />
                    <Button type="button" variant="outline" onClick={generateBatchId}>
                      Generate
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="herbType">Herb Type</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select herb" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ashwagandha">Ashwagandha</SelectItem>
                      <SelectItem value="turmeric">Turmeric</SelectItem>
                      <SelectItem value="brahmi">Brahmi</SelectItem>
                      <SelectItem value="tulsi">Tulsi</SelectItem>
                      <SelectItem value="neem">Neem</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input id="supplier" placeholder="Supplier name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin Location</Label>
                  <Input id="origin" placeholder="Farm location" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Sample Quantity (kg)</Label>
                  <Input id="quantity" type="number" step="0.1" placeholder="1.5" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="harvestDate">Harvest Date</Label>
                  <Input id="harvestDate" type="date" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any special observations or handling instructions..."
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:bg-primary-hover"
              >
                <QrCode className="mr-2 h-4 w-4" />
                Generate Batch & QR Code
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* QR Code Display */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>QR Code</CardTitle>
            <CardDescription>
              {qrGenerated ? "Batch QR code generated successfully" : "QR code will appear after batch creation"}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {qrGenerated ? (
              <div className="space-y-6">
                {/* QR Code Placeholder */}
                <div className="mx-auto w-48 h-48 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-dashed border-primary/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="h-16 w-16 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">QR Code</p>
                    <p className="text-xs font-mono">{batchId}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>

                {/* Batch Info */}
                <div className="bg-secondary/50 p-4 rounded-lg text-left">
                  <h4 className="font-medium mb-2">Batch Details</h4>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p>ID: {batchId}</p>
                    <p>Created: {new Date().toLocaleDateString()}</p>
                    <p>Status: Ready for Testing</p>
                  </div>
                </div>

                {/* Next Steps */}
                <Button 
                  onClick={() => onNavigate("research")}
                  className="w-full bg-gradient-primary hover:bg-primary-hover"
                >
                  Proceed to Research Data Entry
                </Button>
              </div>
            ) : (
              <div className="py-16">
                <QrCode className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">Create a batch to generate QR code</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};