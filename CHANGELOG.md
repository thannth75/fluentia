# Changelog

## 6.4.0 — Produção, domínio e estabilidade

- build principal substituído por release autocontida, removendo dependência da cadeia histórica frágil de patches;
- Sprint de 12 minutos ligado à navegação real;
- Shadowing ligado à navegação real com treino de repetição;
- progressão reforçada: a faixa seguinte depende da aprovação na prova final anterior;
- prova final com compreensão e produção conversacional;
- variação de itens para reduzir simples memorização de resposta;
- certificado interno protegido pela aprovação final no C2;
- Lia mantida funcional sem API paga, com endpoint local de coaching e fallback;
- endpoint `/api/lia` com validação, sanitização, limite básico por origem/IP e `no-store`;
- nenhuma IA recebe autoridade para aprovar nível ou certificado;
- service worker atualizado para cache 6.4 e exclusão explícita de `/api/`;
- PWA consolidada;
- build verifica sintaxe do JavaScript inline, service worker, manifesto e presença de possíveis segredos;
- headers de segurança reforçados no Vercel;
- documentação alinhada à versão 6.4.

## 6.3.0 — Provas finais e certificado

- prova final obrigatória em A0, A1, A2, B1, B2, C1 e C2;
- leitura e produção conversacional avaliadas separadamente;
- próxima faixa bloqueada até aprovação;
- evidência de voz quando o navegador oferece reconhecimento de fala;
- certificado interno após aprovação no C2;
- aviso explícito de que o certificado não é acreditação oficial CEFR, Cambridge, IELTS ou TOEFL.

## 6.2.0 — Aprendizado adaptativo e qualidade

- Sprint prático;
- rotação de habilidades;
- personalização por ritmo e preferência;
- melhorias de segurança, PWA e acessibilidade;
- suíte principal anterior validada com 60/60 verificações no ambiente de QA.
