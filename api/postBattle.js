import axios from 'axios'

const postBattle = async (battleData) => {
  const { data } = await axios.post(`https://enegii9o63m2nhz.m.pipedream.net`,{battleData, timestamp:new Date()})
}

export default postBattle
