# Setup server
1. Clone server từ git hub về
```sh
$ git clone https://github.com/dambaquyen96/1nv1-audiostreaming
```

2. Cài nodejs và npm nếu chưa có (Tải và cài trên mạng https://www.npmjs.com/get-npm)

3. Mở terminal và truy cập đến thư mục server 1nv1-audiostreaming

4. Cài các dependency
```sh
$ npm install
```

# Chạy Server
1. Bật cục router wifi Xiaomi_DA63

2. Mở server, kết nối đến router qua wifi hoặc cổng ehternet

3. Đổi ip của server thành ip tĩnh:

> IP Address:	192.168.31.248

> Subnetmask:	255.255.255.0

> Gateway:	192.168.31.1

4. Chạy server bằng cách mở terminal và truy cập đến thư mục server 1nv1-audiostreaming, gõ lệnh:
```sh
$ npm start
```

# Chạy thiết bị
1. Mở nguồn của thiết bị, các devices sẽ tự động kết nối wifi Xiaomi_DA63

2. Truy cập đến thiết bị qua ssh (Trên windows có thể dùng "Putty" hoặc "Bash on Ubuntu on Windows"). Yêu cầu thiết bị dùng để truy cập cũng kết nối đến wifi:

Device 1 (Mic rời)
```sh
$ ssh pi@192.168.31.251
```
Device 2 (Mic gắn tai nghe)
```sh
$ ssh pi@192.168.31.252
```
Pass đều là: raspberry

3. Khởi động hệ thống:
```sh
$ ./run.sh
```

4. Tắt hệ thống sau khi sử dụng xong: 
```sh
$ ./kill.sh
```

# Quy trình chạy:
1. Mở wifi

2. Chạy server

3. Chạy hệ thống trên các thiết bị

4. Chờ tín hiệu kết nối từ thiết bị trên server

5. Truy cập 127.0.0.1:3000 trên server để có thể thu dữ liệu