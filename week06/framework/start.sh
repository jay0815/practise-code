#!/bin/sh

echo '开始启动......'

echo '安装数据库及相关可视化工具......'
docker-compose up -d

echo '等待es完全启动......'
sleep 15s

echo '启动本地服务'

# yarn dev

yarn build && yarn start

echo '启动完成'