import axios from 'axios'

const fetchHeros = async (key, who = 'spiderman') => {
  
  console.log(who)
  console.log("https://services.kpow.com/marvel.php?who="+who)
  const { data } = await axios.get("//services.kpow.com/marvel.php?who="+who)

  const totalItems = 1;
  const hasMore = false;
  //console.log("https://services.kpow.com/marvel.php?who="+who)
  //console.log(data)
  const fullData = {data,totalItems,hasMore}
  return fullData
}

export default fetchHeros
