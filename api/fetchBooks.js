import axios from 'axios'
import convert from 'xml-js'

const totalBooks = async () =>{
  const { data } = await axios.get("https://services.kpow.com/total_books.php")
  const shelfJson = JSON.parse(convert.xml2json(data, { compact: true, spaces: 4 }))
  const shelves = shelfJson.GoodreadsResponse.shelves.user_shelf
  const totals = shelves.map((shelf)=> Number(shelf.book_count._text) )
  const total = totals.reduce(function(a, b){return a + b;}, 0);
  return total
}

const fetchBooks = async (key, page = 1, howMany = 8) => {
  const { data } = await axios.get("https://services.kpow.com/books.php?perPage="+howMany+"&page="+(Number(page)+1))
  const json = JSON.parse(convert.xml2json(data, { compact: true, spaces: 4 }))
  const bookData = json.GoodreadsResponse.reviews.review
  const totalItems = await totalBooks();
  const fullData = {data:bookData, totalItems, hasMore:true}
  return fullData
}

export default fetchBooks
