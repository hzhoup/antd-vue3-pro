import { assert, describe, it } from 'vitest'
import { wrapperEnv } from './utils'

describe('wrapperEnv fn test', () => {
  it('should be string', () => {
    const envConf = { VITE_PUBLIC_PATH: '/' }
    assert.deepEqual(wrapperEnv(envConf), { VITE_PUBLIC_PATH: '/' })
  })

  it('should be number', function () {
    const envConf = { VITE_PORT: '9838' }
    assert.deepEqual(wrapperEnv(envConf), { VITE_PORT: 9838 })
  })

  it('should be array', function () {
    const envConf = { VITE_PROXY: '[["/api","http://localhost:3000"],["/upload","http://localhost:3300/upload"]]' }
    assert.deepEqual(wrapperEnv(envConf), {
      VITE_PROXY: [
        ['/api', 'http://localhost:3000'],
        ['/upload', 'http://localhost:3300/upload']
      ]
    })
  })
})
