import axios from 'axios'

const fetchDonuts = async (key, page = 0, howMany = 9) => {
  
  const { data } = await axios.post('/.netlify/functions/donuts',{page:page, howMany:howMany})

  const totalItems = 100
  const totalPages = 2
  const hasMore = true
  
  const bizData =  data.data.businesses

  const fullData = {bizData,totalItems,hasMore}
  console.log(fullData)
  return fullData
}

export default fetchDonuts
