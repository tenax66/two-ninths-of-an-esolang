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

## Examples
```typescript
  // print "Hello, World!" and wait 49 seconds
  new Interpreter().run('4Q64Q@##############');
```
