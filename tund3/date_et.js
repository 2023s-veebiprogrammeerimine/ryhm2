exports.dateNowET = function(){
	const monthNamesET = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];
	let timeNow = new Date();
	//return timeNow.getDate() + "." + (timeNow.getMonth() + 1) + "." + timeNow.getFullYear();
	return timeNow.getDate() + ". " + monthNamesET[timeNow.getMonth()] + " " + timeNow.getFullYear();
}

//monthNamesET[0]
//monthNamesET[timeNow.getMonth()]
//console.log(yearNow);
//console.log("Täna on: " + dateNow + "." + (monthNow + 1) + "." + yearNow);