import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, ChevronDown, Save, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ResearchFormProps {
  onNavigate: (view: string) => void;
}

export const ResearchForm = ({ onNavigate }: ResearchFormProps) => {
  const [openSections, setOpenSections] = useState({
    environmental: true,
    contaminants: false,
    biochemical: false,
    microbial: false,
    genetic: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Research Data Submitted",
      description: "Laboratory results recorded. Batch status updated to 'Completed'."
    });
    // Navigate back to dashboard after submission
    setTimeout(() => onNavigate("dashboard"), 1500);
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Research data has been saved as draft."
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
        <h1 className="text-3xl font-bold text-foreground">Research Data Entry</h1>
        <p className="text-muted-foreground mt-1">Enter comprehensive laboratory test results</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Batch Selection */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Batch Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batchId">Batch ID</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BTH-001">BTH-001 - Ashwagandha</SelectItem>
                      <SelectItem value="BTH-002">BTH-002 - Turmeric</SelectItem>
                      <SelectItem value="BTH-003">BTH-003 - Brahmi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testDate">Test Date</Label>
                  <Input id="testDate" type="date" required />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environmental & Soil Conditions */}
          <Card className="shadow-card">
            <Collapsible 
              open={openSections.environmental} 
              onOpenChange={() => toggleSection('environmental')}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Environmental & Soil Conditions</CardTitle>
                      <CardDescription>Temperature, humidity, soil parameters</CardDescription>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${openSections.environmental ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature (°C)</Label>
                    <Input id="temperature" type="number" step="0.1" placeholder="25.5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="humidity">Humidity (%)</Label>
                    <Input id="humidity" type="number" step="0.1" placeholder="65.2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storageTime">Storage Time (days)</Label>
                    <Input id="storageTime" type="number" placeholder="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lightExposure">Light Exposure (hrs/day)</Label>
                    <Input id="lightExposure" type="number" step="0.1" placeholder="8.5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="soilPh">Soil pH</Label>
                    <Input id="soilPh" type="number" step="0.1" placeholder="6.8" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="soilMoisture">Soil Moisture (%)</Label>
                    <Input id="soilMoisture" type="number" step="0.1" placeholder="45.3" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="soilNitrogen">Soil Nitrogen (mg/kg)</Label>
                    <Input id="soilNitrogen" type="number" step="0.1" placeholder="120.5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="soilPhosphorus">Soil Phosphorus (mg/kg)</Label>
                    <Input id="soilPhosphorus" type="number" step="0.1" placeholder="85.2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="soilPotassium">Soil Potassium (mg/kg)</Label>
                    <Input id="soilPotassium" type="number" step="0.1" placeholder="200.8" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="soilCarbon">Soil Organic Carbon (%)</Label>
                    <Input id="soilCarbon" type="number" step="0.1" placeholder="3.2" />
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Contaminants & Safety */}
          <Card className="shadow-card">
            <Collapsible 
              open={openSections.contaminants} 
              onOpenChange={() => toggleSection('contaminants')}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Contaminants & Safety Parameters</CardTitle>
                      <CardDescription>Heavy metals, aflatoxins, pesticide residues</CardDescription>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${openSections.contaminants ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="heavyMetalPb">Heavy Metal Pb (ppm)</Label>
                    <Input id="heavyMetalPb" type="number" step="0.001" placeholder="0.005" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heavyMetalAs">Heavy Metal As (ppm)</Label>
                    <Input id="heavyMetalAs" type="number" step="0.001" placeholder="0.003" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heavyMetalHg">Heavy Metal Hg (ppm)</Label>
                    <Input id="heavyMetalHg" type="number" step="0.001" placeholder="0.002" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heavyMetalCd">Heavy Metal Cd (ppm)</Label>
                    <Input id="heavyMetalCd" type="number" step="0.001" placeholder="0.001" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aflatoxinTotal">Aflatoxin Total (ppb)</Label>
                    <Input id="aflatoxinTotal" type="number" step="0.1" placeholder="2.5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pesticideResidue">Pesticide Residue Total (ppm)</Label>
                    <Input id="pesticideResidue" type="number" step="0.001" placeholder="0.010" />
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Biochemical Properties */}
          <Card className="shadow-card">
            <Collapsible 
              open={openSections.biochemical} 
              onOpenChange={() => toggleSection('biochemical')}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Biochemical Properties</CardTitle>
                      <CardDescription>Moisture, essential oils, chlorophyll analysis</CardDescription>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${openSections.biochemical ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="moistureContent">Moisture Content (%)</Label>
                    <Input id="moistureContent" type="number" step="0.1" placeholder="12.5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="essentialOil">Essential Oil (%)</Label>
                    <Input id="essentialOil" type="number" step="0.1" placeholder="2.8" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chlorophyllIndex">Chlorophyll Index</Label>
                    <Input id="chlorophyllIndex" type="number" step="0.1" placeholder="35.2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leafSpots">Leaf Spots Count</Label>
                    <Input id="leafSpots" type="number" placeholder="3" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discoloration">Discoloration Index</Label>
                    <Input id="discoloration" type="number" step="0.1" placeholder="1.2" />
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Microbial Testing */}
          <Card className="shadow-card">
            <Collapsible 
              open={openSections.microbial} 
              onOpenChange={() => toggleSection('microbial')}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Microbial Testing</CardTitle>
                      <CardDescription>Bacterial and fungal analysis</CardDescription>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${openSections.microbial ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bacterialCount">Total Bacterial Count (CFU/g)</Label>
                    <Input id="bacterialCount" type="number" placeholder="1500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fungalCount">Total Fungal Count (CFU/g)</Label>
                    <Input id="fungalCount" type="number" placeholder="800" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ecoliPresent">E. coli Present</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salmonellaPresent">Salmonella Present</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Genetic Validation */}
          <Card className="shadow-card">
            <Collapsible 
              open={openSections.genetic} 
              onOpenChange={() => toggleSection('genetic')}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Genetic Validation</CardTitle>
                      <CardDescription>DNA marker authenticity testing</CardDescription>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${openSections.genetic ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="dnaAuthenticity">DNA Marker Authenticity</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select result" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Authentic</SelectItem>
                        <SelectItem value="no">Not Authentic</SelectItem>
                        <SelectItem value="inconclusive">Inconclusive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleSaveDraft}
              className="flex-1"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-primary hover:bg-primary-hover"
            >
              <Send className="mr-2 h-4 w-4" />
              Submit Results
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};