(() => {
  document.addEventListener('DOMContentLoaded', e => {

    document.getElementById('url-form').addEventListener('submit', event => {
      event.preventDefault()
      document.getElementById('submit-btn').classList.add('is-loading')

      const processEndpoint = `https://image-text-parsing.herokuapp.com/api/get-text`
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
          window.alert(err)
          console.log(err);
        })
    })
  })

  function createDomElement(content) {
    const copySec = document.getElementById('copy-section')
    const ptag = document.createElement('p')

    try {
      ptag.innerText = `${content} \n`
      copySec.appendChild(ptag)
      addCopyListeners(ptag)
      copySec.classList.remove('is-hidden')
      document.getElementById('submit-btn').classList.remove('is-loading')
    } catch(e) {
      window.alert(e)
    }
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
