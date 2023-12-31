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

export class Interpreter {
  stack = new Stack<math.Fraction>();

  async run(input: string, arg?: string): Promise<void> {
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
        if (command === '#') {
          // Wait 3.5 seconds.
          await new Promise((res) => setTimeout(res, 3500));
        } else {
          i = this.processCode(command, i);
        }
      }
    }
  }

  private processCode(command: string, index: number): number {
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
          throw new Error('The number of elements in the stack is less than 2');
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

      case '‮': {
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

        index = math.number(third);
        break;
      }
      case '÷': {
        const first = math.number(this.stack.pop());
        const second = math.number(this.stack.pop());
        if (first == null || second == null) {
          throw new Error('The number of elements in the stack is less than 2');
        }
        if (!Number.isInteger(first) || Number.isInteger(second)) {
          throw new Error('Popped values are not integers');
        }
        this.stack.push(math.fraction((first % second) ** 2, 1));
        break;
      }
      default:
        break;
    }
    return index;
  }
}
