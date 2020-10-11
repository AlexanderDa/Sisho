import { post } from '@/services/Service'
import { get } from '@/services/Service'
import { Diagnostic } from '@/models'

class DiagnosticService {
  /**
   * Create a new diagnostic record.
   * @param id medical record id
   * @param diseases diseases id
   */
  async create(id: number, diagnostics: { diseaseId: number }[]): Promise<Diagnostic> {
    const res = await post(
      { url: '/api/medicalrecord/{id}/diagnostics', params: { id } },
      diagnostics
    )
    const data: Diagnostic = res.json()
    return data
  }
}

export default new DiagnosticService()
