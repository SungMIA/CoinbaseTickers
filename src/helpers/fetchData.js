export const ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');

export const tickerSub = (ticker) => {
    if(ws.readyState === 1) {
        ws.send(JSON.stringify({
            "type": "subscribe",
            "product_ids": [
                ticker,
            ],
            "channels": [
                "level2",
                "ticker_batch"
            ]
        }))
    }
}

export const tickerUnSub = () => {
    if(ws.readyState !== 2 && ws.readyState !== 3) {
        ws.send(JSON.stringify({
            "type": "unsubscribe",
            "channels": [
                "level2",
                "ticker_batch"
            ]
        }))
    }
}

export const channelSub = (ticker) => {
    ws.send(JSON.stringify({
        "type": "subscribe",
        "product_ids": [
            ticker,
        ],
        "channels": [
            "level2",
        ]
    }))
}

export const channelUnsub = () => {
    ws.send(JSON.stringify({
        "type": "unsubscribe",
        "channels": [
            "level2",
        ]
    }))
}

