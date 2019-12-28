const jwt = require('./')

describe('jwt', () => {
  it('should match', () => {
    username = "johny"
    expect(jwt.verify(jwt.sign(username)).usr).toBe(username)
  })
})
