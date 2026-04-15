'use server';
/**
 * @fileOverview This file defines a Genkit flow for recommending insurance plans
 * based on a user's quiz answers.
 *
 * - recommendInsurancePlans - A function that takes quiz answers and returns recommended insurance plans.
 * - RecommendInsurancePlansInput - The input type for the recommendInsurancePlans function.
 * - RecommendInsurancePlansOutput - The return type for the recommendInsurancePlans function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema: Quiz Answers
const RecommendInsurancePlansInputSchema = z.object({
  professionalActivity: z.string().describe('The user\'s professional activity, e.g., Motorista/Entregador, Escritório/Administrativo. Options: Motorista/Entregador, Escritório/Administrativo, Operação/Campo, Remoto/Home office, Vendas externas, Outro.'),
  usesOwnVehicleForWork: z.enum(['Sim diariamente', 'Sim às vezes', 'Não']).describe('Whether the user uses their own vehicle for work (Sim diariamente / Sim às vezes / Não).'),
  financialDependents: z.array(z.enum(['Filhos', 'Cônjuge', 'Pais', 'Não tenho'])).describe('List of financial dependents, e.g., Filhos, Cônjuge, Pais, or Não tenho.'),
  mainConcern: z.enum([
    'Proteger minha renda',
    'Proteger minha família',
    'Proteger meu veículo',
    'Proteger meus bens',
    'Saúde e imprevistos',
  ]).describe('The user\'s main concern regarding protection. Options: Proteger minha renda, Proteger minha família, Proteger meu veículo, Proteger meus bens, Saúde e imprevistos.'),
});

export type RecommendInsurancePlansInput = z.infer<typeof RecommendInsurancePlansInputSchema>;

// Output Schema: Recommended Insurance Categories
const RecommendedInsuranceItemSchema = z.object({
  name: z.enum([
    'Seguro de Vida',
    'Acidentes Pessoais',
    'Proteção de Renda',
    'Seguro Auto',
    'Seguro Celular',
    'Seguro Residencial',
    'Seguro Bike/Patinete',
    'Seguro Pet',
    'Seguro Viagem',
    'Proteção Digital/Cyber',
  ]).describe('The name of the insurance category.'),
  isRecommended: z.boolean().describe('Whether this insurance category is recommended based on the quiz answers.'),
});

const RecommendInsurancePlansOutputSchema = z.array(RecommendedInsuranceItemSchema).describe('List of insurance categories with recommendation status.');

export type RecommendInsurancePlansOutput = z.infer<typeof RecommendInsurancePlansOutputSchema>;

// Wrapper function to call the Genkit flow
export async function recommendInsurancePlans(input: RecommendInsurancePlansInput): Promise<RecommendInsurancePlansOutput> {
  return recommendInsurancePlansFlow(input);
}

// Define the Genkit Prompt
const recommendInsurancePrompt = ai.definePrompt({
  name: 'recommendInsurancePrompt',
  input: { schema: RecommendInsurancePlansInputSchema },
  output: { schema: RecommendInsurancePlansOutputSchema },
  prompt: `You are an expert insurance advisor for Kover, a B2B2C platform. Based on the employee's quiz answers, you need to recommend relevant insurance categories from a predefined list.

Here are the employee's quiz answers:
- Professional Activity: {{{professionalActivity}}}
- Uses Own Vehicle for Work: {{{usesOwnVehicleForWork}}}
- Financial Dependents: {{{financialDependents}}}
- Main Concern: {{{mainConcern}}}

Here is the full list of available insurance categories:
- Seguro de Vida
- Acidentes Pessoais
- Proteção de Renda
- Seguro Auto
- Seguro Celular
- Seguro Residencial
- Seguro Bike/Patinete
- Seguro Pet
- Seguro Viagem
- Proteção Digital/Cyber

Please analyze the answers and for each insurance category in the list, determine if it is recommended for this employee. Set the 'isRecommended' field to true if it is highly relevant, otherwise set it to false. Ensure all categories from the list are present in the output array.`,
});

// Define the Genkit Flow
const recommendInsurancePlansFlow = ai.defineFlow(
  {
    name: 'recommendInsurancePlansFlow',
    inputSchema: RecommendInsurancePlansInputSchema,
    outputSchema: RecommendInsurancePlansOutputSchema,
  },
  async (input) => {
    const { output } = await recommendInsurancePrompt(input);
    if (!output) {
      throw new Error('Failed to get recommendations from the AI model.');
    }
    return output;
  }
);
