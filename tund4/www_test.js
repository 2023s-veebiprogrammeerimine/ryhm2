const http = require("http");

http.createServer(function(req, res){
	//määrame tagastatavate andmete päise, et on veebileht
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write('<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8">\n\t<title>Andrus Rinde, veebiprogrammeerimine 2023</title>\n</head>\n<body>');
	res.write('\n\t<h1>Andrus Rinde</h1>\n\t<p>See leht on loodud <a href="https://www.tlu.ee" target="_blank">TLÜ</a> Digitehnoloogiate instituudis õppetöö raames!</p>\n\t<p>Olen väga tore!</p>\n\t<p>Keskmist kasvu meesterahvas parimais aastais!</p>\n\t<hr>\n\t<p>Kursus, mille raames leht tehti on: veebiprogrammeerimine.</p>\n</body>\n</html>');
	//et see kõik valmiks ja ära saadetaks
	return res.end();
}).listen(5200);

//5200   rinde

//52XX

//näiteks 5208