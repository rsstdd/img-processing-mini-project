(() => {
  document.addEventListener('DOMContentLoaded', e => {
    console.log('loaded');
    document.getElementById('url-form').addEventListener('submit', event => {
      event.preventDefault()
      document.getElementById('submit-btn').classList.add('is-loading')

      const processEndpoint = `http://localhost:8080/api/get-text`
      const url = document.getElementById('url').value.trim()

      if (!url) {
        window.alert('You must supply a url')
        document.getElementById('submit-btn').classList.remove('is-loading')
        return
      }

      const body = JSON.stringify({ url })

      createCORSRequest('POST', processEndpoint, 'application/json', body)
        .then(res => {
          document.getElementById('submit-btn').classList.remove('u-hidden')
          const text = JSON.parse(res)
          createDomElement(text)
        })
        .catch(err => {
          document.getElementById('submit-btn').classList.remove('is-loading')
          window.alert('There was an error')
          // showAlert()
        })
    })
  })

  function createDomElement(content) {
    const copySec = document.getElementById('copy-section')
    const ptag = document.createElement('p')

    ptag.textContent = content
    copySec.appendChild(ptag)
    addCopyListeners(ptag)
  }

  function addCopyListeners(el) {
    el.onclick = () => { document.execCommand('copy') }
    el.addEventListener('copy', e => {
      e.preventDefault()
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', el.textContent);
        el.classList.add('is-copied')
      }
    })
  }
})()
