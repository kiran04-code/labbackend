// src/components/ProductDetails.tsx

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, ChevronDown, Loader, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useAuth } from "@/context/auth";
import Loder from "./Loder";
import { StatusModal } from "./StatusModal"; // Import the new modal component
import ButtonLoader from "./Loader";

// --- INTERFACES ---
interface ProductData {
    batchId: string;
    testDate: string;
    temperature: number;
    humidity: number;
    storageTime: number;
    lightExposure: number;
    soilPh: number;
    soilMoisture: number;
    soilNitrogen: number;
    soilPhosphorus: number;
    soilPotassium: number;
    soilCarbon: number;
    heavyMetalPb: number;
    heavyMetalAs: number;
    heavyMetalHg: number;
    heavyMetalCd: number;
    aflatoxinTotal: number;
    pesticideResidue: number;
    moistureContent: number;
    essentialOil: number;
    chlorophyllIndex: number;
    leafSpots: number;
    discoloration: number;
    bacterialCount: number;
    fungalCount: number;
    ecoliPresent: string;
    salmonellaPresent: string;
    dnaAuthenticity: string;
}

interface ApiAnomaly {
    parameter: string;
    expected_range: string;
    actual_value: string;
}

interface ApiResponse {
    status: 'Normal' | 'Anomaly Detected';
    summary: string;
    anomalies: ApiAnomaly[] | null;
    quality_rating?: number;
}

export const ProductDetails = ({ onNavigate }: { onNavigate: (view: string) => void }) => {
    const { id } = useParams<{ id: string }>();
    const { account, conntecte, user, contract } = useAuth();
    const [product, setProduct] = useState<ProductData | null>(null);
    const [loder, setloder] = useState(false);
    const [modalContent, setModalContent] = useState<ApiResponse | null>(null);
    const [openSections, setOpenSections] = useState({
        environmental: true,
        contaminants: false,
        biochemical: false,
        microbial: false,
        genetic: false
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const { data } = await axios.get("https://farmerbackend-dev.onrender.com/api/allproductes");
                const prod = data.find((p: any) => p.productId === id);
                if (prod) {
                    setProduct({
                        batchId: prod.productId,
                        testDate: new Date().toISOString().split("T")[0],
                        temperature: parseFloat(prod.temperature),
                        humidity: 65,
                        storageTime: 100,
                        lightExposure: 6,
                        soilPh: 6.5,
                        soilMoisture: 20,
                        soilNitrogen: 400,
                        soilPhosphorus: 45,
                        soilPotassium: 300,
                        soilCarbon: 0.8,
                        heavyMetalPb: 0.1,
                        heavyMetalAs: 0.05,
                        heavyMetalHg: 0.01,
                        heavyMetalCd: 0.02,
                        aflatoxinTotal: 5,
                        pesticideResidue: 0.1,
                        moistureContent: 10,
                        essentialOil: 1.2,
                        chlorophyllIndex: 30,
                        leafSpots: 2,
                        discoloration: 1,
                        bacterialCount: 5000,
                        fungalCount: 500,
                        ecoliPresent: "no",
                        salmonellaPresent: "no",
                        dnaAuthenticity: "100%"
                    });
                }

                const res = await axios.post("http://localhost:3000/api/getfarmerDetails",{CollectorId:prod.farmerId})
               console.log(res.data) 
            } catch (err) {
                console.error(err);
                toast({ title: "Error", description: "Failed to fetch product data" });
            }
        };
        fetchProductData();
    }, [id]);

    const handleInputChange = (field: keyof ProductData, value: string) => {
        setProduct(prev => prev ? { ...prev, [field]: value } : null);
    };

    const handleSelectChange = (field: keyof ProductData, value: string) => {
        setProduct(prev => prev ? { ...prev, [field]: value } : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setModalContent(null);
        if (!product || !contract || !account) return;

        const keyMapping: { [K in keyof Omit<ProductData, 'batchId' | 'testDate'>]?: string } = {
            temperature: "Temperature_C", humidity: "Humidity_Pct", storageTime: "Storage_Time_Days", lightExposure: "Light_Exposure_hours_per_day",
            soilPh: "Soil_pH", soilMoisture: "Soil_Moisture_Pct", soilNitrogen: "Soil_Nitrogen_mgkg", soilPhosphorus: "Soil_Phosphorus_mgkg",
            soilPotassium: "Soil_Potassium_mgkg", soilCarbon: "Soil_Organic_Carbon_Pct", heavyMetalPb: "Heavy_Metal_Pb_ppm", heavyMetalAs: "Heavy_Metal_As_ppm",
            heavyMetalHg: "Heavy_Metal_Hg_ppm", heavyMetalCd: "Heavy_Metal_Cd_ppm", aflatoxinTotal: "Aflatoxin_Total_ppb",
            pesticideResidue: "Pesticide_Residue_Total_ppm", moistureContent: "Moisture_Content_Pct", essentialOil: "Essential_Oil_Pct",
            chlorophyllIndex: "Chlorophyll_Index", leafSpots: "Leaf_Spots_Count", discoloration: "Discoloration_Index",
            bacterialCount: "Total_Bacterial_Count_CFU_g", fungalCount: "Total_Fungal_Count_CFU_g", ecoliPresent: "E_coli_Present",
            salmonellaPresent: "Salmonella_Present", dnaAuthenticity: "DNA_Marker_Authenticity",
        };

        const test_results = Object.entries(product).reduce((acc, [key, value]) => {
            const typedKey = key as keyof ProductData;
            if (typedKey !== 'batchId' && typedKey !== 'testDate' && keyMapping[typedKey]) {
                const mappedKey = keyMapping[typedKey]!;
                acc[mappedKey] = isNaN(Number(value)) ? value : Number(value);
            }
            return acc;
        }, {} as Record<string, any>);

        const submissionData = { herb_name: product.batchId, Famer_Id: "dsgedg57", test_results };

        try {
            setloder(true);
            const { data } = await axios.post(
                "https://sattva-chain-processor.onrender.com/agent/analyze-herb-quality-rag",
                submissionData, { headers: { 'Content-Type': 'application/json' } }
            );

            if (data.status === "Normal") {
                toast({ title: "Analysis Complete", description: "Submitting to blockchain..." });
                try {
                    await contract.setHerbName(product.batchId);
                    await contract.setFarmerId("hbolujui");
                    // Environment
                    await contract.setTemperature(Math.round(test_results.Temperature_C * 100)); // 25.5 → 2550
                    await contract.setHumidity(Math.round(test_results.Humidity_Pct * 100));
                    await contract.setStorageDays(test_results.Storage_Time_Days);
                    await contract.setLightExposure(Math.round(test_results.Light_Exposure_hours_per_day * 100));

                    // Soil
                    await contract.setSoilPH(Math.round(test_results.Soil_pH * 100));
                    await contract.setSoilMoisture(Math.round(test_results.Soil_Moisture_Pct * 100));
                    await contract.setSoilNitrogen(Math.round(test_results.Soil_Nitrogen_mgkg));
                    await contract.setSoilPhosphorus(Math.round(test_results.Soil_Phosphorus_mgkg));
                    await contract.setSoilPotassium(Math.round(test_results.Soil_Potassium_mgkg));
                    await contract.setSoilOrganicCarbon(Math.round(test_results.Soil_Organic_Carbon_Pct * 100));

                    // Contaminants
                    await contract.setPb(Math.round(test_results.Heavy_Metal_Pb_ppm * 100));
                    await contract.setAs(Math.round(test_results.Heavy_Metal_As_ppm * 100));
                    await contract.setHg(Math.round(test_results.Heavy_Metal_Hg_ppm * 100));
                    await contract.setCd(Math.round(test_results.Heavy_Metal_Cd_ppm * 100));
                    await contract.setAflatoxin(Math.round(test_results.Aflatoxin_Total_ppb));
                    await contract.setPesticideResidue(Math.round(test_results.Pesticide_Residue_Total_ppm * 100));

                    // Quality Metrics
                    await contract.setMoistureContent(Math.round(test_results.Moisture_Content_Pct * 100));
                    await contract.setEssentialOil(Math.round(test_results.Essential_Oil_Pct * 100));
                    await contract.setChlorophyll(Math.round(test_results.Chlorophyll_Index * 100));
                    await contract.setLeafSpots(test_results.Leaf_Spots_Count);
                    await contract.setDiscoloration(Math.round(test_results.Discoloration_Index * 100));

                    // Microbial
                    await contract.setBacteria(Math.round(test_results.Total_Bacterial_Count_CFU_g));
                    await contract.setFungi(Math.round(test_results.Total_Fungal_Count_CFU_g));
                    await contract.setEcoli(test_results.E_coli_Present ? 1 : 0);
                    await contract.setSalmonella(test_results.Salmonella_Present ? 1 : 0);

                    // DNA Authentication
                    await contract.setDNAAuth(test_results.DNA_Marker_Authenticity ? 1 : 0);


                    setModalContent(data);
                    setloder(false)
                    toast({ title: " Store on is Blockchain  Complete  ", description: "Your Produst is store on blockchain is Successfull", });
                    // crate the cerificated on ipfs with farmerId
                } catch (err) {
                     setloder(false)
                    console.error("Blockchain error:", err);
                    toast({ title: "Blockchain Error", description: "Could not write to the smart contract.", variant: "destructive" });
                }
            } else {
                setModalContent(data);
            }
        } catch (error) {
            console.error("API Error:", error);
            toast({ title: "API Submission Failed", description: "Please check your connection.", variant: "destructive" });
        } finally {
            setloder(false);
        }
    };

    const handleSaveDraft = () => {
        toast({ title: "Draft Saved", description: "Research data has been saved as draft." });
    };

    if (!product) return <div className="p-6">Loading...</div>;

    return (
        <div className="min-h-screen bg-background p-6">
            {modalContent && (
                <StatusModal
                    response={modalContent}
                    onClose={() => setModalContent(null)}
                    onNavigate={onNavigate}
                />
            )}

            <div className="mb-8 max-w-4xl mx-auto">
                <Button variant="ghost" onClick={() => onNavigate("dashboard")} className="mb-4 flex items-center gap-2 text-gray-700 hover:text-gray-900">
                    <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                </Button>
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Research Data Entry: {product.batchId}</h1>
                    <p className="text-gray-500 mt-1">Enter comprehensive laboratory test results.</p>
                </div>
                <div className="max-w-md">
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Connected Wallet</Label>
                    {account ? (
                        <Input type="text" value={account} readOnly />
                    ) : (
                        <Button onClick={conntecte} className="w-full">Connect Wallet</Button>
                    )}
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card><CardHeader><CardTitle>Batch Information</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <InputSection id="batchId" label="Batch ID" value={product.batchId} readOnly />
                            <InputSection id="testDate" label="Test Date" value={product.testDate} readOnly />
                        </CardContent>
                    </Card>
                    <CollapsibleCard title="Environmental & Soil Conditions" description="Temperature, humidity, soil parameters" open={openSections.environmental} toggle={() => toggleSection("environmental")} onInputChange={handleInputChange} inputs={[
                        { id: "temperature", label: "Temperature (°C)", value: product.temperature }, { id: "humidity", label: "Humidity (%)", value: product.humidity },
                        { id: "storageTime", label: "Storage Time (days)", value: product.storageTime }, { id: "lightExposure", label: "Light Exposure (hrs/day)", value: product.lightExposure },
                        { id: "soilPh", label: "Soil pH", value: product.soilPh }, { id: "soilMoisture", label: "Soil Moisture (%)", value: product.soilMoisture },
                        { id: "soilNitrogen", label: "Soil Nitrogen (mg/kg)", value: product.soilNitrogen }, { id: "soilPhosphorus", label: "Soil Phosphorus (mg/kg)", value: product.soilPhosphorus },
                        { id: "soilPotassium", label: "Soil Potassium (mg/kg)", value: product.soilPotassium }, { id: "soilCarbon", label: "Soil Organic Carbon (%)", value: product.soilCarbon }
                    ]} />
                    <CollapsibleCard title="Contaminants & Safety Parameters" description="Heavy metals, aflatoxins, pesticide residues" open={openSections.contaminants} toggle={() => toggleSection("contaminants")} onInputChange={handleInputChange} inputs={[
                        { id: "heavyMetalPb", label: "Heavy Metal Pb (ppm)", value: product.heavyMetalPb }, { id: "heavyMetalAs", label: "Heavy Metal As (ppm)", value: product.heavyMetalAs },
                        { id: "heavyMetalHg", label: "Heavy Metal Hg (ppm)", value: product.heavyMetalHg }, { id: "heavyMetalCd", label: "Heavy Metal Cd (ppm)", value: product.heavyMetalCd },
                        { id: "aflatoxinTotal", label: "Aflatoxin Total (ppb)", value: product.aflatoxinTotal }, { id: "pesticideResidue", label: "Pesticide Residue Total (ppm)", value: product.pesticideResidue }
                    ]} />
                    <CollapsibleCard title="Biochemical Properties" description="Moisture, essential oils, chlorophyll analysis" open={openSections.biochemical} toggle={() => toggleSection("biochemical")} onInputChange={handleInputChange} inputs={[
                        { id: "moistureContent", label: "Moisture Content (%)", value: product.moistureContent }, { id: "essentialOil", label: "Essential Oil (%)", value: product.essentialOil },
                        { id: "chlorophyllIndex", label: "Chlorophyll Index", value: product.chlorophyllIndex }, { id: "leafSpots", label: "Leaf Spots Count", value: product.leafSpots },
                        { id: "discoloration", label: "Discoloration Index", value: product.discoloration }
                    ]} />
                    <CollapsibleCard title="Microbial Testing" description="Bacterial and fungal analysis" open={openSections.microbial} toggle={() => toggleSection("microbial")} onInputChange={handleInputChange} inputs={[
                        { id: "bacterialCount", label: "Total Bacterial Count (CFU/g)", value: product.bacterialCount }, { id: "fungalCount", label: "Total Fungal Count (CFU/g)", value: product.fungalCount },
                    ]}>
                        <SelectSection id="ecoliPresent" label="E. coli Present" value={product.ecoliPresent} onChange={handleSelectChange} />
                        <SelectSection id="salmonellaPresent" label="Salmonella Present" value={product.salmonellaPresent} onChange={handleSelectChange} />
                    </CollapsibleCard>
                    <CollapsibleCard title="Genetic Validation" description="DNA marker authenticity testing" open={openSections.genetic} toggle={() => toggleSection("genetic")}>
                        <SelectSection id="dnaAuthenticity" label="DNA Marker Authenticity" value={product.dnaAuthenticity} onChange={handleSelectChange} />
                    </CollapsibleCard>
                    <div className="flex space-x-4">
                        <Button type="button" variant="outline" onClick={handleSaveDraft} className="flex-1">
                            <Save className="mr-2 h-4 w-4" /> Save Draft
                        </Button>
                        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" disabled={loder}>
                            {loder ? <ButtonLoader /> : "Analyze & Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- HELPER COMPONENTS (Unchanged) ---
const InputSection = ({ id, label, value, onChange, readOnly = false }: { id: string; label: string; value: number | string; onChange?: (id: keyof ProductData, value: string) => void; readOnly?: boolean; }) => (
    <div className="space-y-2"><Label htmlFor={id}>{label}</Label><Input id={id} type="text" value={value} onChange={onChange ? (e) => onChange(id as keyof ProductData, e.target.value) : undefined} readOnly={readOnly} /></div>
);

const SelectSection = ({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (id: keyof ProductData, value: string) => void; }) => (
    <div className="space-y-2"><Label>{label}</Label><Select value={value} onValueChange={(val) => onChange(id as keyof ProductData, val)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="100%">100%</SelectItem><SelectItem value="no">No</SelectItem><SelectItem value="inconclusive">Inconclusive</SelectItem></SelectContent></Select></div>
);

const CollapsibleCard = ({ title, description, open, toggle, inputs, children, onInputChange }: any) => (
    <Card><Collapsible open={open} onOpenChange={toggle}><CollapsibleTrigger asChild><CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors"><div className="flex items-center justify-between"><div><CardTitle>{title}</CardTitle><CardDescription>{description}</CardDescription></div><ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} /></div></CardHeader></CollapsibleTrigger><CollapsibleContent><CardContent className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-4">{inputs?.map((inp: any) => <InputSection key={inp.id} id={inp.id} label={inp.label} value={inp.value} onChange={onInputChange} />)}{children}</CardContent></CollapsibleContent></Collapsible></Card>
);