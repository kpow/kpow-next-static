import axios from 'axios'
import extractHostname from '@utils/extractHostname';

const fetchStars = async (key, page = 0, howMany = 9) => {
  
  const { data } = await axios.get("https://services.kpow.com/stars.php?page="+(page+1)+"&perPage="+howMany)

  for(let i=0;i<data.length;i++ ){
    const siteUrl = extractHostname(data[i].url);
    data[i].site_url = siteUrl;
    try {
      const contentdata = await axios.get(data[i].extracted_content_url);
      data[i].lead_image_url = contentdata.data.lead_image_url;
    } catch (error) {
      console.error(error);
    }
  } 

  const stars = await axios.get("https://services.kpow.com/total_stars.php")
  const totalStars = stars.data.length;
  const totalPages = stars.data.length/howMany

  const hasMore = totalPages > page ? true : false;

  data.reverse()
  const fullData = {data,totalStars,hasMore}
  return fullData
}

export default fetchStars
