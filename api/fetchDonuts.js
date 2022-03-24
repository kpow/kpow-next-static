import axios from 'axios';

const fetchDonuts = async (location) => {
  console.log(location);
  const { data } = await axios.post('/.netlify/functions/donuts', { location });

  const totalItems = 100;
  const totalPages = 2;
  const hasMore = true;

  const bizData = data.data.businesses;

  const fullData = { bizData, totalItems, hasMore };
  console.log(fullData);
  return fullData;
};

export default fetchDonuts;
