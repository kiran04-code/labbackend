// src/components/ProductDetails.tsx
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, ChevronDown, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useAuth } from "@/context/auth";
import Loder from "./Loder";
import { StatusModal } from "./StatusModal";
import ButtonLoader from "./Loader";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

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
    const [loading, setLoading] = useState(false);
    const [modalContent, setModalContent] = useState<ApiResponse | null>(null);
    const [step, setStep] = useState<"form" | "preview" | "blockchain" | "anomaly">("form");
    const [openSections, setOpenSections] = useState({
        environmental: true,
        contaminants: false,
        biochemical: false,
        microbial: false,
        genetic: false
    });
    const certificateRef = useRef<HTMLDivElement>(null);

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
        if (!product) return;
        setLoading(true);
        setModalContent(null);

        try {
            // Map product data to API format
            const test_results = { ...product }; // Map as needed
            const submissionData = { herb_name: product.batchId, Famer_Id: "dsgedg57", test_results };

            // AI Analysis
            const { data } = await axios.post(
                "https://sattva-chain-processor.onrender.com/agent/analyze-herb-quality-rag",
                submissionData
            );

            setModalContent(data);

            if (data.status === "Normal") {
                setStep("preview");
            } else {
                setStep("anomaly");
            }
        } catch (err) {
            console.error(err);
            toast({ title: "AI Analysis Error", description: "Check your connection.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const storeOnBlockchain = async () => {
        if (!contract || !product) return;
        setLoading(true);
        try {
            // Example blockchain calls (fill all as per your smart contract)
            await contract.setHerbName(product.batchId);
            await contract.setFarmerId("hbolujui");
            await contract.setTemperature(Math.round(product.temperature * 100));
            await contract.setHumidity(Math.round(product.humidity * 100));
            // ... add all remaining fields here like your old code

            toast({ title: "Blockchain Storage Complete", description: "Your product is stored on blockchain." });

            // Generate PDF certificate
            if (certificateRef.current) {
                const canvas = await html2canvas(certificateRef.current);
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                pdf.save(`${product.batchId}_Certificate.pdf`);
            }

            setStep("form");
        } catch (err) {
            console.error(err);
            toast({ title: "Blockchain Error", description: "Failed to store on blockchain.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleSaveDraft = () => {
        toast({ title: "Draft Saved", description: "Research data has been saved as draft." });
    };

    if (!product) return <div className="p-6">Loading...</div>;

    return (
        <div className="min-h-screen bg-background p-4 md:p-6">
            {/* Full-screen loader */}
            {loading && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="text-center">
                    <div className="loader mb-4"></div>
                    <p className="text-white font-semibold text-lg">Processing...</p>
                </div>
            </div>}

            <div className="mb-6 max-w-4xl mx-auto">
                <Button variant="ghost" onClick={() => onNavigate("dashboard")} className="mb-4 flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                </Button>
                <h1 className="text-3xl font-bold mb-2">Research Data Entry: {product.batchId}</h1>
                <p className="text-gray-500">Enter comprehensive laboratory test results.</p>
            </div>

            {/* Form Step */}
            {step === "form" && (
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Batch Information</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputSection id="batchId" label="Batch ID" value={product.batchId} readOnly />
                            <InputSection id="testDate" label="Test Date" value={product.testDate} readOnly />
                        </CardContent>
                    </Card>

                    {/* Collapsible Sections (full inputs) */}
                    <CollapsibleCard title="Environmental & Soil Conditions" description="Temperature, humidity, soil parameters"
                        open={openSections.environmental} toggle={() => toggleSection("environmental")}
                        onInputChange={handleInputChange}
                        inputs={[
                            { id: "temperature", label: "Temperature (°C)", value: product.temperature },
                            { id: "humidity", label: "Humidity (%)", value: product.humidity },
                            { id: "storageTime", label: "Storage Time (days)", value: product.storageTime },
                            { id: "lightExposure", label: "Light Exposure (hrs/day)", value: product.lightExposure },
                            { id: "soilPh", label: "Soil pH", value: product.soilPh },
                            { id: "soilMoisture", label: "Soil Moisture (%)", value: product.soilMoisture },
                            { id: "soilNitrogen", label: "Soil Nitrogen (mg/kg)", value: product.soilNitrogen },
                            { id: "soilPhosphorus", label: "Soil Phosphorus (mg/kg)", value: product.soilPhosphorus },
                            { id: "soilPotassium", label: "Soil Potassium (mg/kg)", value: product.soilPotassium },
                            { id: "soilCarbon", label: "Soil Organic Carbon (%)", value: product.soilCarbon },
                        ]}
                    />

                    <CollapsibleCard title="Contaminants & Safety Parameters" description="Heavy metals, aflatoxins, pesticide residues"
                        open={openSections.contaminants} toggle={() => toggleSection("contaminants")}
                        onInputChange={handleInputChange}
                        inputs={[
                            { id: "heavyMetalPb", label: "Pb (ppm)", value: product.heavyMetalPb },
                            { id: "heavyMetalAs", label: "As (ppm)", value: product.heavyMetalAs },
                            { id: "heavyMetalHg", label: "Hg (ppm)", value: product.heavyMetalHg },
                            { id: "heavyMetalCd", label: "Cd (ppm)", value: product.heavyMetalCd },
                            { id: "aflatoxinTotal", label: "Aflatoxin Total (ppb)", value: product.aflatoxinTotal },
                            { id: "pesticideResidue", label: "Pesticide Residue (ppm)", value: product.pesticideResidue },
                        ]}
                    />

                    <CollapsibleCard title="Biochemical Properties" description="Moisture, essential oils, chlorophyll analysis"
                        open={openSections.biochemical} toggle={() => toggleSection("biochemical")}
                        onInputChange={handleInputChange}
                        inputs={[
                            { id: "moistureContent", label: "Moisture Content (%)", value: product.moistureContent },
                            { id: "essentialOil", label: "Essential Oil (%)", value: product.essentialOil },
                            { id: "chlorophyllIndex", label: "Chlorophyll Index", value: product.chlorophyllIndex },
                        ]}
                    />

                    <CollapsibleCard title="Microbial Analysis" description="Bacterial & fungal counts, pathogens"
                        open={openSections.microbial} toggle={() => toggleSection("microbial")}
                        onInputChange={handleInputChange}
                        inputs={[
                            { id: "leafSpots", label: "Leaf Spots", value: product.leafSpots },
                            { id: "discoloration", label: "Discoloration", value: product.discoloration },
                            { id: "bacterialCount", label: "Bacterial Count", value: product.bacterialCount },
                            { id: "fungalCount", label: "Fungal Count", value: product.fungalCount },
                            { id: "ecoliPresent", label: "E.Coli Presence", value: product.ecoliPresent },
                            { id: "salmonellaPresent", label: "Salmonella Presence", value: product.salmonellaPresent },
                        ]}
                    />

                    <CollapsibleCard title="Genetic Authenticity" description="DNA authenticity test"
                        open={openSections.genetic} toggle={() => toggleSection("genetic")}
                        onInputChange={handleInputChange}
                        inputs={[
                            { id: "dnaAuthenticity", label: "DNA Authenticity (%)", value: product.dnaAuthenticity },
                        ]}
                    />

                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                        <Button type="button" variant="outline" onClick={handleSaveDraft} className="flex-1">
                            <Save className="mr-2 h-4 w-4" /> Save Draft
                        </Button>
                        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                            {loading ? <ButtonLoader /> : "Analyze & Submit"}
                        </Button>
                    </div>
                </form>
            )}

            {/* Certificate Preview Step */}
            {step === "preview" && (
                <div className="max-w-3xl mx-auto space-y-6">
                    <h2 className="text-2xl font-bold">Certificate Preview</h2>
                    <div ref={certificateRef}>
                        <Certificate product={product} />
                    </div>
                    <div className="flex space-x-4">
                        <Button onClick={() => setStep("form")} variant="outline">Back</Button>
                        <Button onClick={storeOnBlockchain} className="bg-blue-600 hover:bg-blue-700 text-white">
                            Next: Store on Blockchain
                        </Button>
                    </div>
                </div>
            )}

            {/* Anomaly Step */}
            {step === "anomaly" && modalContent && (
                <div className="max-w-3xl mx-auto space-y-4">
                    <h2 className="text-2xl font-bold text-red-600">Anomaly Detected</h2>
                    <p>{modalContent.summary}</p>
                    {modalContent.anomalies?.length > 0 && (
                        <ul className="list-disc ml-6">
                            {modalContent.anomalies.map((a, idx) => (
                                <li key={idx}>
                                    <strong>{a.parameter}:</strong> expected {a.expected_range}, actual {a.actual_value}
                                </li>
                            ))}
                        </ul>
                    )}
                    <Button onClick={() => setStep("form")} variant="outline">Back to Form</Button>
                </div>
            )}
        </div>
    );
};

// ----------------- HELPER COMPONENTS -----------------
const InputSection = ({ id, label, value, onChange, readOnly = false }: { id: string; label: string; value: number | string; onChange?: (id: keyof ProductData, value: string) => void; readOnly?: boolean; }) => (
    <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} type="text" value={value} onChange={onChange ? (e) => onChange(id as keyof ProductData, e.target.value) : undefined} readOnly={readOnly} />
    </div>
);

const CollapsibleCard = ({ title, description, open, toggle, inputs, children, onInputChange }: any) => (
    <Card>
        <Collapsible open={open} onOpenChange={toggle}>
            <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                    </div>
                </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                    {inputs?.map((inp: any) => <InputSection key={inp.id} id={inp.id} label={inp.label} value={inp.value} onChange={onInputChange} />)}
                    {children}
                </CardContent>
            </CollapsibleContent>
        </Collapsible>
    </Card>
);

const Certificate = ({ product }: { product: ProductData }) => (
    <div className="border p-6 bg-white shadow-md rounded space-y-3">
        <h3 className="text-xl font-bold text-center mb-2">Certificate of Analysis</h3>
        <p><strong>Batch ID:</strong> {product.batchId}</p>
        <p><strong>Test Date:</strong> {product.testDate}</p>
        <p><strong>Temperature:</strong> {product.temperature} °C</p>
        <p><strong>Humidity:</strong> {product.humidity} %</p>
        <p><strong>Soil pH:</strong> {product.soilPh}</p>
        <p><strong>Essential Oil:</strong> {product.essentialOil} %</p>
        <p><strong>DNA Authenticity:</strong> {product.dnaAuthenticity}</p>
        <p><strong>Moisture Content:</strong> {product.moistureContent} %</p>
        {/* Add more fields as needed */}
    </div>
);
