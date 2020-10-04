import axios from 'axios'
import convert from 'xml-js'

const fetchBooks = async (key, page = 1, howMany = 8) => {
  
  const { data } = await axios.get("https://services.kpow.com/books.php?perPage="+howMany+"&page="+(Number(page)+1))
  const json = JSON.parse(convert.xml2json(data, { compact: true, spaces: 4 }))
  const bookData = json.GoodreadsResponse.reviews.review

  const fullData = {data:bookData, hasMore: true}
  return fullData
}

export default fetchBooks
