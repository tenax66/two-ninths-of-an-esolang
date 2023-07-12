class Stack<T> {
  _store: T[] = [];
  push(val: T) {
    this._store.push(val);
  }
  pop(): T | undefined {
    return this._store.pop();
  }
}

class Interpreter {
  stack = new Stack<number>();

  run(input: string, arg?: string): void {
    const lines: string[] = input.split(/\r\n|\n/);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.length !== 21) {
        throw new Error('Every line of code must be exactly 21 characters.');
      }

      if (line[0] !== String.fromCodePoint(130 * (i + 1) + 6)) {
        throw new Error(
          'The first character of every line must be equal to the result of the JavaScript expression `String.fromCharCode((130*[line number])+6)`'
        );
      }

      // the first 6 characters of every line are ignored
      // TODO: the first 6 characters still must be syntaxically correct
      const code = line.slice(6);

      for (let command of code) {
        switch (command) {
          case '@':
            // Print "Hello, World!"
            console.log('Hello, World!');
          default:
            break;
        }
      }
    }
  }
}

const interpreter = new Interpreter();
interpreter.run('4Q64Q@##############');
console.log('interpreter executed successfully');
