'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing AI-driven medicine recommendations, prevention tips, and follow-up guidance for identified skin conditions.
 *
 * The flow takes a skin condition as input and returns actionable steps for treatment and prevention.
 * - provideMedicationRecommendations - A function that handles the skin condition and returns treatment/prevention steps.
 * - MedicationRecommendationsInput - The input type for the provideMedicationRecommendations function.
 * - MedicationRecommendationsOutput - The return type for the provideMedicationRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicationRecommendationsInputSchema = z.object({
  skinCondition: z.string().describe('The identified skin condition.'),
  severityLevel: z.string().describe('The severity level of the skin condition (e.g., mild, moderate, severe).'),
  patientDetails: z.string().optional().describe('Additional details about the patient.'),
});
export type MedicationRecommendationsInput = z.infer<typeof MedicationRecommendationsInputSchema>;

const MedicationRecommendationsOutputSchema = z.object({
  medicineRecommendations: z.string().describe('AI-driven medicine recommendations for the skin condition.'),
  preventionTips: z.string().describe('Prevention tips to avoid recurrence of the skin condition.'),
  followUpGuidance: z.string().describe('Guidance on when and how to follow up with a healthcare professional.'),
});
export type MedicationRecommendationsOutput = z.infer<typeof MedicationRecommendationsOutputSchema>;

export async function provideMedicationRecommendations(input: MedicationRecommendationsInput): Promise<MedicationRecommendationsOutput> {
  return provideMedicationRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'medicationRecommendationsPrompt',
  input: {schema: MedicationRecommendationsInputSchema},
  output: {schema: MedicationRecommendationsOutputSchema},
  prompt: `You are a dermatology expert providing guidance on skin conditions.

  Based on the identified skin condition, severity level, and any provided patient details, generate medicine recommendations, prevention tips, and follow-up guidance.

  Skin Condition: {{{skinCondition}}}
  Severity Level: {{{severityLevel}}}
  Patient Details: {{{patientDetails}}}

  Provide actionable steps for treatment and prevention.
  Format the output in a clear and concise manner.
  ${MedicationRecommendationsOutputSchema.shape.medicineRecommendations.description}
  ${MedicationRecommendationsOutputSchema.shape.preventionTips.description}
  ${MedicationRecommendationsOutputSchema.shape.followUpGuidance.description}`,
});

const provideMedicationRecommendationsFlow = ai.defineFlow(
  {
    name: 'provideMedicationRecommendationsFlow',
    inputSchema: MedicationRecommendationsInputSchema,
    outputSchema: MedicationRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
