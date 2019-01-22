var contractAddress=""; //ROPSTEN 1

/* WEB3 DETECTION */
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

/* MODAL */

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
var a_treePot;
var a_wonkPot;
var a_thronePot;
var a_jackPot;
var a_pecanToWin = 0;
var a_pecanGiven = 0;
var a_pecanLeft = 0;
var a_lastRootPlant;
var a_playerBalance;
var a_playerRound;
var a_playerBoost;
var a_playerTree = 0;
var a_playerPecan = 0;
var a_playerLastClaim;
var a_playerEtherShare;
var a_playerPecanShare = 0;
var a_rootPecanForOneEther = 0;
var a_tradeReward;

var f_pecan;
var f_root;

var m_account = "waiting for web3";

var doc_contractBalance = document.getElementById('contractbalance');
var doc_gameRound = document.getElementById('gameround');
var doc_roundPot = document.getElementById('roundpot');
var doc_treePot = document.getElementById('treepot');
var doc_wonkPot = document.getElementById('wonkpot');
var doc_thronePot = document.getElementById('thronepot');
var doc_jackPot = document.getElementById('jackpot');
var doc_pecanToWin = document.getElementById('pecantowin');
var doc_pecanGiven = document.getElementById('pecangiven');
var doc_pecanLeft = document.getElementById('pecanleft');
var doc_lastRootPlant = document.getElementById('lastrootplant');
var doc_playerBalance = document.getElementById('playerbalance');
var doc_playerBoost = document.getElementById('playerboost');
var doc_playerTree = document.getElementById('playertree');
var doc_playerPecan = document.getElementById('playerpecan');
var	doc_playerEtherShare = document.getElementById('playerethershare');
var	doc_playerPecanShare = document.getElementById('playerpecanshare');
var	doc_rootPecanForOneEther = document.getElementById('rootpecanforoneether');
var doc_playerLastClaim = document.getElementById('playerlastclaim');
var doc_fieldPecan = document.getElementById('fieldPecan');
var doc_fieldRoot = document.getElementById('fieldRoot');
var doc_tradeReward = document.getElementById('tradereward');
var doc_tradeReward2 = document.getElementById('tradereward2');
var doc_progressBar = document.getElementById('progressbarpecan');
var doc_fieldPecanReward = document.getElementById('fieldpecanreward');
var doc_boostReady = document.getElementById('boostready');
//var doc_launchTimer = document.getElementById('launchtimer');

//Leaderboard Array

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
	slowUpdate();
	fastUpdate();
	refreshDataSlow();
	checkLaunch();
}	

function slowUpdate(){
	updateEthAccount();
	updateContractBalance();
	updateGameRound();
	updateTreePot();
	updateWonkPot();
	updateJackPot();
	updateThronePot();
	updatePecanToWin();
	updatePecanGiven();
	updateLastRootPlant();
	updatePlayerBalance();
	updatePlayerRound();
	updatePlayerBoost();
	updatePlayerTree();
	updatePlayerPecan();
	updatePlayerClaim();
	updatePlayerEtherShare();
	updatePlayerPecanShare();
	updateRootPecan();
	updatePlayerClaim();
	computePecanLeft();
	computeProgressBar();
	updateText();
	//runLog();
	setTimeout(slowUpdate, 4000);
}

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

//Updates all text from web3 calls
function updateText(){
	doc_contractBalance.innerHTML = a_contractBalance;
	doc_gameRound.innerHTML = a_gameRound;
	doc_roundPot.innerHTML = (a_jackPot / 5).toFixed(4);
	doc_treePot.innerHTML = a_treePot;
	doc_wonkPot.innerHTML = a_wonkPot;
	doc_thronePot.innerHTML = a_thronePot;
	doc_jackPot.innerHTML = a_jackPot;
	doc_pecanToWin.innerHTML = numberWithSpaces(a_pecanToWin);
	doc_pecanGiven.innerHTML = numberWithSpaces(a_pecanGiven);
	doc_pecanLeft.innerHTML = numberWithSpaces(a_pecanLeft);
	doc_lastRootPlant.innerHTML = computeLastRootPlant();
	doc_playerBalance.innerHTML = a_playerBalance;
	doc_playerBoost.innerHTML = a_playerBoost;
	doc_playerTree.innerHTML = numberWithSpaces(a_playerTree);
	doc_playerPecan.innerHTML = numberWithSpaces(a_playerPecan);
	doc_playerEtherShare.innerHTML = a_playerEtherShare;
	doc_playerPecanShare.innerHTML = numberWithSpaces(a_playerPecanShare);
	doc_rootPecanForOneEther.innerHTML = numberWithSpaces(a_rootPecanForOneEther);
	timeSincePlayerClaim();
}

function updateField(){
	f_pecan = document.getElementById('fieldPecan').value;
	f_root = document.getElementById('fieldRoot').value;
	doc_tradeReward.innerHTML = a_tradeReward;
	doc_tradeReward2.innerHTML = a_tradeReward;
}

/* CALCULATIONS */

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
	gameRound(function(result) {
		a_gameRound = result;
	});
}

//Current tree pot
function updateTreePot(){
	treePot(function(result) {
		a_treePot = formatEthValue(web3.fromWei(result,'ether'));
	});
}

//Current wonk pot
function updateWonkPot(){
	wonkPot(function(result) {
		a_wonkPot = formatEthValue(web3.fromWei(result,'ether'));
	});
}

//Current jackpot
function updateJackPot(){
	jackPot(function(result) {
		a_jackPot = formatEthValue(web3.fromWei(result,'ether'));
	});
}

//Current throne pot
function updateThronePot(){
	thronePot(function(result) {
		a_thronePot = formatEthValue(web3.fromWei(result,'ether'));
	});
}

//Current pecans to win
function updatePecanToWin(){
	pecanToWin(function(result) {
		a_pecanToWin = result;
	});
}

//Pecans given
function updatePecanGiven(){
	pecanGiven(function(result) {
		a_pecanGiven = result;
	});
}

//Last root plant
function updateLastRootPlant(){
	lastRootPlant(function(result) {
		a_lastRootPlant = result;
	});
}

//Current balance for player
function updatePlayerBalance(){
	GetMyBalance(function(result) {
		a_playerBalance = formatEthValue(web3.fromWei(result,'ether'));
	});
}

//Current round for player
function updatePlayerRound(){
	GetMyRound(function(result) {
		a_playerRound = result;
	});
}		

//Current round for player
function updatePlayerBoost(){
	GetMyBoost(function(result) {
		a_playerBoost= result;
	});
}		

//Current treeSize for player
function updatePlayerTree(){
	GetTree(m_account, function(result) {
		a_playerTree = result;
	});
}

//Current pecans for player
function updatePlayerPecan(){
	GetPecan(m_account, function(result) {
		a_playerPecan = result;
	});
}		

//Last claim for player
function updatePlayerClaim(){
	GetMyLastClaim(function(result) {
		a_playerLastClaim = result;
	});
}	

//Compute EtherShare
function updatePlayerEtherShare(){
	ComputeEtherShare(m_account, function(result) {
		a_playerEtherShare = parseFloat(web3.fromWei(result,'ether')).toFixed(10);
	});
}

//Compute PecanShare
function updatePlayerPecanShare(){
	ComputePecanShare(m_account, function(result) {
		a_playerPecanShare = result;
	});
}

//Compute PlantPecan
function updateRootPecan(){
	var weitospend =  web3.toWei(1,'ether');
	ComputePlantPecan(weitospend, function(result) {
		a_rootPecanForOneEther = result;
	});
}

/* WEB3 TRANSACTIONS */

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

abiDefinition=[{"constant": true,"inputs": [],"name": "GetMyBalance","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "playerRound","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "PlantRoot","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "treeSize","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "GetPecan","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_pecanGift","type": "uint256"}],"name": "GivePecan","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "pecanToWin","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "ComputeEtherShare","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "jackPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "PayThrone","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "playerBalance","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "GrowTree","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "lastClaim","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputePecanToWin","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "ComputePecanShare","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "pecan","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_pecanGift","type": "uint256"}],"name": "ComputeWonkTrade","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyLastClaim","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyBoost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "treePot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "WithdrawBalance","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "gameRound","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "boost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "wonkPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputePlantBoostFactor","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "thronePot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyRound","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "GetTree","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_msgValue","type": "uint256"}],"name": "ComputePlantPecan","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "pecanGiven","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "ComputeShareBoostFactor","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "lastRootPlant","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "ClaimShare","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"payable": true,"stateMutability": "payable","type": "fallback"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "pecan","type": "uint256"},{"indexed": false,"name": "treesize","type": "uint256"}],"name": "PlantedRoot","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "pecan","type": "uint256"}],"name": "GavePecan","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "pecan","type": "uint256"}],"name": "ClaimedShare","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "pecan","type": "uint256"},{"indexed": false,"name": "boost","type": "uint256"}],"name": "GrewTree","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "WonRound","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "WithdrewBalance","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "PaidThrone","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "BoostedPot","type": "event"}]

var contractAbi = web3.eth.contract(abiDefinition);
var myContract = contractAbi.at(contractAddress);
	
function GetMyBalance(callback){

    var outputData = myContract.GetMyBalance.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetMyBalance ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function playerRound(callback){
    
    
    var outputData = myContract.playerRound.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('playerRound ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function PlantRoot(eth,callback){
    
    
    var outputData = myContract.PlantRoot.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            //console.log('PlantRoot ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function treeSize(callback){
    
    
    var outputData = myContract.treeSize.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('treeSize ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetPecan(adr,callback){
    var outputData = myContract.GetPecan.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetPecan ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GivePecan(_pecanGift,callback){   
    var outputData = myContract.GivePecan.getData(_pecanGift);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GivePecan ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function pecanToWin(callback){   
    var outputData = myContract.pecanToWin.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('pecanToWin ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeEtherShare(adr,callback){
    
    
    var outputData = myContract.ComputeEtherShare.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeEtherShare ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function jackPot(callback){
    
    
    var outputData = myContract.jackPot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('jackPot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
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


function playerBalance(callback){
    
    
    var outputData = myContract.playerBalance.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('playerBalance ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GrowTree(callback){
    
    
    var outputData = myContract.GrowTree.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GrowTree ',result);
            callback(result)
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


function ComputePecanToWin(callback){
    
    
    var outputData = myContract.ComputePecanToWin.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputePecanToWin ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputePecanShare(adr,callback){
    
    
    var outputData = myContract.ComputePecanShare.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputePecanShare ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function pecan(callback){
    
    
    var outputData = myContract.pecan.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('pecan ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeWonkTrade(_pecanGift,callback){
    
    
    var outputData = myContract.ComputeWonkTrade.getData(_pecanGift);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeWonkTrade ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetMyLastClaim(callback){
    
    
    var outputData = myContract.GetMyLastClaim.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetMyLastClaim ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetMyBoost(callback){
    
    
    var outputData = myContract.GetMyBoost.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetMyBoost ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function treePot(callback){
    
    
    var outputData = myContract.treePot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('treePot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
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


function gameRound(callback){
    
    
    var outputData = myContract.gameRound.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('gameRound ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function boost(callback){
    
    
    var outputData = myContract.boost.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('boost ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function wonkPot(callback){
    
    
    var outputData = myContract.wonkPot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('wonkPot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputePlantBoostFactor(callback){
    
    
    var outputData = myContract.ComputePlantBoostFactor.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputePlantBoostFactor ',web3.toDecimal(result));
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


function GetMyRound(callback){
    
    
    var outputData = myContract.GetMyRound.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetMyRound ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetTree(adr,callback){
    
    
    var outputData = myContract.GetTree.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetTree ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputePlantPecan(_msgValue,callback){
    
    
    var outputData = myContract.ComputePlantPecan.getData(_msgValue);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputePlantPecan ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function pecanGiven(callback){
    
    
    var outputData = myContract.pecanGiven.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('pecanGiven ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeShareBoostFactor(adr,callback){
    
    
    var outputData = myContract.ComputeShareBoostFactor.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeShareBoostFactor ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function lastRootPlant(callback){
    
    
    var outputData = myContract.lastRootPlant.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('lastRootPlant ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ClaimShare(callback){
    
    
    var outputData = myContract.ClaimShare.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ClaimShare ',result);
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
