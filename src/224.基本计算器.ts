//思路混乱。。即使AC了，有很多代码冗余
function calculate(s: string): number {
  const stk: string[] = ['('];
  let i = 0, c= s.charAt(i);
  s += ')';
  while(c) {
    //处理空格
    if(c === ' ') {
      c = s.charAt(++i);
      continue;
    }

    if(c === '+' || c === '-' || c === '(') {
      //处理操作符和左括号
      stk.push(c);
    }else if(c === ')') {
      let tmpRet: number | null = null;
      //其他情况：(())/(1)/(+1)/(-1)
      while (c !== '(') {
        const peekIndex = stk.length - 1;
        //处理右括号，此时栈顶是右操作数  栈第二个元素是操作符   栈第三个元素是左操作数
        const operand2 = tmpRet === null ? +stk.pop()! : tmpRet,
          operator = stk[stk.length - 1] === '(' ? '+' : stk.pop()!;
        let operand1 = stk[stk.length - 1] === '(' ? 0 : +stk.pop()!;
        if (stk[stk.length - 1] === '-') {
          operand1 = -operand1;
          stk[stk.length - 1] = '+';
        }
        //如果左操作数右边是负号，那么符号要取反。。
        tmpRet = basicEval(operand1, operator, operand2);
        c = stk[stk.length - 1];
      };
      stk.pop();
      stk.push(tmpRet + '');
    }else if(c){
      //操作数
      let tmp: string = '';
      while('0' <= c && c <= '9') {
        tmp += c;
        c = s.charAt(++i);
      }
      stk.push(tmp);
      i--;
    }
    c = s.charAt(++i);
  }
  return +stk.pop()!;
};

function basicEval(a: number, operator: string, b: number, ): number {
  let ans = 0;
  switch(operator) {
    case '-': ans = a - b;break;
    case '+': ans = a + b;break;
    default: throw new Error('operator:\"' + operator + '\" is invalid');
  }
  return ans;
}

// 参照题解的
function calculate(s: string): number {
  const stk: number[] = [];

  let sign = 1; // 正负号
  let i = 0, c = s.charAt(i), operand = 0, res = 0;
  for(const c of s) {
    if('0' <= c && c <= '9') {
      //处理数字
      operand = operand * 10 + (+c);
    }else if(c === '+') {
      res += sign * operand;
      operand = 0;
      sign = 1;
    }else if(c === '-') {
      res += sign * operand;
      operand = 0;
      sign = -1;
    }else if(c === '(') {
      
      stk.push(res);
      stk.push(sign);

      res = 0;
      sign = 1;
    }else if(c === ')') {
      res += sign * operand;

      //这是pop的sign
      res *= stk.pop()!;
      //这是pop的操作数
      res += stk.pop()!;
      //重置oeprand
      operand = 0;
    }
  }
  return res + operand * sign;
};
