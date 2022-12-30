import https from 'https';

export default function fetch<T>(options: https.RequestOptions, data?: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let json = '';
      res.on('data', d => {
        json += d;
      });
      res.on('end', () => {
        if (json.length === 0) reject('Entity not found');
        if (json.length > 0) {
          const response = JSON.parse(json);
          if (response.error) reject(response);             
          resolve(response)
        }
      })
    });
    req.on('error', error => {
      console.error('!!! Fetch error: ',error);
      reject(error);
    });
    data && req.write(data);
    req.end();
  });
}
