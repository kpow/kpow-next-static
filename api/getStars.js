import axios from "axios";
import { useQuery } from "react-query";
import extractHostname from '@utils/extractHostname'

export default function getStars(page=1, howMany=3,) {
  return useQuery("stars", async () => {

    const { data } = await axios.get(
      "https://services.kpow.com/stars.php?page="+page+"&perPage="+howMany
    );

    // this gets the lead image from the extracted content url 
    // and parses hostname from url inserts them into the data.
    for(let i=0;i<data.length;i++ ){
      const siteUrl = extractHostname(data[i].url);
      const contentdata = await axios.get(data[i].extracted_content_url);
      data[i].site_url = siteUrl;
      data[i].lead_image_url = contentdata.data.lead_image_url;
    }  

    return data.reverse();
  });
}