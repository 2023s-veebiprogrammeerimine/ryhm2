const monthNamesET = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];

const dateNowET = function(){
	let timeNow = new Date();
	//return timeNow.getDate() + "." + (timeNow.getMonth() + 1) + "." + timeNow.getFullYear();
	return timeNow.getDate() + ". " + monthNamesET[timeNow.getMonth()] + " " + timeNow.getFullYear();
}

const timeNowET = function(){
	let timeNow = new Date();
	return timeNow.getHours() + ":" + timeNow.getMinutes() + ":" + timeNow.getSeconds();
}

const timeOfDayET = function(){
	let dayPart = "suvaline aeg";
	const hourNow = new Date().getHours();
	if (hourNow > 6 && hourNow <= 11){
		dayPart = "hommik";
	}
	if(hourNow >= 12 && hourNow < 14){
		dayPart = "keskpäev";
	}
	if(hourNow >= 14 && hourNow < 18){
		dayPart = "pärastlõuna";
	}
	if (hourNow > 18){
		dayPart = "õhtu";
	}
	return dayPart;
}

//moodul ekspordib need asjad
module.exports = {dateNowET: dateNowET, timeNowET: timeNowET, monthtsET: monthNamesET, timeOfDayET: timeOfDayET};
