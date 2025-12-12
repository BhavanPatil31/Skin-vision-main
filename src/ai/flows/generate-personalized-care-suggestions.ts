'use server';
/**
 * @fileOverview Flow for generating personalized care suggestions based on detected skin condition and severity.
 *
 * - generatePersonalizedCareSuggestions - A function that generates personalized care suggestions.
 * - GeneratePersonalizedCareSuggestionsInput - The input type for the generatePersonalizedCareSuggestions function.
 * - GeneratePersonalizedCareSuggestionsOutput - The return type for the generatePersonalizedCareSuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePersonalizedCareSuggestionsInputSchema = z.object({
  condition: z.string().describe('The detected skin condition.'),
  severity: z.string().describe('The severity level of the skin condition.'),
  patientDetails: z.string().describe('Details about the patient, including age, sex, and medical history.')
});
export type GeneratePersonalizedCareSuggestionsInput = z.infer<typeof GeneratePersonalizedCareSuggestionsInputSchema>;

const GeneratePersonalizedCareSuggestionsOutputSchema = z.object({
  careSuggestions: z.string().describe('Personalized care suggestions for managing the skin condition.'),
  medicineRecommendations: z.string().describe('AI-driven medicine recommendations for the condition.'),
  preventionTips: z.string().describe('Prevention tips to avoid recurrence of the condition.'),
  followUpGuidance: z.string().describe('Guidance on when and how to follow up with a healthcare professional.'),
});
export type GeneratePersonalizedCareSuggestionsOutput = z.infer<typeof GeneratePersonalizedCareSuggestionsOutputSchema>;

export async function generatePersonalizedCareSuggestions(
  input: GeneratePersonalizedCareSuggestionsInput
): Promise<GeneratePersonalizedCareSuggestionsOutput> {
  return generatePersonalizedCareSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedCareSuggestionsPrompt',
  input: { schema: GeneratePersonalizedCareSuggestionsInputSchema },
  output: { schema: GeneratePersonalizedCareSuggestionsOutputSchema },
  prompt: `You are a dermatology expert providing personalized care suggestions for skin conditions.

  Based on the detected skin condition, its severity, and patient details, generate personalized care suggestions, medicine recommendations, prevention tips, and follow-up guidance.

  Condition: {{{condition}}}
  Severity: {{{severity}}}
  Patient Details: {{{patientDetails}}}

  Provide the output in a structured format.
  `,
});

const generatePersonalizedCareSuggestionsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedCareSuggestionsFlow',
    inputSchema: GeneratePersonalizedCareSuggestionsInputSchema,
    outputSchema: GeneratePersonalizedCareSuggestionsOutputSchema,
  },
  async (input: GeneratePersonalizedCareSuggestionsInput) => {
    const response = await prompt(input);
    if (!response) {
      throw new Error('Failed to generate response');
    }
    const { output } = response;
    return output!;
  }
);
