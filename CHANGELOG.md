# Changelog

## 6.5.0 — Lia 3D realmente interativa

- substituição do antigo marcador visual genérico por uma personagem Lia construída em CSS 3D/Web, sem depender de biblioteca paga ou CDN externa;
- rosto, olhos, pupilas, sobrancelhas, boca, cabelo, cabeça, tronco, braços, luz e profundidade próprios;
- olhos acompanham o ponteiro do usuário;
- boca anima enquanto a síntese de voz está falando;
- estados visuais reais: ociosa, ouvindo, pensando, falando, corrigindo, incentivando e comemorando;
- reações ligadas à conversação, reconhecimento de voz, correções, aulas, pronúncia, shadowing e provas finais;
- Lia flutuante disponível em toda a aplicação com atalhos para conversa, fala e Sprint;
- Lia ampliada na tela de conversação;
- respeito a `prefers/reduce motion` via configuração do app;
- testes automáticos específicos para estados e integração do avatar;
- cache PWA atualizado para 6.5.0.

## 6.4.2 — Lia integrada ao backend

- tela de conversação passa a chamar `/api/lia` de verdade;
- timeout de rede e fallback para roteiro local quando o backend falha;
- nota de conversação continua independente da resposta da Lia;
- backend recebe nível, objetivo e próxima pergunta do cenário para orientar a prática;
- validação JSON, sanitização, proteção básica contra chamadas cross-site e rate limit;
- nenhuma IA pode aprovar prova, liberar faixa ou emitir certificado;
- cache PWA atualizado para 6.4.2.

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
