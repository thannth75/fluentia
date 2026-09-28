# FluentIA 6.3 — Inglês na vida real

FluentIA é uma PWA gratuita de estudo de inglês, do A0 ao C2, com prática ativa, Lia 3D, conversação, listening, leitura, escrita, vocabulário, gramática, revisão espaçada e situações reais.

## Método

O ciclo principal é:

**ouvir → compreender → produzir → receber feedback → revisar → usar em situação real**

O sistema adapta ritmo, duração e tipo de prática à preferência e ao desempenho do aluno. Não trata pessoas como presas a um “estilo de aprendizagem” fixo.

## Lia

A Lia é a professora-avatar do FluentIA. Ela conduz missões, fala, escuta quando o navegador permite, reage a acertos/erros e orienta a prática.

## Provas finais por nível

A0, A1, A2, B1, B2, C1 e C2 têm uma prova final obrigatória.

Para liberar a prova:
- 100% das unidades do nível concluídas;
- checkpoint interno de pelo menos 80%.

Para ser aprovado:
- leitura/compreensão >= 80%;
- conversação >= 80% de média;
- nenhuma resposta conversacional abaixo de 70%;
- quando o navegador oferece reconhecimento de voz, pelo menos 2 das 3 respostas precisam ser produzidas pelo microfone.

A faixa seguinte continua bloqueada até a aprovação.

## Certificado de conquista

Após aprovação no C2, o FluentIA gera um **Certificado de Conquista Interna FluentIA** com nome, data, notas e ID local, pronto para impressão/PDF.

Esse certificado reconhece o mérito dentro do FluentIA. Ele **não é diploma acadêmico, certificação CEFR oficial, Cambridge, IELTS ou TOEFL**, e não representa promessa de sotaque perfeito ou equivalência automática a um falante nativo.

## Conteúdo

- 98 unidades A0–C2;
- prática de pronúncia, listening, leitura, escrita e conversação;
- revisão espaçada e recuperação ativa;
- Sprint Prático de 12 minutos;
- cenários de mercado, restaurante, banco, saúde, transporte, telefone, escola, moradia, emergência, trabalho, entrevista, delivery, warehouse, TI, viagens e imigração;
- modo EUA e inglês para trabalho;
- progresso salvo localmente no navegador.

## Qualidade

A release 6.3 mantém a suíte principal com **60/60 verificações** e recebeu testes adicionais para:
- bloqueio da prova;
- reprovação sem evidência oral suficiente;
- aprovação com leitura + conversação;
- desbloqueio da próxima faixa somente após aprovação;
- proteção do certificado C2.

## Produção

O Vercel está conectado à branch `main` deste repositório.

O build:
1. reconstrói a base estável;
2. verifica integridade SHA-256;
3. aplica a release 6.3;
4. verifica novamente os assets finais;
5. publica apenas se todas as verificações passarem.

