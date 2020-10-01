const extractHostname = (url, tld) => {
  let hostname;
  
    //find & remove protocol (http, ftp, etc.) and get hostname
    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }else {
        hostname = url.split('/')[0];
    }
  
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
  
    if(tld){
      let hostnames = hostname.split('.');
      hostname = hostnames[hostnames.length-2] + '.' + hostnames[hostnames.length-1];
    }
    return hostname;
}

export default extractHostname
