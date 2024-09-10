import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const questionToDelete = await this.questionsRepository.findById(questionId)

    if (!questionToDelete) {
      throw new Error('Question not found')
    }

    if (authorId !== questionToDelete.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.questionsRepository.delete(questionToDelete)

    return {}
  }
}
