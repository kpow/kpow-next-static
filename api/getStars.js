import axios from "axios";
import { useQuery } from "react-query";

export default function getStars(howMany=3,page=1) {
  return useQuery("posts", async () => {
    const { data } = await axios.get(
      "https://services.kpow.com/stars.php?page="+page+"&perPage="+howMany
    );
    return data;
  });
}