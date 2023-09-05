const pipe = (...fn) => fn.reduce((prev, cur) => {
  return cur(typeof prev !== 'function' ? prev : prev())
})

export default pipe
