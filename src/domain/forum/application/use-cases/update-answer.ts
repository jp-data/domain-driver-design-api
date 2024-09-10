import { Answer } from './../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

export interface UpdateAnswerUseCaseRequest {
  content: string
  AnswerId: string
  authorId: string
}

interface UpdateAnswerUseCaseResponse {
  answer: Answer
}

export class UpdateAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    content,
    AnswerId,
    authorId,
  }: UpdateAnswerUseCaseRequest): Promise<UpdateAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(AnswerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed')
    }
    answer.content = content

    await this.answersRepository.save(answer)
    return { answer }
  }
}
