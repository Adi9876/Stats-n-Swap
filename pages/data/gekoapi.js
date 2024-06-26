const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "CG-uARhzKRbcwqDKqDn7S1UGt6j";

const getCoinList = (page, currency) =>
  `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&sparkline=false&locale=en&x_cg_api_key=${API_KEY}`;

const searchCoin = (query) =>
  `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${API_KEY}`;

const marketChartCoin = (id, time) =>
  `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${time}&x_cg_demo_api_key=${API_KEY}`;

//   export { getCoinList, searchCoin, marketChartCoin };
export { getCoinList, searchCoin, marketChartCoin };
