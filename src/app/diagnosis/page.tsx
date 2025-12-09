import DiagnosisTool from "@/components/app/diagnosis-tool";

export default function DiagnosisPage() {
  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="space-y-4 text-center mb-8 md:mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Skin Analysis
          </h1>
          <p className="text-muted-foreground md:text-xl max-w-2xl mx-auto">
            Upload or capture an image of the affected skin area to get an AI-powered analysis.
          </p>
        </div>
        <DiagnosisTool />
      </div>
    </div>
  );
}
