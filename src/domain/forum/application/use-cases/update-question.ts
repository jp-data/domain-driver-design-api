import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

export interface UpdateQuestionUseCaseRequest {
  title: string
  content: string
  questionId: string
  authorId: string
}

interface UpdateQuestionUseCaseResponse {
  question: Question
}

export class UpdateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
    questionId,
  }: UpdateQuestionUseCaseRequest): Promise<UpdateQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)
    return { question }
  }
}
