'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
});

const ChatWithSkinImageInputSchema = z.object({
    image: z.string().describe('The base64 encoded image of the skin condition.'),
    history: z.array(MessageSchema).describe('The chat history.'),
    question: z.string().describe('The user\'s current question.'),
});

export type ChatWithSkinImageInput = z.infer<typeof ChatWithSkinImageInputSchema>;

export const chatWithSkinImage = ai.defineFlow(
    {
        name: 'chatWithSkinImage',
        inputSchema: ChatWithSkinImageInputSchema,
        outputSchema: z.string(),
    },
    async (input: ChatWithSkinImageInput) => {
        const { image, history, question } = input;

        const systemPrompt = `You are a helpful AI dermatology assistant.
The user has uploaded an image of a skin condition.
Answer their questions based on the visual evidence in the image and your medical knowledge.
Be helpful, cautious, and always remind them to see a doctor for a real diagnosis.
`;

        const response = await ai.generate({
            system: systemPrompt,
            messages: [
                ...history.map(m => ({ role: m.role, content: [{ text: m.content }] })),
                {
                    role: 'user',
                    content: [
                        { media: { url: image } },
                        { text: question }
                    ]
                }
            ]
        });

        return response.text;
    }
);
