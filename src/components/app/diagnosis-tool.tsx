"use client";

import { useState } from "react";
import Image from "next/image";
import { generatePersonalizedCareSuggestions, GeneratePersonalizedCareSuggestionsOutput } from "@/ai/flows/generate-personalized-care-suggestions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UploadCloud, Camera, Activity, Lightbulb, Pill, ShieldCheck, FileText, Bot, AlertTriangle, Undo2 } from "lucide-react";

type DiagnosisState = "idle" | "loading" | "results" | "error";

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  </div>
);

export default function DiagnosisTool() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [patientDetails, setPatientDetails] = useState<string>("");
  const [results, setResults] = useState<GeneratePersonalizedCareSuggestionsOutput & { condition: string; severity: string } | null>(null);
  const [diagnosisState, setDiagnosisState] = useState<DiagnosisState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { toast } = useToast();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDiagnose = async () => {
    if (!imagePreview) {
      toast({
        title: "Image required",
        description: "Please upload an image to proceed.",
        variant: "destructive",
      });
      return;
    }
    setDiagnosisState("loading");
    setErrorMessage("");
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mocked detection results as the provided AI flow does not perform image analysis
      const mockedDetection = {
        condition: 'Mild Eczema',
        severity: 'Mild',
      };
      
      const aiResponse = await generatePersonalizedCareSuggestions({
        condition: mockedDetection.condition,
        severity: mockedDetection.severity,
        patientDetails: patientDetails || "No additional details provided.",
      });

      setResults({ ...aiResponse, ...mockedDetection });
      setDiagnosisState("results");
    } catch (error) {
      console.error("AI Analysis Error:", error);
      const message = "An error occurred during analysis. Please try again.";
      setErrorMessage(message);
      setDiagnosisState("error");
      toast({
        title: "Analysis Failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setImagePreview(null);
    setPatientDetails("");
    setResults(null);
    setDiagnosisState("idle");
    setErrorMessage("");
  };

  const renderContent = () => {
    switch (diagnosisState) {
      case "loading":
        return (
          <div className="w-full">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Bot className="h-12 w-12 animate-spin text-primary" />
              <p className="text-lg text-muted-foreground">AI is analyzing your image...</p>
            </div>
            <div className="mt-8 space-y-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        );
      case "results":
        if (!results) return null;
        return (
          <Card className="w-full shadow-lg overflow-hidden">
            <CardHeader className="bg-primary/10">
              <CardTitle className="text-2xl">Analysis Complete</CardTitle>
              <CardDescription>Here is a preliminary analysis and care plan based on the image provided.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {imagePreview && (
                  <div className="md:col-span-1">
                    <p className="text-sm font-medium mb-2">Submitted Image</p>
                    <Image
                      src={imagePreview}
                      alt="Uploaded skin condition"
                      width={200}
                      height={200}
                      className="rounded-lg object-cover w-full aspect-square"
                    />
                  </div>
                )}
                <div className="md:col-span-2 space-y-4">
                   <div className="space-y-1">
                      <h3 className="font-semibold text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />Detected Condition</h3>
                      <p className="text-muted-foreground">{results.condition}</p>
                   </div>
                   <div className="space-y-1">
                      <h3 className="font-semibold text-lg flex items-center gap-2"><Activity className="h-5 w-5 text-primary" />Severity Level</h3>
                      <Badge variant={results.severity.toLowerCase() === 'mild' ? 'default' : 'destructive'}>{results.severity}</Badge>
                   </div>
                </div>
              </div>

              <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg"><Lightbulb className="mr-2 h-5 w-5 text-accent-foreground" />Personalized Care Suggestions</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">{results.careSuggestions}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg"><Pill className="mr-2 h-5 w-5 text-accent-foreground" />Medicine Recommendations</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">{results.medicineRecommendations}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg"><ShieldCheck className="mr-2 h-5 w-5 text-accent-foreground" />Prevention Tips</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">{results.preventionTips}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg"><Activity className="mr-2 h-5 w-5 text-accent-foreground" />Follow-up Guidance</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">{results.followUpGuidance}</AccordionContent>
                </AccordionItem>
              </Accordion>

              <Card className="bg-destructive/10 border-destructive/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive"><AlertTriangle className="h-5 w-5"/>Disclaimer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-destructive/90">This AI-generated analysis is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
                  </CardContent>
              </Card>

              <Button onClick={handleReset} variant="outline" className="w-full"><Undo2 className="mr-2 h-4 w-4" /> Start New Analysis</Button>
            </CardContent>
          </Card>
        );
      case "error":
        return (
          <Card className="text-center p-6 sm:p-8 bg-destructive/10 border-destructive/50">
            <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
            <h3 className="mt-4 text-xl font-semibold text-destructive">Analysis Failed</h3>
            <p className="mt-2 text-destructive/90">{errorMessage}</p>
            <Button onClick={handleReset} variant="destructive" className="mt-6">Try Again</Button>
          </Card>
        );
      case "idle":
      default:
        return (
          <Card className="w-full shadow-lg">
            <CardHeader>
              <CardTitle>Submit for Analysis</CardTitle>
              <CardDescription>Provide an image and any relevant details about your condition.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="skin-image">Upload or Capture Image</Label>
                <div className="p-4 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-primary transition-colors" onClick={() => document.getElementById('image-upload-input')?.click()}>
                  <input id="image-upload-input" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  {imagePreview ? (
                    <div className="relative aspect-square max-w-[200px] mx-auto">
                      <Image src={imagePreview} alt="Selected skin preview" layout="fill" className="rounded-md object-cover" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2 text-muted-foreground">
                      <UploadCloud className="w-12 h-12" />
                      <p>Drag & drop, or click to upload</p>
                      <span className="text-xs">PNG, JPG, GIF up to 10MB</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="patient-details">Additional Details (Optional)</Label>
                <Textarea
                  id="patient-details"
                  placeholder="e.g., age, sex, duration of symptoms, known allergies..."
                  value={patientDetails}
                  onChange={(e) => setPatientDetails(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <Button onClick={handleDiagnose} disabled={!imagePreview || diagnosisState === "loading"} className="w-full" size="lg">
                <Bot className="mr-2 h-5 w-5" />
                {diagnosisState === "loading" ? "Analyzing..." : "Run AI Diagnosis"}
              </Button>
            </CardContent>
          </Card>
        );
    }
  };

  return <div className="w-full">{renderContent()}</div>;
}
