import Image from 'next/image';
import chartUp from "../assets/chart-up.svg";
import chartDown from "../assets/chart-down.svg";
import { marketChartCoin } from '../data/gekoapi';
import { useState } from 'react';


export default function TableContent({ coin, loading, currency, setChart, isOverlayVisible, setOverlayVisible }: { coin: any, loading: any, currency: any, setChart: any, isOverlayVisible: any, setOverlayVisible: any }) {

    const currencySymbol = (currency: any) => {
        if (currency == "inr") {
            return "₹";
        } else if (currency == "usd") {
            return "$";
        } else {
            return "€";
        }
    };

    const toggleOverlay = () => {
        setOverlayVisible(!isOverlayVisible);
    };



    // .//////

    // const [isOverlayVisible, setOverlayVisible] = useState(false);

    // const toggleOverlay = () => {
    //     setOverlayVisible(!isOverlayVisible);
    // };


    // .////////
    let id = coin.id;
    function showChartHandler() {
        const fetchMarketChart = async (id: any) => {
            try {
                const res = await fetch(marketChartCoin(id, 1));
                const json = await res.json();

                console.log("market data hazir hai", json);
                setChart({ ...json, coin });
                toggleOverlay();
            } catch (error) {
                setChart(null);
                console.log("hey its not working here");
            }
        };
        fetchMarketChart(id);
    }

    return <>
        <tr className="text-center hover:bg-slate-800">
            <td>
                <div key={coin.id}
                    className="flex flex-col items-center justify-center space-x-2 p-2 "
                    onClick={showChartHandler}>

                    <img src={coin.image} alt="coin-image"
                        className="h-10 cursor-pointer focus:cursor-auto"
                        title='View Chart'
                    />

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

        {/* // <tr key={i} className="flex justify-evenly">
      //   <th><img className="h-6" src={coin.image}/></th>
      //   <th>{coin.name}</th>
      //   <th>{coin.ath_change_percentage}</th>
      //   <th>{coin.high_24h}</th>
      //   <th>{coin.total_volume}</th>
      //   <th></th>
      // </tr>
      // <TableRow coin={coin} key={coin.id} currency={currency} setChart={setChart} />
    */}




    </>
}