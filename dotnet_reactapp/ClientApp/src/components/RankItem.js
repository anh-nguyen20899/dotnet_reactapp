import React, { useState, useEffect } from 'react';
import MovieImageArr from './MovieImages';

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
    return(
        <main>
            <div className='items-not-ranked'>
            {
                (items.length > 0) ? items.map((item) =>
                    
                    <img id={`id-${item.id}`} key={item.id} src={MovieImageArr.find(o => o.id === item.imageId)?.image}/>
                    ): <div>... Loading</div>
            }
            
            </div>        
        </main>
    )
}
export default RankItem;
