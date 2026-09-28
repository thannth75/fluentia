# Privacidade — FluentIA

## Princípio

O FluentIA deve coletar o mínimo possível de dados.

A versão atual foi planejada para manter progresso, preferências e histórico de estudo localmente no navegador sempre que possível.

## Microfone

O microfone só deve ser usado depois de ação e permissão do usuário.

Quando o reconhecimento de voz depende de uma API do navegador, o navegador ou fornecedor desse recurso pode processar áudio conforme as próprias políticas. O FluentIA deve informar quando o reconhecimento não estiver disponível e não deve fingir que ouviu uma gravação.

## Dados de estudo

Progresso, XP, streak, respostas e preferências locais podem permanecer no armazenamento do navegador. Limpar dados do site/navegador pode apagar esse histórico se não existir sincronização em nuvem.

## Crianças e dados sensíveis

A plataforma não deve solicitar dados sensíveis sem necessidade pedagógica. Não deve pedir documentos, senhas, dados bancários, localização precisa ou informações médicas para funcionar como curso.

## IA externa

Se no futuro uma IA externa for ativada:
- nenhuma chave privada deve ficar exposta no código do navegador;
- deve existir explicação clara sobre quais dados são enviados;
- deve-se reduzir ao mínimo o conteúdo enviado ao provedor;
- o recurso deve possuir fallback quando possível.

## Publicidade e venda de dados

A proposta desta versão não depende de venda de dados pessoais. Qualquer mudança futura nesse modelo exige atualização transparente desta política antes de entrar em produção.

## Controle do usuário

O aluno deve conseguir:
- usar recursos básicos sem fornecer dados desnecessários;
- negar o microfone e continuar estudando com limitações claramente informadas;
- limpar os dados locais pelo navegador.
