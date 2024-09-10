import { UniqueEntityID } from './unique-entity-id'

export class Entity<Props> {
  // propriedade privada
  private _id: UniqueEntityID

  // pode ser acessado pela classe entity e todas as classes que a extendem (orientação a objeto)
  protected props: Props

  // método que retorna o ID
  get id() {
    return this._id
  }

  // recebe as propriedades compartilhadas
  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID()
  }
}
