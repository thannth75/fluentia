# FluentIA 6.6.0 — inglês na vida real

FluentIA é uma plataforma gratuita e local-first para estudar inglês do A0/Pre-A1 ao C2 com prática ativa, fala, escuta, leitura, escrita, vocabulário, gramática, revisão espaçada, situações reais e a professora virtual Lia.

## Lia 3D interativa

A Lia é uma personagem vetorial 3D construída diretamente para a web, não uma fotografia estática, GIF ou simples ícone.

Ela possui:
- rosto e corpo em CSS 3D/Web;
- olhos que acompanham o ponteiro;
- animação de boca durante a fala;
- estados de escuta, pensamento, fala, correção, incentivo e comemoração;
- reação durante reconhecimento de voz;
- reação às correções de aula;
- reação à pronúncia e shadowing;
- comemoração em conquistas;
- presença flutuante em toda a plataforma;
- integração com a tela de conversação e com o endpoint seguro da Lia.

O avatar não é um vídeo pré-gravado: seus estados são disparados pelo comportamento real da aplicação.

## Interface 6.6

A home foi reconstruída para deixar a prática em primeiro plano: Lia em destaque, estados visíveis da tutora, acesso imediato a conversação, pronúncia, listening, vocabulário, gramática, EUA, revisão, trilha de níveis, missão diária e situações reais.

Não existe cartão de plano pago ou bloqueio "Pro" na experiência principal.

## O que a 6.6 entrega

- trilha A0/Pre-A1 → C2;
- plano diário adaptativo;
- Sprint prático de 12 minutos;
- Shadowing para ouvir e repetir frases naturais;
- Lia 3D interativa;
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

As provas finais combinam compreensão e produção. A progressão depende de evidência de aprendizagem, e não apenas de cliques.

## Lia e IA

A Lia funciona como professora virtual, interface de prática, orientação e feedback.

Na versão gratuita atual, a tela de conversação chama o endpoint seguro `/api/lia`. Ele possui validação de entrada, bloqueio básico de requisições cruzadas, limite de requisições e coaching local gratuito. Se o endpoint falhar, a atividade continua com fallback local sem perder o progresso.

A Lia não possui autoridade para aprovar prova, liberar nível ou emitir certificado. Essa separação existe para evitar aprovação falsa causada por erro de IA ou indisponibilidade externa.

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
- build valida sintaxe, integração da Lia 3D, manifesto e assets antes da publicação.

## Build e validação

```bash
npm run verify
```

A validação 6.6 inclui testes dedicados ao avatar e à interface para confirmar que escuta, fala, pensamento, correção, comemoração, home premium e atualização do PWA continuam conectados ao código.

## Compromisso de gratuidade

O objetivo do projeto é oferecer uma rota de estudo séria para quem não pode pagar um curso. A trilha comunitária principal não exige assinatura obrigatória.

Gratuito não significa promessa falsa: nenhum software pode garantir zero bugs, fluência em prazo fixo ou sotaque nativo para todas as pessoas. O compromisso é ensinar, medir de forma transparente, corrigir falhas e manter os critérios de aprovação honestos.
