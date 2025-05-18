import React, { useEffect, useRef, useState } from 'react'
import cards_data from '../../assets/cards/Cards_data'
import './TitleCards.css'
import { Link } from 'react-router-dom'
const TitleCards = ({title,category}) => {
  console.log(category)
  const cardsRef = useRef()
  const [apiData,setApiData] = useState([])
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWQ1YzJiYjA1ZDE4YjVkYjk2NjRiZmFkMmJjMTcwMCIsIm5iZiI6MTczMTMzMzYyNy44NzU1NjAzLCJzdWIiOiI2NzMyMDE0YjY4OTVmMzgyMmU0NWZlZmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.cJ8SuAKnbbhgmWLV2KY7uqHwrFeGL_56NbtM11OUpdE'
    }
  };
  
  

  const handleWheel = (event)=>{
    event.preventDefault()
    cardsRef.current.scrollLeft+= event.deltaY;
  }
  useEffect(()=>{
    
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener("wheel",handleWheel)
  },[])
  return (
    <div className='title-cards'>
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className='card-list' ref={cardsRef}>
          {apiData.map((data,index)=>{
            return <Link to={`/player/${data.id}`} key={index} className='card'>
            <img src={`https://image.tmdb.org/t/p/w500`+data.backdrop_path} alt="" />  
            <p>{data.original_title}</p>
            </Link>
          })}
        </div>
    </div>
  )
}

export default TitleCards
