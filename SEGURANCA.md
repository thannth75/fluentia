# Segurança — FluentIA

## Regras do projeto

- nunca commitar senhas, tokens ou chaves de API;
- qualquer integração externa deve usar segredo no servidor/ambiente seguro;
- entrada do usuário deve ser tratada como não confiável;
- o app deve funcionar sem exigir permissões desnecessárias;
- câmera e geolocalização ficam desabilitadas por padrão;
- microfone é permitido somente para a própria origem e após consentimento do usuário;
- dependências futuras devem ser mantidas atualizadas e mínimas.

## Build

O build reconstrói os arquivos empacotados e verifica integridade SHA-256. O CI também valida sintaxe dos JavaScripts e presença dos assets essenciais.

## Relato de vulnerabilidade

Evite publicar tokens, dados pessoais ou provas de conceito destrutivas em uma issue pública.

Quando o GitHub oferecer **Private vulnerability reporting / Security Advisory** para o repositório, prefira esse canal. Caso contrário, abra uma issue sem inserir segredos ou dados sensíveis, apenas solicitando um canal privado de contato.

## Escopo

Problemas de segurança incluem:
- exposição de chave;
- execução de script não autorizado;
- bypass de prova/certificado por falha de código;
- alteração indevida de progresso;
- uso do microfone sem consentimento;
- vazamento de dados do aluno.
