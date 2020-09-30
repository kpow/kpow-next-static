import axios from "axios";
import { useQuery } from "react-query";

export default function getStars(howMany=3,page=1) {
  return useQuery("stars", async () => {
    const { data } = await axios.get(
      "https://services.kpow.com/stars.php?page="+page+"&perPage="+howMany
    );

    for(let i=0;i<data.length;i++ ){
      let contentdata = await axios.get(data[i].extracted_content_url);
      data[i].lead_image_url = contentdata.data.lead_image_url
    }  

    return data;
  });
}