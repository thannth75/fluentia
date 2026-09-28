# FluentIA 6.4 — inglês na vida real

FluentIA é uma plataforma gratuita e local-first para estudar inglês do A0/Pre-A1 ao C2 com prática ativa, fala, escuta, leitura, escrita, vocabulário, gramática, revisão espaçada, situações reais e a professora virtual Lia.

## O que a 6.4 entrega

- trilha A0/Pre-A1 → C2;
- plano diário adaptativo;
- Sprint prático de 12 minutos;
- Shadowing para ouvir e repetir frases naturais;
- conversação guiada com feedback;
- pronúncia e reconhecimento de fala quando o navegador oferece suporte;
- listening, ditado, leitura e escrita;
- vocabulário e gramática contextualizados;
- revisão espaçada e caderno de erros;
- cenários cotidianos, EUA e trabalho;
- provas finais por nível;
- próxima faixa bloqueada até aprovação;
- certificado interno de conquista após aprovação no C2;
- PWA instalável e uso offline das partes locais após cache;
- progresso salvo no dispositivo;
- backup/importação de progresso;
- sem assinatura obrigatória para concluir a trilha principal.

## Como o progresso é tratado

O FluentIA não considera XP ou presença como prova de domínio. O fluxo é:

**ouvir → compreender → produzir → receber feedback → corrigir → recuperar da memória → aplicar → revisar → ser avaliado**

As provas finais combinam compreensão e produção. A intenção é tornar a progressão dependente de evidência de aprendizagem, e não apenas de cliques.

## Lia

A Lia funciona como interface de prática, orientação e feedback.

Na versão gratuita atual, o núcleo permanece funcional sem API paga. O endpoint `/api/lia` possui validação de entrada, limite básico de requisições e respostas locais de coaching para que indisponibilidade de um provedor externo não derrube o curso.

O projeto não finge que esse fallback local é um LLM irrestrito. Um modelo generativo externo pode ser conectado futuramente por backend seguro, sem expor chaves no navegador e sem receber autoridade para aprovar provas ou emitir certificados.

## Fala e pronúncia

O reconhecimento de fala depende do navegador/dispositivo. A pontuação representa evidência interna de inteligibilidade e execução da tarefa; ela não é medição clínica de sotaque e não promete transformar todo aluno em falante nativo.

O objetivo é desenvolver comunicação avançada, natural, funcional e independente.

## Certificado

Após aprovação final no C2, o aluno pode gerar um **Certificado de Conquista Interna FluentIA**.

Ele não é certificação CEFR oficial, diploma acadêmico, Cambridge, IELTS ou TOEFL.

## Privacidade e segurança

- sem chave de IA no cliente;
- sem câmera ou geolocalização necessárias;
- microfone somente mediante permissão;
- progresso local por padrão;
- endpoint da Lia com validação e rate limit básico;
- headers de segurança no Vercel;
- scan de segredos durante o build;
- service worker ignora rotas `/api/`;
- build valida sintaxe, manifesto e assets antes da publicação.

Consulte também `PRIVACIDADE.md`, `SEGURANCA.md`, `ACESSIBILIDADE.md`, `METODO-DE-ESTUDO.md` e `QA-TESTES.md`.

## Build

```bash
npm run verify
```

O build da 6.4 é autocontido e não depende da antiga cadeia de patches históricos para gerar a aplicação principal.

## Compromisso de gratuidade

O objetivo do projeto é oferecer uma rota de estudo séria para quem não pode pagar um curso. A trilha comunitária principal não exige assinatura obrigatória.

Gratuito não significa promessa falsa: nenhum software pode garantir zero bugs, fluência em prazo fixo ou sotaque nativo para todas as pessoas. O compromisso é ensinar, medir de forma transparente, corrigir falhas e manter os critérios de aprovação honestos.
