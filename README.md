# two-ninths-of-an-esolang

## Original Article

[2/9 of an esolang](https://esolangs.org/wiki/2/9_of_an_esolang) by Cortex.

## Commands

|Character|What it does|
|----|----|
|%|Push the number 2/9 onto the stack.|
|꧅|Divide the top stack value by 8.|
|4|Multiply the top stack value by 24.|
|Q|Add the top 2 stack values, then subtract 4.|
|@|Print "Hello, World!".|
|6|Print the top stack value as an ASCII character.|
|#|Wait 3.5 seconds.|
|‮ (i.e. U+202E RIGHT-TO-LEFT OVERRIDE)|Reverses the order of the top three stack elements, then pops a stack element and jumps to the nth line, where n is the popped element.|
|÷|Take the top stack element modulo the second stack element, then square the result.|

### Extended specification

The specifications given in the original article are often ambiguous, so this implementation have its own interpretation of them. They are described below:

#### commands

- '꧅' and '4' will pop the top stack value, and push the result of the operation.

- 'Q' will pop the top two values, and push the result of the operations.

- '[U+202E]' will pop the top three values,  push them in reversed order, and pop the top stack value.

- '÷' will pop the top two values, and push the result of the operations.

#### Launguage specifications

##### Line numbers

The original article says,

> Also, the first character of every line must be equal to the result of the JavaScript expression String.fromCharCode((130*[line number])+6) where **[line number] begins with 136**.

If taken literally, this implies that `[line number]` begins with 136.
And the first charcter of the first line should be the result of `String.fromCharCode((130*136)+6)`, i.e. `U+4516`.
But in Examples of the original article, the line number seems to start with 1, because the first character of the sample code is `U+0088`.

We adopt the latter interpretation and `[line number]` starts with 1.

## Examples

```typescript
  // print "Hello, World!" and wait 49 seconds
  new Interpreter().run('4Q64Q@##############');
```
