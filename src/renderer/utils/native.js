import { APP_THEME, TASK_STATUS } from '@shared/constants'
import { notSupport, resolve } from 'utils'
import { getFileNameFromFile, isMagnetTask } from '@shared/utils'
import { webApi } from 'api'

export const showItemInFolder = (fullPath, { errorMsg }) => {
  notSupport()
}

export const openItem = async (fullPath) => {
  notSupport()
}

export const getTaskFullPath = (task) => {
  const { dir, files, bittorrent } = task
  let result = resolve(dir)

  // Magnet link task
  if (isMagnetTask(task)) {
    return result
  }

  if (bittorrent && bittorrent.info && bittorrent.info.name) {
    result = resolve(result, bittorrent.info.name)
    return result
  }

  const [file] = files
  const path = file.path ? resolve(file.path) : ''
  let fileName = ''

  if (path) {
    result = path
  } else {
    if (files && files.length === 1) {
      fileName = getFileNameFromFile(file)
      if (fileName) {
        result = resolve(result, fileName)
      }
    }
  }

  return result
}

export const moveTaskFilesToTrash = (task) => {
  /**
   * For magnet link tasks, there is bittorrent, but there is no bittorrent.info.
   * The path is not a complete path before it becomes a BT task.
   * In order to avoid accidentally deleting the directory
   * where the task is located, it directly returns true when deleting.
   */
  if (isMagnetTask(task)) {
    return true
  }

  const { dir, status } = task
  const path = getTaskFullPath(task)
  if (!path || dir === path) {
    throw new Error('task.file-path-error')
  }

  let deleteResult1 = true
  webApi.deleteFiles([path]).then(() => {
    deleteResult1 = true
  }).catch(() => {
    deleteResult1 = false
  })

  // There is no configuration file for the completed task.
  if (status === TASK_STATUS.COMPLETE) {
    return deleteResult1
  }

  let deleteResult2 = true
  const extraFilePath = `${path}.aria2`
  webApi.deleteFiles([extraFilePath]).then(() => {
    deleteResult2 = true
  }).catch(() => {
    deleteResult2 = false
  })

  return deleteResult1 && deleteResult2
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
