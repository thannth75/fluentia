# FluentIA 7.0.0 — Speak First

FluentIA é uma plataforma gratuita e local-first para estudar inglês do Pre-A1/A0 ao C2 com foco em uso real do idioma.

A versão 7 muda a prioridade do produto: **o aluno precisa produzir inglês, não apenas reconhecer respostas**.

## Método Speak First

Cada unidade segue o ciclo:

**ouvir → repetir em voz alta → compreender → escrever → produzir uma frase nova → receber feedback → revisar depois**

Quando o navegador oferece reconhecimento de voz, a unidade exige evidência oral para ser concluída.

Critérios internos da unidade:
- pelo menos 75% de desempenho geral;
- pelo menos 75% de inteligibilidade na repetição oral;
- pelo menos 70% na fala livre/transferência;
- atividade oral realmente feita pelo microfone quando o navegador oferece suporte.

Quando reconhecimento de voz não existe no dispositivo, o aluno recebe fallback em texto. A plataforma informa que essa tentativa não comprova fala.

## Feedback de fala

O FluentIA mostra:
- transcrição entendida pelo navegador;
- pontuação interna de inteligibilidade;
- palavras reconhecidas;
- palavras esperadas que não foram reconhecidas;
- palavras extras;
- necessidade de repetir antes de avançar.

Essa análise ajuda a praticar clareza, mas não é uma análise fonética clínica e não mede sotaque com precisão laboratorial.

## Conversação com a Lia

A conversa agora mantém histórico local por cenário.

O aluno pode:
- falar pelo microfone;
- acompanhar legenda/transcrição;
- receber correção imediata;
- continuar uma conversa contextual;
- abrir a transcrição;
- tocar em uma palavra da conversa para salvá-la;
- enviar palavras salvas para revisão espaçada.

A Lia possui duas camadas:
1. **IA generativa opcional no servidor**, quando `GEMINI_API_KEY` estiver configurada;
2. **coach local gratuito**, usado como fallback automático.

A chave nunca fica no navegador. Falha de rede ou cota externa não impede o curso-base de continuar.

O backend pode usar `GEMINI_MODEL`; o padrão configurado no código é `gemini-3.5-flash-lite`.

A Lia não pode aprovar prova, liberar faixa ou emitir certificado. Essas decisões pertencem ao motor pedagógico.

## FluentIA Arcade

A versão 7 inclui jogos próprios de recuperação:

- **Audio Blitz** — ouvir antes de ler;
- **Meaning Rush** — reconhecer intenção rapidamente;
- **Sentence Builder** — reconstruir frases;
- **Reverse Recall** — recuperar inglês a partir de uma situação.

Os jogos usam conteúdo da própria trilha. Eles servem para repetição e memória; não substituem fala nem provas.

## Lia 3D interativa

A Lia continua como personagem vetorial 3D construída diretamente na interface.

Ela reage aos estados:
- ouvindo;
- pensando;
- falando;
- corrigindo;
- incentivando;
- comemorando.

Os olhos acompanham o ponteiro, a boca reage à síntese de voz e os estados são acionados pelo funcionamento real da aplicação.

## Trilha e provas

A trilha vai de Pre-A1/A0 até C2.

Cada nível possui avaliação final antes da liberação da faixa seguinte.

A avaliação combina compreensão e produção. O C2 pode liberar um **Certificado de Conquista Interna FluentIA** depois da aprovação.

O certificado não é Cambridge, IELTS, TOEFL, diploma acadêmico ou certificação CEFR oficial.

## Recursos

- trilha Pre-A1/A0 → C2;
- Speak First;
- plano diário adaptativo;
- Sprint de 12 minutos;
- Lia 3D;
- conversa com histórico;
- legenda de fala;
- palavras salvas da conversa;
- pronúncia;
- Shadowing;
- listening;
- ditado;
- reading;
- writing;
- gramática;
- vocabulário contextual;
- revisão espaçada;
- caderno de erros;
- FluentIA Arcade;
- cenários cotidianos, trabalho e EUA;
- provas finais;
- certificado interno;
- PWA;
- progresso local;
- backup/importação;
- núcleo educacional sem assinatura obrigatória.

## IA generativa opcional

Para habilitar conversação generativa no backend:

```
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-3.5-flash-lite
```

Sem essas variáveis, a Lia utiliza automaticamente o modo local. Nenhum segredo deve ser colocado no HTML ou JavaScript do navegador.

## Build

```bash
npm run verify
```

A verificação testa build, sintaxe da API, Lia, avatar e regras Speak First.

## Compromisso

A proposta do FluentIA é oferecer ensino útil para quem não pode pagar um curso, sem usar a gratuidade como desculpa para ensino superficial.

Isso também significa não fazer promessas falsas. Nenhum aplicativo pode garantir sotaque nativo, fluência em prazo fixo ou ausência absoluta de bugs. O compromisso é exigir produção real, medir o que pode ser medido, informar limitações e manter a evolução transparente.
