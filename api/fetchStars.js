import axios from 'axios'
import extractHostname from '@utils/extractHostname';

const fetchStars = async (key, page = 0, howMany = 9) => {
  
  const { data } = await axios.post('/.netlify/functions/stars',{page:page, howMany:howMany})

  for(let i=0;i<data.data.length;i++ ){
    const siteUrl = extractHostname(data.data[i].url);
    data.data[i].site_url = siteUrl;
    try {
      const contentdata = await axios.get(data.data[i].extracted_content_url);
      data.data[i].lead_image_url = contentdata.data.lead_image_url;
    } catch (error) {
      console.error(error);
    }
  } 

  const stars = await axios.get("/.netlify/functions/totalStars")
  const totalItems = stars.data.data.length;
  const totalPages = stars.data.data.length/howMany

  const hasMore = totalPages > page ? true : false;

  data.data.reverse()
  const adjustedData = data.data;
  const fullData = {adjustedData,totalItems,hasMore}
  
  return fullData
}

export default fetchStars
