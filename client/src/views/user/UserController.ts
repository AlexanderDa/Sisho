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
import { createUser } from '@/models'
import { Profile } from '@/models'
import { User } from '@/models'
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

  // Element data
  private elements: Profile[] = []
  private elementIndex = -1
  private element: Profile = createProfile()
  private user: User = createUser()
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
    if (this.elements.length > 0) {
      this.clear()
    }

    const filter: Filter<Profile> = { limit: 25, where: { deleted: false } }
    if (search) {
      filter.where = {
        and: [
          // undefined to find all profiles and false to find not deleted profiles.
          { deleted: search.includeRemoveds ? undefined : false },
          {
            or: [
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

  async findUserByProfile(profileId?: number): Promise<void> {
    if (profileId)
      userService.findByProfileId(profileId).then(user => {
        this.user = user
      })
  }
  async createElement(): Promise<void> {
    profileService
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
      .then(async created => {
        this.element = created
        this.elements.push(created)
        this.elementIndex = this.elements.indexOf(created)
        alert.onCreateSuccess('El perfil de usuario fue creado.')
        await this.createUser()
      })
      .catch(err => alert.onCreateError(err, 'perfil de usuario'))
  }

  async createUser(): Promise<void> {
    userService
      .create(this.element.id, {
        email: this.element.email,
        roleId: this.user.roleId,
        profileId: this.element.id
      })
      .then(async user => {
        this.user = user
      })
      .catch(err => alert.onCreateError(err, 'cuenta de usuario'))
  }

  async updateUser(): Promise<void> {
    userService
      .updateById(this.user.id, {
        email: this.element.email,
        roleId: this.user.roleId,
        profileId: this.element.id,
        isActive: this.user.isActive
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

  async deleteElement(): Promise<void> {
    await accountService
      .delete(this.user.id)
      .then(async () => {
        this.elements.splice(this.elementIndex, 1)
        alert.onDeleteSuccess('Cuenta de usuario eliminada')
        this.clear()
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
  async toShowElement(element: Profile): Promise<void> {
    this.elementIndex = this.elements.indexOf(element)
    this.element = Object.assign({}, element)
    await this.findUserByProfile(this.element.id)
  }

  clear(): void {
    this.elementIndex = -1
    this.element = createProfile()
    //@ts-expect-error
    this.$refs.form.reset()
    this.passError = ''
  }
}
