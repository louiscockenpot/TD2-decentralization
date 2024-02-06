const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1ZDM5NDFmYS03Yjk0LTQxNjAtOGVkMi1mMzBkZWY0NjAyYmIiLCJlbWFpbCI6ImxvdWlzY29ja2VucG90MjdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjdmNWRlNDFjNmZkYzVlOTY1NjdkIiwic2NvcGVkS2V5U2VjcmV0IjoiMTUzMjYxMmMzMmQxMmJlZTNjYmE3YjAwNGQzZGFhMGRiOGY0OTM4MzA2ZDNmMzRiNWQ1NGNiNWUxY2EzNjIxOSIsImlhdCI6MTcwNzI0MTczNH0.OzJEA0kUwAmpHE1XkMoN2UWnbQCB47oc2zGnOfzB5Nk'

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "index.html";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'Chatonn',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}
pinFileToIPFS()
