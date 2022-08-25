import React from 'react'
import { Legend, Tooltip, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'


let Graph = ({chartData, bestAskPrice, bestBidPrice}) => {
    return (
        <>
            <LineChart width={window.innerWidth*0.8} height={500} data={chartData} key={chartData.length}>
                <XAxis dataKey="time" />
                <YAxis width={100} type="number" domain={[best_bid => (best_bid - (Math.abs(bestAskPrice-bestBidPrice))*1.1).toFixed(2), best_ask=> (best_ask + (Math.abs(bestAskPrice-bestBidPrice))*1.1).toFixed(2)]} />
                <CartesianGrid stroke="#ccc" />
                <Tooltip />
                <Legend align="right" verticalAlign="top" height={36}/>
                <Line name="Best Bid" type="monotone" dataKey="best_bid" stroke="cornflowerblue" />
                <Line name="Best Ask" type="monotone" dataKey="best_ask" stroke="salmon" />
            </LineChart>
        </>
    )
}

export default Graph