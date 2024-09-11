DDD - DOMAIN - DRIVEN DESIGN
 - DESIGN DIRIGIDO A DOMINIO
 - ESTÁ RELACIONADO A COMO IREMOS CONVERTER O PROBLEMA EM SOLUÇÃO DE SOFTWARE

## Domínio 

 - Domain Experts -> são as pessoas responsáveis por entender o problema que o software quer resolver; a CONVERSA é o ponto principal nessa primeira etapa.

 - Linguagem ubíqua -> linguagem universal com todos os envolvidos pela solução (construção do software) de forma a alinhar com a linguagem do Domain expert.

 ## Entities
 
 - Tudo aquilo que será mantido pelos domain experts - e tais coisas são identificadas pela CONVERSA

 ## Use Cases

 - como as entidades se conversam
 - exemplo: um professor tem que responder a dúvida de alunos e também saber quais dúvidas já foram respondidas
    - entidades: professor, duvidas e alunos 
    - casos de uso: duvidas respondidas

## Factories
   - Factories é um tipo de design pattern - remete a "uma fábrica que faz coisas para outros"; no nosso exemplo 'fabricamos' questões. comentarios e respostas modelos para serem testadas

