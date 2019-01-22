var contractAddress="0xe483C56756bB58749CE1288A248aCeB0bB470959"; //ROPSTEN 1

//-- WEB3 DETECTION --//
var web3;

window.addEventListener("load", function() {
	if (typeof web3 !== "undefined") {
        web3 = new Web3(web3.currentProvider);
        web3.version.getNetwork(function(error, result) {
            if (!error) {
                if (result == "3") {
					//////console.log("Mainnet successfully loaded!");
                } else {
                    //////console.log("You must be on the Testnet to play SnailFarm 3!");
					web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/f423492af8504d94979d522c3fbf3794"));
					//modal2.style.display = "block";
                }
            }
        });
    } else {
        //////console.log("Web3 library not found.");
		//modal2.style.display = "block";
        web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/f423492af8504d94979d522c3fbf3794"));
    }
});
/*
/* MODAL */
/*
// Get the modals
var claim_modal = document.getElementById("claimmodal");
var grow_modal = document.getElementById("growmodal");
var root_modal = document.getElementById("rootmodal");
var toolow_modal = document.getElementById("toolowmodal");
var pecan_modal = document.getElementById("pecanmodal");
var prelaunch_modal = document.getElementById("prelaunchmodal");

// Close modal on game info
function CloseModal() {
	claim_modal.style.display = "none";
	grow_modal.style.display = "none";
	root_modal.style.display = "none";
	toolow_modal.style.display = "none";
	pecan_modal.style.display = "none";
	prelaunch_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == claim_modal || event.target == grow_modal || event.target == root_modal || event.target == toolow_modal || event.target == pecan_modal || event.target == prelaunch_modal) {
        claim_modal.style.display = "none";
		grow_modal.style.display = "none";
		root_modal.style.display = "none";
		toolow_modal.style.display = "none";
		pecan_modal.style.display = "none";
		prelaunch_modal.style.display = "none;"
    }
}

/* PAST EVENT LOG */
/*
var timeLaunch = 1546099245;
var launchBlock = 6974738;

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
var a_gameRound;
var a_roundPot;
var a_snailPot;
var a_thronePot;
var a_playerBalance;
var a_playerEgg = 0;

var m_account = "waiting for web3";

var doc_contractBalance = document.getElementById('contractbalance');
var doc_gameRound = document.getElementById('gameround');
var doc_roundPot = document.getElementById('roundpot');
var doc_snailPot = document.getElementById('snailpot');
var doc_thronePot = document.getElementById('thronepot');
var doc_playerBalance = document.getElementById('playerbalance');
var doc_playerEgg = document.getElementById('playeregg');

//Leaderboard Array
/*
var d_leaderboard = [
	{ address: "0x0000000022223333444455556666777788889999", tree: 0, pecan: 0, rank: 1 },
	{ address: "0x0000111122223333444455556666777788889999", tree: 0, pecan: 0, rank: 2 },
	{ address: "0x0000222222223333444455556666777788889999", tree: 0, pecan: 0, rank: 3 },
	{ address: "0x0000333322223333444455556666777788889999", tree: 0, pecan: 0, rank: 4 },
	{ address: "0x0000444422223333444455556666777788889999", tree: 0, pecan: 0, rank: 5 }
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
/*
//Conversion of Date to hh:mm:ss
var datetext;

function date24() {
	d = new Date();
	datetext = d.toTimeString();
	datetext = datetext.split(' ')[0];
}	

//Get timestamp for log
function dateLog(_blockNumber) {
	d = new Date((timeLaunch + ((_blockNumber - launchBlock) * 14.5)) * 1000);
	console.log(d);
	datetext = d.toTimeString();
	datetext = datetext.split(' ')[0];
}

//Unique check for prelaunch
function checkLaunch(){
	//var blocktime = Math.round((new Date()).getTime() / 1000); //current blocktime should be Unix timestamp
	//if(blocktime < timeLaunch){
		prelaunch_modal.style.display = "none";
	//}
}
	
//Time since player claim, converted to text
function timeSincePlayerClaim(){
	var blocktime = Math.round((new Date()).getTime() / 1000); //current blocktime should be Unix timestamp
	a_timeSincePlayerClaim = blocktime - a_playerLastClaim;
	
	downtime_hours = Math.floor(a_timeSincePlayerClaim / 3600);
	downtime_minutes = Math.floor((a_timeSincePlayerClaim % 3600) / 60);
	//downtime_seconds = parseFloat((a_timeSincePlayerClaim % 3600) % 60).toFixed(0);
	
	doc_playerLastClaim.innerHTML = "";
	doc_boostReady.innerHTML = "<h5 class='black-shadow'>Adds Boost once per hour</h5>";
	
	if(downtime_hours > 0){
		doc_playerLastClaim.innerHTML = downtime_hours + " Hours ";
		doc_boostReady.innerHTML = "<h5 class='black-shadow pulse-text'>[BOOST READY]</h5>";
		if(downtime_hours == 1){
			doc_playerLastClaim.innerHTML = downtime_hours + " Hour ";
		}
		if(downtime_hours > 9){
			doc_boostReady.innerHTML = "<h4 class='black-shadow pulse-text'>[!MAXIMUM BOOST READY!]</h4>";
		}
	}
	if(downtime_minutes == 1){
		doc_playerLastClaim.innerHTML += downtime_minutes + " Minute ";
	}
	if(downtime_minutes > 1){
		doc_playerLastClaim.innerHTML += downtime_minutes + " Minutes ";
	} 
	if(downtime_hours == 0 && downtime_minutes == 0){
		doc_playerLastClaim.innerHTML += "A few moments ";
	}	
	doc_playerLastClaim.innerHTML += " ago";
}

//Fill up the field with player pecans
function maxField(){
	f_pecan = a_playerPecan;
	document.getElementById('fieldPecan').value = a_playerPecan;
}

/* UPDATE */

function initUpdate(){
	mainUpdate();
}	

function mainUpdate(){
	updateEthAccount();
	updateContractBalance();
	updateGameRound();
	updateSnailPot();
	updateRoundPot();
	updateThronePot();
	updatePlayerInfo();
	updateText();
	//runLog();
	setTimeout(slowUpdate, 4000);
}
/*
function fastUpdate(){
	updateField();
	fastupdateRootPecan();
	fastupdateEtherShare();
	fastupdatePecanShare();
	computeWonkWonk();
	//prelaunchTimer();
	setTimeout(fastUpdate, 100);
}

//Refreshes leaderboard
function refreshDataSlow(){
	
	checkLeaderTree0();
	checkLeaderTree1();
	checkLeaderTree2();
	checkLeaderTree3();
	checkLeaderTree4();
	
	checkLeaderPecan0();
	checkLeaderPecan1();
	checkLeaderPecan2();
	checkLeaderPecan3();
	checkLeaderPecan4();
	
	slowupdateLeaderboard();
	showLeaderboard();
	
	setTimeout(refreshDataSlow, 30000);
}

var leaderboardArray = [];
leaderboardArray[0] = 0;
leaderboardArray[1] = document.getElementById('treelord1');
leaderboardArray[2] = document.getElementById('treelord2');
leaderboardArray[3] = document.getElementById('treelord3');
leaderboardArray[4] = document.getElementById('treelord4');
leaderboardArray[5] = document.getElementById('treelord5');

//Show Leaderboard
function showLeaderboard() {
	for(i = 1; i < 6; i++) {
		for(j = 0; j < 5; j++) {
			if(d_leaderboard[j].rank == i) {
				leaderboardArray[i].innerHTML = formatEthAdr(d_leaderboard[j].address) + "<br>" + numberWithSpaces(d_leaderboard[j].tree) + " Tree Size <br>" + numberWithSpaces(d_leaderboard[j].pecan) + " Pecans <br>";
			}
		}
	}
}

//Update for Leaderboard checking every address
function slowupdateLeaderboard() {	
	//Loop through Trees and store top ones to assign ranks
	var avoidNext = [0, 0, 0, 0, 0];
	for(k = 1; k < 6; k++) {
		var topTree = -1;
		var topGuy = 0;
		for(j = 0; j < 5; j++) {
			if(avoidNext[j] != 1){
				//console.log("avoidNext[" + j + "] evaluated to != 1");
				if(d_leaderboard[j].tree > topTree){
					topTree = d_leaderboard[j].tree;
					topGuy = j;
				}
			}
		}
		d_leaderboard[topGuy].rank = k;
		//console.log("New rank " + k + " : " + d_leaderboard[topGuy].address);
		avoidNext[topGuy] = 1;
		//console.log("Next time, avoid indice " + topGuy);
	}
	
	showLeaderboard();
}

//Ugly Leaderboard updates. Can't seem to get a loop working for these web3 calls due to delays
function checkLeaderTree0(){
	GetTree(d_leaderboard[0].address, function(result) {
		d_leaderboard[0].tree = result;
	});
}

function checkLeaderTree1(){
	GetTree(d_leaderboard[1].address, function(result) {
		d_leaderboard[1].tree = result;
	});
}

function checkLeaderTree2(){
	GetTree(d_leaderboard[2].address, function(result) {
		d_leaderboard[2].tree = result;
	});
}

function checkLeaderTree3(){
	GetTree(d_leaderboard[3].address, function(result) {
		d_leaderboard[3].tree = result;
	});
}

function checkLeaderTree4(){
	GetTree(d_leaderboard[4].address, function(result) {
		d_leaderboard[4].tree = result;
	});
}

function checkLeaderPecan0(){
	GetPecan(d_leaderboard[0].address, function(result) {
		d_leaderboard[0].pecan = result;
	});
}

function checkLeaderPecan1(){
	GetPecan(d_leaderboard[1].address, function(result) {
		d_leaderboard[1].pecan = result;
	});
}

function checkLeaderPecan2(){
	GetPecan(d_leaderboard[2].address, function(result) {
		d_leaderboard[2].pecan = result;
	});
}

function checkLeaderPecan3(){
	GetPecan(d_leaderboard[3].address, function(result) {
		d_leaderboard[3].pecan = result;
	});
}

function checkLeaderPecan4(){
	GetPecan(d_leaderboard[4].address, function(result) {
		d_leaderboard[4].pecan = result;
	});
}
*/
//Updates all text from web3 calls
function updateText(){
	doc_contractBalance.innerHTML = a_contractBalance;
	doc_gameRound.innerHTML = a_gameRound;
	doc_snailPot.innerHTML = a_snailPot;
	doc_roundPot.innerHTML = a_roundPot;
	doc_thronePot.innerHTML = a_thronePot;
	doc_playerBalance.innerHTML = a_playerBalance;
	doc_playerEgg.innerHTML = a_playerEgg;
}
/*
function updateField(){
	f_pecan = document.getElementById('fieldPecan').value;
	f_root = document.getElementById('fieldRoot').value;
	doc_tradeReward.innerHTML = a_tradeReward;
	doc_tradeReward2.innerHTML = a_tradeReward;
}

/* CALCULATIONS */
/*
function computeLastRootPlant(){
	var _now = Math.round((new Date()).getTime() / 1000);
	var _timeSinceLast = parseFloat(_now - a_lastRootPlant);
	
	var	_numhours = Math.floor(_timeSinceLast / 3600);
	var _numminutes = Math.floor((_timeSinceLast % 3600) / 60);
	var _numseconds = (_timeSinceLast % 3600) % 60;
	var _plantString = "";			
	if(_numhours > 0) {
		_plantString = _numhours + " hours and " + _numminutes + " minutes ago";
	} else if(_numminutes > 0) {
		_plantString = _numminutes + " minutes ago";
	} else {
		_plantString = "less than a minute ago";
	}
	
	return _plantString;		
}

function computeProgressBar(){
	var _state = parseFloat(a_pecanGiven / a_pecanToWin).toFixed(2);
	var _result = Math.floor(_state * 100) + '%';
	doc_progressBar.style.width = _result;
	doc_progressBar.innerHTML = _result;
}

function computePecanLeft(){
	a_pecanLeft = parseFloat(a_pecanToWin - a_pecanGiven).toFixed(0);
}

function computeWonkWonk(){
	ComputeWonkTrade(f_pecan, function(result) {
		a_tradeReward = parseFloat(web3.fromWei(result, 'ether')).toFixed(8);
	});
}

/* FAST LOCAL UPDATES */
/*
function fastupdateRootPecan(){
	timeNow = (new Date).getTime();
	////console.log(timeNow);
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

//Current info for player (eggs, balance)
function updatePlayerInfo(){
	GetPlayerInfo(m_account, function(result) {
		a_playerBalance = formatEthValue(web3.fromWei(result.args._balance,'ether'));
		a_playerEgg = result.args._egg;
	});
}

/* WEB3 TRANSACTIONS */
/*
//Check number of Pecans isn't above player max
function webCheckPecan(){
	if(f_pecan > a_playerPecan){
		maxField();
		pecan_modal.style.display = "block";
	} else {
		webGivePecan();
	}
}

//Give pecan
function webGivePecan(){
	GivePecan(f_pecan, function(){
	});
}

//On other actions, make sure the player has already planted a root 
function webCheckRoot(_func){
	if(a_playerTree == 0){
		root_modal.style.display = "block";
	} else {
		_func();
	}
}

//Check first if player doesn't have too much unclaimed ETH
//Also make sure player is spending at least 0.001 ETH
function webCheckClaim(){
	if(a_playerEtherShare > 0.0001){
		claim_modal.style.display = "block";
	} else if(f_root < 0.001) {
		toolow_modal.style.display = "block";
	} else {
		webPlantRoot();
	}
}

//Plant root
function webPlantRoot(){
	var weitospend = web3.toWei(f_root,'ether');
	PlantRoot(weitospend, function(){
	});
}

//Check first if it has been at least one hour since last player action
function webCheckTime(){
	var _now = Math.round((new Date()).getTime() / 1000);
	var _timeSinceLast = parseFloat(_now - a_playerLastClaim);
	if(_timeSinceLast < 3800){
		grow_modal.style.display = "block";
	} else {
		webGrowTree();
	}
}

//Grow tree
function webGrowTree(){
	GrowTree(function(){
	});
}

//Claim share
function webHarvestShare(){
	ClaimShare(function(){
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

abiDefinition=[{"constant": true,"inputs": [{"name": "_player","type": "address"}],"name": "GetPlayerInfo","outputs": [{"name": "_egg","type": "uint256"},{"name": "_balance","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_flip","type": "bool"},{"name": "_id","type": "uint256"}],"name": "ComputeEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "round","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_id","type": "uint256"}],"name": "GetSnailInfo","outputs": [{"name": "_level","type": "uint256"},{"name": "_lastSnag","type": "uint256"},{"name": "_owner","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"}],"name": "Snag","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [{"name": "_id","type": "uint256"}],"name": "GetLordInfo","outputs": [{"name": "_level","type": "uint256"},{"name": "_owner","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "roundPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "lastFlip","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"}],"name": "GrabSnail","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [],"name": "PayThrone","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"}],"name": "BecomeLord","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "snailPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeLordBonus","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "BeginRound","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "WithdrawBalance","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "thronePot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_id","type": "uint256"}],"name": "ComputeSnailCost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_id","type": "uint256"}],"name": "ComputeLordCost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "nextRoundStart","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "victoryEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "lastLordFlip","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "gameActive","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"payable": true,"stateMutability": "payable","type": "fallback"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "round","type": "uint256"}],"name": "WonRound","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "round","type": "uint256"}],"name": "StartedRound","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "snail","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "egg","type": "uint256"},{"indexed": false,"name": "level","type": "uint256"}],"name": "GrabbedSnail","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "snail","type": "uint256"},{"indexed": false,"name": "egg","type": "uint256"}],"name": "Snagged","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "lord","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "egg","type": "uint256"},{"indexed": false,"name": "level","type": "uint256"}],"name": "BecameLord","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "WithdrewBalance","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "PaidThrone","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "BoostedPot","type": "event"}]

var contractAbi = web3.eth.contract(abiDefinition);
var myContract = contractAbi.at(contractAddress);

function GetPlayerInfo(_player,callback){ 
    var outputData = myContract.GetPlayerInfo.getData(_player);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('GetPlayerInfo ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeEgg(_flip,_id,callback){  
    var outputData = myContract.ComputeEgg.getData(_flip,_id);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ComputeEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function round(callback){ 
    var outputData = myContract.round.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('round ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetSnailInfo(_id,callback){
    var outputData = myContract.GetSnailInfo.getData(_id);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('GetSnailInfo ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function Snag(_id,eth,callback){ 
    var outputData = myContract.Snag.getData(_id);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            console.log('Snag ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetLordInfo(_id,callback){ 
    var outputData = myContract.GetLordInfo.getData(_id);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('GetLordInfo ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function roundPot(callback){ 
    var outputData = myContract.roundPot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('roundPot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function lastFlip(callback){
    var outputData = myContract.lastFlip.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('lastFlip ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GrabSnail(_id,eth,callback){  
    var outputData = myContract.GrabSnail.getData(_id);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            console.log('GrabSnail ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function PayThrone(callback){
    var outputData = myContract.PayThrone.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('PayThrone ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function BecomeLord(_id,eth,callback){ 
    var outputData = myContract.BecomeLord.getData(_id);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            console.log('BecomeLord ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function snailPot(callback){ 
    var outputData = myContract.snailPot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('snailPot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeLordBonus(callback){
    var outputData = myContract.ComputeLordBonus.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ComputeLordBonus ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function BeginRound(callback){ 
    var outputData = myContract.BeginRound.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('BeginRound ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function WithdrawBalance(callback){ 
    var outputData = myContract.WithdrawBalance.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('WithdrawBalance ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function thronePot(callback){ 
    var outputData = myContract.thronePot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('thronePot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeSnailCost(_id,callback){ 
    var outputData = myContract.ComputeSnailCost.getData(_id);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ComputeSnailCost ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeLordCost(_id,callback){ 
    var outputData = myContract.ComputeLordCost.getData(_id);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ComputeLordCost ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function nextRoundStart(callback){   
    var outputData = myContract.nextRoundStart.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('nextRoundStart ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function victoryEgg(callback){ 
    var outputData = myContract.victoryEgg.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('victoryEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function lastLordFlip(callback){   
    var outputData = myContract.lastLordFlip.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('lastLordFlip ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function gameActive(callback){  
    var outputData = myContract.gameActive.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('gameActive ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}







/* EVENT WATCH */
/*
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
	var lowest = d_leaderboard[0].tree;
	var position = 0; 
	
	//Check lowest leader
	var i = 0;
	for(i = 0; i < 5; i++) {
		if(d_leaderboard[i].tree < lowest) {
			lowest = d_leaderboard[i].tree;
			position = i;
		}
	}
	
	//Check if hatcher is already on leaderboard, then check if hatcher can replace lowest
	var notLeader = true;
	for(k = 0; k < 5; k++) {
		if(e_size.address == d_leaderboard[k].address) {
			d_leaderboard[k].address = e_size.address;
			d_leaderboard[k].tree = e_size.tree;
			notLeader = false;
		}
	}

	var newEntry = false;
	if(notLeader == true && e_size.tree > lowest) {
		d_leaderboard[position].address = e_size.address;
		d_leaderboard[position].tree = e_size.tree;
		newEntry = true;
	}
}

/* EVENTS */
/*
var logboxscroll = document.getElementById('logboxscroll');
var eventlogdoc = document.getElementById("eventlog");

var e_size = { address: "", tree: 0 };

function runLog(){
	if(ranLog == false && twoDaysBlock > 0){
		ranLog = true;
		myContract.PlantedRoot({}, { fromBlock: launchBlock, toBlock: 'latest' }).get(function(error, result){ // don't forget that extra {} parameter for individual events
			if(!error){
				console.log(result);
				var j = 0;
				for(j = 0; j < result.length; j++){
					if(checkHash(storetxhash, result[j].transactionHash) != 0) {
						e_size.address = result[j].args.player;
						e_size.tree =  parseInt(result[j].args.treesize);
						computeLeaderboard();
					}
				}
			}
			else{
				console.log("problem!");
			}
		});
		myContract.allEvents({ fromBlock: twoDaysBlock, toBlock: 'latest' }).get(function(error, result){
			if(!error){
				console.log(result);
				var i = 0;
				for(i = 0; i < result.length; i++){
					if(checkHash(storetxhash, result[i].transactionHash) != 0) {
						dateLog(result[i].blockNumber);
						if(result[i].event == "GavePecan"){
							eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " gave " + numberWithSpaces(result[i].args.pecan) + " Pecans to Wonkers, and got " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " ETH in exchange!";							
						} else if(result[i].event == "PlantedRoot"){
							eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " planted a root with " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " ETH. Their tree reaches " + numberWithSpaces(result[i].args.treesize) + " in size.";
						} else if(result[i].event == "ClaimedShare"){
							eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " claimed their share worth " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " ETH and got " + numberWithSpaces(result[i].args.pecan) + " Pecans.";
						} else if(result[i].event == "GrewTree"){
							eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " grew their Tree and won " + numberWithSpaces(result[i].args.pecan) + " Pecans. Their boost is " + result[i].args.boost + "x.";
						} else if(result[i].event == "WithdrewBalance"){
							eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " withdrew " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " ETH from their balance.";
						} else if(result[i].event == "PaidThrone"){
							eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " paid tribute to the SnailThrone! " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " ETH have been sent.";
						} else if(result[i].event == "BoostedPot"){
							eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " makes a generous " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " ETH donation to the JackPot.";
						}
					logboxscroll.scrollTop = logboxscroll.scrollHeight;
					}
				}
			}
			else{
				console.log("problem!");
			}
		});
	}
}

var plantedrootEvent = myContract.PlantedRoot();

plantedrootEvent.watch(function(error, result){
    if(!error){
		//////////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " planted a root with " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " ETH. Their tree reaches " + numberWithSpaces(result.args.treesize) + " in size.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var claimedshareEvent = myContract.ClaimedShare();

claimedshareEvent.watch(function(error, result){
    if(!error){
		//////////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " claimed their share worth " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " ETH and got " + numberWithSpaces(result.args.pecan) + " Pecans.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var grewtreeEvent = myContract.GrewTree();

grewtreeEvent.watch(function(error, result){
    if(!error){
		//////////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " grew their Tree and won " + numberWithSpaces(result.args.pecan) + " Pecans. Their boost is " + result.args.boost + "x.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var wonroundEvent = myContract.WonRound();

wonroundEvent.watch(function(error, result){
    if(!error){
		//////////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " WINS ROUND " + result.args.round + " AND EARNS " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " ETH!";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});



var gavepecanEvent = myContract.GavePecan();

gavepecanEvent.watch(function(error, result){
	if(!error){
		//////////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " gave " + numberWithSpaces(result.args.pecan) + " Pecans to Wonkers, and got " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " ETH in exchange!";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var withdrewbalanceEvent = myContract.WithdrewBalance();

withdrewbalanceEvent.watch(function(error, result){
    if(!error){
		//////////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " withdrew " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " ETH from their balance.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var paidthroneEvent = myContract.PaidThrone();

paidthroneEvent.watch(function(error, result){
    if(!error){
		//////////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " paid tribute to the SnailThrone! " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " ETH have been sent.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var boostedpotEvent = myContract.BoostedPot();

boostedpotEvent.watch(function(error, result){
    if(!error){
		//////////console.log(result);
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
console.log(events);
*/
