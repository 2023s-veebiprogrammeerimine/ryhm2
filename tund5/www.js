const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");
const { parse } = require('querystring');
const dateInfo = require("./dateTime_et");
const pageHead = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8">\n\t<title>Andrus Rinde, veebiprogrammeerimine 2023</title>\n</head>\n<body>';
const pageBanner = '\n\t<img src="banner.png" alt="Lehe bänner">\n';
const pageBody = '\n\t<h1>Andrus Rinde</h1>\n\t<p>See leht on loodud <a href="https://www.tlu.ee" target="_blank">TLÜ</a> Digitehnoloogiate instituudis õppetöö raames!</p>\n\t<p>Olen väga tore!</p>\n\t<p>Keskmist kasvu meesterahvas parimais aastais!</p>\n\t<hr>\n\t<p>Kursus, mille raames leht tehti on: veebiprogrammeerimine.</p>';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res){
	if (req.method === 'POST'){
		//res.end('Tuligi POST!');
		/* collectRequestData(req, result => {
			res.write(result);
			res.end();
		}); */
		//avan tekstifaili kirjutamiseks nii, et kui seda olemas pole, luuakse
		fs.open('public/log.txt', 'a', (err, file)=>{
			if(err){
				throw err;
			}
			else {
				fs.appendFile('public/log.txt', 'Tekst lisatud;', (err)=>{
					if(err){
						throw err;
					}
					else {
						res.end('Lisati tekst');
					}
				});
				fs.close(file, (err)=>{
					if (err){
						throw err;
					}
				});
			}
		});
	}
	else {
		//console.log(url.parse(req.url, true));
		let currentURL = url.parse(req.url, true);
		if(currentURL.pathname === "/"){
			//määrame tagastatavate andmete päise, et on veebileht
			res.writeHead(200, {"Content-Type": "text/html"});
			res.write(pageHead);
			res.write(pageBanner);
			res.write(pageBody);
			res.write('\n\t <p>Lehe avamise hetkel oli:' + dateInfo.dateNowET() + ' kell ' + dateInfo.timeNowET() + '</p>');
			res.write('\n\t <p><a href="addName">Lisame nime</a>!</p>');
			res.write('\n\t <p>Semestri <a href="semesterprogress">edenemine</a>.</p>');
			res.write('\n\t <p>TLÜ <a href="tluphoto">foto</a>.</p>');
			res.write(pageFoot);
			//et see kõik valmiks ja ära saadetaks
			return res.end();
		}
		else if (currentURL.pathname === "/addName"){ 
			res.writeHead(200, {"Content-Type": "text/html"});
			res.write(pageHead);
			res.write(pageBanner);
			res.write(pageBody);
			res.write('\n\t<h2>Palun lisa oma nimi</h2>');
			res.write('\n\t<form method="POST">\n\t\t<label for="nameInput">Eesnimi: </label>\n\t\t<input type="text" id="nameInput" name="nameInput" placeholder="Sinu eesnimi ...">\n\t\t<br>\n\t\t<label for="lastNameInput">Perekonnanimi: </label>\n\t\t<input type="text" id="lastNameInput" name="lastNameInput" placeholder="Sinu perekonnanimi ...">\n\t\t<br>\n\t\t<input type="submit" name="nameSubmit" value="Salvesta">\n\t</form>');
			res.write('\n\t <p><a href="/">Tagasi avalehele</a>!</p>');
			res.write(pageFoot);
			//et see kõik valmiks ja ära saadetaks
			return res.end();
		}
		else if (currentURL.pathname === "/semesterprogress"){ 
			res.writeHead(200, {"Content-Type": "text/html"});
			res.write(pageHead);
			res.write(pageBanner);
			res.write(pageBody);
			res.write('\n\t<hr>');
			res.write(semesterInfo());
			res.write('\n\t <p><a href="/">Tagasi avalehele</a>!</p>');
			res.write(pageFoot);
			//et see kõik valmiks ja ära saadetaks
			return res.end();
		}
		
		else if (currentURL.pathname === "/tluphoto"){ 
			let htmlOutput = '\n\t<p>Pilti ei saa näidata!</p>';
			//loen fotode nimekirja
			fs.readdir('public/tluphotos', (err, fileList)=>{
				if(err){
					throw err;
					tluPhotoPage(res, htmlOutput);
				}
				else {
					//console.log(fileList.length);
					let photoNum = Math.floor(Math.random() * fileList.length);
					//console.log(photoNum);
					//console.log('<img src="' + fileList[photoNum] + '" alt="TLÜ pilt">');
					htmlOutput = '\n\t<img src="' + fileList[photoNum] + '" alt="TLÜ pilt">';
					tluPhotoPage(res, htmlOutput);
				}
			});
			
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
		//else if (currentURL.pathname === "/tlu_42.jpg"){
		else if (path.extname(currentURL.pathname) === '.jpg'){
			console.log(path.extname(currentURL.pathname));
			console.log("tahan jpg pilti!");
			let filePath = path.join(__dirname, 'public', 'tluphotos');
			fs.readFile(filePath + currentURL.pathname, (err, data)=>{
				if(err){
					throw err;
				}
				else {
					res.writeHead(200, {"Content-Type": "image/jpeg"});
					res.end(data);
				}
			});
		}

		else {
			res.end('ERROR 404');
		}
	
	}
}).listen(5200);

function semesterInfo(){
	let htmlOutput = '<p>Info puudub!</p>';
	const semesterBegin = new Date("08/28/2023");
	//const semesterBegin = new Date("10/05/2023");
	const semesterEnd = new Date("01/28/2024");
	//const semesterEnd = new Date("10/01/2023");
	const today = new Date();
	if(today < semesterBegin){
		htmlOutput = '<p>2023/2024 õppeaasta sügissemester pole veel alanud!</p>';
	}
	else if (today > semesterEnd){
		htmlOutput = '<p>2023/2024 õppeaasta sügissemester on juba möödas!</p>';
	}
	else {
		const semesterDuration = Math.floor((semesterEnd.getTime() - semesterBegin.getTime()) / (1000 * 60 * 60 * 24));
		const semesterLastedFor = Math.floor((today.getTime() - semesterBegin.getTime()) / (1000 * 60 * 60 * 24));
		htmlOutput = '<p>2023/2024 õppeaasta sügissemester on kestnud juba ' + semesterLastedFor + ' päeva!</p>';
		htmlOutput += '\n\t <meter min="0" max="' + semesterDuration + '" value="' + semesterLastedFor + '"></meter>';
	}
	return '\n\t' + htmlOutput;
}

function tluPhotoPage(res, photoHTML){
	//console.log(photoHTML);
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(pageHead);
	res.write(pageBanner);
	res.write(pageBody);
	res.write('\n\t<hr>');
	res.write(photoHTML);
	//res.write('\n\t<img src="tlu_42.jpg" alt="TLÜ foto">');
	res.write('\n\t <p><a href="/">Tagasi avalehele</a>!</p>');
	res.write(pageFoot);
	//et see kõik valmiks ja ära saadetaks
	return res.end();
}

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let receivedData = '';
        request.on('data', chunk => {
			console.log(chunk);
            receivedData += chunk.toString();
        });
        request.on('end', () => {
			console.log(receivedData);
            callback(parse(receivedData));
        });
    }
    else {
        callback(null);
    }
}

//5200   rinde

//52XX

//näiteks 5208