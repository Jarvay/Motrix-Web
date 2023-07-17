import { APP_THEME } from '@shared/constants'
import { notSupport } from 'utils'

export const showItemInFolder = (fullPath, { errorMsg }) => {
  notSupport()
}

export const openItem = async (fullPath) => {
  notSupport()
}

export const getTaskFullPath = (task) => {
  notSupport()
}

export const moveTaskFilesToTrash = (task) => {
  notSupport()
}

export const getSystemTheme = () => {
  return APP_THEME.LIGHT
}

export const delayDeleteTaskFiles = (task, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = moveTaskFilesToTrash(task)
        resolve(result)
      } catch (err) {
        reject(err.message)
      }
    }, delay)
  })
}
