import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answerToDelete = await this.answersRepository.findById(answerId)

    if (!answerToDelete) {
      throw new Error('Answer not found')
    }

    if (authorId !== answerToDelete.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.answersRepository.delete(answerToDelete)

    return {}
  }
}
