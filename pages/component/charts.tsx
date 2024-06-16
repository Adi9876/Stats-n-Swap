import { useEffect, useState } from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";



import { getCoinList, searchCoin, marketChartCoin } from "../data/gekoapi";


const currencySymbol = (currency: any) => {
    if (currency == "inr") {
        return "₹";
    } else if (currency == "usd") {
        return "$";
    } else {
        return "¥";
    }
};

const convertData = (data: any) => {
    // console.log(data);
    try {
        const convertedData = data["prices"].map((item: any) => {
            return {
                date: item[0],
                ["prices"]: item[1],
            };
        });
        return convertedData;
    } catch (error) {
        console.log(error);
    }
};



export default function Charting({ chart, setChart, currency }: { chart: any, setChart: any, currency: any }) {

    const [time, setTime] = useState(1);

    // const x = () => console.log("pehle chart: ", chart);

    const coin = chart.coin;
    const id = chart.coin.id;

    useEffect(() => {
        const fetchMarketChart = async (id: any, time: any) => {
            try {
                const res1 = await fetch(marketChartCoin(id, time));
                const json1 = await res1.json();

                console.log("market data hazir hai json1", json1);
                setChart({ ...json1, coin });
                console.log("ab aisa hai", chart)
            } catch (error) {
                // setChart(null);
                console.log(error)
                console.log("hey its not working here");
            }
        };
        fetchMarketChart(id, time);

    }, [id, time])

    const [type, setType] = useState("prices");
    const { name, image, ath, current_price, market_cap } = chart.coin;

    const timeHandler = (event: any) => {
        // if (event.target.tagName === "BUTTON") {
        //     const type = event.target.innerText.toLowerCase().replace(" ", "_");
        //     setType(type);
        // }
        console.log(event.target.name)
        if (event.target.name === "day") {
            const type = 1;
            setTime(type);
        }
        if (event.target.name === "week") {
            const type = 7;
            setTime(type);
        }
        if (event.target.name === "month") {
            const type = 30;
            setTime(type);
        }
    };


    return <div className="mt-0 w-full h-full  p-20 justify-between ">
        <header>
            <div className="flex justify-center">Price Chart</div>
            <div className="flex items-center m-4">
                <img src={image} alt="coin-image" className="h-10 w-10" />
                <h2>{name}</h2>
            </div>
        </header>
        <div className="w-full h-2/3">
            <ResponsiveContainer>
                <LineChart width={400} height={400} data={convertData(chart)}>
                    <Line
                        type="monotone"
                        dataKey={type}
                        stroke="#ffcccc"
                        strokeWidth="1px"
                        dot={false} //in documentation
                    />
                    <CartesianGrid stroke="#404042" />
                    <YAxis dataKey={type} domain={["auto", "auto"]} />
                    <XAxis dataKey="date" hide />
                    {/* <Legend /> */}
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>

        <div
            className="flex justify-evenly"
            onClick={(event) => timeHandler(event)}>

            <button name="day" className="mt-4 mb-4 bg-gray-900 rounded hover:bg-blue-900 pl-2 pr-2 border border-white" >
                1 Day
            </button>
            <button name="week" className="mt-4 mb-4 bg-gray-900 rounded hover:bg-blue-900 pl-2 pr-2 border border-white">
                1 Week
            </button>
            <button name="month" className="mt-4 mb-4 bg-gray-900 rounded hover:bg-blue-900 pl-2 pr-2 border border-white">
                1 Month
            </button>
        </div>
        <footer>
            <p>
                Price:{" "}
                <span>
                    {currencySymbol(currency)}
                    {current_price}
                </span>
            </p>
            <p>
                ATH:{" "}
                <span>
                    {currencySymbol(currency)}
                    {ath}
                </span>
            </p>
            <p>
                Market Cap:{" "}
                <span>
                    {currencySymbol(currency)}
                    {market_cap}
                </span>
            </p>
        </footer>

    </div>




    /*
    <div className="h-1/2 w-1/2">
        //<ChartComponent data={convertData(chart, type)} type={type} /> 
        <div>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={400} height={400}>
                    <Line
                        type="monotone"
                        dataKey={type}
                        stroke="#3874ff"
                        strokeWidth="2px"
                    />
                    <CartesianGrid stroke="#404042" />
                    <YAxis dataKey={type} domain={["auto", "auto"]} />
                    <XAxis dataKey="date" hide />
                    <Legend />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
        <div><button onClick={x}>here</button></div>
    </div > */

}