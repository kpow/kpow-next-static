import axios from 'axios'

const fetchHeros = async (key, who = 'spiderman') => {
  
  console.log(who)
  const query = encodeURIComponent(who);
  console.log("http://services.kpow.com/marvel.php?who="+query)

  const { data } = await axios.get(`//services.kpow.com/marvel.php?who=${query}`)

  const totalItems = 1;
  const hasMore = false;
  //console.log("https://services.kpow.com/marvel.php?who="+who)
  //console.log(data)
  const fullData = {data,totalItems,hasMore}
  return fullData
}

export default fetchHeros
