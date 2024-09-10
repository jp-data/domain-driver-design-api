/*
  POLIFORMISMO:
  ESTA CLASSE RECEBERA AS FUNCIONALIDADES QUE SÃO COMUNS EM COMENTARIOS FEITOS DIRETAMENTE NAS ENTIDADES DE PERGUNTAS E DE RESPOSTAS 
  TAIS CAMPOS E FUNCIONALIDADES SERÃO EXTENDIDOS AS ENTIDADES RESPOSTAS DE PERGUNTAS E RESPOSTAS DE COMENTARIOS 

*/
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface CommentsProps {
  authorId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date | null
}

export abstract class Comment<
  Props extends CommentsProps,
> extends Entity<Props> {
  /*
        getters e setters -> portas de entrada e saída das entidades; protegendo as suas propriedades de eventuais modificações
        também servem como validação ou manipulação dos dados antes de serem expostos 
        conseguimos adicionar lógica que não poderia ser feito caso essas propriedades fossem declaradas normalmente como public...
    */

  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
  /*
        Faz sentido um setter(modificador) para o conteúdo da resposta e data de atualização utiliando o touch()
    */

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }
}
