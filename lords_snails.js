//var contractAddress="0xe483C56756bB58749CE1288A248aCeB0bB470959"; //ROPSTEN 1
//var contractAddress="0x40D31F904Af622cfd3F3C4EFCcEb06C564F89eCe"; //ROPSTEN 2
//var contractAddress="0xE0aF939d88eE2f7dACe1161cf910A8d300019D39"; //ROPSTEN 2.1
//var contractAddress="0x1443B778622e66924Af7B64c3dfb1A8B700AB0E8"; //ROPSTEN 3
var contractAddress="0xd0AD02a47132D4D9b7c557ff77Fb3e5C65B3942d"; //ROPSTEN 5

//-- WEB3 DETECTION --//
var web3;

/* OLD
window.addEventListener("load", function() {
	if (typeof web3 !== "undefined") {
        web3 = new Web3(web3.currentProvider);
        web3.version.getNetwork(function(error, result) {
            if (!error) {
                if (result == "3") {
					//console.log("Mainnet successfully loaded!");
                } else {
                    //console.log("You must be on the Testnet to play LORDS OF THE SNAILS!");
					web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/f423492af8504d94979d522c3fbf3794"));
					//modal2.style.display = "block";
                }
            }
        });
    } else {
        ////////console.log("Web3 library not found.");
		//modal2.style.display = "block";
        web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/f423492af8504d94979d522c3fbf3794"));
    }
});
*/

/* NEW */

window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});
/* MODAL */

// Get the modals
var snag_modal = document.getElementById("snagmodal");
var start_modal = document.getElementById("startmodal");

// Close modal on game info
function CloseModal() {
	snag_modal.style.display = "none";
	start_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == snag_modal || event.target == start_modal) {
        snag_modal.style.display = "none";
		start_modal.style.display = "none";
    }
}

/* PAST EVENT LOG */

var timeLaunch = 1548516649;
var launchBlock = 7129676;

var twoDaysBlock = 0;
var ranLog = false;

function checkBlock(){
	web3.eth.getBlockNumber(function (error, result){
		twoDaysBlock = result - 12000;
	});
}

checkBlock();

/* VARIABLES */

var timeNow;

var a_contractBalance;
var a_gameRound = 0;
var a_gameActive = false;
var a_nextRoundStart;
var a_downtime;
var a_roundPot;
var a_snailPot;
var a_thronePot;
var a_leader = "";
var a_leaderEgg;
var a_lastGrab;
var a_timeSinceGrab;
var a_flipBonus;
var a_lastClaim;
var a_timeSinceClaim;
var a_claimBonus;
var a_playerBalance;
var a_playerEgg = 0;
var a_snagCost = 0.002;
var a_snailLevel = [1, 1, 1, 1, 1, 1, 1, 1];
var a_snailCost = [0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02];
var a_snailEgg = [0, 0, 0, 0, 0, 0, 0, 0];
var a_snailOwner = ["", "", "", "", "", "", "", ""];
var a_lordCost = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
var a_lordOwner = ["", "", "", "", "", "", "", ""];

var m_account = "waiting for web3";


var doc_contractBalance = document.getElementById('contractbalance');
var doc_gameRound = document.getElementById('gameround');
var doc_gameActive = document.getElementById('gameactive');
var doc_gameText = document.getElementById('gametext');
var doc_roundPot = document.getElementById('roundpot');
var doc_snailPot = document.getElementById('snailpot');
var doc_thronePot = document.getElementById('thronepot');
var doc_leader = document.getElementById('leader');
var doc_leaderEgg = document.getElementById('leaderegg');
var doc_winReq = document.getElementById('winreq');
var doc_timeSinceGrab = document.getElementById('timesinceflip');
var doc_flipBonus = document.getElementById('flipbonus');
var doc_timeSinceClaim = document.getElementById('timesinceclaim');
var doc_claimBonus = document.getElementById('claimbonus');
var doc_playerBalance = document.getElementById('playerbalance');
var doc_playerEgg = document.getElementById('playeregg');
var doc_leaderboard = document.getElementById('leaderboard');
var doc_startButton = document.getElementById('startbutton');
var interface_snail = document.getElementById("interfacesnail");
var interface_lord = document.getElementById("interfacelord");

var doc_snailLevel = [
document.getElementById('snaillevel0'),
document.getElementById('snaillevel1'),
document.getElementById('snaillevel2'),
document.getElementById('snaillevel3'),
document.getElementById('snaillevel4'),
document.getElementById('snaillevel5'),
document.getElementById('snaillevel6'),
document.getElementById('snaillevel7')
];

var doc_snailEgg = [
document.getElementById('snailegg0'),
document.getElementById('snailegg1'),
document.getElementById('snailegg2'),
document.getElementById('snailegg3'),
document.getElementById('snailegg4'),
document.getElementById('snailegg5'),
document.getElementById('snailegg6'),
document.getElementById('snailegg7')
];

var doc_snailCost = [
document.getElementById('snailcost0'),
document.getElementById('snailcost1'),
document.getElementById('snailcost2'),
document.getElementById('snailcost3'),
document.getElementById('snailcost4'),
document.getElementById('snailcost5'),
document.getElementById('snailcost6'),
document.getElementById('snailcost7')
];

var doc_snailOwner = [
document.getElementById('snailowner0'),
document.getElementById('snailowner1'),
document.getElementById('snailowner2'),
document.getElementById('snailowner3'),
document.getElementById('snailowner4'),
document.getElementById('snailowner5'),
document.getElementById('snailowner6'),
document.getElementById('snailowner7')
];

var doc_grabReward = [
document.getElementById('grabreward0'),
document.getElementById('grabreward1'),
document.getElementById('grabreward2'),
document.getElementById('grabreward3'),
document.getElementById('grabreward4'),
document.getElementById('grabreward5'),
document.getElementById('grabreward6'),
document.getElementById('grabreward7')
];

var doc_lordCost = [
document.getElementById('lordcost0'),
document.getElementById('lordcost1'),
document.getElementById('lordcost2'),
document.getElementById('lordcost3'),
document.getElementById('lordcost4'),
document.getElementById('lordcost5'),
document.getElementById('lordcost6'),
document.getElementById('lordcost7')
];

var doc_lordOwner = [
document.getElementById('lordowner0'),
document.getElementById('lordowner1'),
document.getElementById('lordowner2'),
document.getElementById('lordowner3'),
document.getElementById('lordowner4'),
document.getElementById('lordowner5'),
document.getElementById('lordowner6'),
document.getElementById('lordowner7')
];

var doc_snagButton = [
document.getElementById('snagbutton0'),
document.getElementById('snagbutton1'),
document.getElementById('snagbutton2'),
document.getElementById('snagbutton3'),
document.getElementById('snagbutton4'),
document.getElementById('snagbutton5'),
document.getElementById('snagbutton6'),
document.getElementById('snagbutton7')
];

//Leaderboard Array

var d_leaderboard = [
	{ address: "0x0000000022223333444455556666777788889999", egg: 0, rank: 1 },
	{ address: "0x0000111122223333444455556666777788889999", egg: 0, rank: 2 },
	{ address: "0x0000222222223333444455556666777788889999", egg: 0, rank: 3 },
	{ address: "0x0000333322223333444455556666777788889999", egg: 0, rank: 4 },
	{ address: "0x0000444422223333444455556666777788889999", egg: 0, rank: 5 }
];	

/* UTILITIES */

//Truncates ETH value to 4 decimals
function formatEthValue(ethstr){
    return parseFloat(parseFloat(ethstr).toFixed(4));
}

//Truncates ETH value to 6 decimals
function formatEthValue2(ethstr){
	return parseFloat(parseFloat(ethstr).toFixed(6));
}

//Truncates ETH address to first 8 numbers
function formatEthAdr(adr){
	var _smallAdr = adr.substring(0, 10);
	var _stringLink = '<a href="https://etherscan.io/address/' + adr + '" target="_blank">' + _smallAdr + '</a>';
	return _stringLink;
}

//Adds spaces between integers
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

//Conversion of Date to hh:mm:ss
var datetext;

function date24() {
	d = new Date();
	datetext = d.toTimeString();
	datetext = datetext.split(' ')[0];
}	

//Get timestamp for log
function dateLog(_blockNumber) {
	d = new Date((timeLaunch + ((_blockNumber - launchBlock) * 16)) * 1000);
	//console.log(d);
	datetext = d.toTimeString();
	datetext = datetext.split(' ')[0];
}

//Time since last flip, converted to text
function timeSinceGrab(){
	var blocktime = Math.round((new Date()).getTime() / 1000); //current blocktime should be Unix timestamp
	a_timeSinceGrab = blocktime - a_lastGrab;
	a_flipBonus = Math.floor(a_timeSinceGrab / 60); //1% per minute
	
	downtime_hours = Math.floor(a_timeSinceGrab / 3600);
	downtime_minutes = Math.floor((a_timeSinceGrab % 3600) / 60);
	//downtime_seconds = parseFloat((a_timeSincePlayerClaim % 3600) % 60).toFixed(0);
	
	doc_timeSinceGrab.innerHTML = "";
	
	if(downtime_hours > 0){
		doc_timeSinceGrab.innerHTML = downtime_hours + " Hours ";
		if(downtime_hours == 1){
			doc_timeSinceGrab.innerHTML = downtime_hours + " Hour ";
		}
	}
	if(downtime_minutes == 1){
		doc_timeSinceGrab.innerHTML += downtime_minutes + " Minute ";
	}
	if(downtime_minutes > 1){
		doc_timeSinceGrab.innerHTML += downtime_minutes + " Minutes ";
	} 
	if(downtime_hours == 0 && downtime_minutes == 0){
		doc_timeSinceGrab.innerHTML += "A few moments ";
	}	
}
//Time since last claim, converted to text
function timeSinceClaim(){
	var blocktime = Math.round((new Date()).getTime() / 1000); //current blocktime should be Unix timestamp
	a_timeSinceClaim = blocktime - a_lastClaim;
	a_claimBonus = a_timeSinceClaim * 8 * a_gameRound; //8 per second per round
	
	downtime_hours = Math.floor(a_timeSinceClaim / 3600);
	downtime_minutes = Math.floor((a_timeSinceClaim % 3600) / 60);
	//downtime_seconds = parseFloat((a_timeSincePlayerClaim % 3600) % 60).toFixed(0);
	
	doc_timeSinceClaim.innerHTML = "";
	
	if(downtime_hours > 0){
		doc_timeSinceClaim.innerHTML = downtime_hours + " Hours ";
		if(downtime_hours == 1){
			doc_timeSinceClaim.innerHTML = downtime_hours + " Hour ";
		}
	}
	if(downtime_minutes == 1){
		doc_timeSinceClaim.innerHTML += downtime_minutes + " Minute ";
	}
	if(downtime_minutes > 1){
		doc_timeSinceClaim.innerHTML += downtime_minutes + " Minutes ";
	} 
	if(downtime_hours == 0 && downtime_minutes == 0){
		doc_timeSinceClaim.innerHTML += "A few moments ";
	}	
}

//Downtime count
function countDowntime(){
		var blocktime = Math.round((new Date()).getTime() / 1000); //current blocktime should be Unix timestamp
		a_downtime = a_nextRoundStart - blocktime;
		
		if(a_downtime > 0){
			downtime_hours = Math.floor(a_downtime / 3600);
			if(downtime_hours < 10) { downtime_hours = "0" + downtime_hours }
			downtime_minutes = Math.floor((a_downtime % 3600) / 60);
			if(downtime_minutes < 10) { downtime_minutes = "0" + downtime_minutes }
			downtime_seconds = parseFloat((a_downtime % 3600) % 60).toFixed(0);
			if(downtime_seconds < 10) { downtime_seconds = "0" + downtime_seconds }
				
			doc_gameActive.innerHTML = "will start in " + downtime_hours + ":" + downtime_minutes + ":" + downtime_seconds;
		} else {
			doc_gameActive.innerHTML = "is ready to start!";
		}
}

//Fill up the field with player pecans
function maxField(){
	f_pecan = a_playerPecan;
	document.getElementById('fieldPecan').value = a_playerPecan;
}

/* UPDATE */

function initUpdate(){
	mainUpdate();
	fastUpdate();
	slowUpdate();
}	

function mainUpdate(){
	updateEthAccount();
	updateContractBalance();
	updateGameRound();
	updateGameActive();
	updateSnailPot();
	updateRoundPot();
	updateThronePot();
	updateLeader();
	updateLeaderEgg();
	updatePlayerBalance();
	updatePlayerEgg();
	updateActiveInterface();
	updateStartButton();
	if(a_gameActive == true){
		updateLastGrab();
		timeSinceGrab();
		runLoop(checkSnailLevel);
		runLoop(checkSnailEgg);
		runLoop(checkSnailOwner);
		runLoop(updateSnailCost);
		runLoop(updateSnagButton);
	} else {
		updateNextRoundStart();
		updateLastClaim();
		timeSinceClaim();
		runLoop(checkLordCost);
		runLoop(checkLordOwner);
	}
	updateText();
	//runLog();
	setTimeout(mainUpdate, 4000);
}

function fastUpdate(){
	if(a_gameActive != true){
		countDowntime();
	}
	setTimeout(fastUpdate, 1000);
}

//Refreshes leaderboard
function slowUpdate(){
	
	checkLeaderEgg0();
	checkLeaderEgg1();
	checkLeaderEgg2();
	checkLeaderEgg3();
	checkLeaderEgg4();
	
	slowupdateLeaderboard();
	showLeaderboard();
	
	setTimeout(slowUpdate, 30000);
}

//Shows Snails or Lords depending if round is active or not
function updateActiveInterface(){
	if(a_gameActive == true){
		interface_snail.style.display = "block";
		interface_lord.style.display = "none";
	} else {
		interface_snail.style.display = "none";
		interface_lord.style.display = "block";
	}
}
		
var leaderboardArray = [];
leaderboardArray[0] = 0;
leaderboardArray[1] = document.getElementById('eggking1');
leaderboardArray[2] = document.getElementById('eggking2');
leaderboardArray[3] = document.getElementById('eggking3');
leaderboardArray[4] = document.getElementById('eggking4');
leaderboardArray[5] = document.getElementById('eggking5');

//Show Leaderboard
function showLeaderboard() {
	for(i = 1; i < 6; i++) {
		for(j = 0; j < 5; j++) {
			if(d_leaderboard[j].rank == i) {
				leaderboardArray[i].innerHTML = formatEthAdr(d_leaderboard[j].address) + "<br>" + d_leaderboard[j].egg + " Eggs";
			}
		}
	}
}

//Update for Leaderboard checking every address
function slowupdateLeaderboard() {	
	//Loop through Trees and store top ones to assign ranks
	var avoidNext = [0, 0, 0, 0, 0];
	for(k = 1; k < 6; k++) {
		var topEgg = -1;
		var topGuy = 0;
		for(j = 0; j < 5; j++) {
			if(avoidNext[j] != 1){
				////console.log("avoidNext[" + j + "] evaluated to != 1");
				if(d_leaderboard[j].egg > topEgg){
					topEgg = d_leaderboard[j].egg;
					topGuy = j;
				}
			}
		}
		d_leaderboard[topGuy].rank = k;
		////console.log("New rank " + k + " : " + d_leaderboard[topGuy].address);
		avoidNext[topGuy] = 1;
		////console.log("Next time, avoid indice " + topGuy);
	}	
	showLeaderboard();
}

//Ugly Leaderboard updates. Can't seem to get a loop working for these web3 calls due to delays
function checkLeaderEgg0(){
	GetPlayerEgg(d_leaderboard[0].address, function(result) {
		d_leaderboard[0].egg = result;
	});
}

function checkLeaderEgg1(){
	GetPlayerEgg(d_leaderboard[1].address, function(result) {
		d_leaderboard[1].egg = result;
	});
}

function checkLeaderEgg2(){
	GetPlayerEgg(d_leaderboard[2].address, function(result) {
		d_leaderboard[2].egg = result;
	});
}

function checkLeaderEgg3(){
	GetPlayerEgg(d_leaderboard[3].address, function(result) {
		d_leaderboard[3].egg = result;
	});
}

function checkLeaderEgg4(){
	GetPlayerEgg(d_leaderboard[4].address, function(result) {
		d_leaderboard[4].egg = result;
	});
}

//Updates all text from web3 calls
function updateText(){
	doc_contractBalance.innerHTML = a_contractBalance;
	doc_gameRound.innerHTML = a_gameRound;
	doc_snailPot.innerHTML = a_snailPot;

	doc_thronePot.innerHTML = a_thronePot;
	doc_leader.innerHTML = formatEthAdr(a_leader);
	doc_leaderEgg.innerHTML = a_leaderEgg;
	doc_flipBonus.innerHTML = a_flipBonus;
	doc_claimBonus.innerHTML = a_claimBonus;
	doc_playerBalance.innerHTML = a_playerBalance;
	doc_playerEgg.innerHTML = a_playerEgg;
	
	if(a_gameActive == true){
		doc_gameRound.innerHTML = a_gameRound;
		doc_gameActive.innerHTML = "is active!";
		doc_gameText.innerHTML = "Grab Snails and Snag Eggs to Win the Prize!";
		doc_roundPot.innerHTML = a_roundPot;
		doc_winReq.innerHTML = a_gameRound * 1000000;
		
		for(i = 0; i < 8; i++){
			changeText(i, doc_snailLevel, a_snailLevel);
			changeText(i, doc_snailEgg, a_snailEgg);
			changeText(i, doc_snailCost, a_snailCost);
			changeSnailOwnerText(i);
			changeGrabRewardText(i);
		}		
	} else {
		doc_gameRound.innerHTML = (a_gameRound + 1);
		doc_gameText.innerHTML = "Claim a Lord to own their Snail next round!";
		doc_roundPot.innerHTML = formatEthValue(a_snailPot / 10);
		doc_winReq.innerHTML = (a_gameRound + 1) * 1000000;
						
		for(i = 0; i < 8; i++){
			changeText(i, doc_lordCost, a_lordCost);
			changeLordOwnerText(i);
		}
	}	
}

/* FAST LOCAL UPDATES */
/*
function fastupdateRootPecan(){
	timeNow = (new Date).getTime();
	//////console.log(timeNow);
	var _millisecondSinceLast = parseFloat(timeNow) - parseFloat(a_lastRootPlant * 1000);
	var _boostFactor = parseFloat((_millisecondSinceLast * 0.01) + parseFloat(1000));
	var _reward = 1000 * _boostFactor / 0.5;
	a_rootPecanForOneEther = parseFloat(_reward).toFixed(0);
	doc_rootPecanForOneEther.innerHTML = numberWithSpaces(a_rootPecanForOneEther);
	var _playerReward = parseFloat(a_rootPecanForOneEther * f_root).toFixed(0);
	doc_fieldPecanReward.innerHTML = numberWithSpaces(_playerReward);
}

function fastupdateEtherShare(){
	var _millisecondSinceLast = parseFloat(timeNow) - parseFloat(a_playerLastClaim * 1000);
	var _reward = 0.00000002 * a_playerTree * _millisecondSinceLast / 1000 / 86400;
	a_playerEtherShare = parseFloat(_reward).toFixed(10);
	doc_playerEtherShare.innerHTML = a_playerEtherShare;
}
		
function fastupdatePecanShare(){
	var _millisecondSinceLast = parseFloat(timeNow) - parseFloat(a_playerLastClaim * 1000);
	var _boostFactor = Math.floor((_millisecondSinceLast / 3600000) + parseFloat(4));
	var _reward = a_playerBoost * (_millisecondSinceLast / 1000) * a_playerTree * _boostFactor / 86400;
	a_playerPecanShare = parseFloat(_reward).toFixed(0);
	doc_playerPecanShare.innerHTML = numberWithSpaces(a_playerPecanShare);
}
		
/* WEB3 CALLS */

//Loop function for all snails and lords
function runLoop(_loop){
	for(i = 0; i < 8; i++){
		_loop(i);
	}
}



//Current ETH address in use
function updateEthAccount(){
	m_account = web3.eth.accounts[0];
}

//Current ETH balance in contract
function updateContractBalance(){
	web3.eth.getBalance(contractAddress, function(error, result) {
		if(!error) {
			a_contractBalance = formatEthValue(web3.fromWei(result, 'ether')); 
		}
	});
}

//Current game round
function updateGameRound(){
	round(function(result) {
		a_gameRound = result;
	});
}

//State of the game
function updateGameActive(){
	gameActive(function(result){
		if(result == true){
			a_gameActive = true;
		} else {
			a_gameActive = false;
		}
	});
}

//Change the BeginRound() button to appropriate state
function updateStartButton(){
	if(a_gameActive == false && a_downtime <= 0){
		doc_startButton.innerHTML = '<button class="btn btn-lg btn-success" onclick="webBeginRound()">BEGIN ROUND</button>';
	} else {
		doc_startButton.innerHTML = '<button class="btn btn-lg btn-dark" onclick="modalCantStart()">BEGIN ROUND</button>';
	}
}

//Next round start
function updateNextRoundStart(){
	nextRoundStart(function(result){
		a_nextRoundStart = result;
	});
}

//Current tree pot
function updateSnailPot(){
	snailPot(function(result) {
		a_snailPot = formatEthValue(web3.fromWei(result,'ether'));
	});
}

//Current roundpot
function updateRoundPot(){
	roundPot(function(result) {
		a_roundPot = formatEthValue(web3.fromWei(result,'ether'));
	});
}

//Current throne pot
function updateThronePot(){
	thronePot(function(result) {
		a_thronePot = formatEthValue(web3.fromWei(result,'ether'));
	});
}

//Check whether player can Snag or not
function updateSnagButton(_id){
	if(a_snailOwner[_id] == m_account){
		doc_snagButton[_id].innerHTML = '<button class="btn btn-lg btn-success" onclick="webSnagEgg(' + _id + ')">SNAG</button>';
	} else {
		doc_snagButton[_id].innerHTML = '<button class="btn btn-lg btn-dark" onclick="modalCantSnag()">SNAG</button>';
	}
}

//Cant snag modal
function modalCantSnag(){
	snag_modal.style.display = "block";
}

//Cant start round modal
function modalCantStart(){
	start_modal.style.display = "block";
}

//Current leader
function updateLeader(){
	leader(function(result) {
		a_leader = "0x" + result.substring(26, 66);
	});
}

//Current leader eggs
function updateLeaderEgg(){
	GetPlayerEgg(a_leader, function(result) {
		a_leaderEgg = result;
	});
}
		
//Last Grab action globally
function updateLastGrab(){
	lastGrab(function(result) {
		a_lastGrab = result;
	});
}

//Last Claim action globally
function updateLastClaim(){
	lastClaim(function(result) {
		a_lastClaim = result;
	});
}

//Current player balance
function updatePlayerBalance(){
	GetPlayerBalance(m_account, function(result) {
		a_playerBalance = formatEthValue(web3.fromWei(result,'ether'));		
	});
}

//Current player egg
function updatePlayerEgg(){
	GetPlayerEgg(m_account, function(result) {
		a_playerEgg = result;		
	});
}

//Check snail level
function checkSnailLevel(_id){
	GetSnailLevel(_id, function(result){
		a_snailLevel[_id] = web3.toDecimal(result);
	});
}

//Check snail eggs
function checkSnailEgg(_id){
	ComputeEgg(false, _id, function(result) {
		a_snailEgg[_id] = web3.toDecimal(result);
		////console.log("a_snailCost" + _id + " = " + a_snailCost[_id]);
	});
}

//Change grab reward text
function changeGrabRewardText(_id){
	doc_grabReward[_id].innerHTML = Math.floor(a_snailEgg[_id] * (a_flipBonus + 100) / 100);
}

//Check snail owner
function checkSnailOwner(_id){
	GetSnailOwner(_id, function(result) {
		a_snailOwner[_id] = "0x" + result.substring(26, 66);
		////console.log("a_snailCost" + _id + " = " + a_snailCost[_id]);
	});
}

//Change snail owner text
function changeSnailOwnerText(_id){
	if(a_snailOwner[_id] == m_account){
		doc_snailOwner[_id].innerHTML = "YOU!";
	} else {
		doc_snailOwner[_id].innerHTML = formatEthAdr(a_snailOwner[_id]);
	}
}

//Update snail cost
function updateSnailCost(_id){
	a_snailCost[_id] = (a_snailLevel[_id] + 1) * 0.01;
}

//Change text
function changeText(_id, _doc, _a){
	_doc[_id].innerHTML = _a[_id];
}

//Check lord cost
function checkLordCost(_id){
	ComputeLordCost(_id, function(result) {
		a_lordCost[_id] = formatEthValue(web3.fromWei(result,'ether'));
	});
}

//Check lord owner
function checkLordOwner(_id){
	GetLordOwner(_id, function(result) {
		a_lordOwner[_id] = "0x" + result.substring(26, 66);
	});
}

//Change lord owner text
function changeLordOwnerText(_id){
	if(a_lordOwner[_id] == m_account){
		doc_lordOwner[_id].innerHTML = "YOU!";
	} else {
		doc_lordOwner[_id].innerHTML = formatEthAdr(a_lordOwner[_id]);
	}
}

//Convert ID to Snail name
function idSnailToName(_id){
	switch(_id){
		case 0: return "Achilles";
		case 1: return "Daedalus";
		case 2: return "Heracles";
		case 3: return "Icarus";
		case 4: return "Jason";
		case 5: return "Odysseus";
		case 6: return "Perseus";
		case 7: return "Theseus";
	}
}

//Convert ID to Lord name
function idLordToName(_id){
	switch(_id){
		case 0: return "Aristotle";
		case 1: return "Diogenes";
		case 2: return "Heraclitus";
		case 3: return "Chrysippus";
		case 4: return "Socrates";
		case 5: return "Zeno";
		case 6: return "Plato";
		case 7: return "Thales";
	}
}

/* WEB3 TRANSACTIONS */

//Begin Round
function webBeginRound(){
	BeginRound(function(){
	});
}

//Grab snail
function webGrabSnail(_id){
	var weitospend = web3.toWei(a_snailCost[_id],'ether');
	GrabSnail(_id, weitospend, function(){
	});
}

//Snag eggs
function webSnagEgg(_id){
	var weitospend = web3.toWei(a_snagCost,'ether');
	SnagEgg(_id, weitospend, function(){
	});
}

//Claim lord
function webClaimLord(_id){
	var weitospend = web3.toWei(a_lordCost[_id],'ether');
	ClaimLord(_id, weitospend, function(){
	});
}

//Withdraw balance
function webWithdrawBalance(){
	WithdrawBalance(function(){
	});
}

//Pay Throne
function webPayThrone(){
	PayThrone(function(){
	});
}


/* CONTRACT ABI */

abiDefinition=[{"constant": true,"inputs": [{"name": "_flip","type": "bool"},{"name": "_id","type": "uint256"}],"name": "ComputeEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "round","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"}],"name": "ClaimLord","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"}],"name": "SnagEgg","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "roundPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "leader","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"}],"name": "GrabSnail","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [],"name": "PayThrone","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "_id","type": "uint256"}],"name": "GetSnailLevel","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_id","type": "uint256"}],"name": "GetSnailOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "snailPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_player","type": "address"}],"name": "GetPlayerEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeLordBonus","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "BeginRound","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "WithdrawBalance","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "lastClaim","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_player","type": "address"}],"name": "GetPlayerBalance","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "thronePot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_id","type": "uint256"}],"name": "GetLordOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_id","type": "uint256"}],"name": "ComputeSnailCost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_id","type": "uint256"}],"name": "GetSnailSnag","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_id","type": "uint256"}],"name": "ComputeLordCost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "nextRoundStart","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "victoryEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "lastGrab","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_id","type": "uint256"}],"name": "GetLordLevel","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "gameActive","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"payable": true,"stateMutability": "payable","type": "fallback"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "round","type": "uint256"}],"name": "WonRound","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "round","type": "uint256"}],"name": "StartedRound","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "snail","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "egg","type": "uint256"},{"indexed": false,"name": "playeregg","type": "uint256"}],"name": "GrabbedSnail","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "snail","type": "uint256"},{"indexed": false,"name": "egg","type": "uint256"},{"indexed": false,"name": "playeregg","type": "uint256"}],"name": "SnaggedEgg","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "lord","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "egg","type": "uint256"},{"indexed": false,"name": "playeregg","type": "uint256"}],"name": "ClaimedLord","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "WithdrewBalance","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "PaidThrone","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "BoostedPot","type": "event"}]

var contractAbi = web3.eth.contract(abiDefinition);
var myContract = contractAbi.at(contractAddress);

function ComputeEgg(_flip,_id,callback){
    var outputData = myContract.ComputeEgg.getData(_flip,_id);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function round(callback){    
    var outputData = myContract.round.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('round ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function SnagEgg(_id,eth,callback){
    var outputData = myContract.SnagEgg.getData(_id);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            //console.log('SnagEgg ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function roundPot(callback){   
    var outputData = myContract.roundPot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('roundPot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function lastGrab(callback){
    var outputData = myContract.lastGrab.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('lastGrab ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GrabSnail(_id,eth,callback){ 
    var outputData = myContract.GrabSnail.getData(_id);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            //console.log('GrabSnail ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function PayThrone(callback){
    var outputData = myContract.PayThrone.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('PayThrone ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetSnailLevel(_id,callback){
    
    
    var outputData = myContract.GetSnailLevel.getData(_id);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetSnailLevel ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ClaimLord(_id,eth,callback){
    
    
    var outputData = myContract.ClaimLord.getData(_id);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            //console.log('ClaimLord ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetSnailOwner(_id,callback){
    
    
    var outputData = myContract.GetSnailOwner.getData(_id);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetSnailOwner ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}

function leader(callback){  
    var outputData = myContract.leader.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('snailPot ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}

function snailPot(callback){ 
    var outputData = myContract.snailPot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('snailPot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}

function GetPlayerEgg(_player,callback){   
    var outputData = myContract.GetPlayerEgg.getData(_player);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetPlayerEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}

function ComputeLordBonus(callback){ 
    var outputData = myContract.ComputeLordBonus.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeLordBonus ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}

function BeginRound(callback){  
    var outputData = myContract.BeginRound.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData, gasLimit: 1000000},
    function(error,result){
        if(!error){
            //console.log('BeginRound ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}

function WithdrawBalance(callback){  
    var outputData = myContract.WithdrawBalance.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('WithdrawBalance ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}

function GetPlayerBalance(_player,callback){  
    var outputData = myContract.GetPlayerBalance.getData(_player);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetPlayerBalance ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}

function thronePot(callback){  
    var outputData = myContract.thronePot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('thronePot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}

function GetLordOwner(_id,callback){  
    var outputData = myContract.GetLordOwner.getData(_id);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetLordOwner ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}

function ComputeSnailCost(_id,callback){ 
    var outputData = myContract.ComputeSnailCost.getData(_id);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeSnailCost ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetSnailSnag(_id,callback){  
    var outputData = myContract.GetSnailSnag.getData(_id);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetSnailSnag ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeLordCost(_id,callback){
    var outputData = myContract.ComputeLordCost.getData(_id);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeLordCost ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function nextRoundStart(callback){   
    var outputData = myContract.nextRoundStart.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('nextRoundStart ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function victoryEgg(callback){  
    var outputData = myContract.victoryEgg.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('victoryEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetLordLevel(_id,callback){  
    var outputData = myContract.GetLordLevel.getData(_id);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetLordLevel ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}

function lastClaim(callback){  
    var outputData = myContract.lastClaim.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('lastClaim ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}

function gameActive(callback){  
    var outputData = myContract.gameActive.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('gameActive ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}

/* EVENT WATCH */

//Store transaction hash for each event, and check before executing result, as web3 events fire twice
var storetxhash = [];

//Check equivalency
function checkHash(txarray, txhash) {
	var i = 0;
	do {
		if(txarray[i] == txhash) {
			return 0;
		}
		i++;
	}
	while(i < txarray.length);
	//Add new tx hash
	txarray.push(txhash);
	//Remove first tx hash if there's more than 16 hashes saved
	if(txarray.length > 16) {
		txarray.shift();
	}
}

//Compute Leaderboard

function computeLeaderboard() {
	var lowest = d_leaderboard[0].egg;
	var position = 0; 
	
	//Check lowest leader
	var i = 0;
	for(i = 0; i < 5; i++) {
		if(d_leaderboard[i].egg < lowest) {
			lowest = d_leaderboard[i].egg;
			position = i;
		}
	}
	
	//Check if new player is already on leaderboard, then check if new player can replace lowest
	var notLeader = true;
	for(k = 0; k < 5; k++) {
		if(e_challenger.address == d_leaderboard[k].address) {
			d_leaderboard[k].address = e_challenger.address;
			d_leaderboard[k].egg = e_challenger.egg;
			notLeader = false;
		}
	}

	var newEntry = false;
	if(notLeader == true && e_challenger.egg > lowest) {
		d_leaderboard[position].address = e_challenger.address;
		d_leaderboard[position].egg = e_challenger.egg;
		newEntry = true;
	}
}

// Wipe Leaderboard (run this after a "won round" event on Round end

function wipeLeaderboard(){
	for(i = 0; i < 5; i++) {
		d_leaderboard[i].address = "0x0000000022223333444455556666777788889999";
		d_leaderboard[i].egg = 0;
	}
}

/* EVENTS */

var logboxscroll = document.getElementById('logboxscroll');
var eventlogdoc = document.getElementById("eventlog");

var e_challenger = { address: "", egg: 0 };

function runLog(){
	if(ranLog == false && twoDaysBlock > 0){
		ranLog = true;
		myContract.allEvents({ fromBlock: twoDaysBlock, toBlock: 'latest' }).get(function(error, result){
			if(!error){
				//console.log(result);
				var i = 0;				
				for(i = 0; i < result.length; i++){
					if(checkHash(storetxhash, result[i].transactionHash) != 0) {
						dateLog(result[i].blockNumber);
						if(result[i].event == "WonRound"){
							eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " WON ROUND " + result[i].args.round + "! Their reward: " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " ETH.";
							//wipeLeaderboard();
						} else if(result[i].event == "StartedRound"){
							eventlogdoc.innerHTML += "<br>[~" + datetext + "] Round " + result[i].args.round + " starts!";
						} else if(result[i].event == "GrabbedSnail"){
							eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " grabs " + idSnailToName(web3.toDecimal(result[i].args.snail)) + " for " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " ETH, and gets " + result[i].args.egg + " eggs.";
							e_challenger.address = result[i].args.player;
							e_challenger.egg =  parseInt(result[i].args.playeregg);
							computeLeaderboard();
						} else if(result[i].event == "SnaggedEgg"){
							eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " snags " + result[i].args.egg + " eggs from his snail " + idSnailToName(web3.toDecimal(result[i].args.snail)) + ".";
							e_challenger.address = result[i].args.player;
							e_challenger.egg =  parseInt(result[i].args.playeregg);
							computeLeaderboard();
						} else if(result[i].event == "ClaimedLord"){
							eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " claims the lord " + idLordToName(web3.toDecimal(result[i].args.lord)) + "! For their " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " ETH, they get " + result[i].args.egg + " eggs.";
							e_challenger.address = result[i].args.player;
							e_challenger.egg =  parseInt(result[i].args.playeregg);
							computeLeaderboard();
						} else if(result[i].event == "WithdrewBalance"){
							eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " withdrew " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " ETH to their wallet.";
						} else if(result[i].event == "PaidThrone"){
							eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " paid tribute to the SnailThrone! " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " ETH has been sent.";
						} else if(result[i].event == "BoostedPot"){
							eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " makes a generous " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " ETH donation to the gods.";
						}
					logboxscroll.scrollTop = logboxscroll.scrollHeight;
					}
				}
			}
			else{
				//console.log("problem!");
			}
		});
	}
}

var startedroundEvent = myContract.StartedRound();

startedroundEvent.watch(function(error, result){
    if(!error){
		//console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] Round " + result.args.round + " starts!";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var grabbedsnailEvent = myContract.GrabbedSnail();

grabbedsnailEvent.watch(function(error, result){
    if(!error){
		//console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " grabs " + idSnailToName(web3.toDecimal(result.args.snail)) + " for " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " ETH, and gets " + result.args.egg + " eggs.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
			e_challenger.address = result[i].args.player;
			e_challenger.egg =  parseInt(result[i].args.playeregg);
			computeLeaderboard();
		}
	}
});

var snaggedeggEvent = myContract.SnaggedEgg();

snaggedeggEvent.watch(function(error, result){
    if(!error){
		//console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " snags " + result.args.egg + " eggs from his snail " + idSnailToName(web3.toDecimal(result.args.snail)) + ".";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
			e_challenger.address = result[i].args.player;
			e_challenger.egg =  parseInt(result[i].args.playeregg);
			computeLeaderboard();
		}
	}
});

var claimedlordEvent = myContract.ClaimedLord();

claimedlordEvent.watch(function(error, result){
	if(!error){
		////////////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " claims the lord " + idLordToName(web3.toDecimal(result.args.lord)) + "! For their " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " ETH, they get " + result.args.egg + " eggs.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
			e_challenger.address = result[i].args.player;
			e_challenger.egg =  parseInt(result[i].args.playeregg);
			computeLeaderboard();
		}
	}
});

var wonroundEvent = myContract.WonRound();

wonroundEvent.watch(function(error, result){
    if(!error){
		////////////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " WON ROUND " + result.args.round + "! Their reward: " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " ETH.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});



var withdrewbalanceEvent = myContract.WithdrewBalance();

withdrewbalanceEvent.watch(function(error, result){
    if(!error){
		////////////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " withdrew " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " ETH to their wallet.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var paidthroneEvent = myContract.PaidThrone();

paidthroneEvent.watch(function(error, result){
    if(!error){
		////////////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " paid tribute to the SnailThrone! " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " ETH has been sent.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var boostedpotEvent = myContract.BoostedPot();

boostedpotEvent.watch(function(error, result){
    if(!error){
		////////////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " makes a generous " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " ETH donation to the JackPot.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

/*
const filter = { fromBlock: launchBlock, toBlock: 'latest'}; // filter for your address
const events = myContract.allEvents(filter); // get all events
//console.log(events);
*/
