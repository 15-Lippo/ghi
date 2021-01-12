import useUniswapPrice from './useUniswapPrice';
import useKyberPrice from './useKyberPrice';
import use0xPrice from './use0xPrice';

export default function useCheapestPrice(tokenFrom, tokenTo) {
  const [uniswap, uniMidprice] = useUniswapPrice(tokenFrom, tokenTo);
  const [kyber, kyberMidprice] = useKyberPrice(tokenFrom, tokenTo);
  const [zeroX, zeroXMidprice] = use0xPrice(tokenFrom, tokenTo);

  const prices = [parseFloat(uniMidprice), parseFloat(kyberMidprice), parseFloat(zeroXMidprice)];
  console.log('🚀 ~ file: useCheapestPrice.js ~ line 11 ~ useCheapestPrice ~ prices', prices);
  const exchange = [uniswap, kyber, zeroX];

  const i = prices.indexOf(Math.max(...prices));
  console.log('🚀 ~ file: useCheapestPrice.js ~ line 14 ~ useCheapestPrice ~ i', i);

  return { price: prices[i], exchange: exchange[i] };
}
