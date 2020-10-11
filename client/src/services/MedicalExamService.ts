import { post } from '@/services/Service'
import { get } from '@/services/Service'
import { Exam } from '@/models'

class ExamService {
  /**
   * Create a new exam record.
   * @param id medical record id
   * @param exams exams id
   */
  async create(id: number, exams: { examId: number }[]): Promise<Exam> {
    const res = await post(
      { url: '/api/medicalrecord/{id}/medicalexams', params: { id } },
      exams
    )
    const data: Exam = res.json()
    return data
  }
}

export default new ExamService()
