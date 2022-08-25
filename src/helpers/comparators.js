// returning a number bigger than 0 means swap elements
// used when creating priority queue from external library
// implemented like as min/max (asks,bids) priority queue based on price & qty

export const bidsComparator = (a, b) => {
    if(parseInt(a[0]) > parseInt(b[0])) {
        return -1;
    }
    // swapping higher bids to the front of the queue
    if(parseInt(a[0]) < parseInt(b[0])) {
        return 1;
    }
    // with largest quantities
    return parseInt(a[1]) > parseInt(b[1]) ? -1 : 1;
}
// resembles minimum priority queue
export const asksComparator = (a, b) => {
    if(parseInt(a[0]) < parseInt(b[0])) {
        return -1;
    }
    // prioritizing lower asks
    if(parseInt(a[0]) > parseInt(b[0])) {
        return 1;
    }
    // with largest quantities
    return parseInt(a[1]) > parseInt(b[1]) ? -1 : 1;
}