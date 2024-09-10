import { makeQuestion } from 'test/factories/make-question'
import { UpdateQuestionUseCase } from './update-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: UpdateQuestionUseCase

describe('Update Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new UpdateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to update a question', async () => {
    const questionToUpdate = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(questionToUpdate)

    await sut.execute({
      questionId: questionToUpdate.id.toValue(),
      authorId: 'author-1',
      title: 'pergunta teste',
      content: 'conteudo teste',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'pergunta teste',
      content: 'conteudo teste',
    })
  })

  it('should not be able to update a question from the wrong user', async () => {
    const questionToUpdate = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(questionToUpdate)

    expect(() => {
      return sut.execute({
        questionId: questionToUpdate.id.toValue(),
        authorId: 'author-2',
        title: 'pergunta teste',
        content: 'conteudo teste',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
