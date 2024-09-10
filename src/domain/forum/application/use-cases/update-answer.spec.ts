import { makeAnswer } from 'test/factories/make-answer'
import { UpdateAnswerUseCase } from './update-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: UpdateAnswerUseCase

describe('Update Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new UpdateAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to update a Answer', async () => {
    const answerToUpdate = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('Answer-1'),
    )

    await inMemoryAnswersRepository.create(answerToUpdate)

    await sut.execute({
      AnswerId: answerToUpdate.id.toValue(),
      authorId: 'author-1',
      content: 'conteudo teste',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'conteudo teste',
    })
  })

  it('should not be able to update a Answer from the wrong user', async () => {
    const AnswerToUpdate = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('Answer-1'),
    )

    await inMemoryAnswersRepository.create(AnswerToUpdate)

    expect(() => {
      return sut.execute({
        AnswerId: AnswerToUpdate.id.toValue(),
        authorId: 'author-2',
        content: 'conteudo teste',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
