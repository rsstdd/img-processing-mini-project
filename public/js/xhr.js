const createCORSRequest = (method, url, contentType, body) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.withCredentials = true;
    if (contentType) {
      xhr.setRequestHeader('Content-type', `${ contentType }`)
    }
    xhr.onload = () => {
      xhr.status == 200 ?
      resolve(xhr.response) :
      reject(Error(xhr.statusText))
    }
    xhr.onerror = () => { reject(Error('Network Error'))}
    xhr.send(body)
  })
}
