import math, { MathJSON } from 'mathjs';

class Stack<T> {
  _store: T[] = [];
  push(val: T) {
    this._store.push(val);
  }
  pop(): T | undefined {
    return this._store.pop();
  }
}

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

class Interpreter {
  stack = new Stack<math.Fraction>();

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
            break;
          case '꧅': {
            const value = this.stack.pop();
            if (value == null) {
              throw new Error('The stack is empty');
            }
            this.stack.push(math.multiply(value, math.fraction(1, 8)) as math.Fraction);
            break;
          }
          case '4': {
            const value = this.stack.pop();
            if (value == null) {
              throw new Error('The stack is empty');
            }
            this.stack.push(math.multiply(value, 24) as math.Fraction);
            break;
          }
          case 'Q': {
            const value1 = this.stack.pop();
            const value2 = this.stack.pop();
            if (value1 == null || value2 == null) {
              throw new Error('The stack is empty');
            }
            this.stack.push(math.subtract(math.add(value1, value2), 4) as math.Fraction);
            break;
          }
          case '@':
            // Print "Hello, World!"
            console.log('Hello, World!');
            break;
          case '6': {
            const value = math.number(this.stack.pop());
            if (value == null) {
              throw new Error('The stack is empty');
            }
            if (!Number.isInteger(value)) {
              throw new Error('Popped value is not an integer');
            }
            console.log(String.fromCodePoint(value));
            break;
          }
          case '#':
            // Wait 3.5 seconds.
            sleep(3500);
            break;
          case '‮':
            /*
             * Reverses the order of the top three stack elements,
             * then pops a stack element and jumps to the nth line, where n is the popped element.
             */
            const first = this.stack.pop();
            const second = this.stack.pop();
            const third = this.stack.pop();

            if (first == null || second == null || third == null) {
              throw new Error('The number of elements in the stack is less than 3');
            }

            this.stack.push(first);
            this.stack.push(second);

            i = math.number(third);
            break;
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
