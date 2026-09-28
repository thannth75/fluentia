# FluentIA 6.4.2 — Status de produção

Verificação executada em 28/09/2026.

## Produção

- URL pública: https://fluentia-delta.vercel.app/
- Vercel: produção conectada à branch `main`
- Versão publicada: 6.4.2
- build-info.json: disponível e identificado como 6.4.2
- deployment: READY
- runtime errors na verificação: nenhum encontrado

## Itens validados em produção

- página inicial responde HTTP 200;
- manifest PWA responde HTTP 200;
- service worker responde HTTP 200;
- ícone 192x192 responde HTTP 200 e MIME image/png;
- endpoint `/api/lia` existe e rejeita GET com HTTP 405, como esperado;
- cache do service worker está em `fluentia-6.4.2`;
- rotas `/api/` não são armazenadas pelo service worker;
- headers de segurança estão ativos;
- build-info não usa cache;
- microfone é permitido apenas para a própria origem;
- câmera e geolocalização permanecem desabilitadas;
- nenhuma chave de IA fica exposta no cliente.

## Critério de estabilidade

Não existe software com garantia honesta de zero bugs. A release é considerada pronta quando:

1. o build passa;
2. arquivos obrigatórios existem;
3. JavaScript e service worker passam na validação;
4. manifesto e ícones são válidos;
5. não há segredos no bundle;
6. regras de prova e certificado permanecem protegidas;
7. o deployment de produção fica READY;
8. não existem erros de runtime observados durante a verificação.

## Regra pedagógica

A Lia ajuda a ensinar, corrigir e orientar. Ela não aprova aluno por conta própria.

A progressão e o certificado dependem das regras de avaliação do FluentIA. Isso evita que uma resposta generativa, erro de rede ou indisponibilidade externa altere a comprovação de aprendizagem.
