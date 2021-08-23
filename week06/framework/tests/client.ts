import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
});

const main = async () => {
  // redis set
  instance.get('/redis/search/321');
  // instance.post('/redis/insert', {
      // name: "jack",
      // age: 16,
      // sex: "男" 
  // })
}

main();