import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answers-comments-repository'
import { DeleteCommentAnswerUseCase } from './delete-comment-on-answer'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteCommentAnswerUseCase

describe('Delete an answer comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteCommentAnswerUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const commentAnswerToDelete = makeAnswerComment()

    inMemoryAnswerCommentsRepository.create(commentAnswerToDelete)

    await sut.execute({
      answerCommentId: commentAnswerToDelete.id.toString(),
      authorId: commentAnswerToDelete.authorId.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question comment because Id author diverges', async () => {
    const commentAnswerToDelete = makeAnswerComment({
      authorId: new UniqueEntityID('author-1'),
    })

    inMemoryAnswerCommentsRepository.create(commentAnswerToDelete)

    const result = await sut.execute({
      answerCommentId: commentAnswerToDelete.id.toString(),
      authorId: 'author-2',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
