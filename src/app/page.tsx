import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { placeholderImages } from "@/lib/placeholder-images";
import { BrainCircuit, HeartHandshake, Sparkles, Upload, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: <Upload className="h-8 w-8 text-primary" />,
    title: "Seamless Image Upload",
    description: "Easily upload or capture a photo of your skin concern for quick analysis. Our platform accepts various image formats for your convenience."
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: "Advanced AI Analysis",
    description: "Our state-of-the-art AI, trained on millions of images, analyzes your photo to identify potential skin conditions with high accuracy."
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "Instant Results",
    description: "Receive a preliminary diagnosis and severity assessment in seconds. No more waiting anxiously for appointments."
  },
  {
    icon: <HeartHandshake className="h-8 w-8 text-primary" />,
    title: "Personalized Care Plan",
    description: "Get customized care suggestions, including lifestyle tips and over-the-counter medicine recommendations, tailored to your condition."
  }
];

const steps = [
  {
    name: "Upload Image",
    description: "Submit a clear, well-lit photo of the skin area.",
  },
  {
    name: "AI Analysis",
    description: "Our AI algorithm processes your image in real-time.",
  },
  {
    name: "Get Your Plan",
    description: "Receive your personalized report and care suggestions.",
  },
];

export default function Home() {
  const heroImage = placeholderImages['hero'];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40">
           <div className="absolute inset-0 bg-primary/10 -z-10"></div>
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Your Personal AI Dermatology Assistant
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Get instant, AI-driven analysis of your skin conditions. Upload an image to receive a preliminary diagnosis and personalized care recommendations.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/diagnosis">Start Your Analysis <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  width={1200}
                  height={600}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Take Control of Your Skin Health</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides a quick, confidential, and accessible way to understand your skin.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
              {features.map((feature, index) => (
                <Card key={index} className="h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <CardHeader className="flex flex-col items-center text-center">
                    {feature.icon}
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-sm text-muted-foreground">
                    {feature.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">A Simple 3-Step Process</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Get from concern to clarity in just a few minutes.
              </p>
            </div>
            <div className="relative grid gap-10 sm:grid-cols-3">
              <div
                className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"
                aria-hidden="true"
              ></div>
              {steps.map((step, index) => (
                <div key={index} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                    <span className="text-2xl font-bold">{index + 1}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{step.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-background">
        <p className="text-xs text-muted-foreground">&copy; 2024 SkinVision AI. All rights reserved. This is not a substitute for professional medical advice.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
