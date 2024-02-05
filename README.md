# Motrix-Web
<a href="https://hub.docker.com/r/jarvay/motrix-web">
  <img src="https://img.shields.io/docker/pulls/jarvay/motrix-web?color=%2348BB78&logo=docker&label=pulls" alt="Downloads" />
</a>


English | [简体中文](./README-CN.md)


## Web version of [Motrix](https://github.com/agalwood/Motrix)

<a href="https://motrix.app">
    <img src="./static/512x512.png" width="64" alt="Motrix App Icon" />
</a>


## Usage
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
    ports:
      - "5000:5000"
    volumes:
      - ./motrix-config:/app/config
      # You need to mount the same directory as aria2[-pro], otherwise the function of deleting files will not work
      - /mnt:/downloads
```

```shell
docker-compose up -d
```
