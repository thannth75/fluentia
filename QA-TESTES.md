# QA e Testes — FluentIA 7.0

## Regra de liberação

Nenhuma versão deve ser tratada como pronta apenas porque abriu no navegador. A release precisa passar por:

1. reconstrução completa do `dist`;
2. validação de sintaxe JavaScript;
3. verificação dos assets PWA;
4. teste do endpoint Lia;
5. teste específico do avatar Lia 3D;
6. testes funcionais das regras pedagógicas críticas;
7. validação do deployment de produção.

## Lia 3D

A release precisa manter:
- estrutura visual própria do avatar;
- estados `idle`, `listening`, `thinking`, `speaking`, `correcting`, `happy`, `celebrate` e `coach`;
- início da síntese de voz ligado ao estado `speaking`;
- início do reconhecimento de voz ligado ao estado `listening`;
- pensamento enquanto espera o backend;
- correção/incentivo após resposta;
- reação em pronúncia e shadowing;
- comemoração após aprovação;
- fallback de movimento reduzido;
- rótulo acessível da personagem.

## Speak First

A release precisa garantir:
- atividade de repetição oral dentro de cada unidade;
- atividade final de transferência/fala livre;
- navegador com reconhecimento de voz não pode concluir a unidade pulando a fala;
- repetição oral >= 75%;
- fala livre >= 70%;
- feedback palavra por palavra;
- reconhecimento com transcrição intermediária;
- histórico de conversa persistente;
- palavra salva da conversa entra no SRS;
- jogos não substituem critérios de prova.

## Progressão
- níveis começam bloqueados conforme a trilha;
- concluir unidades não é suficiente para avançar;
- prova final só libera com 100% das unidades e checkpoint >= 80%;
- reprovação mantém a próxima faixa bloqueada;
- aprovação libera somente a próxima faixa correta.

## Prova final
- leitura >= 80%;
- conversação média >= 80%;
- nenhuma resposta conversacional abaixo de 70%;
- em navegador com reconhecimento de voz, pelo menos 2 de 3 respostas devem vir do microfone;
- indisponibilidade do reconhecimento de voz deve ser informada, nunca simulada.

## Certificado
- só pode existir após aprovação no C2;
- precisa mostrar nome, data, notas e identificador;
- precisa declarar que é certificado interno do FluentIA;
- não pode afirmar equivalência automática a Cambridge, IELTS, TOEFL ou certificação CEFR oficial;
- não pode prometer sotaque nativo perfeito.

## PWA e segurança
- `manifest.webmanifest` válido;
- ícones 192 e 512 válidos;
- service worker sem erro de sintaxe;
- cache versionado;
- rotas `/api/` fora do service worker;
- app continua utilizável quando voz não existe;
- bundle sem chave privada;
- headers de segurança ativos em produção.

## Comando obrigatório

```bash
npm run verify
```

Uma release não deve ser divulgada como estável se esse comando falhar.
