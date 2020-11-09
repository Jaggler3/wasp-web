<p align="center">
	<img alt="wasp logo" src="https://github.com/Jaggler3/wasp-web/blob/main/src/images/icon.png?raw=true">
</p>

# Wasp
Wasp is a programming language made for code-golfing via an interpreter written in JavaScript.

## What is code golf?
From Wikipedia:
> **Code golf** is a type of recreational computer programming competition in which participants strive to achieve the shortest possible source code that implements a certain algorithm. Playing code golf is known as "golf scripting".

# Documentation
Wasp first loads the Artifacts (input values separated by a newline).
### Example artifact list
```
12
My String
true
```

## Commands
| Command 	| Explanation 	|
|-	|-	|
| `;>` 	| Create a new variable (Left-hand side) <br/>  - Variables are accessed by their order/index <br/>  - The first index is 0 	|
| `_X\|` 	| Access the artifact list at the index X <br/> - The first artifact index is 0 	|
| `@X\|` 	| Access a global (a built-in variable) <br/> - Globals cannot be modified at runtime 	|
| `!` 	| Print the preceeding token with a newline ("\n" appending at the end) 	|
| `!!` 	| Print the preceeding token (without an appended newline) 	|
| `;<` 	| Delete the variable at the current index <br/> - The index is decremented by 1 	|
| `[>]` 	| Increment the current variable index <br/> - Multiple '>' symbols to shift the index several times ex. [>>>] shifts the index forwards 3 times <br/> - If used on the right side of an operation, use it as a reference instead and do not change the current variable index 	|
| `[<]` 	| Decrement the current variable index - Works as [>] in the reverse order - Ex. [<<<<] shifts the variable index -4 times 	|
| `?` 	| Resets the variable index to 0 	|
| `$` 	| Access the current variable (Right or left side of operation) 	|
| `$+` 	| Increment the current variable (if it is a number) 	|
| `$-` 	| Decrement the current variable (if it is a number) 	|
| `$++` 	| Add the proceeding token to the current variable 	|
| `$--` 	| Subtract the proceeding token from the current variable - Ex. $--_0\| - Ex. $++[>] 	|
| `#` 	| Start an if statement -- the condition is the current variable 	|
| `##` 	| Start an if not statement -- the condition is the current variable 	|
| `^` 	| Start/end a loop <br/> - Structured like a "do-until" loop 	|
| `'` 	| The multiplication operator 	|
| `"` 	| The division operator 	|
| `~` 	| The distance operator (absolute value of 'x - y') 	|
| `''` 	| The repeat operator (repeats the left times the right (a number)) 	|
| `%` 	| The ID operator (returns a hash code '0xXXXXX' of the current variable) 	|
| `/` 	| Restart the function or program 	|
| `//` 	| Exit the function or program 	|


## Globals (built-in variables)
```
0.	true
1.	false
2.	0
3.	1 
4.	10 
5.	" "
6.	"\n" 
7.	","
8.	-1
9.	10
10.	2
```

# Examples

- [**Example 1 (Staircase)**](https://wasp-compiled.web.app/?;%3E@2|;%3E_0|;%3E_1|;%3E(?[%3E]$-[%3C]$+;%3E@5|[%3C%3C%3C]##@3|[%3E%3E%3E]$'[%3C%3C%3C]#?[%3E%3E%3E%3E]!!$;%3E_1|$'[%3C%3C%3C%3C%3C]!$;%3C;%3C[%3C%3C]##@2|/#)*$&10,#)

- [**Example 2 (Even or odd)**](https://wasp-compiled.web.app/?;%3E_0|;%3E(?#@8|!@3|//##@2|!@2|//#$-$-/)*$&9)

- [**Example 3 (N squared literally)**](https://wasp-compiled.web.app/?;%3E_0|;%3E_0|$-;%3E_0|;%3E=_0|[%3C]$%27[%3E]$--[%3E]$--[%3E];%3E_0|$%27%27_0|!$?#@3|//#;>(?[>]$-!!_0|;>@5|$''[<<<<]!!$?!$[>>>>>>];<?[>]##@3|/#)?##@10|[>>>>>]*$#?[>>>>]!$&12)
