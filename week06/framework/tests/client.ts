import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
});

const main = async () => {
  // redis
  {
    const res = await instance.get('/redis/search/321');
    console.log('redis search', res.data);
  }
  {
    const res = await instance.post('/redis/insert', {
        name: "jack",
        age: 16,
        sex: "男" 
    })
    console.log('redis search', res);
  }
  {
    const res = await instance.get('/redis/search/name');
    console.log('redis search', res.data);
  }
  // mongo
  {
      const res = await instance.post('/mongo/insert', {
        name: "jack",
        age: 16,
        sex: "男" 
      })
      console.log('mongo insert', res);
  }
  {
    const res = await instance.get('/mongo/search')
    console.log('mongo search', res.data);
  }
  // mysql
  {
    // 如果是第一次执行，先尝试执行初始化 todos table的 init 接口
    const res = await instance.get('/mysql/init')
    console.log('mysql init', res);
  }
  {
    const res = await instance.post('/mysql/insert', {
        name: "tom",
        time: "2021-08-22 16:17:18",
        sex: "1" 
    })
    console.log('mysql insert', res);
  }
  {
    const res = await instance.get('/mysql/search');
    console.log('mysql search', res.data);
  }
  {
    const res = await instance.post('/mysql/update', {
      updateKey: "sex",
      updateValue: "2",
      primarykey: "name", 
      primaryValue: "tom"
    });
    console.log('mysql update', res);
  }
  // elasitc
  {
    const res = await instance.get('/es/search');
    console.log('elasitc search', res.data);
  }
  {
    const date = Math.ceil(Math.random() * 10);
    const status = Math.ceil(Math.random()) === 1 ? 'happy' : 'unhappy';
    const res = await instance.post('/es/insert', {
      subject: `today is No.${date} of month`,
      content: `a ${status} day`,
      datetime: Date.now(),
      state: Math.ceil(Math.random() * 2),
    });
    console.log('insert subject into elasitc', res);
  }
  {
    const res = await instance.get('/es/search');
    console.log('elasitc search again', res.data);
  }
}

main();