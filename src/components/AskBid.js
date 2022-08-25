import React, { useState } from 'react'
import { tickerSub, tickerUnSub, ws } from '../helpers/fetchData'
import { PriorityQueue } from '@datastructures-js/priority-queue'
import { asksComparator, bidsComparator } from '../helpers/comparators'
import Ladder from './Ladder'
import Graph from './Graph'


let AskBid = ({ticker}) => {
    let bQ = new PriorityQueue(bidsComparator)
    let aQ = new PriorityQueue(asksComparator)

    const [bidsQueue, setBidsQueue] = useState(bQ)
    const [asksQueue, setAsksQueue] = useState(aQ)
    const [bestBidPrice, setBestBidPrice] = useState(["0"])
    const [bestAskPrice, setBestAskPrice] = useState(["0"])
    const [bestBidQty, setBestBidQty] = useState(["0"])
    const [bestAskQty, setBestAskQty] = useState(["0"])
    const [chartData, setChartData] = useState([])

    if(ws.readyState === 1) {
        tickerUnSub()
    }
    setTimeout(() => {
        tickerSub(ticker)
    }, 1000)

    ws.onmessage = (msg) => {
        let data = JSON.parse(msg.data)
        console.log(data.type, data)
        switch(data.type) {
            case 'snapshot': {
                if(chartData.length > 0 && chartData[chartData.length-1].ticker !== ticker){
                    chartData.length = 0
                }
                bidsQueue.clear()
                asksQueue.clear()
                setBestBidPrice(["0"])
                setBestAskPrice(["0"])
                setBestBidQty(["0"])
                setBestAskQty(["0"])

                for(let i = 0; i < data.bids.length; i++) {
                    bidsQueue.enqueue(data.bids[i])
                }
                for(let i = 0; i < data.asks.length; i++) {
                    asksQueue.enqueue(data.asks[i])
                }

                setBidsQueue(bidsQueue)
                setAsksQueue(asksQueue)
                setBestBidPrice(bidsQueue.front()[0])
                setBestBidQty(bidsQueue.front()[1])
                setBestAskPrice(asksQueue.front()[0])
                setBestAskQty(asksQueue.front()[1])
                break;
            }
            case 'ticker': {
                console.log(chartData)
                if((data.best_bid !== undefined) && data.best_ask !== undefined) {
                    let obj = {
                        ticker: data.product_id,
                        best_bid: parseFloat(data.best_bid).toFixed(2),
                        best_ask: parseFloat(data.best_ask).toFixed(2),
                        time: data.time.slice(11,19),
                        full_time: data.time,
                    }
                    let array = [...chartData]
                    if(chartData.length > 0) {
                        let d1 = new Date(data.time)
                        let t = chartData[chartData.length-1]
                        let full = t.full_time
                        let d2 = new Date(full)
                        console.log("here", full)
                        let diff = d1 - d2
                        // graph the ask/bids on intervals of 5 seconds or greater
                        if(diff >= 5000) {
                            array.push(obj)
                            // keep the graph view to certain time frame 
                            if(chartData.length >= 12) {
                                array.shift()
                                setChartData(array)
                            } else {
                                setChartData(array)
                            }
                        }
                    } else {
                        array.push(obj)
                        setChartData(array) 
                    }
                    
                }
                break;
            }
            default:
                break;
        }
    }
    
    return (
        <div>
        
            <div class="bbContainer">
                <div id="bestBidPrice">Best Bid Price: {bestBidPrice}</div>
                <div id="bestBidQty">Best Bid Quantity: {bestBidQty}</div>
            </div>
            <div class="baContainer">
                <div id="bestAskPrice">Best Ask Price: {bestAskPrice}</div>
                <div id="bestAskQty">Best Ask Quantity: {bestAskQty}</div>
            </div>
            <Graph chartData={chartData} bestAskPrice={bestAskPrice} bestBidPrice={bestBidPrice}/>
            <Ladder asksQueue={asksQueue} bidsQueue={bidsQueue}/>
        </div>
    )
}

export default AskBid