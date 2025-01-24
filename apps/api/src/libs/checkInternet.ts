import * as http from 'http';

export async function checkInternetConnection(): Promise<boolean> {
    return new Promise((resolve) => {
      
      const request = http.get('http://www.google.com', (response) => {
        resolve(response.statusCode === 200);
      });

      
      request.on('error', () => {
        resolve(false);
      });
      
      request.setTimeout(5000, () => {
        request.destroy();
        resolve(false); 
      });
    });
  }