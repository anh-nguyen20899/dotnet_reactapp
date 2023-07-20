import React, { useState, useEffect } from 'react';
import MovieImageArr from './MovieImages';
import RankingGrid from './RankingGrid';
const RankItem = () => {
    const [items, setItems] = useState([]);
    const dataType = 1;
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
        event.dataTransfer.setData("text", event.target.id);
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
            var data = parseInt(event.dataTransfer.getData("text").substring(5));
            const transformedCollection = items.map((item) => (item.id === parseInt(data)) ?
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
                <div className='unranked-cell'>
                    <img id={`id-${item.id}`} 
                        key={item.id} 
                        style={{ cursor: "pointer" }} draggable="true" onDragStart={drag}
                        src={MovieImageArr.find(o => o.id === item.imageId)?.image}/>
                </div>
                    
                    ): <div>... Loading</div>
            }
            
            </div>        
        </main>
    )
}
export default RankItem;
