import Share from 'react-native-share';
  
export const shareToWhatsApp = async (hostName, id) => {

  console.log('share')
    const shareOptions = {
        title: 'GoldenLive',
        message:(hostName && id) ? `${hostName} is performing live(HostID: ${id})! Join now with your friends by clicking the link below\n` 
        : 
        `${hostName} invited you on GoldenLive application! join now with your friends by clicking the link below\n`, // Note that according to the documentation at least one of "message" or "url" fields is required
        // url: 'https://bano.page.link/ZCg5',
        subject: 'GoldenLive'
      };
      
    Share.open(shareOptions)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      err && console.log(err);
    });
  };