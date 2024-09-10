import { QuestionsCommentsRepository } from './../repositories/questions-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'

interface CreateCommentOnQuestionUseCaseRequest {
  questionId: string
  authorId: string
  content: string
}

interface CreateCommentOnQuestionUseCaseResponse {
  commentOnQuestion: QuestionComment
}

export class CreateCommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionsCommentsRepository: QuestionsCommentsRepository,
  ) {}

  async execute({
    questionId,
    authorId,
    content,
  }: CreateCommentOnQuestionUseCaseRequest): Promise<CreateCommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    const commentOnQuestion = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.questionsCommentsRepository.create(commentOnQuestion)

    return { commentOnQuestion }
  }
}
