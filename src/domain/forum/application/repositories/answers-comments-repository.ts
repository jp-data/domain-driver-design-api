import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from './../../enterprise/entities/answer-comments'

export interface AnswersCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  delete(questionComment: AnswerComment): Promise<void>
  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>
}
