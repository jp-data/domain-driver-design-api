import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswersCommentsRepository } from '../repositories/answers-comments-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comments'

interface CreateCommentOnAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string
}

interface CreateCommentOnAnswerUseCaseResponse {
  commentOnAnswer: AnswerComment
}

export class CreateCommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answersCommentsRepository: AnswersCommentsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
    content,
  }: CreateCommentOnAnswerUseCaseRequest): Promise<CreateCommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const commentOnAnswer = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answersCommentsRepository.create(commentOnAnswer)

    return { commentOnAnswer }
  }
}
