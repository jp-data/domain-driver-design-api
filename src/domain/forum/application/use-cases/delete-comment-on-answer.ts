import { Either, left, right } from '@/core/either'
import { AnswersCommentsRepository } from '../repositories/answers-comments-repository'

interface DeleteCommentAnswerUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteCommentAnswerUseCaseResponse = Either<string, null>

export class DeleteCommentAnswerUseCase {
  constructor(private answersCommentRepository: AnswersCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteCommentAnswerUseCaseRequest): Promise<DeleteCommentAnswerUseCaseResponse> {
    const commentToDelete =
      await this.answersCommentRepository.findById(answerCommentId)

    if (!commentToDelete) {
      return left('Answer comment not found')
    }

    if (authorId !== commentToDelete.authorId.toString()) {
      return left('Not allowed')
    }

    await this.answersCommentRepository.delete(commentToDelete)

    return right(null)
  }
}
