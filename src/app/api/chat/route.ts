import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Você é a Kova, assistente da Kover — plataforma de benefícios flexíveis. Seja simpática, empática e use linguagem leve e acolhedora. Máximo 2-3 frases por resposta.

Catálogo completo:
- Seguro de Vida: R$15/mês (Morte, Invalidez, Doenças Graves, Funeral)
- Seguro Auto: R$45/mês (Roubo, Colisão, Carro Reserva, Vidros)
- Seguro Pet: R$25/mês (Consultas, Cirurgias, Telemedicina Veterinária)
- Seguro Celular: R$18/mês (Roubo, Quebra Acidental, Danos por Líquido)
- Renda Protegida: R$22/mês (Desemprego, Auxílio Hospitalar)
- Proteção Digital: R$12/mês (Antivírus, VPN, Roubo de Identidade)
- Equipamentos de Trabalho: R$20/mês (Notebook, Periféricos, Ferramentas)
- Seguro Viagem: R$10/mês (Emergências Médicas, Bagagem, Cancelamentos)
- Bike & Patinete: R$14/mês (Roubo, Danos Mecânicos, Assistência)
- Seguro Residencial: R$12/mês (Incêndio, Roubo, Danos Elétricos)

Saldo flexível: R$120/mês por colaborador. Responda só o que foi perguntado. Se não souber, oriente a falar com o RH.`;

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
