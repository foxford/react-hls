export default class HlsLoader extends Hls.DefaultConfig.loader {
  async loadInternal () {
    const context = this.context
    const xhr = this.loader = new XMLHttpRequest()
    let stats = this.stats

    stats.tfirst = 0
    stats.loaded = 0

    const xhrSetup = this.xhrSetup

    try {
      if (xhrSetup) {
        try {
          await xhrSetup(xhr, context.url)
        } catch (e) {
          // fix xhrSetup: (xhr, url) => {xhr.setRequestHeader("Content-Language", "test")}
          // not working, as xhr.setRequestHeader expects xhr.readyState === OPEN
          xhr.open('GET', context.url, true)
          await xhrSetup(xhr, context.url)
        }
      }
      if (!xhr.readyState) {
        xhr.open('GET', context.url, true)
      }
    } catch (e) {
      // IE11 throws an exception on xhr.open if attempting to access an HTTP resource over HTTPS
      this.callbacks.onError({ code: xhr.status, text: e.message }, context, xhr)
      return
    }

    if (context.rangeEnd) {
      xhr.setRequestHeader('Range', 'bytes=' + context.rangeStart + '-' + (context.rangeEnd - 1))
    }
    xhr.onreadystatechange = this.readystatechange.bind(this)
    xhr.onprogress = this.loadprogress.bind(this)
    xhr.responseType = context.responseType

    // setup timeout before we perform request
    this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), this.config.timeout)
    xhr.send()
  }
}
