import React, { useContext, useEffect } from 'react';
import { BoozeContext } from '../boozeContext'
import CustomDrinkTile from '../components/CustomDrinkTile'
import { imageUrlParser } from '../../utils/imageUrls'


const CustomFeed = () => {

  const { customDrinks, getCustomDrinks } = useContext(BoozeContext)

  useEffect(() => { getCustomDrinks() }, [])


return (
  <div className='container'>
    <h1 className='page-heading'>User Submitted Drinks</h1>
      <div className='row'>
        <div className='card-deck'>
        { customDrinks.map((drink, i) => {
          //selects an image address for randomizing drink imagesS
          let imageSrc = imageUrlParser()
          return (
            <CustomDrinkTile drink={drink} key={i} imageSrc={imageSrc} />
        )})}
          </div>
      </div>
  </div >
  )
};

export default CustomFeed