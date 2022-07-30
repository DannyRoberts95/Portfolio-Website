// A boolean export to check if the current process is running on server or client
function isServer() {
  return !(typeof window != 'undefined' && window.document)
}
export default isServer()
