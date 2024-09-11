import { Either, left, right } from '@/core/either'
import { AnswersCommentsRepository } from '../repositories/answers-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteCommentAnswerUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteCommentAnswerUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteCommentAnswerUseCase {
  constructor(private answersCommentRepository: AnswersCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteCommentAnswerUseCaseRequest): Promise<DeleteCommentAnswerUseCaseResponse> {
    const commentToDelete =
      await this.answersCommentRepository.findById(answerCommentId)

    if (!commentToDelete) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== commentToDelete.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answersCommentRepository.delete(commentToDelete)

    return right(null)
  }
}
