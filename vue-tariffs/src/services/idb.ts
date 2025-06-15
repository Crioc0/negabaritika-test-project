import type { Tariff } from '@/types/tariffs'
import { openDB, type DBSchema } from 'idb'

interface AuthDBSchema extends DBSchema {
  auth: {
    key: string
    value: string
  }
  tariffs: {
    key: string
    value: Tariff[]
  }
}

const dbName = 'tariff-manager'
const dbVersion = 1

export const initDB = async () => {
  return openDB<AuthDBSchema>(dbName, dbVersion, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('auth')) {
        db.createObjectStore('auth')
      }
      if (!db.objectStoreNames.contains('tariffs')) {
        db.createObjectStore('tariffs')
      }
    },
  })
}
