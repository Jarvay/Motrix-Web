# Motrix-Web

<p>
  <a href="https://motrix.app">
    <img src="./static/512x512.png" width="256" alt="Motrix App Icon" />
  </a>
</p>

## [Motrix](https://github.com/agalwood/Motrix)的网页版


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
    ports:
      - 5000:5000
    environment:
      - RPC_PORT=6800
      - RPC_HOST=192.168.10.10
      - RPC_SECRET=123456
    volumes:
      - ./motrix-config:/app/config
      # 需要挂载与aria2[-pro]相同的目录，否则删除文件的功能不生效
      - /mnt:/downloads
```

```shell
docker-compose up -d
```
