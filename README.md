# FluentIA v5 — Lia

Plataforma gratuita de estudo de inglês do Pre-A1/A0 ao C2, com aprendizagem ativa, prática de fala, escuta, leitura, escrita, revisão espaçada e situações reais do dia a dia.

## Lia — professora-avatar

A v5 introduz a **Lia**, professora-avatar do FluentIA. Ela:
- aparece no dashboard e na conversação;
- conduz a missão diária;
- usa síntese de voz do navegador;
- reage visualmente enquanto fala;
- direciona cenários de vida real;
- ajuda o aluno a praticar inglês em contexto em vez de apenas responder alternativas.

## Conteúdo

- 98 unidades, 14 por nível de A0 a C2;
- 32 questões de nivelamento;
- listening, ditado, leitura, escrita, vocabulário, gramática e speaking;
- revisão espaçada e recuperação ativa de erros;
- checkpoints e progresso por habilidade;
- inglês para EUA e trabalho;
- cenários de supermercado, restaurante, banco, farmácia, transporte, telefone, escola, família, moradia, emergência, DMV/documentos, atendimento, entrevista, delivery, warehouse, TI e muito mais.

## Produção

O Vercel está conectado a este repositório. Cada push na `main` dispara um novo deployment.

O build é determinístico:
1. reconstrói os assets comprimidos;
2. verifica SHA-256;
3. aplica o patch v5 da Lia ao app base;
4. verifica o SHA-256 final do `app.js`;
5. publica `dist/`.

Isso impede que um arquivo truncado seja publicado silenciosamente.

## Validação v5

Antes da publicação:
- 52/52 testes de interface passaram;
- 98 unidades verificadas;
- service worker validado;
- JavaScript validado por sintaxe;
- teste de desempenho sem page errors.

## Privacidade

O progresso fica no navegador do usuário nesta versão. Não há cadastro obrigatório, anúncios ou trackers.

## Deploy

Produção: https://fluentia-nathanpires755-4642s-projects.vercel.app

> Observação: se a URL redirecionar para autenticação Vercel, a proteção de deployment do projeto precisa ser desativada em Vercel > Project Settings > Deployment Protection para liberar acesso público.
