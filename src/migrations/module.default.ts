// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Module } from '../models'

export const PERMISSION: Module = new Module({ id: 1, name: 'permissions' })
export const PROFILE: Module = new Module({ id: 2, name: 'profiles' })
export const COMPANY: Module = new Module({ id: 3, name: 'company' })
export const MODULE: Module = new Module({ id: 4, name: 'modules' })
export const OPTION: Module = new Module({ id: 5, name: 'options' })
export const ROLE: Module = new Module({ id: 6, name: 'roles' })
export const USER: Module = new Module({ id: 7, name: 'users' })

export const DISEASETYPE: Module = new Module({ id: 8, name: 'diseasetypes' })
export const DISEASE: Module = new Module({ id: 9, name: 'diseases' })

export const EXAMTYPE: Module = new Module({ id: 10, name: 'examtypes' })
export const EXAM: Module = new Module({ id: 11, name: 'exams' })
export const PATIENT: Module = new Module({ id: 12, name: 'patients' })
export const ANTECEDENT: Module = new Module({ id: 13, name: 'antecedents' })
export const DIAGNOSTIC: Module = new Module({ id: 14, name: 'diagnostics' })
export const MEDICALEXAM: Module = new Module({ id: 15, name: 'medicalexams' })
export const MEDICALRECORD: Module = new Module({ id: 16, name: 'medicalrecords' })
export const VITALSIGN: Module = new Module({ id: 17, name: 'vitalsigns' })

/**
 * Default modules.
 */
export const MODULES: Module[] = [
  COMPANY,
  MODULE,
  OPTION,
  PERMISSION,
  PROFILE,
  ROLE,
  USER,
  DISEASETYPE,
  DISEASE,
  EXAMTYPE,
  EXAM,
  PATIENT,
  ANTECEDENT,
  DIAGNOSTIC,
  MEDICALEXAM,
  MEDICALRECORD,
  VITALSIGN
]
