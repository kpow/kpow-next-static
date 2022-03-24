import axios from 'axios';

const postBattle = async (battleData) => {
  const { data } = await axios.post(`/.netlify/functions/battle`,{battleData, timestamp: new Date() });
};

export default postBattle;
