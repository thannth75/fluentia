# FluentIA 6.6.0 — Status de produção

Verificação executada em 28/09/2026.

## Produção

- URL pública: https://fluentia-delta.vercel.app/
- Vercel conectado à branch `main`
- versão publicada: 6.6.0
- `build-info.json`: HTTP 200 e versão 6.6.0
- deployment de produção: READY
- aliases de produção ativos
- erros de runtime observados na verificação: nenhum

## Interface e Lia

- logo FluentIA próprio ativo;
- home premium sem cartão de assinatura obrigatória;
- Lia vetorial 3D construída no código, sem foto estática;
- olhos acompanham o ponteiro;
- boca anima enquanto a síntese de voz fala;
- estados: ociosa, ouvindo, pensando, falando, corrigindo, incentivando e comemorando;
- painel de estados da Lia visível na home;
- Lia reage ao microfone, ao backend, às correções, à pronúncia, ao shadowing e às provas;
- Lia flutuante disponível como atalho de prática.

## Aprendizado

- trilha A0/Pre-A1 a C2;
- leitura, listening, ditado, escrita, vocabulário e gramática;
- conversação guiada;
- pronúncia e shadowing;
- revisão espaçada e caderno de erros;
- cenários cotidianos, trabalho e EUA;
- Sprint prático;
- prova final por nível;
- próxima faixa bloqueada até aprovação;
- certificado interno somente após aprovação final no C2.

## Produção e segurança

- página inicial: HTTP 200;
- manifesto PWA: HTTP 200;
- logo SVG: HTTP 200;
- endpoint `/api/lia`: ativo e rejeita GET com HTTP 405;
- rotas `/api/` não são armazenadas pelo service worker;
- cache atual: `fluentia-6.6.0`;
- atualização do service worker aplica a versão nova após troca de controller;
- CSP e headers de segurança ativos;
- câmera e geolocalização desabilitadas;
- microfone limitado à própria origem;
- nenhuma chave privada no cliente;
- build executa validação de sintaxe, assets e scan de segredos.

## Limites honestos

Nenhum software sério pode garantir ausência absoluta de bugs, prazo fixo de fluência ou sotaque nativo para todas as pessoas.

O compromisso do FluentIA é diferente: manter a trilha principal gratuita, exigir evidência real antes de avançar, informar limitações e corrigir problemas sem falsificar resultado pedagógico.
