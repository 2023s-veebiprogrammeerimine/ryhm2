const http = require("http");

http.createServer(function(req, res){
	//määrame tagastatavate andmete päise, et on veebileht
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Andrus Rinde, veebiprogrammeerimine 2023</title></head><body>');
	res.write('<h1>Andrus Rinde</h1><p>See leht on loodud <a href="https://www.tlu.ee" target="_blank">TLÜ</a> Digitehnoloogiate instituudis õppetöö raames!</p><p>Olen väga tore!</p><p>Keskmist kasvu meesterahvas parimais aastais!</p><hr><p>Kursus, mille raames leht tehti on: veebiprogrammeerimine.</p></body></html>');
	//et see kõik valmiks ja ära saadetaks
	return res.end();
}).listen(5200);

//5200   rinde

//52XX

//näiteks 5208