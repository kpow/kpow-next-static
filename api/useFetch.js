//useFetch.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url, post) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
      setLoading('loading...')
      setData(null);
      setError(null);
      const source = axios.CancelToken.source();
      axios.post(url, {post:post, cancelToken: source.token})
      .then(res => {
          setLoading(false);
          //checking for multiple responses for more flexibility 
          //with the url we send in.
          //console.log(res)
          res.data.data.businesses && setData(res.data.data.businesses);
         
      })
      .catch(err => {
          setLoading(false)
          setError('An error occurred. Awkward..')
      })
      return () => {
          source.cancel();
      }
  }, [url])

  return { data, loading, error }
}

export default useFetch;
