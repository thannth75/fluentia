# FluentIA

Plataforma gratuita de estudo de inglês do Pre-A1/A0 ao C2, com trilha estruturada, listening, speaking, leitura, escrita, revisão espaçada, checkpoints e módulos de inglês para trabalho e vida nos EUA.

## Produção

Este repositório usa um empacotamento determinístico para preservar arquivos grandes sem truncamento durante a publicação. `npm run build` reconstrói os arquivos em `dist/` e valida SHA-256 de cada artefato antes de escrever a saída.

```bash
npm run build
```

A configuração `vercel.json` usa `dist/` como diretório de publicação. Não há dependências NPM de terceiros no build.

## Conteúdo atual

- 98 unidades, 14 por nível de A0 a C2
- 32 questões de nivelamento
- listening, ditado, leitura, escrita, vocabulário, gramática e fala
- revisão espaçada e caderno de erros com recuperação ativa
- progresso local, backup e PWA/offline

## Privacidade

O progresso fica no navegador do usuário. Não há cadastro obrigatório, anúncios ou trackers nesta versão.


## Publicar no Vercel

[Deploy with Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fthannth75%2Fapp)

O projeto já contém `vercel.json`, `package.json` e `build.mjs`. No Vercel, importe este repositório e mantenha as configurações detectadas. O build executa `npm run build` e publica a pasta `dist`.
