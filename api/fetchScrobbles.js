import axios from 'axios'

const fetchScrobbles = async (key, page = 0, howMany = 9) => {
  
  const { data } = await axios.get('.netlify/functions/fetch')

  const totalItems = data.data.recenttracks.track.length;
  const totalPages = data.data.recenttracks.track.length/howMany

  const hasMore = true;
  
  const fullData = {data:data.data.recenttracks.track,totalItems,hasMore}
  console.log(fullData)
  return fullData
}

export default fetchScrobbles
