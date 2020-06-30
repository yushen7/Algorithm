

/**
 * 
122. 买卖股票的最佳时机 II
给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

 

示例 1:

输入: [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
示例 2:

输入: [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
示例 3:

输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
 

提示：

1 <= prices.length <= 3 * 10 ^ 4
0 <= prices[i] <= 10 ^ 4
 */

 /**
  * 
  * 思路：动态规划
  * 
  * 遍历所有状态，选择最好的那个状态
  * 
  * 时间复杂度：O(n)，n为数组prices长度
  * 空间复杂度：O(1)
  * 
  * 
  */
function maxProfit1(prices: number[]): number {
  let stock = -prices[0], cash = 0;
  for(const price of prices) {
    // if(price - lastBuy > 0) {
    //   cash += price - lastBuy;
    // }
    // lastBuy = price;
    const tmp = cash;
    //动态规划，遍历所有状态
    cash = Math.max(cash, price + stock); //无操作，或者选择卖出，卖出是根据前一次的最大利润买入得来的，选利润最大的那个操作
    stock = Math.max(stock, tmp - price); //无操作，或者选择买入，买入是根据前一次的最大利润卖出得来的，选利润最大的那个操作

  }
  return cash;
};


/**
 * 
 * 123. 只能交易股票两次

 */

/**
 * 
 */

 /**
  * 思路：动态规划
  * 
  * 
  * 时间复杂度：O(n)
  * 空间复杂度：O(n)
  * 
  * 将所有状态都列举出来，选择最好的那个
  * 
  * 定义dp[i][j][0]/dp[i][j][1]为：前i天，交易次数最多为j次的售出股票最大利润/前i天，交易次数最多为j次的买入股票最大利润
  * 
  * 状态转移方程：dp[i][j][0] = max(卖出(dp[i-1][j][1] + price)，不卖出(dp[i-1][j][1]))
  *              dp[i][j][1] = max(买入(dp[i-1][j-1][0] - price)，不买入(dp[i-1][j][0]))，这里之所以是dp[i-1][j-1][0]，是因为此次的买入要根据上一次的卖出，
  *                                                                                     且是交易次数为-1（即j-1）的卖出计算此次买入的最大利润，简单来说，只有第一次的卖出，才有第二次的买入。
  * 举例子：
  *  股票价格：[3,3,5,0,0,3,1,4]
  *  第一天（base case）price = 3：
  *   记录交易次数最多为1次的最大利润：
  *     买股票：-3 dp[0][1][1]
  *     卖股票：0 dp[0][1][0]
  *   记录交易次数最多为2次的最大利润：
  *     买：-3 dp[0][2][1]
  *     卖：0 dp[0][2][1]
  * 
  * 所以base case应该为第一天：
  *     1.dp[0][j][0] = -prices[0]；dp[0][j][1] = 0。
  *     2.且当j=0时，dp[i][0][0]应为0，因为当j=0时，不可能发生交易，
  *     3.dp[i][0][1]应为-Infinity，此时也不可能发生交易；
  * 
  *  第二天price = 3：
  *   记录交易次数最多为1次的最大利润：
  *     买股票：0 + -3  dp[1][1][1] = max(dp[0][1][1], dp[0][0][0] - prices[1])（dp[i][0][0]可以省略）
  *     卖股票：0       dp[1][1][0] = max(dp[0][1][0], dp[0][1][1] + prices[1])
  *   记录交易次数最多为2次的最大利润：
  *     买股票：0 + -3  dp[1][2][1] = max(dp[0][2][1], dp[0][1][0] - prices[1]) 
  *     卖股票：0       dp[1][2][0] = max(dp[0][2][0], dp[0][2][1] + prices[1])
  * 
  *   第三天price = 5：
  *    记录交易次数最多为1次的最大利润：
  *      买股票：0 + -3  dp[2][1][1] = max(dp[1][1][1], dp[1][0][0] - prices[2])（dp[i][0][0]可以省略）
  *      卖股票：-3 + 5 = 2 > 0(dp[1][1][0])       dp[2][1][0] = max(dp[1][1][0], dp[1][1][1] + prices[2])
  *    记录交易次数最多为2次的最大利润：
  *      买股票：-2  dp[2][2][1] = max(dp[1][2][1], dp[1][1][0] - prices[2])
  *      卖股票：-3 + 5 = 2 > 0(dp[1][2][0])       dp[2][1][0] = max(dp[1][2][0], dp[1][2][1] + prices[2])
  * 
  * 

  */

function maxProfit2(prices: number[]): number{
  if(prices.length < 2) {
    return 0;
  }
  const n = prices.length;
  const maxTrade = 2;
  let dp = new Array(n);
  for(let i = 0; i < n; i++) {
    dp[i] = new Array(maxTrade + 1);
    for(let j = 0; j <= maxTrade; j++){
        dp[i][j] = new Array(2);
    }
    dp[i][0][0] = 0;
    dp[i][0][1] = -Infinity;
  };

  for(let i = 0; i < n; i++) {
    for(let j = 1; j <= maxTrade; j++) {
      if(i === 0) {
        dp[i][j][0] = 0;
        dp[i][j][1] = -prices[i];
        continue;
      }
      dp[i][j][0] = Math.max(dp[i-1][j][0], dp[i - 1][j][1] + prices[i]);
      dp[i][j][1] = Math.max(dp[i-1][j][1], dp[i - 1][j - 1][0] - prices[i]);
    }
  }
  return dp[n - 1][maxTrade][0];
};

/**
 * 思路：动态规划压缩空间版
 * 时间复杂度：O(N)
 * 空间复杂度：O(1)
 */

function maxProfit3(prices: number[]): number {
  if(prices.length < 2) return 0;
  let stockProfit1 = -prices[0], sellProfit1 = 0;
  let stockProfit2 = -prices[0], sellProfit2 = 0;


  for(const price of prices) {

    stockProfit2 = Math.max(stockProfit2, sellProfit1 - price);
    sellProfit2 = Math.max(sellProfit2, stockProfit2 + price);

    sellProfit1 = Math.max(sellProfit1, stockProfit1 + price  );
    stockProfit1 = Math.max(stockProfit1, -price);

  } 
  return sellProfit2;
}
/**
 * 124.
 */

/**
 * 309. 最佳买卖股票时机含冷冻期
给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。​

设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:

你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
示例:

输入: [1,2,3,0,2]
输出: 3 
解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]
 */

 /**
  * 
  */
 function maxProfitCoolDown(prices: number[]): number {
  if(prices.length < 2) {
    return 0;
  }

  const n = prices.length;
  //0:cash 1:stock
  let dp: Array<Array<number>> = new Array(n);
  //初始化
  for(let i = 0; i < n; i++) {
    dp[i] = new Array(2);
  };
  //base case
  dp[0][0] = 0;
  dp[0][1] = -prices[0];




  //动态规划
  for(let i = 1; i < n; i++) {
    if(i === 1) {
      dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
      dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
      continue;
    }
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - prices[i]);
  }

  return dp[n - 1][0];
};
  

//状态压缩
function maxProfitCoolDownCompressed(prices: number[]): number {
  if(prices.length < 2) return 0;

  let sellProfit = 0, buyProfit = -prices[0], preSellProfit = 0;

  for(const price of prices) {
    const tmp = sellProfit;

    //由前一天的1.卖出最大利润 2.买入最大利润 + 这一天卖出的利润得到的利润 转换而来
    sellProfit = Math.max(sellProfit, buyProfit + price);
    //由前一天的买入最大利润，前天的卖出最大利润 - 这一天买入的股票得到的利润 转换而来
    buyProfit = Math.max(buyProfit, preSellProfit - price);
    
    preSellProfit = tmp;
  }
  return sellProfit;
}