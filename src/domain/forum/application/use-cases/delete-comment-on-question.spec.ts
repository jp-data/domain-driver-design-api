import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteCommentQuestionUseCase } from './delete-comment-on-question'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteCommentQuestionUseCase

describe('Delete an question comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new DeleteCommentQuestionUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete a question by id', async () => {
    const commentQuestionToDelete = makeQuestionComment()

    inMemoryQuestionCommentsRepository.create(commentQuestionToDelete)

    await sut.execute({
      questionCommentId: commentQuestionToDelete.id.toString(),
      authorId: commentQuestionToDelete.authorId.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question comment because Id author diverges', async () => {
    const questionCommentToDelete = makeQuestionComment({
      authorId: new UniqueEntityID('author-1'),
    })

    inMemoryQuestionCommentsRepository.create(questionCommentToDelete)

    expect(() => {
      return sut.execute({
        questionCommentId: questionCommentToDelete.id.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
