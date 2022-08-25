import React from 'react'

let Ladder = ({asksQueue, bidsQueue}) => {
    let bTop = bidsQueue._heap._nodes.slice(0,20)
    let aTop = asksQueue._heap._nodes.slice(0,20).reverse()
    
    return (
        <div>
            <label id="ladderLabel">
                <div>Quantity</div>
                <div>Price (USD)</div>
            </label>
            <div id="aContainer">
                {aTop.map((item) => {
                    let splitPrice = item[0].split('.')
                    return(
                        <div id="aLadder">
                            <div class="aQty">{item[1]}</div>
                            <div><span class="aPrice">{splitPrice[0]}</span>.<span class="aPriceDecimal">{splitPrice[1]}</span></div>
                        </div>
                    )
                })}
            </div>
            <label id="ladderLabel">
                <div>Quantity</div>
                <div>Price (USD)</div>
            </label>
            <div id="bContainer">
                {bTop.map((item) => {
                    let splitPrice = item[0].split('.')

                    return(
                        <div id="bLadder">
                            <div class="bQty">{item[1]}</div>
                            <div><span class="bPrice">{splitPrice[0]}</span>.<span class="bPriceDecimal">{splitPrice[1]}</span></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Ladder