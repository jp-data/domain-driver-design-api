import { Slug } from './value-objects/slug'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'

export interface QuestionProps {
  title: string
  bestAnswerId?: UniqueEntityID
  content: string
  authorId: UniqueEntityID
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  /*
        getters e setters -> portas de entrada e saída das entidades; protegendo as propriedades de eventuais modificações
        também servem como validação ou manipulação dos dados antes de serem expostos 
        conseguimos adicionar lógica que não poderia ser feito caso essas propriedades fossem declaradas normalmente como public...
    */
  get title() {
    return this.props.title
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get slug() {
    return this.props.slug
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  /*
        Faz sentido um setter(modificador) para o conteúdo da pergunta, o títutlo, a melhor resposta e a data de atualização utiliando o touch()
        esses modificadores permite a manipulação dessas propriedades em outras partes do código
    */

  private touch() {
    this.props.updatedAt = new Date()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }
}
