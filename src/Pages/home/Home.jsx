import React from 'react'
import HomeSection from './HomeSection'
import TrendingProducts from './TrendingProducts'
import OnSaleSec from './OnSaleSec'
import Onsale from './Onsale'
import NewsLetter from './NewsLetter'

const Home = () => {
  return (
    <div>
    <HomeSection/>
      <div className='pl-10 pr-10'>
   
   <TrendingProducts/>
   <Onsale/>
<NewsLetter/>
<OnSaleSec/>
    </div>
    </div>
  )
}

export default Home
