import axios from "axios";
import { useQuery } from "react-query";


function extractHostname(url,tld) {
  let hostname;

  //find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf("://") > -1) {
      hostname = url.split('/')[2];
  }else {
      hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];

  //find & remove "?"
  hostname = hostname.split('?')[0];

  if(tld){
    let hostnames = hostname.split('.');
    hostname = hostnames[hostnames.length-2] + '.' + hostnames[hostnames.length-1];
  }

  return hostname;
}


export default function getStars(howMany=3,page=1) {
  return useQuery("stars", async () => {
    const { data } = await axios.get(
      "https://services.kpow.com/stars.php?page="+page+"&perPage="+howMany
    );



    for(let i=0;i<data.length;i++ ){
      let siteUrl = extractHostname(data[i].url);
      data[i].site_url = siteUrl;
      let contentdata = await axios.get(data[i].extracted_content_url);
      data[i].lead_image_url = contentdata.data.lead_image_url;
    }  

    return data;
  });
}