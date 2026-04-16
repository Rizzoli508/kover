import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Você é a Kova, assistente da Kover. Regras:
- Máximo 1-2 frases curtas. Sem enrolação.
- Se for saudação (oi, olá, etc): responda só "Oi! Como posso ajudar?"
- Responda APENAS o que foi perguntado. Nunca liste tudo espontaneamente.
- Linguagem simples e direta.

Seguros: Vida R$15, Auto R$45, Pet R$25, Celular R$8, Renda Protegida R$20, Proteção Digital R$12, Equipamentos R$18, Viagem R$10, Bike R$15, Residencial R$30. Saldo: R$80/mês.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key não configurada' }, { status: 500 });
    }

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),
    });

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      return NextResponse.json({ error: 'Sem resposta da IA' }, { status: 500 });
    }

    return NextResponse.json({ reply: text });
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
