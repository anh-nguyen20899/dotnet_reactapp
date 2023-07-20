const RankingGrid = ({items, imgArr, drag, allowDrop, drop}) => {
    const rankingGrid = [];
    const cellCollectionTop = [];
    const cellCollectionMiddle  = [];
    const cellCollectionBottom  = [];
    const cellCollectionWorst  = [];
    function pushCellMarkupToArr(cellCollection, rankNum, rowLabel) {
        if (rankNum > 0) {
            var item = items.find(o => o.ranking === rankNum);
            cellCollection.push(<div id={`rank-${rankNum}`} key={`rank-${rankNum}`} onDrop={drop} onDragOver={allowDrop} className="rank-cell">
                {(item != null) ? <img id={`item-${item.id}`} src={imgArr.find(o => o.id === item.imageId)?.image} draggable="true" onDragStart={drag} /> 
                                : null}
            </div>);
        }
        else {
            cellCollection.push(<div className="row-label">
                <h4>{rowLabel}</h4>
            </div>);
        }
    }
    function createCellsForRow(rowNum){
        var rankNum = 0; // for calculating Ranking of a Movie. 
        // (FirstMovie): 5 * (1 - 1) + 2 - 1 = 1. (SecondMovie): 5 * (1 - 1) + 3 - 1 = 2. (ThirdMovie): 5*(1-1) + 4 - 1 = 3. (Fourth)
        // (SecondRow - FirstCell): 5 * (2 - 1) + 2 - 2 = 5
        var currCollection = [];
        var label = '';
        const numCells = 5;
        for (var a = 1; a <= numCells; a++) {
            rankNum = (a === 1) ? 0 : (numCells * (rowNum - 1)  + a - rowNum) // for labeling only 
            if(rowNum === 1) {
                currCollection = cellCollectionTop;
                label = 'Top Tier';
            } else if (rowNum === 2) {
                currCollection = cellCollectionMiddle;
                label = 'Middle Tier';
            } else if (rowNum === 3) {
                currCollection = cellCollectionBottom;
                label = 'Bottom Tier';
            } else if (rowNum === 4) {
                currCollection = cellCollectionWorst;
                label = 'Worst Tier';
            }
            pushCellMarkupToArr(currCollection, rankNum, label);
        }

    }

    function createCellsForRows() {
        const rows = 4;
        for(var row = 1; row <= rows; row++){
            createCellsForRow(row); // create cells for a specific row
        }
    }

    function createRowsForGrid() {
        // create 4 rows and append to the grid
        rankingGrid.push(<div className="rank-row top-tier">{cellCollectionTop}</div>);
        rankingGrid.push(<div className="rank-row middle-tier">{cellCollectionMiddle}</div>);
        rankingGrid.push(<div className="rank-row bottom-tier">{cellCollectionBottom}</div>);
        rankingGrid.push(<div className="rank-row worst-tier">{cellCollectionWorst}</div>);
        return rankingGrid;
    }

    function createRankingGrid() {
        createCellsForRows(); // create 5 cells for 4 rows
        return createRowsForGrid(); // create 4 rows for this grid
    }

    return (
        <div className="rankings">
            {createRankingGrid()}
        </div>
    )
}
export default RankingGrid; 