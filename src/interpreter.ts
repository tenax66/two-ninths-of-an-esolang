import math from 'mathjs';

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
  stack = new Stack<math.MathType>();

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
          case '%':
            this.stack.push(math.fraction(2, 9));
          case '꧅': {
            const value = this.stack.pop();
            if (value == null) {
              throw new Error('The stack is empty');
            }
            this.stack.push(math.multiply(value, math.fraction(1, 8)));
          }
          case '4': {
            const value = this.stack.pop();
            if (value == null) {
              throw new Error('The stack is empty');
            }
            this.stack.push(math.multiply(value, 24));
          }
          case 'Q': {
            const value1 = this.stack.pop();
            const value2 = this.stack.pop();
            if (value1 == null || value2 == null) {
              throw new Error('The stack is empty');
            }
            this.stack.push(math.subtract(math.add(value1, value2), 4));
          }
          case '@':
            // Print "Hello, World!"
            console.log('Hello, World!');
          case '6': {
            const value = math.number(this.stack.pop() as math.Fraction);
            if (value == null) {
              throw new Error('The stack is empty');
            }
            if (!Number.isInteger(value)) {
              throw new Error('Popped value is not an integer');
            }
            console.log(String.fromCodePoint(value));
          }
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
