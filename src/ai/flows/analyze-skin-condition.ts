'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeSkinConditionInputSchema = z.object({
    image: z.string().describe('The base64 encoded image of the skin condition.'),
    patientDetails: z.string().optional().describe('Details about the patient, including age, sex, and medical history.'),
});

export type AnalyzeSkinConditionInput = z.infer<typeof AnalyzeSkinConditionInputSchema>;

const AnalyzeSkinConditionOutputSchema = z.object({
    condition: z.string().describe('The detected skin condition or cancer type (e.g., Melanoma, Basal Cell Carcinoma).'),
    stage: z.string().describe('The estimated stage of the cancer or severity of the condition.'),
    requirements: z.string().describe('What is required for this stage/type (e.g., biopsy, immediate consultation, observation).'),
    careSuggestions: z.string().describe('Personalized care suggestions for managing the skin condition.'),
    medicineRecommendations: z.string().describe('AI-driven medicine recommendations for the condition.'),
    preventionTips: z.string().describe('Prevention tips to avoid recurrence of the condition.'),
    followUpGuidance: z.string().describe('Guidance on when and how to follow up with a healthcare professional.'),
});

export type AnalyzeSkinConditionOutput = z.infer<typeof AnalyzeSkinConditionOutputSchema>;

export async function analyzeSkinCondition(
    input: AnalyzeSkinConditionInput
): Promise<AnalyzeSkinConditionOutput> {
    return analyzeSkinConditionFlow(input);
}

const prompt = ai.definePrompt({
    name: 'analyzeSkinConditionPrompt',
    input: { schema: AnalyzeSkinConditionInputSchema },
    output: { schema: AnalyzeSkinConditionOutputSchema },
    prompt: `You are a dermatology expert. Analyze the provided image of a skin condition.
  
  Based on the visual analysis and any provided patient details, determine the likely condition, its stage or severity, and what medical actions are required (requirements).
  Also provide care suggestions, medicine recommendations, prevention tips, and follow-up guidance.

  Patient Details: {{{patientDetails}}}
  
  @media { url: "{{{image}}}" }
  
  Provide the output in a structured format.
  `,
});

const analyzeSkinConditionFlow = ai.defineFlow(
    {
        name: 'analyzeSkinConditionFlow',
        inputSchema: AnalyzeSkinConditionInputSchema,
        outputSchema: AnalyzeSkinConditionOutputSchema,
    },
    async (input: AnalyzeSkinConditionInput) => {
        try {
            console.log("Analyzing skin condition with model...");
            const response = await prompt(input);
            console.log("Analysis complete.");
            if (!response) {
                throw new Error('Failed to generate response');
            }
            const { output } = response;
            return output!;
        } catch (error) {
            console.error("Error in analyzeSkinConditionFlow:", error);
            throw error;
        }
    }
);
