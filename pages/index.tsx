import { useState, useEffect } from "react";
import { getCoinList, searchCoin, marketChartCoin } from "../data/gekoapi";
import Charting from "../component/charts";
import TableContent from "../component/tablecontent";
import Overlay from "../component/overlay";

export default function Home() {

  // console.log(getCoinList);

  // const up = "text-green";
  // const down = "text-red";

  let [loading, setIsLoading] = useState(false);
  let [page, setPage] = useState(1);
  let [currency, setCurrency] = useState("inr");
  const [coins, setCoins] = useState([]);
  let [chart, setChart] = useState(null);


  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const res = await fetch(getCoinList(page, currency));
        const json = await res.json();
        console.log((json));
        setCoins(json);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    getData();
  }, [page, currency]);


  const pageUp = () => setPage(page < 10 ? page + 1 : page = 1);
  const pageDown = () => setPage(page > 2 ? page - 1 : page = 1);


  const [isOverlayVisible, setOverlayVisible] = useState(false);

  return (
    <div className="p-10">
      <div className="w-full text-right justify-center "> <div className="p-10 flex justify-around">
        <div className="text-red-500 text-xl">Click on Coin Image to load Chart</div>
        <div className="flex"><div className="pr-5">Set Currency here</div>
          <select className="" onChange={(e) => setCurrency(e.target.value)} value={currency}>
            <option value="inr">INR</option>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
          </select></div>
      </div>
      </div>
      <div className="flex flex-col justify-center w-full">
        <table className="w-full p-3 ">
          <thead className="border-b-2">
            <tr >
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total Volume</th>
              <th>Price Action</th>
            </tr>
          </thead >
          <tbody>
            {coins.map((coin: any) => (
              <TableContent key={coin.id}
                coin={coin}
                loading={loading}
                currency={currency}
                setChart={setChart}
                isOverlayVisible={isOverlayVisible}
                setOverlayVisible={setOverlayVisible}
              />
            ))}
          </tbody>
        </table>
        <div className="text-center p-2 m-2">
          <button className="p-2 m-4 bg-gradient-to-r from-blue-500 to-purple-500" onClick={pageDown}><span>&#8592;</span></button>
          {page}
          <button className="p-2 m-4 bg-gradient-to-r from-blue-500 to-purple-500" onClick={pageUp}> <span>&#8594;</span></button>
        </div>
        {loading && <div className="text-center">Loading</div>}
      </div>

      {/* <div>
        { 
          coins.map((coin:any,i:any)=>(
            <div>{coin.name}</div>
          ))
        }
      </div> */}

      {/* <div>
        <Charting chart={chart} setChart={setChart} currency={currency} />
      </div> */}

      {
        isOverlayVisible ?
          <Overlay isOverlayVisible={isOverlayVisible} setOverlayVisible={setOverlayVisible}  >
            <Charting chart={chart} currency={currency} setChart={setChart} />
          </Overlay> : <div></div>
      }

    </div>
  );
}





{/* {loading?<div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500"></div>:
 */}
{/* <tbody>

  {coins.map((coin: any, i: any) => (
    <tr key={i} className="text-center hover:bg-slate-800">
      <td>
        <div key={coin.id} className="flex flex-col items-center justify-center space-x-2 p-2" onClick={(coin)=>{showChartHandler(coin);}}>
          <img src={coin.image} alt="coin-image" className="h-5" />
          <span>{coin.symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{coin.name}</td>
      <td>
        {loading ? <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-blue-500"></div> : <div>{currencySymbol(currency)}
          {coin.current_price.toLocaleString()}
        </div>}
      </td>
      <td>
        <div className={coin.price_change_percentage_24h >= 0 ? "up" : "down"}>{coin.price_change_percentage_24h.toFixed(2)}%</div>
      </td>
      <td>
        {currencySymbol(currency)}
        {coin.total_volume.toLocaleString()}
      </td>
      <td>
        <Image src={coin.price_change_24h >= 0 ? chartUp : chartDown} alt="change chart" />
      </td>
    </tr>

    // <tr key={i} className="flex justify-evenly">
    //   <th><img className="h-6" src={coin.image}/></th>
    //   <th>{coin.name}</th>
    //   <th>{coin.ath_change_percentage}</th>
    //   <th>{coin.high_24h}</th>
    //   <th>{coin.total_volume}</th>
    //   <th></th>
    // </tr>
    // <TableRow coin={coin} key={coin.id} currency={currency} setChart={setChart} />
  ))}
</tbody> */}