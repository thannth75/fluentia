# QA e Testes — FluentIA 6.3

Este documento define o mínimo necessário para considerar uma versão pronta para publicação.

## Regra de liberação

Nenhuma versão deve ser tratada como pronta apenas porque abriu no navegador. A release precisa passar por:

1. reconstrução completa do `dist`;
2. verificação SHA-256 dos arquivos empacotados;
3. validação de sintaxe JavaScript;
4. verificação dos assets PWA;
5. testes funcionais das regras pedagógicas críticas;
6. verificação manual em celular e desktop antes de divulgar amplamente.

## Critérios críticos

### Progressão
- níveis começam bloqueados conforme a trilha;
- concluir unidades não é suficiente para avançar;
- prova final só libera com 100% das unidades e checkpoint >= 80%;
- reprovação mantém a próxima faixa bloqueada;
- aprovação libera somente a próxima faixa correta.

### Prova final
- leitura >= 80%;
- conversação média >= 80%;
- nenhuma resposta conversacional abaixo de 70%;
- em navegador com reconhecimento de voz, pelo menos 2 de 3 respostas devem vir do microfone;
- indisponibilidade do reconhecimento de voz deve ser informada, nunca simulada.

### Certificado
- só pode existir após aprovação no C2;
- precisa mostrar nome, data, notas e identificador;
- precisa declarar que é certificado interno do FluentIA;
- não pode afirmar equivalência automática a Cambridge, IELTS, TOEFL ou certificação CEFR oficial;
- não pode prometer sotaque nativo perfeito.

### PWA
- `manifest.webmanifest` válido;
- ícones 192 e 512 disponíveis;
- service worker sem erro de sintaxe;
- app continua utilizável quando recursos de voz não existem;
- dados locais não podem impedir o app de abrir após atualização.

## Automação

O workflow **FluentIA Quality Gate** roda em cada push/PR da branch principal e executa `npm run verify`.

Uma versão com workflow vermelho não deve ser divulgada como estável.

## Testes humanos recomendados

Antes de uma divulgação grande:
- Android/Chrome;
- desktop Chrome;
- Edge;
- Firefox como fallback;
- teclado sem mouse;
- zoom 200%;
- microfone permitido;
- microfone negado;
- modo offline após primeiro carregamento;
- progresso existente de versão anterior.

## Registro de falhas

Falhas devem ser descritas com:
- navegador/dispositivo;
- ação executada;
- resultado esperado;
- resultado observado;
- print/log quando houver;
- versão do FluentIA.
