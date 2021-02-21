import axios from 'axios'
import convert from 'xml-js'

const totalBooks = async () =>{
  const { data } = await axios.get("/.netlify/functions/totalBooks")
  const shelfJson = JSON.parse(convert.xml2json(data, { compact: true, spaces: 4 }))
  const shelves = shelfJson.GoodreadsResponse.shelves.user_shelf
  const totals = shelves.map((shelf)=> Number(shelf.book_count._text) )
  const total = totals.reduce(function(a, b){return a + b;}, 0);
  return total
}

const fetchBooks = async (key, page = 0, howMany = 4) => {
  const { data } = await axios.post('/.netlify/functions/books',{page:page, howMany:howMany})
  const json = JSON.parse(convert.xml2json(data, { compact: true, spaces: 4 }))
  const bookData = json.GoodreadsResponse.reviews.review
  const totalItems = await totalBooks();
  const fullData = {data:bookData, totalItems, hasMore:true}
  return fullData
}

export default fetchBooks
