import { nativeTheme } from '@electron/remote'

import { APP_THEME } from '@shared/constants'

export const showItemInFolder = (fullPath, { errorMsg }) => {
  //
}

export const openItem = async (fullPath) => {
  //
}

export const getTaskFullPath = (task) => {
  //
}

export const moveTaskFilesToTrash = (task) => {
  //
}

export const getSystemTheme = () => {
  return nativeTheme.shouldUseDarkColors ? APP_THEME.DARK : APP_THEME.LIGHT
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
