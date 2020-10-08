import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import service from '@/services/VitalSignService'
import { createVitalSign, createPatient, Patient } from '@/models'
import { VitalSign } from '@/models'
import validate from '@/utils/validations'
import Search from '@/utils/search'
import alert from '@/utils/alert'

@Component({})
export default class VitalSignController extends Vue {
  /********************************************************
   *                      Attributes                       *
   ********************************************************/

  // GUI
  private isValidForm = false

  // Element data

  private element: VitalSign = createVitalSign()
  private patientId: number = 0
  private medicId: number = 0

  // Validations
  private rules: object = {
    required: [(v: string) => validate.required(v)]
  }

  /********************************************************
   *                     Initializable                     *
   ********************************************************/

  async beforeMount(): Promise<void> {
    this.findElements()
  }

  /********************************************************
   *                    API Services                       *
   ********************************************************/
  async createElement(): Promise<void> {
    alert.info('creare')
  }

  async findElements(search?: Search): Promise<void> {}

  async updateElement(): Promise<void> {
    alert.info('upadate')
  }

  async submit(): Promise<void> {
    //@ts-expect-error
    await this.$refs.form.validate()
    if (this.isValidForm === true) {
      if (this.element.id > 0) await this.updateElement()
      else await this.createElement()
    }
  }

  /********************************************************
   *                       Methods                         *
   ********************************************************/

  showLog(element: VitalSign) {
    //@ts-ignore
    this.launchLog(element, {
      title: 'signo vital',
      msg: 'VitalSign'
    })
  }

  reset(): void {
    this.element = createVitalSign()
    //@ts-expect-error
    this.$refs.form.reset()
    //@ts-expect-error
    this.$refs.medic.clear()
    //@ts-expect-error
    this.$refs.patient.clear()
  }

  get mass(): number {
    let calc: number = 0
    if (this.element.weight && this.element.tall)
      calc = Number(this.element.weight) / Math.pow(Number(this.element.tall) / 100, 2)
    return Math.round(calc * 100) / 100
  }

  @Watch('mass')
  onMassChange(val: number) {
    this.element.mass = val
  }
}
