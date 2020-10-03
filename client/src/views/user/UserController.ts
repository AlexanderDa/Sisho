// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import Vue from 'vue'
import Component from 'vue-class-component'
import profileService from '@/services/ProfileService'
import accountService from '@/services/AccountService'
import emailService from '@/services/EmailService'
import userService from '@/services/UserService'
import validate from '@/utils/validations'
import { createProfile } from '@/models'
import { Profile } from '@/models'
import alert from '@/utils/alert'
import Search from '@/utils/search'
import { Filter } from '@/utils/query'

@Component({})
export default class UserController extends Vue {
  /********************************************************
   *                      Attributes                       *
   ********************************************************/

  // GUI
  private isValidForm = false
  private passError = ''
  private form: boolean = false
  private headers: object[] = [
    { text: 'Image', value: 'image' },
    { text: 'Nombres', value: 'firstName' },
    { text: 'Email', value: 'email' },
    { text: 'Estado', value: 'user.isActive', align: 'center' },
    { text: 'Cédula', value: 'dni' },
    { text: 'Pasaporte', value: 'passport' },
    { text: 'Móvil', value: 'mobile' },
    { text: 'Acciones', value: 'actions', align: 'right' }
  ]

  // Element data
  private elements: Profile[] = []
  private elementIndex = -1
  private element: Profile = createProfile()
  private password: string = ''

  // Validations
  private rules: object = {
    required: [(v: string) => validate.required(v)],
    email: [(v: string) => validate.required(v), (v: string) => validate.isEmail(v)],
    dni: [(v: string) => validate.isDni(v)],
    passport: [],
    telephone: [(v: string) => validate.isTelephone(v)],
    mobile: [(v: string) => validate.isMobile(v)]
  }

  /********************************************************
   *                     Initializable                     *
   ********************************************************/

  async beforeMount(): Promise<void> {
    await this.findProfiles()
  }

  /********************************************************
   *                    API Services                       *
   ********************************************************/
  async findProfiles(search?: Search): Promise<void> {
    const filter: Filter<Profile> = {
      limit: 25,
      where: { deleted: false },
      include: [{ relation: 'user' }]
    }
    if (search) {
      filter.where = {
        and: [
          // undefined to find all profiles and false to find not deleted profiles.
          { deleted: search.includeRemoveds ? undefined : false },
          {
            or: [
              { email: { ilike: `%${search.value}%` } },
              { firstName: { ilike: `%${search.value}%` } },
              { lastName: { ilike: `%${search.value}%` } },
              { dni: { ilike: `%${search.value}%` } },
              { passport: { ilike: `%${search.value}%` } }
            ]
          }
        ]
      }
    }
    profileService.find(filter).then(res => (this.elements = res))
  }

  async createElement(): Promise<void> {
    await profileService
      .create({
        lastName: this.element.lastName,
        firstName: this.element.firstName,
        dni: this.element.dni?.replace('-', ''),
        passport: this.element.passport,
        telephone: this.element.telephone,
        mobile: this.element.mobile,
        email: this.element.email,
        address: this.element.address
      })
      .then(async profile => {
        userService
          .createByProfileId(profile.id, {
            email: profile.email,
            roleId: this.element.user?.roleId,
            profileId: profile.id
          })
          .then(async user => {
            profile.user = user
            this.element = profile
            this.elements.push(profile)
            this.elementIndex = this.elements.indexOf(profile)
            alert.onCreateSuccess('El perfil de usuario fue creado.')
          })
          .catch(err => alert.onCreateError(err, 'cuenta de usuario'))
      })
      .catch(err => alert.onCreateError(err, 'perfil de usuario'))
  }

  async updateUser(): Promise<void> {
    if (this.element.user)
      userService
        .updateById(this.element.user.id, {
          email: this.element.email,
          roleId: this.element.user.roleId,
          profileId: this.element.id,
          isActive: this.element.user.isActive
        })
        .then(() => {})
        .catch(err => alert.onUpdateError(err, 'cuenta de usuario'))
  }

  async updateImage(url: string): Promise<void> {
    profileService
      .updateById(this.element.id, { image: url })
      .then(() => {
        this.element.image = url
        Object.assign(this.elements[this.elementIndex], this.element)
        alert.success('Imagen cargada')
      })
      .catch(() => alert.error('Error ', 'Error al subir imagen'))
  }

  async updateElement(): Promise<void> {
    profileService
      .updateById(this.element.id, {
        lastName: this.element.lastName,
        firstName: this.element.firstName,
        dni: this.element.dni?.replace('-', ''),
        passport: this.element.passport,
        telephone: this.element.telephone,
        mobile: this.element.mobile,
        email: this.element.email,
        address: this.element.address
      })
      .then(async () => {
        {
          Object.assign(this.elements[this.elementIndex], this.element)
          await this.updateUser()
          alert.onUpdateSuccess('El perfil de usuario actualizado')
        }
      })
      .catch(err => alert.onUpdateError(err, 'perfil de usuario'))
  }

  async deleteElement(element: Profile): Promise<void> {
    if (element.user)
      await accountService
        .delete(element.user.id)
        .then(async () => {
          this.elements.splice(this.elementIndex, 1)
          alert.onDeleteSuccess('Cuenta de usuario eliminada')
        })
        .catch(err => alert.onDeleteError(err, 'cuenta de usuario'))
  }

  async sendWelcomeEmail(): Promise<void> {
    if (this.element.email)
      emailService
        .welcome(this.element.email)
        .then(() =>
          alert.success(
            'Correo enviado',
            'El correo electrónico de activación se envió correctamente'
          )
        )
        .catch(() => {
          alert.warning(
            'Ups, algo salió mal',
            'El correo electrónico de activación no se pudo enviar correctamente.'
          )
        })
  }

  private async changePassword(): Promise<void> {
    const min = validate.minLength(this.passError, 7, 'Debe tener al menos 8 caracteres.')
    this.passError = typeof min === 'string' ? min : ''
    if (typeof min === 'boolean' && min === true) {
      accountService
        .changePasswordByUserId(this.element.id, this.password)
        .then(() => alert.info('Contraseña cambiada'))
        .catch(err => alert.warning('Contraseña no cambiada', err))
    }
  }

  async submit(): Promise<void> {
    // eslint-disable-next-line
    //@ts-expect-error
    await this.$refs.form.validate()
    if (this.isValidForm === true) {
      if (this.elementIndex > -1) await this.updateElement()
      else await this.createElement()
    }
  }
  /********************************************************
   *                       Methods                         *
   ********************************************************/

  showLog() {
    //@ts-ignore
    this.$launchLog(this.element, {
      title: 'Usuario',
      msg: `${this.element.lastName} ${this.element.firstName}`
    })
  }

  async toEditElement(element: Profile): Promise<void> {
    this.elementIndex = this.elements.indexOf(element)
    this.element = Object.assign({}, element)
    this.form = true
  }

  reset(): void {
    this.elementIndex = -1
    this.element = createProfile()
    this.form = false
    //@ts-expect-error
    this.$refs.form.reset()
    this.passError = ''
  }
}
