import axios from 'axios'

const fetchScrobbles = async (key, page = 0, howMany = 9) => {
  
  const { data } = await axios.post('/.netlify/functions/recentPlays',{page:page, howMany:howMany})

  const totalItems = Number(data.data.recenttracks['@attr'].total);
  const totalPages = totalItems/howMany
  const hasMore = page <= totalPages;
  
  const fullData = {data:data.data.recenttracks.track,totalItems,hasMore}
  return fullData
}

export default fetchScrobbles
