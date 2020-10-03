import axios from 'axios'
import convert from 'xml-js'

const fetchBooks = async (key, page = 0, howMany = 9) => {
  
  const { data } = await axios.get("https://services.kpow.com/books.php?perPage="+howMany+"&page="+page)
  const json = JSON.parse(convert.xml2json(data, { compact: true, spaces: 4 }))
  const bookData = json.GoodreadsResponse.reviews.review

  console.log(bookData)
  const fullData = {data:bookData, hasMore: true}
  return fullData
}

export default fetchBooks
