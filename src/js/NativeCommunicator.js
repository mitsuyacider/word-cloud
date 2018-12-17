import store from '@/vuex/store'

class NativeCommunicator {
  helloJavascript (data) {
    let json = JSON.parse(data)
    console.log('helloJavascript:', json.message)
    store.dispatch('setMessage', json.message)
  }

  helloNative (message) {
    console.log('helloNative:', message)
    window.webkit.messageHandlers.helloNative.postMessage(message)
  }
}

const nativeCommunicator = new NativeCommunicator()
export default nativeCommunicator

global.NativeCommunicator = nativeCommunicator
