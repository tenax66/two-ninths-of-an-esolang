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

---

## 元記事

 Cortex氏の[2/9 of an esolang](https://esolangs.org/wiki/2/9_of_an_esolang)を元に実装しています。

 ## 命令

|命令|挙動|
|----|----|
|%|2/9をスタックにプッシュする。|
|꧅|スタックのトップの値を8で割る。|
|4|スタックのトップの値に24を掛ける。|
|Q|スタックのトップの値に2を足し、4を引く。|
|@|"Hello, World!"と出力する。|
|6|スタックのトップの値をASCII文字と解釈して出力する。|
|#|3.5秒待機する|
|‮ (i.e. U+202E RIGHT-TO-LEFT OVERRIDE)|スタックの上から三つまでの値の順番を逆転させ、その後スタックから値をひとつポップして、プログラムのn行目にジャンプする（nはポップした要素の値）。|
|÷|スタックのトップの値の、2番目の値によるモジュロを取る。その結果を2乗する。|

### 拡張仕様

元記事に記載されている仕様は一部あいまいなので、この実装ではそれらに関して独自の解釈をしています。以下でそれらを説明します。

#### commands

- '꧅' と '4' はスタックのトップの値をポップして演算をおこない、その結果をプッシュします。

- 'Q' はスタックのトップからふたつの値をポップして演算をおこない、その結果をプッシュします。

- '[U+202E]'はスタックのトップから3つの値をポップして演算をおこない、それらを逆順にプッシュし、トップの値をポップします。

- '÷' はスタックのトップからふたつの値をポップして演算をおこない、その結果をプッシュします。

####　言語仕様

##### 行番号

元記事では、行番号に関する記述は以下のようになっています。

> Also, the first character of every line must be equal to the result of the JavaScript expression String.fromCharCode((130*[line number])+6) where **[line number] begins with 136**.

文字通りには、これは`[line number]`が136ではじまると言っています。
そうすると、1行目の最初の文字は`String.fromCharCode((130*136)+6)`の結果、つまり`U+4516`になるはずです。
しかし、元記事の例では、サンプルコードの最初の文字が `U+0088` であるため、`[line number]`は1からはじまっているようです。

後者の解釈を採用し、`[line number]`は1からはじめることとします。

## 例

```typescript
  // "Hello, World!" と出力して49秒待つ
  new Interpreter().run('4Q64Q@##############');
```
