import axios from 'axios'

const fetchScrobbles = async (key, page = 0, howMany = 9) => {
  
  const { data } = await axios.get("https://services.kpow.com/scrobbles.php?page="+(page+1)+"&perPage="+howMany)

  const totalItems = data.recenttracks.track.length;
  const totalPages = data.recenttracks.track.length/howMany

  const hasMore = true
  
  const fullData = {data:data.recenttracks.track,totalItems,hasMore}
  console.log(fullData)
  return fullData
}

export default fetchScrobbles
