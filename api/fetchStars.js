import axios from 'axios';
import extractHostname from '@utils/extractHostname';

const fetchStars = async (key, page = 0, howMany = 9) => {
  const { data } = await axios.post('/.netlify/functions/stars', { page: (page + 1), howMany });

  for (let i = 0; i < data.length; i++) {
    const siteUrl = extractHostname(data[i].url);
    data[i].site_url = siteUrl;
    try {
      const contentdata = await axios.get(data[i].extracted_content_url);
      data[i].lead_image_url = contentdata.data.lead_image_url;
    } catch (error) {
      console.error(error);
    }
  }
  const stars = await axios.get('/.netlify/functions/totalStars');
  const totalItems = stars.data.data.length;
  const totalPages = totalItems / howMany;
  const hasMore = totalPages > page;

  data.reverse();
  const fullData = { data, totalItems, hasMore };
  return fullData;
};

export default fetchStars;
