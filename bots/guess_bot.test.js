const { GuessBot } = require('./guess_bot')

jest.mock('../connection')

class TestBot extends GuessBot {
  informResult = jest.fn()
  updateActionSpace = jest.fn()
}

test('Handles reward message properly', () => {
  const text = `<@TESTID> You got a response reward 10, jump, 90, 100`
  const bot = new TestBot()

  bot._handleMessage({ text })
  expect(bot.informResult.mock.calls[0][0]).toBe('10');
  expect(bot.informResult.mock.calls[0][1]).toBe('jump');
  expect(bot.informResult.mock.calls[0][2]).toBe('90');
  expect(bot.informResult.mock.calls[0][3]).toBe('100');
})

test('Handles begin message properly', () => {
  const text = `<@TESTID> Are you ready? begin jump, run, fly`
  const expected = ['jump', 'run', 'fly']
  const bot = new TestBot()

  bot._handleMessage({ text })
  expect(bot.updateActionSpace.mock.calls[0][0]).toStrictEqual(expected);
})
