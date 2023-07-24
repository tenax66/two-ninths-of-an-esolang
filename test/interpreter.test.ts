import { Interpreter } from '../src/interpreter';

describe('interpreter', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('should print "Hello, World!"', () => {
    new Interpreter().run('4Q64Q@##############');
    expect(consoleSpy).toHaveBeenCalledWith('Hello, World!');
  });
});
