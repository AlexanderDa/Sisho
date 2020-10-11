import { post } from '@/services/Service'
import { get } from '@/services/Service'
import { Cros } from '@/models'

class CrosService {
  /**
   * Create a new cros record.
   * @param id medical record id
   * @param cros cros to create
   */
  async create(id: number, cros: Partial<Cros>): Promise<Cros> {
    const res = await post({ url: '/api/medicalrecord/{id}/cros', params: { id } }, cros)
    const data: Cros = res.json()
    return data
  }
}

export default new CrosService()
