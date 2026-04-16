import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Você é a Kova, assistente virtual da Kover — plataforma de benefícios flexíveis para empresas.
Responda de forma simpática, direta e em português. Seja concisa (máximo 3 parágrafos).

Catálogo de seguros disponíveis:
- Seguro de Vida (a partir de R$15/mês): Morte Natural/Acidental, Invalidez, Doenças Graves, Assistência Funeral
- Seguro Auto (a partir de R$45/mês): Roubo e Furto, Colisão, Carro Reserva, Vidros
- Seguro Pet (a partir de R$25/mês): Consultas/Exames, Cirurgias, Telemedicina Veterinária
- Seguro Celular (a partir de R$8/mês): Roubo, Quebra Acidental, Danos por Líquido
- Renda Protegida (a partir de R$20/mês): Desemprego Involuntário, Auxílio Hospitalar
- Proteção Digital (a partir de R$12/mês): Antivírus, VPN, Roubo de Identidade
- Equipamentos de Trabalho (a partir de R$18/mês): Notebook, Periféricos, Ferramentas
- Seguro Viagem (a partir de R$10/mês): Emergências Médicas, Bagagem, Cancelamentos
- Seguro Bike (a partir de R$15/mês): Roubo, Danos Mecânicos, Assistência em Viagem
- Seguro Residencial (a partir de R$30/mês): Incêndio, Roubo, Danos Elétricos, Responsabilidade Civil

O saldo flexível padrão é R$80/mês por colaborador, que pode ser usado em qualquer combinação de seguros.
Se não souber algo, oriente o usuário a falar com o RH.`;

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
