const PORT = 3484;									//Đặt địa chỉ Port được mở ra để tạo ra chương trình mạng Socket Server
 
var http = require('http') 							//#include thư viện http - Tìm thêm về từ khóa http nodejs trên google nếu bạn muốn tìm hiểu thêm. Nhưng theo kinh nghiệm của mình, Javascript trong môi trường NodeJS cực kỳ rộng lớn, khi bạn bí thì nên tìm hiểu không nên ngồi đọc và cố gắng học thuộc hết cái reference (Tài liêu tham khảo) của nodejs làm gì. Vỡ não đó!
var socketio = require('socket.io')				//#include thư viện socketio
const firebase = require('firebase');
var ip = require('ip');
var app = http.createServer();					//#Khởi tạo một chương trình mạng (app)
var io = socketio(app);								//#Phải khởi tạo io sau khi tạo app!

var config = {
    apiKey: "AIzaSyDPuiVtAcUMj0JlsoL17b5canmQDsXNmMw",
    authDomain: "iot-hydro.firebaseapp.com",
    databaseURL: "https://iot-hydro.firebaseio.com",
    projectId: "iot-hydro",
    storageBucket: "iot-hydro.appspot.com",
    messagingSenderId: "631934233453"
};
firebase.initializeApp(config);
const db = firebase.database();
app.listen(PORT);										// Cho socket server (chương trình mạng) lắng nghe ở port 3484
console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + PORT)
 
//Khi có mệt kết nối được tạo giữa Socket Client và Socket Server
io.on('connection', function(socket) {	
	//hàm console.log giống như hàm Serial.println trên Arduino
    console.log("Connected"); //In ra màn hình console là đã có một Socket Client kết nối thành công.
	
	var interval2= setInterval (function(){
		var json2 = {
			"temp_max":35,
			"temp_min":15,
		}
		socket.emit('DATA_TEMP',json2)
		console.log("SEND DATA TEMP")
	},4000)
	
	var interval3 = setInterval(function(){
		var json3 = {
			"hum_max": 82,
		}
		socket.emit('DATA_HUM',json3)
		console.log("SEND DATA HUM")
	},5000)
	
	var interval4 = setInterval(function(){
		var json4 = {
			"moisture_min": 50,
		}
		socket.emit('DATA_MOISTURE',json4)
		console.log("SEND DATA MOISTURE")
	},6000)

	var interval5 = setInterval(function(){
		var json5 = {
			"waterlevel_max": 30,
		}
		socket.emit('DATA_WATERLEVEL',json5)
		console.log("SEND DATA WATERLEVEL")
	},7000)
	
	
	socket.on('RAIN', function(status) {
		console.log("recv RAIN", status)
	})
	
	//Khi socket client bị mất kết nối thì chạy hàm sau.
	socket.on('disconnect', function() {
		console.log("disconnect") 	
		clearInterval(interval2)
		clearInterval(interval3)
		clearInterval(interval4)
		clearInterval(interval5)
	})
});