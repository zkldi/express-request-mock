class NextError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NextError'
  }
}

class ThrowsError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ThrowsError'
  }
}

module.exports = function (req, res, next) {
  switch (req.params.case) {
    case 'ok-sync':
      res.send('OK!')
      break

    case 'ok-async':
      process.nextTick(() => res.send('OK!'))
      break

    case 'ok-next':
      next()
      break

    case 'fail-next':
      next(new NextError())
      break

    case 'fail-throws':
      // IIFE because the linter will complain otherwise =/
      (() => { throw new ThrowsError() })()
      break
  }
}
