import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const HAS_KEY = Boolean(
  process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GENKIT_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY
);

const MISSING_KEY_ERROR =
  'GenkitError: Please set `GEMINI_API_KEY`, `GOOGLE_API_KEY`, or `GENKIT_API_KEY` environment variable.';

function createMissingKeyStub() {
  const err = () => {
    throw new Error(MISSING_KEY_ERROR + '\nFor more details see https://genkit.dev/docs/plugins/google-genai/');
  };

  const stubPrompt = (_opts?: any) => {
    const fn = async () => {
      err();
    };
    return fn;
  };

  const stubFlow = (_opts?: any, _fn?: any) => {
    return async () => {
      err();
    };
  };

  return {
    definePrompt: stubPrompt,
    defineFlow: stubFlow,
  } as const;
}

export const ai = HAS_KEY
  ? genkit({
      plugins: [googleAI()],
      model: 'googleai/gemini-2.5-flash',
    })
  : createMissingKeyStub();
