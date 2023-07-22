import React, { useState, useEffect } from 'react';
import MovieImageArr from './MovieImages';
import RankingGrid from './RankingGrid';
const RankItem = () => {
    const [items, setItems] = useState([]);
    const dataType = 1;
    var itemId = 0;
    useEffect(() => {
        fetch(`item/${dataType}`)
            .then((result) => {
                return result.json();
            })
            .then(data => {
                setItems(data);
            })
    },[])
    function drag(event) {
        itemId = event.currentTarget.id.substring(3);
        
    }
    function allowDrop(event) {
        event.preventDefault();
    }
    function drop(event) {
        event.preventDefault();
        const targetElm = event.target;
        if (targetElm.nodeName === "IMG") {
            return false;
        }
        if (targetElm.childNodes.length === 0) {
            // update ranking
            const transformedCollection = items.map((item) => (item.id === parseInt(itemId)) ?
            { ...item, ranking: parseInt(targetElm.id.substring(5)) } : { ...item, ranking: item.ranking });
            setItems(transformedCollection);
        }
    }
    return(
        <main>
            <RankingGrid items={items} imgArr={MovieImageArr} drag={drag} allowDrop={allowDrop} drop={drop}/>
            <div className='items-not-ranked'>
            {
                
                (items.length > 0) ? items.map((item) =>
                (item.ranking === 0) ?
                <div className='unranked-cell'>
                    <img id={`id-${item.id}`} 
                        key={item.id} 
                        style={{ cursor: "pointer" }} draggable="true" onDragStart={drag}
                        src={MovieImageArr.find(o => o.id === item.imageId)?.image}/>
                </div> : null
                    
                    ): <div>... Loading</div>
            }
            
            </div>        
        </main>
    )
}
export default RankItem;
