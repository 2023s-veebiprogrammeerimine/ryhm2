const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");
const pageHead = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8">\n\t<title>Andrus Rinde, veebiprogrammeerimine 2023</title>\n</head>\n<body>';
const pageBanner = '\n\t<img src="banner.png" alt="Lehe bänner">\n';
const pageBody = '\n\t<h1>Andrus Rinde</h1>\n\t<p>See leht on loodud <a href="https://www.tlu.ee" target="_blank">TLÜ</a> Digitehnoloogiate instituudis õppetöö raames!</p>\n\t<p>Olen väga tore!</p>\n\t<p>Keskmist kasvu meesterahvas parimais aastais!</p>\n\t<hr>\n\t<p>Kursus, mille raames leht tehti on: veebiprogrammeerimine.</p>';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res){
	console.log(url.parse(req.url, true));
	let currentURL = url.parse(req.url, true);
	if(currentURL.pathname === "/"){
		//määrame tagastatavate andmete päise, et on veebileht
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('<p><a href="addName">Lisame nime</a>!</p>');
		res.write(pageFoot);
		//et see kõik valmiks ja ära saadetaks
		return res.end();
	}
	else if (currentURL.pathname === "/addName"){ 
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('<h2>Palun lisa oma nimi</h2>');
		res.write(pageFoot);
		//et see kõik valmiks ja ära saadetaks
		return res.end();
	}
	else if (currentURL.pathname === "/banner.png"){
		console.log("tahan pilti!");
		let filePath = path.join(__dirname, "public", "banner/banner.png");
		fs.readFile(filePath, (err, data)=>{
			if(err){
				throw err;
			}
			else {
				res.writeHead(200, {"Content-Type": "image/png"});
				res.end(data);
			}
		});
	} 
}).listen(5200);

//5200   rinde

//52XX

//näiteks 5208