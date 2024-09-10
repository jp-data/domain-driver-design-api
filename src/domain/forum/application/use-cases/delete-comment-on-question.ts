import { QuestionsCommentsRepository } from '../repositories/questions-comments-repository'

interface DeleteCommentQuestionUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteCommentQuestionUseCaseResponse {}

export class DeleteCommentQuestionUseCase {
  constructor(private commentsRepository: QuestionsCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteCommentQuestionUseCaseRequest): Promise<DeleteCommentQuestionUseCaseResponse> {
    const commentToDelete =
      await this.commentsRepository.findById(questionCommentId)

    if (!commentToDelete) {
      throw new Error('Question comment not found')
    }

    if (authorId !== commentToDelete.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.commentsRepository.delete(commentToDelete)

    return {}
  }
}
