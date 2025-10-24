# Motrix-Web
<a href="https://hub.docker.com/r/jarvay/motrix-web">
  <img src="https://img.shields.io/docker/pulls/jarvay/motrix-web?color=%2348BB78&logo=docker&label=pulls" alt="Downloads" />
</a>

[English](./README.md) | 简体中文

## [Motrix](https://github.com/agalwood/Motrix)的网页版

<a href="https://motrix.app">
    <img src="./static/512x512.png" width="64" alt="Motrix App Icon" />
</a>

## 使用方法
`docker-compose.yml`
```yaml
version: '3'
services:
  aria2-pro:
    container_name: aria2_pro
    image: p3terx/aria2-pro
    restart: always
    ports:
      - "6800:6800"
      - "6888:6888"
      - "6888:6888/udp"
    environment:
      - LISTEN_PORT=6888
      - RPC_PORT=6800
      - RPC_SECRET=123456
      - TZ=Asia/Shanghai
      - PUID=0
      - PGID=0
      - UMASK_SET=022
    volumes:
      - /mnt:/downloads
      - ./config:/config
  motrix-web:
    container_name: motrix-web
    image: jarvay/motrix-web
    restart: always
    environment:
      - WEB_UI_PORT=5000
      - DEFAULT_RPC_HOST=192.168.10.20
      - DEFAULT_RPC_PORT=6800
      - DEFAULT_RPC_SECRET=123456
    ports:
      - "5000:5000"
    volumes:
      - ./motrix-config:/app/config
      # 需要挂载与aria2[-pro]相同的目录，否则删除文件的功能不生效
      - /mnt:/downloads
```

```shell
docker-compose up -d
```
