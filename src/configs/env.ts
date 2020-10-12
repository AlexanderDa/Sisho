// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import path from 'path'

export const SERVER = {
  domain: process.env.SISHO_DOMAIN ?? 'http://localhost:3000',
  sandbox: process.env.SISHO_SANDBOX ?? path.join(__dirname, '../../.sandbox')
}

export const SISHOPGC = {
  name: 'sishoPGC',
  connector: 'postgresql',
  url: process.env.SISHO_DATABASE_URL,
  host: process.env.SISHO_PGC_HOST ?? 'localhost',
  port: process.env.SISHO_PGC_PORT ?? 5432,
  user: process.env.SISHO_PGC_USER ?? 'postgres',
  password: process.env.SISHO_PGC_PASSWORD ?? 'postgres',
  database: process.env.SISHO_PGC_DATABASE ?? 'sisho'
}

export const TOKEN = {
  secret: process.env.SISHO_TOKEN_SECRET ?? 'My$3cREtP4$S',
  expiresIn: process.env.SISHO_TOKEN_EXPIRES_IN ?? '3600' // it must be a string
}

export const EMAIL = {
  smptHost: process.env.SISHO_SMTP_HOST ?? '',
  address: process.env.SISHO_EMAIL_ADDRESS ?? '',
  password: process.env.SISHO_EMAIL_PASSWORD ?? '',
  isSupported: (): boolean => {
    return (
      process.env.SISHO_SMTP_HOST !== undefined &&
      process.env.SISHO_EMAIL_ADDRESS !== undefined &&
      process.env.SISHO_EMAIL_PASSWORD !== undefined
    )
  }
}
