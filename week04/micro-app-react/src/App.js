import { useEffect, useState } from 'react';
import './App.css';
import React from 'react';
import { List, Avatar } from 'antd';

function App(props) {

  const [list, setList] = useState([]);

  const fetchNews = async () => {  
    const res = await fetch("https://api.apiopen.top/getWangYiNews", {
      method: "POST",
      mode: "cors"
    });
    const news = await res.json();
    setList(news.result);
  }

  useEffect(() => {
    fetchNews();
  }, [])


  const updateUrl = (item) => {
    props.setGlobalState && props.setGlobalState({
      user: {
        url: item.path
      }
    })
  }

  return (
    <div className="App">
      <List
          itemLayout="horizontal"
          dataSource={list}
          renderItem={item => (
            <List.Item onClick={() => updateUrl(item)}>
              <List.Item.Meta
                avatar={<Avatar src={item.image} />}
                title={<a href="void:0">{item.title}</a>}
                description={item.passtime}
              />
            </List.Item>
          )}
        />
    </div>
  );
}

export default App;