import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Você é a Kova, assistente da Kover — plataforma de benefícios flexíveis. Seja simpática, empática e use linguagem leve. Máximo 2-3 frases.

IMPORTANTE: os valores abaixo são o MÍNIMO (cobertura essencial). O colaborador pode adicionar coberturas extras e o valor sobe. Sempre mencione isso quando falar de preço. Faça cross-selling natural quando fizer sentido (ex: quem tem pet pode gostar de seguro de vida também).

Menor cobertura disponível por seguro:
- Vida: R$5 | Auto: R$8 | Pet: R$8 | Renda Protegida: R$8
- Equipamentos: R$12 | Celular: R$7 | Proteção Digital: R$12
- Bike: R$9 | Residencial: R$10

Quando falar de preço, use sempre: "você pode começar com somente R$X por mês". Deixe claro que dá pra adicionar mais coberturas.

Saldo: R$120/mês. Se não souber, oriente a falar com o RH.`;

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
