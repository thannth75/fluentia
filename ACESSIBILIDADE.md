# Acessibilidade — FluentIA

A meta é que o FluentIA continue utilizável por pessoas com diferentes necessidades, dispositivos e condições de acesso.

## Requisitos

- navegação por teclado;
- foco visível;
- botões com texto/descrição compreensível;
- contraste suficiente;
- conteúdo não dependente apenas de cor;
- suporte a zoom de 200%;
- layout responsivo;
- textos simples e objetivos;
- alternativa textual quando áudio/voz não funcionar;
- feedback de erro claro;
- controles de áudio que não iniciem de forma inesperada.

## Voz

Reconhecimento de voz é um recurso adicional. Falha ou incompatibilidade do microfone não deve bloquear leitura, vocabulário, gramática e outras partes do curso.

## Avaliação

A prova oral precisa distinguir “recurso indisponível” de “resposta incorreta”. A plataforma não deve atribuir nota falsa quando não conseguiu capturar a fala.

## Processo

Cada grande release deve ser testada pelo menos com:
- teclado;
- zoom 200%;
- tela móvel;
- microfone permitido/negado;
- preferência `prefers-reduced-motion` quando aplicável.

Acessibilidade é requisito contínuo, não uma etapa encerrada.
