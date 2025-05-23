import React, { useEffect ,useState} from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Player = () => {

  const {id}  =useParams()
  const navigate = useNavigate()
  
  const [apiData,setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  })

  console.log(apiData)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWQ1YzJiYjA1ZDE4YjVkYjk2NjRiZmFkMmJjMTcwMCIsIm5iZiI6MTczMTMzMzYyNy44NzU1NjAzLCJzdWIiOiI2NzMyMDE0YjY4OTVmMzgyMmU0NWZlZmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.cJ8SuAKnbbhgmWLV2KY7uqHwrFeGL_56NbtM11OUpdE'
    }
  };
    useEffect(()=>{
      fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
    },[])
  


  return (
    <div className='player'>
      <Link to={"/"}>
      <img src={back_arrow_icon} alt=""/>
      </Link>
      <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${apiData.key}`} frameborder="0" title='Trailer' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
