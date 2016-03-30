myApp.controller('homeController', function($scope, $rootScope, $http, $routeParams, currencyService){ // All the dependencies I need are injected here
     //the code below checks to see if a valid number has been entered into the input box
     $rootScope.validityTest = function(){	
		$scope.$watch('baseAmount', function(){ //the watch function will look for any changes to the values in the input field
            if(isNaN($scope.baseAmount)){ // and implement the code below it when a change is detected
				$scope.validity = false;  //if $scope.validity returns false then an error message will show to ask the user to enter a valid number
			}else{
			    $scope.validity = true; //if $scope.validity returns true then no error message will show
			}
		})	
    } 
	
	//The function below allows for switching between base currencies
	 $rootScope.baseSwitch = function(base){	
	    if(base == 'gbp'){
			$scope.baseCurrency = $scope.names.USDGBP; //the currency that is received as the parameter 'base' determines
			$rootScope.source = "GBP";                 //which currency will be stored in the variable $scope.baseCurrency
		}else if(base == "eur"){
			$scope.baseCurrency = $scope.names.USDEUR; // the variable $scope.names.USDEUR and the others are retrieved from the API
		    $rootScope.source = "EUR"; //$rootScope.source is the variable that is used to tell the user which base currency is being used
		}else if(base == "cad"){
			$scope.baseCurrency = $scope.names.USDCAD;
			$rootScope.source = "CAD";
		}else{
		    $scope.baseCurrency = $scope.names.USDUSD;
			$rootScope.source = "USD";
		}	
   	 }
	 
	$scope.$watch('', function(){ 	     
		 $rootScope.baseSwitch();	
	})	 	 
	
	
	$scope.$watch('baseAmount', function(){ // the function 'validityTest' every time a change is detected in the variable baseAmount
        $rootScope.validityTest();
	})

	//the 'addCurrencies' function controls the functionality for adding new currencies
	$rootScope.addCurrencies = function(list){	    		
		if(countProperities()<11){ // sets a limit for the number of currencies that can be added in one go
			if(list == 'cad'){ // this if statement verifies which currency has been clicked and then runs the relevant code
			    $rootScope.CAD = ($rootScope.CAD + 1)%2; // using the '%' operator means that $rootScope.CAD is always 0 or 1
				if($rootScope.CAD == 0){ // when a currency is selected it will be added to the '$rootScope.currencies' object
					$rootScope.currencies.USDCAD = {flag:'../currencyConverter/images/flags/cad.png', currency:'CAD - Canadian Dollar',symbol:'$', amount:$scope.names.USDCAD, id:'cad'};
					$rootScope.checkCAD = true;  // the variable '$rootScope.checkCAD' is used to determine if the selected currency indicator tick on the currency table appears or not 
				}else{
				    delete $rootScope.currencies.USDCAD; // if a currency is deselected then is will be deleted from the object '$rootScope.currencies'
					$rootScope.checkCAD = false;
				}  // this if else statement allows the user to toggle between selecting a currency and deselecting it depending on whether $rootScope.CAD is equal to 0 or 1
			}else if(list == 'gbp'){
			    $rootScope.GBP = ($rootScope.GBP + 1)%2;
				if($rootScope.GBP == 0){
					$rootScope.currencies.USDGBP = {flag:'../currencyConverter/images/flags/gbp.png', currency:'GBP - British Pound Sterling',symbol:'£', amount:$scope.names.USDGBP, id:'gbp'};	
					$rootScope.checkGBP = true;	
				}else{
				    delete $rootScope.currencies.USDGBP;
					$rootScope.checkGBP = false;
				}	            					
			}else if(list === 'usd'){
			    $rootScope.USD = ($rootScope.USD + 1)%2;
				if($rootScope.USD == 0){
					$rootScope.currencies.USDUSD = {flag:'../currencyConverter/images/flags/usd.png', currency:'USD - United States Dollar' ,symbol:'£', amount:$scope.names.USDUSD, id:'usd'};
					$rootScope.checkUSD = true;
				}else{
				    delete $rootScope.currencies.USDUSD;
					$rootScope.checkUSD = false;
				}
			}else if(list == 'aud'){  
			    $rootScope.AUD = ($rootScope.AUD + 1)%2;
				if($rootScope.AUD == 0){
					$rootScope.currencies.USDAUD = {flag:'../currencyConverter/images/flags/aud.png', currency:'AUD - Australian Dollar',symbol:'$', amount:$scope.names.USDAUD, id:'aud'};
					$rootScope.checkAUD = true;
				}else{
				    delete $rootScope.currencies.USDAUD;
					$rootScope.checkAUD = false;
				}	
			}else if(list == 'eur'){
			    $rootScope.EUR = ($rootScope.EUR + 1)%2;
				if($rootScope.EUR == 0){
					$rootScope.currencies.USDEUR = {flag:'../currencyConverter/images/flags/eur.png', currency:'EUR - Euro',symbol:'€', amount:$scope.names.USDEUR, id:'eur'};
					$rootScope.checkEUR = true;
				}else{
				    delete $rootScope.currencies.USDEUR;
					$rootScope.checkEUR = false;
				}	
			}else if(list == 'aed'){
			    $rootScope.AED = ($rootScope.AED + 1)%2;
				if($rootScope.AED == 0){
					$rootScope.currencies.USDAED = {flag:'../currencyConverter/images/flags/aed.png', currency:'AED - UAE Dirham',symbol:'د.إ', amount:$scope.names.USDAED, id:'aed'};
					$rootScope.checkAED = true;
				}else{
				    delete $rootScope.currencies.USDAED;
					$rootScope.checkAED = false;
				}		
			}else if(list == 'afn'){
			    $rootScope.AFN = ($rootScope.AFN + 1)%2;
				if($rootScope.AFN == 0){
					$rootScope.currencies.USDAFN = {flag:'../currencyConverter/images/flags/afn.png', currency:'AFN - Afghan Afghani',symbol:'؋', amount:$scope.names.USDAFN, id:'afn'};
					$rootScope.checkAFN = true;
				}else{
				    delete $rootScope.currencies.USDAFN;
					$rootScope.checkAFN = false;
				}	
			}else if(list == 'all'){
			    $rootScope.ALL = ($rootScope.ALL + 1)%2;
				if($rootScope.ALL == 0){
					$rootScope.currencies.USDALL = {flag:'../currencyConverter/images/flags/all.png', currency:'ALL - Albanian Lek',symbol:'Lek', amount:$scope.names.USDALL, id:'all'};
					$rootScope.checkALL = true;
				}else{
				    delete $rootScope.currencies.USDALL;
					$rootScope.checkALL = false;
				}	
			}else if(list == 'amd'){
			    $rootScope.AMD = ($rootScope.AMD + 1)%2;
				if($rootScope.AMD == 0){
					$rootScope.currencies.USDAMD = {flag:'../currencyConverter/images/flags/amd.png', currency:'AMD - Armenian Dram',sym:'../currencyConverter/images/symbols/amd.gif', amount:$scope.names.USDAMD, id:'amd'};
					$rootScope.checkAMD = true;
				}else{
				    delete $rootScope.currencies.USDAMD;
					$rootScope.checkAMD = false;
				}	
			}else if(list == 'ang'){
			    $rootScope.ANG = ($rootScope.ANG + 1)%2;
				if($rootScope.ANG == 0){
					$rootScope.currencies.USDANG = {flag:'../currencyConverter/images/flags/ang.png', currency:'ANG - Neth. Antillean Guilder',symbol:'ƒ', amount:$scope.names.USDANG, id:'ang'};
					$rootScope.checkANG = true;
				}else{
				    delete $rootScope.currencies.USDANG;
					$rootScope.checkANG = false;
				}	
			}else if(list == 'aoa'){
			    $rootScope.AOA = ($rootScope.AOA + 1)%2;
				if($rootScope.AOA == 0){
					$rootScope.currencies.USDAOA = {flag:'../currencyConverter/images/flags/aoa.png', currency:'AOA - Angolan Kwanza',symbol:'Kz', amount:$scope.names.USDAOA, id:'aoa'};
					$rootScope.checkAOA = true;
				}else{
				    delete $rootScope.currencies.USDAOA;
					$rootScope.checkAOA = false;
				}		
			}else if(list == 'ars'){
			    $rootScope.ARS = ($rootScope.ARS + 1)%2;
				if($rootScope.ARS == 0){
					$rootScope.currencies.USDARS = {flag:'../currencyConverter/images/flags/ars.png', currency:'ARS - Argentine Peso',symbol:'$', amount:$scope.names.USDARS, id:'ars'};
					$rootScope.checkARS = true;
				}else{
				    delete $rootScope.currencies.USDARS;
					$rootScope.checkARS = false;
				}		
			}else if(list == 'awg'){
			    $rootScope.AWG = ($rootScope.AWG + 1)%2;
				if($rootScope.AWG == 0){
					$rootScope.currencies.USDAWG = {flag:'../currencyConverter/images/flags/awg.png', currency:'AWG - Aruban Florin',symbol:'ƒ', amount:$scope.names.USDAWG, id:'awg'};
					$rootScope.checkAWG = true;
				}else{
				    delete $rootScope.currencies.USDAWG;
					$rootScope.checkAWG = false;
				}	
			}else if(list == 'azn'){
			    $rootScope.AZN = ($rootScope.AZN + 1)%2;
				if($rootScope.AZN == 0){
					$rootScope.currencies.USDAZN = {flag:'../currencyConverter/images/flags/azn.png', currency:'AZN - Azerbaijani Manat',symbol:'ман', amount:$scope.names.USDAZN, id:'azn'};
					$rootScope.checkAZN = true;
				}else{
				    delete $rootScope.currencies.USDAZN;
					$rootScope.checkAZN = false;
				}	
/************************************************************************************************************************************************************************************/			
		    }else if(list == 'rub'){
			    $rootScope.RUB = ($rootScope.RUB + 1)%2;
				if($rootScope.RUB == 0){
					$rootScope.currencies.USDRUB = {flag:'../currencyConverter/images/flags/rub.png', currency:'RUB - Russian Ruble',symbol:'руб', amount:$scope.names.USDRUB, id:'rub'};
					$rootScope.checkRUB = true;
				}else{
				    delete $rootScope.currencies.USDRUB;
					$rootScope.checkRUB = false;
				}		
			}else if(list == 'jpy'){
				$rootScope.JPY = ($rootScope.JPY + 1)%2;
				if($rootScope.JPY == 0){
					$rootScope.currencies.USDJPY = {flag:'../currencyConverter/images/flags/jpy.png', currency:'JPY - Japanese Yen',symbol:'¥', amount:$scope.names.USDJPY, id:'jpy'};
					$rootScope.checkJPY = true;
				}else{
				    delete $rootScope.currencies.USDJPY;
					$rootScope.checkJPY = false;
				}	
			}else if(list == 'inr'){
			    $rootScope.INR = ($rootScope.INR + 1)%2;
				if($rootScope.INR == 0){
					$rootScope.currencies.USDINR = {flag:'../currencyConverter/images/flags/inr.png', currency:'INR - Indian Rupee',sym:'../currencyConverter/images/symbols/inr.png', amount:$scope.names.USDINR, id:'inr'};
					$rootScope.checkINR = true;
				}else{
				    delete $rootScope.currencies.USDINR;
					$rootScope.checkINR = false;
				}	
			}else if(list == 'bgn'){
			    $rootScope.BGN = ($rootScope.BGN + 1)%2;
				if($rootScope.BGN == 0){
					$rootScope.currencies.USDBGN = {flag:'../currencyConverter/images/flags/bgn.png', currency:'BGN - Bulgarian Lev',symbol:'лв', amount:$scope.names.USDBGN, id:'bgn'};
					$rootScope.checkBGN = true;
				}else{
				    delete $rootScope.currencies.USDBGN;
					$rootScope.checkBGN = false;
				}		
			}else if(list == 'nzd'){
			    $rootScope.NZD = ($rootScope.NZD + 1)%2;
				if($rootScope.NZD == 0){
					$rootScope.currencies.USDNZD = {flag:'../currencyConverter/images/flags/nzd.png', currency:'NZD - New Zealand Dollar',symbol:'$', amount:$scope.names.USDNZD, id:'nzd'};
					$rootScope.checkNZD = true;
				}else{
				    delete $rootScope.currencies.USDNZD;
					$rootScope.checkNZD = false;
				}		
			}else if(list == 'chf'){
			    $rootScope.CHF = ($rootScope.CHF + 1)%2;
				if($rootScope.CHF == 0){
					$rootScope.currencies.USDCHF = {flag:'../currencyConverter/images/flags/chf.png', currency:'CHF - Swiss Franc',symbol:'CHF', amount:$scope.names.USDCHF, id:'chf'};
					$rootScope.checkCHF = true;
				}else{
				    delete $rootScope.currencies.USDCHF;
					$rootScope.checkCHF = false;
				}	
			}else if(list == 'zar'){
			    $rootScope.ZAR = ($rootScope.ZAR + 1)%2;
				if($rootScope.ZAR == 0){
					$rootScope.currencies.USDZAR = {flag:'../currencyConverter/images/flags/zar.png', currency:'ZAR - South African Rand',symbol:'R', amount:$scope.names.USDZAR, id:'zar'};
					$rootScope.checkZAR = true;
				}else{
				    delete $rootScope.currencies.USDZAR;
					$rootScope.checkZAR = false;
				}		
			}else if(list == 'sgd'){
			    $rootScope.SGD = ($rootScope.SGD + 1)%2;
				if($rootScope.SGD == 0){
					$rootScope.currencies.USDSGD = {flag:'../currencyConverter/images/flags/sgd.png', currency:'SGD - Singapore Dollar',symbol:'$', amount:$scope.names.USDSGD, id:'sgd'};
					$rootScope.checkSGD = true;
				}else{
				    delete $rootScope.currencies.USDSGD;
					$rootScope.checkSGD = false;
				}	
			}else if(list == 'hkd'){
			    $rootScope.HKD = ($rootScope.HKD + 1)%2;
				if($rootScope.HKD == 0){
					$rootScope.currencies.USDHKD = {flag:'../currencyConverter/images/flags/hkd.png', currency:'HKD - Hong Kong Dollar',symbol:'$', amount:$scope.names.USDHKD, id:'hkd'};
					$rootScope.checkHKD = true;
				}else{
				    delete $rootScope.currencies.USDHKD;
					$rootScope.checkHKD = false;
				}		
			}else if(list == 'sek'){
			    $rootScope.SEK = ($rootScope.SEK + 1)%2;
				if($rootScope.SEK == 0){
					$rootScope.currencies.USDSEK = {flag:'../currencyConverter/images/flags/sek.png', currency:'SEK - Swedish Krona',symbol:'kr', amount:$scope.names.USDSEK, id:'sek'};
					$rootScope.checkSEK = true;
				}else{
				    delete $rootScope.currencies.USDSEK;
					$rootScope.checkSEK = false;
				}	
			}else if(list == 'thb'){
			    $rootScope.THB = ($rootScope.THB + 1)%2;
				if($rootScope.THB == 0){
					$rootScope.currencies.USDTHB = {flag:'../currencyConverter/images/flags/thb.png', currency:'THB - Thai Baht',symbol:'฿', amount:$scope.names.USDTHB, id:'thb'};
					$rootScope.checkTHB = true;
				}else{
				    delete $rootScope.currencies.USDTHB;
					$rootScope.checkTHB = false;
				}	
			}else if(list == 'huf'){
			    $rootScope.HUF = ($rootScope.HUF + 1)%2;
				if($rootScope.HUF == 0){
					$rootScope.currencies.USDHUF = {flag:'../currencyConverter/images/flags/huf.png', currency:'HUF - Hungarian Forint',symbol:'Ft', amount:$scope.names.USDHUF, id:'huf'};
					$rootScope.checkHUF = true;
				}else{
				    delete $rootScope.currencies.USDHUF;
					$rootScope.checkHUF = false;
				}	
			}else if(list == 'cny'){
			    $rootScope.CNY = ($rootScope.CNY + 1)%2;
				if($rootScope.CNY == 0){
					$rootScope.currencies.USDCNY = {flag:'../currencyConverter/images/flags/cny.png', currency:'CNY - Chinese Yuan',symbol:'¥', amount:$scope.names.USDCNY, id:'cny'};
					$rootScope.checkCNY = true;
				}else{
				    delete $rootScope.currencies.USDCNY;
					$rootScope.checkCNY = false;
				}	
			}else if(list == 'nok'){
			    $rootScope.NOK = ($rootScope.NOK + 1)%2;
				if($rootScope.NOK == 0){
					$rootScope.currencies.USDNOK = {flag:'../currencyConverter/images/flags/nok.png', currency:'NOK - Norwegian Krone',symbol:'kr', amount:$scope.names.USDNOK, id:'nok'};
					$rootScope.checkNOK = true;
				}else{
				    delete $rootScope.currencies.USDNOK;
					$rootScope.checkNOK = false;
				}	
			}else if(list == 'mxn'){
			    $rootScope.MXN = ($rootScope.MXN + 1)%2;
				if($rootScope.MXN == 0){
					$rootScope.currencies.USDMXN = {flag:'../currencyConverter/images/flags/mxn.png', currency:'MXN - Mexican Peso',symbol:'$', amount:$scope.names.USDMXN, id:'mxn'};
					$rootScope.checkMXN = true;
				}else{
				    delete $rootScope.currencies.USDMXN;
					$rootScope.checkMXN = false;
				}	
			}else if(list == 'dkk'){
			    $rootScope.DKK = ($rootScope.DKK + 1)%2;
				if($rootScope.DKK == 0){
					$rootScope.currencies.USDDKK = {flag:'../currencyConverter/images/flags/dkk.png', currency:'DKK - Danish Krone',symbol:'kr', amount:$scope.names.USDDKK, id:'dkk'};
					$rootScope.checkDKK = true;
				}else{
				    delete $rootScope.currencies.USDDKK;
					$rootScope.checkDKK = false;
				}	
			}else if(list == 'myr'){
			    $rootScope.MYR = ($rootScope.MYR + 1)%2;
				if($rootScope.MYR == 0){
					$rootScope.currencies.USDMYR = {flag:'../currencyConverter/images/flags/myr.png', currency:'MYR - Malaysian Ringgit',symbol:'RM', amount:$scope.names.USDMYR, id:'myr'};
					$rootScope.checkMYR = true;
				}else{
				    delete $rootScope.currencies.USDMYR;
					$rootScope.checkMYR = false;
				}
			}else if(list == 'pln'){
			    $rootScope.PLN = ($rootScope.PLN + 1)%2;
				if($rootScope.PLN == 0){
					$rootScope.currencies.USDPLN = {flag:'../currencyConverter/images/flags/pln.png', currency:'PLN - Polish Zloty',symbol:'zł', amount:$scope.names.USDPLN, id:'pln'};
					$rootScope.checkPLN = true;
				}else{
				    delete $rootScope.currencies.USDPLN;
					$rootScope.checkPLN = false;
				}	
			}else if(list == 'brl'){
			    $rootScope.BRL = ($rootScope.BRL + 1)%2;
				if($rootScope.BRL == 0){
					$rootScope.currencies.USDBRL = {flag:'../currencyConverter/images/flags/brl.png', currency:'BRL - Brazilian Real',symbol:'R$', amount:$scope.names.USDBRL, id:'brl'};
					$rootScope.checkBRL = true;
				}else{
				    delete $rootScope.currencies.USDBRL;
					$rootScope.checkBRL = false;
				}		
			}else if(list == 'php'){
			    $rootScope.PHP = ($rootScope.PHP + 1)%2;
				if($rootScope.PHP == 0){
					$rootScope.currencies.USDPHP = {flag:'../currencyConverter/images/flags/php.png', currency:'PHP - Philippine Peso',symbol:'₱', amount:$scope.names.USDPHP, id:'php'};
					$rootScope.checkPHP = true;
				}else{
				    delete $rootScope.currencies.USDPHP;
					$rootScope.checkPHP = false;
				}	
			}else if(list == 'idr'){
			    $rootScope.IDR = ($rootScope.IDR + 1)%2;
				if($rootScope.IDR == 0){
					$rootScope.currencies.USDIDR = {flag:'../currencyConverter/images/flags/idr.png', currency:'IDR - Indonesian Rupiah',symbol:'Rp', amount:$scope.names.USDIDR, id:'idr'};
					$rootScope.checkIDR = true;
				}else{
				    delete $rootScope.currencies.USDIDR;
					$rootScope.checkIDR = false;
				}	
			}else if(list == 'czk'){
			    $rootScope.CZK = ($rootScope.CZK + 1)%2;
				if($rootScope.CZK == 0){
					$rootScope.currencies.USDCZK = {flag:'../currencyConverter/images/flags/czk.png', currency:'CZK - Czech Republic Koruna',symbol:'Kč', amount:$scope.names.USDCZK, id:'czk'};
					$rootScope.checkCZK = true;
				}else{
				    delete $rootScope.currencies.USDCZK;
					$rootScope.checkCZK = false;
				}	
			}else if(list == 'twd'){
			    $rootScope.TWD = ($rootScope.TWD + 1)%2;
				if($rootScope.TWD == 0){
					$rootScope.currencies.USDTWD = {flag:'../currencyConverter/images/flags/twd.png', currency:'TWD - New Taiwan Dollar',symbol:'NT$', amount:$scope.names.USDTWD, id:'twd'};
					$rootScope.checkTWD = true;
				}else{
				    delete $rootScope.currencies.USDTWD;
					$rootScope.checkTWD = false;
				}	
			}else if(list == 'krw'){
			    $rootScope.KRW = ($rootScope.KRW + 1)%2;
				if($rootScope.KRW == 0){
					$rootScope.currencies.USDKRW = {flag:'../currencyConverter/images/flags/krw.png', currency:'KRW - South Korean Won',symbol:'₩', amount:$scope.names.USDKRW, id:'krw'};
					$rootScope.checkKRW = true;
				}else{
				    delete $rootScope.currencies.USDKRW;
					$rootScope.checkKRW = false;
				}
			}else if(list == 'bam'){
			    $rootScope.BAM = ($rootScope.BAM + 1)%2;
				if($rootScope.BAM  == 0){
					$rootScope.currencies.USDBAM = {flag:'../currencyConverter/images/flags/bam.png', currency:'BAM - Bosnia-Herzegovina Convertible Mark',symbol:'KM', amount:$scope.names.USDBAM, id:'bam'};
					$rootScope.checkBAM = true;
				}else{
				    delete $rootScope.currencies.USDBAM ;
					$rootScope.checkBAM  = false;
				}	
			}else if(list == 'bbd'){
			    $rootScope.BBD = ($rootScope.BBD + 1)%2;
				if($rootScope.BBD == 0){
					$rootScope.currencies.USDBBD = {flag:'../currencyConverter/images/flags/bbd.png', currency:'BBD - Barbadian Dollar',symbol:'$', amount:$scope.names.USDBBD, id:'bbd'};
					$rootScope.checkBBD = true;
				}else{
				    delete $rootScope.currencies.USDBBD;
					$rootScope.checkBBD = false;
				}	
			}else if(list == 'bdt'){
			    $rootScope.BDT = ($rootScope.BDT + 1)%2;
				if($rootScope.BDT == 0){
					$rootScope.currencies.USDBDT = {flag:'../currencyConverter/images/flags/bdt.png', currency:'BDT - Bangladeshi Taka',symbol:'৳', amount:$scope.names.USDBDT, id:'bdt'};
					$rootScope.checkBDT = true;
				}else{
				    delete $rootScope.currencies.USDBDT;
					$rootScope.checkBDT = false;
				}		
			}else if(list == 'bif'){
			    $rootScope.BIF = ($rootScope.BIF + 1)%2;
				if($rootScope.BIF == 0){
					$rootScope.currencies.USDBIF = {flag:'../currencyConverter/images/flags/bif.png', currency:'BIF - Burundian Franc',symbol:'FBu', amount:$scope.names.USDBIF, id:'bif'};
					$rootScope.checkBIF = true;
				}else{
				    delete $rootScope.currencies.USDBIF;
					$rootScope.checkBIF = false;
				}					
			}else if(list == 'bhd'){
			    $rootScope.BHD = ($rootScope.BHD + 1)%2;
				if($rootScope.BHD == 0){
					$rootScope.currencies.USDBHD = {flag:'../currencyConverter/images/flags/bhd.png', currency:'BHD - Bahraini Dinar',symbol:'.د.ب', amount:$scope.names.USDBHD, id:'bhd'};
					$rootScope.checkBHD = true;
				}else{
				    delete $rootScope.currencies.USDBHD;
					$rootScope.checkBHD = false;
				}	
			}else if(list == 'bmd'){
			    $rootScope.BMD = ($rootScope.BMD + 1)%2;
				if($rootScope.BMD == 0){
					$rootScope.currencies.USDBMD = {flag:'../currencyConverter/images/flags/bmd.png', currency:'BMD - Bermudan Dollar',symbol:'$', amount:$scope.names.USDBMD, id:'bmd'};
					$rootScope.checkBMD = true;
				}else{
				    delete $rootScope.currencies.USDBMD;
					$rootScope.checkBMD = false;
				}	
			}else if(list == 'bnd'){
			    $rootScope.BND = ($rootScope.BND + 1)%2;
				if($rootScope.BND == 0){
					$rootScope.currencies.USDBND = {flag:'../currencyConverter/images/flags/bnd.png', currency:'BND - Brunei Dollar',symbol:'$', amount:$scope.names.USDBND, id:'bnd'};
					$rootScope.checkBND = true;
				}else{
				    delete $rootScope.currencies.USDBND;
					$rootScope.checkBND = false;
				}	
			}else if(list == 'bob'){
			    $rootScope.BOB = ($rootScope.BOB + 1)%2;
				if($rootScope.BOB == 0){
					$rootScope.currencies.USDBOB = {flag:'../currencyConverter/images/flags/bob.png', currency:'BOB - Bolivian Boliviano',symbol:'$b', amount:$scope.names.USDBOB, id:'bob'};
					$rootScope.checkBOB = true;
				}else{
				    delete $rootScope.currencies.USDBOB;
					$rootScope.checkBOB = false;
				}	
			}else if(list == 'bsd'){
			    $rootScope.BSD = ($rootScope.BSD + 1)%2;
				if($rootScope.BSD == 0){
					$rootScope.currencies.USDBSD = {flag:'../currencyConverter/images/flags/bsd.png', currency:'BSD - Bahamian Dollar',symbol:'$', amount:$scope.names.USDBSD, id:'bsd'};
					$rootScope.checkBSD = true;
				}else{
				    delete $rootScope.currencies.USDBSD;
					$rootScope.checkBSD = false;
				}	
			}else if(list == 'btc'){
			    $rootScope.BTC = ($rootScope.BTC + 1)%2;
				if($rootScope.BTC == 0){
					$rootScope.currencies.USDBTC = {flag:'../currencyConverter/images/flags/btc.png', currency:'BTC - Bitcoin',sym:'../currencyConverter/images/symbols/btc.png', amount:$scope.names.USDBTC, id:'btc'};
					$rootScope.checkBTC = true;
				}else{
				    delete $rootScope.currencies.USDBTC;
					$rootScope.checkBTC = false;
				}	
			}else if(list == 'btn'){
			    $rootScope.BTN = ($rootScope.BTN + 1)%2;
				if($rootScope.BTN == 0){
					$rootScope.currencies.USDBTN = {flag:'../currencyConverter/images/flags/btn.png', currency:'BTN - Bhutanese Ngultrum',symbol:'Nu.', amount:$scope.names.USDBTN, id:'btn'};
					$rootScope.checkBTN = true;
				}else{
				    delete $rootScope.currencies.USDBTN;
					$rootScope.checkBTN = false;
				}	
			}else if(list == 'bwp'){
			    $rootScope.BWP = ($rootScope.BWP + 1)%2;
				if($rootScope.BWP == 0){
					$rootScope.currencies.USDBWP = {flag:'../currencyConverter/images/flags/bwp.png', currency:'BWP - Botswanan Pula',symbol:'P', amount:$scope.names.USDBWP, id:'bwp'};
					$rootScope.checkBWP = true;
				}else{
				    delete $rootScope.currencies.USDBWP;
					$rootScope.checkBWP = false;
				}	
			}else if(list == 'byr'){
			    $rootScope.BYR = ($rootScope.BYR + 1)%2;
				if($rootScope.BYR == 0){
					$rootScope.currencies.USDBYR = {flag:'../currencyConverter/images/flags/byr.png', currency:'BYR - Belarusian Ruble',symbol:'p.', amount:$scope.names.USDBYR, id:'byr'};
					$rootScope.checkBYR = true;
				}else{
				    delete $rootScope.currencies.USDBYR;
					$rootScope.checkBYR = false;
				}		
			}else if(list == 'bzd'){
			    $rootScope.BZD = ($rootScope.BZD + 1)%2;
				if($rootScope.BZD == 0){
					$rootScope.currencies.USDBZD = {flag:'../currencyConverter/images/flags/bzd.png', currency:'BZD - Belize Dollar',symbol:'BZ$', amount:$scope.names.USDBZD, id:'bzd'};
					$rootScope.checkBZD = true;
				}else{
				    delete $rootScope.currencies.USDBZD;
					$rootScope.checkBZD = false;
				}	
			}else if(list == 'cdf'){
			    $rootScope.CDF = ($rootScope.CDF + 1)%2;
				if($rootScope.CDF == 0){
					$rootScope.currencies.USDCDF = {flag:'../currencyConverter/images/flags/cdf.png', currency:'CDF - Congolese Franc',symbol:'FC', amount:$scope.names.USDCDF, id:'cdf'};
					$rootScope.checkCDF = true;
				}else{
				    delete $rootScope.currencies.USDCDF;
					$rootScope.checkCDF = false;
				}	
			}else if(list == 'clf'){
			    $rootScope.CLF = ($rootScope.CLF + 1)%2;
				if($rootScope.CLF == 0){
					$rootScope.currencies.USDCLF = {flag:'../currencyConverter/images/flags/clp.png', currency:'CLF - Chilean Unit of Account (UF)',symbol:'UF', amount:$scope.names.USDCLF, id:'clf'};
					$rootScope.checkCLF = true;
				}else{
				    delete $rootScope.currencies.USDCLF;
					$rootScope.checkCLF = false;
				}	
			}else if(list == 'clp'){
			    $rootScope.CLP = ($rootScope.CLP + 1)%2;
				if($rootScope.CLP == 0){
					$rootScope.currencies.USDCLP = {flag:'../currencyConverter/images/flags/clp.png', currency:'CLP - Chilean Peso',symbol:'$', amount:$scope.names.USDCLP, id:'clp'};
					$rootScope.checkCLP = true;
				}else{
				    delete $rootScope.currencies.USDCLP;
					$rootScope.checkCLP = false;
				}	
			}else if(list == 'cop'){
			    $rootScope.COP = ($rootScope.COP + 1)%2;
				if($rootScope.COP == 0){
					$rootScope.currencies.USDCOP = {flag:'../currencyConverter/images/flags/cop.png', currency:'COP - Colombian Peso',symbol:'$', amount:$scope.names.USDCOP, id:'cop'};
					$rootScope.checkCOP = true;
				}else{
				    delete $rootScope.currencies.USDCOP;
					$rootScope.checkCOP = false;
				}	/*****************************************************************************************************************************************************************/
			}else if(list == 'crc'){
			    $rootScope.CRC = ($rootScope.CRC + 1)%2;
				if($rootScope.CRC == 0){
					$rootScope.currencies.USDCRC = {flag:'../currencyConverter/images/flags/crc.png', currency:'CRC - Costa Rican Colón',symbol:'₡', amount:$scope.names.USDCRC, id:'crc'};
					$rootScope.checkCRC = true;
				}else{
				    delete $rootScope.currencies.USDCRC;
					$rootScope.checkCRC = false;
				}	
			}else if(list == 'cuc'){
			    $rootScope.CUC = ($rootScope.CUC + 1)%2;
				if($rootScope.CUC == 0){
					$rootScope.currencies.USDCUC = {flag:'../currencyConverter/images/flags/cuc.png', currency:'CUC - Cuban Convertible Peso',symbol:'CUC$.', amount:$scope.names.USDCUC, id:'cuc'};
					$rootScope.checkCUC = true;
				}else{
				    delete $rootScope.currencies.USDCUC;
					$rootScope.checkCUC = false;
				}		
			}else if(list == 'cup'){
			    $rootScope.CUP = ($rootScope.CUP + 1)%2;
				if($rootScope.CUP == 0){
					$rootScope.currencies.USDCUP = {flag:'../currencyConverter/images/flags/cuc.png', currency:'CUP - Cuban Peso',symbol:'₱', amount:$scope.names.USDCUP, id:'cup'};
					$rootScope.checkCUP = true;
				}else{
				    delete $rootScope.currencies.USDCUP;
					$rootScope.checkCUP = false;
				}	
			}else if(list == 'cve'){
			    $rootScope.CVE = ($rootScope.CVE + 1)%2;
				if($rootScope.CVE == 0){
					$rootScope.currencies.USDCVE = {flag:'../currencyConverter/images/flags/cve.png', currency:'CVE - Cape Verdean Escudo',symbol:'Esc', amount:$scope.names.USDCVE, id:'cve'};
					$rootScope.checkCVE = true;
				}else{
				    delete $rootScope.currencies.USDCVE;
					$rootScope.checkCVE = false;
				}	
			}else if(list == 'djf'){
			    $rootScope.DJF = ($rootScope.DJF + 1)%2;
				if($rootScope.DJF == 0){
					$rootScope.currencies.USDDJF = {flag:'../currencyConverter/images/flags/djf.png', currency:'DJF - Djiboutian Franc',symbol:'Fdj', amount:$scope.names.USDDJF, id:'djf'};
					$rootScope.checkDJF = true;
				}else{
				    delete $rootScope.currencies.USDDJF;
					$rootScope.checkDJF = false;
				}	
			}else if(list == 'dop'){
			    $rootScope.DOP = ($rootScope.DOP + 1)%2;
				if($rootScope.DOP == 0){
					$rootScope.currencies.USDDOP = {flag:'../currencyConverter/images/flags/dop.png', currency:'DOP - Dominican Peso',symbol:'RD$', amount:$scope.names.USDDOP, id:'dop'};
					$rootScope.checkDOP = true;
				}else{
				    delete $rootScope.currencies.USDDOP;
					$rootScope.checkDOP = false;
				}	
			}else if(list == 'dzd'){
			    $rootScope.DZD = ($rootScope.DZD + 1)%2;
				if($rootScope.DZD == 0){
					$rootScope.currencies.USDDZD = {flag:'../currencyConverter/images/flags/dzd.png', currency:'DZD - Algerian Dinar',symbol:'دج', amount:$scope.names.USDDZD, id:'dzd'};
					$rootScope.checkDZD = true;
				}else{
				    delete $rootScope.currencies.USDDZD;
					$rootScope.checkDZD = false;
				}	
			}else if(list == 'eek'){
			    $rootScope.EEK = ($rootScope.EEK + 1)%2;
				if($rootScope.EEK == 0){
					$rootScope.currencies.USDEEK = {flag:'../currencyConverter/images/flags/eek.png', currency:'EEK - Estonian Kroon',symbol:'kr', amount:$scope.names.USDEEK, id:'eek'};
					$rootScope.checkEEK = true;
				}else{
				    delete $rootScope.currencies.USDEEK;
					$rootScope.checkEEK = false;
				}	
			}else if(list == 'egp'){
			    $rootScope.EGP = ($rootScope.EGP + 1)%2;
				if($rootScope.EGP == 0){
					$rootScope.currencies.USDEGP = {flag:'../currencyConverter/images/flags/egp.png', currency:'EGP - Egyptian Pound',symbol:'ج.م.', amount:$scope.names.USDEGP, id:'egp'};
					$rootScope.checkEGP = true;
				}else{
				    delete $rootScope.currencies.USDEGP;
					$rootScope.checkEGP = false;
				}	
			}else if(list == 'ern'){
			    $rootScope.ERN = ($rootScope.ERN + 1)%2;
				if($rootScope.ERN == 0){
					$rootScope.currencies.USDERN = {flag:'../currencyConverter/images/flags/ern.png', currency:'ERN - Eritrean Nakfa',symbol:'Nfk', amount:$scope.names.USDERN, id:'ern'};
					$rootScope.checkERN = true;
				}else{
				    delete $rootScope.currencies.USDERN;
					$rootScope.checkERN = false;
				}	
			}else if(list == 'etb'){
			    $rootScope.ETB = ($rootScope.ETB + 1)%2;
				if($rootScope.ETB == 0){
					$rootScope.currencies.USDETB = {flag:'../currencyConverter/images/flags/etb.png', currency:'ETB - Ethiopian Birr',symbol:'Br', amount:$scope.names.USDETB, id:'etb'};
					$rootScope.checkETB = true;
				}else{
				    delete $rootScope.currencies.USDETB;
					$rootScope.checkETB = false;
				}	
			}else if(list == 'fjd'){
			    $rootScope.FJD = ($rootScope.FJD + 1)%2;
				if($rootScope.FJD == 0){
					$rootScope.currencies.USDFJD = {flag:'../currencyConverter/images/flags/fjd.png', currency:'FJD - Fijian Dollar',symbol:'$', amount:$scope.names.USDFJD, id:'fjd'};
					$rootScope.checkFJD = true;
				}else{
				    delete $rootScope.currencies.USDFJD
					$rootScope.checkFJD = false;
				}	/**************************************************************************************************************************************************************/
			}else if(list == 'fkp'){
			    $rootScope.FKP = ($rootScope.FKP + 1)%2;
				if($rootScope.FKP == 0){
					$rootScope.currencies.USDFKP = {flag:'../currencyConverter/images/flags/fkp.png', currency:'FKP - Falkland Islands Pound',symbol:'£', amount:$scope.names.USDFKP, id:'fkp'};
					$rootScope.checkFKP = true;
				}else{
				    delete $rootScope.currencies.USDFKP;
					$rootScope.checkFKP = false;
				}	
			}else if(list == 'gel'){
			    $rootScope.GEL = ($rootScope.GEL + 1)%2;
				if($rootScope.GEL == 0){
					$rootScope.currencies.USDGEL = {flag:'../currencyConverter/images/flags/gel.png', currency:'GEL - Georgian Lari',sym:'../currencyConverter/images/symbols/gel.png', amount:$scope.names.USDGEL, id:'gel'};
					$rootScope.checkGEL = true;
				}else{
				    delete $rootScope.currencies.USDGEL;
					$rootScope.checkGEL = false;
				}	
			}else if(list == 'ggp'){
			    $rootScope.GGP = ($rootScope.GGP + 1)%2;
				if($rootScope.GGP == 0){
					$rootScope.currencies.USDGGP = {flag:'../currencyConverter/images/flags/ggp.png', currency:'GGP - Guernsey Pound',symbol:'£', amount:$scope.names.USDGGP, id:'ggp'};
					$rootScope.checkGGP = true;
				}else{
				    delete $rootScope.currencies.USDGGP;
					$rootScope.checkGGP = false;
				}	
			}else if(list == 'ghs'){
			    $rootScope.GHS = ($rootScope.GHS + 1)%2;
				if($rootScope.GHS == 0){
					$rootScope.currencies.USDGHS = {flag:'../currencyConverter/images/flags/ghs.png', currency:'GHS - Ghanaian Cedi',symbol:'GH¢', amount:$scope.names.USDGHS, id:'ghs'};
					$rootScope.checkGHS = true;
				}else{
				    delete $rootScope.currencies.USDGHS;
					$rootScope.checkGHS = false;
				}	
			}else if(list == 'gip'){
			    $rootScope.GIP = ($rootScope.GIP + 1)%2;
				if($rootScope.GIP == 0){
					$rootScope.currencies.USDGIP = {flag:'../currencyConverter/images/flags/gip.png', currency:'GIP - Gibraltar Pound',symbol:'£', amount:$scope.names.USDGIP, id:'gip'};
					$rootScope.checkGIP = true;
				}else{
				    delete $rootScope.currencies.USDGIP;
					$rootScope.checkGIP = false;
				}		
			}else if(list == 'gmd'){
			    $rootScope.GMD = ($rootScope.GMD + 1)%2;
				if($rootScope.GMD == 0){
					$rootScope.currencies.USDGMD = {flag:'../currencyConverter/images/flags/gmd.png', currency:'GMD - Gambian Dalasi',symbol:'D', amount:$scope.names.USDGMD, id:'gmd'};
					$rootScope.checkGMD = true;
				}else{
				    delete $rootScope.currencies.USDGMD;
					$rootScope.checkGMD = false;
				}	
			}else if(list == 'gnf'){
			    $rootScope.GNF = ($rootScope.GNF + 1)%2;
				if($rootScope.GNF == 0){
					$rootScope.currencies.USDGNF = {flag:'../currencyConverter/images/flags/gnf.png', currency:'GNF - Guinean Franc',symbol:'FG', amount:$scope.names.USDGNF, id:'gnf'};
					$rootScope.checkGNF = true;
				}else{
				    delete $rootScope.currencies.USDGNF;
					$rootScope.checkGNF = false;
				}	
			}else if(list == 'gtq'){
			    $rootScope.GTQ = ($rootScope.GTQ + 1)%2;
				if($rootScope.GTQ == 0){
					$rootScope.currencies.USDGTQ = {flag:'../currencyConverter/images/flags/gtq.png', currency:'GTQ - Guatemalan Quetzal',symbol:'Q', amount:$scope.names.USDGTQ, id:'gtq'};
					$rootScope.checkGTQ = true;
				}else{
				    delete $rootScope.currencies.USDGTQ;
					$rootScope.checkGTQ = false;
				}	
			}else if(list == 'gyd'){
			    $rootScope.GYD = ($rootScope.GYD + 1)%2;
				if($rootScope.GYD == 0){
					$rootScope.currencies.USDGYD = {flag:'../currencyConverter/images/flags/gyd.png', currency:'GYD - Guyanaese Dollar',symbol:'$', amount:$scope.names.USDGYD, id:'gyd'};
					$rootScope.checkGYD = true;
				}else{
				    delete $rootScope.currencies.USDGYD;
					$rootScope.checkGYD = false;
				}	
			}else if(list == 'hkd'){
			    $rootScope.HKD = ($rootScope.HKD + 1)%2;
				if($rootScope.HKD == 0){
					$rootScope.currencies.USDHKD = {flag:'../currencyConverter/images/flags/hkd.png', currency:'HKD - Hong Kong Dollar',symbol:'$', amount:$scope.names.USDHKD, id:'hkd'};
					$rootScope.checkHKD = true;
				}else{
				    delete $rootScope.currencies.USDHKD;
					$rootScope.checkHKD = false;
				}	
			}else if(list == 'hnl'){
			    $rootScope.HNL = ($rootScope.HNL + 1)%2;
				if($rootScope.HNL == 0){
					$rootScope.currencies.USDHNL = {flag:'../currencyConverter/images/flags/hnl.png', currency:'HNL - Honduran Lempira',symbol:'L', amount:$scope.names.USDHNL, id:'hnl'};
					$rootScope.checkHNL = true;
				}else{
				    delete $rootScope.currencies.USDHNL;
					$rootScope.checkHNL = false;
				}	
			}else if(list == 'hrk'){
			    $rootScope.HRK = ($rootScope.HRK + 1)%2;
				if($rootScope.HRK == 0){
					$rootScope.currencies.USDHRK = {flag:'../currencyConverter/images/flags/hrk.png', currency:'HRK - Croatian Kuna',symbol:'kn', amount:$scope.names.USDHRK, id:'hrk'};
					$rootScope.checkHRK = true;
				}else{
				    delete $rootScope.currencies.USDHRK;
					$rootScope.checkHRK = false;
				}	
			}else if(list == 'htg'){
			    $rootScope.HTG = ($rootScope.HTG + 1)%2;
				if($rootScope.HTG == 0){
					$rootScope.currencies.USDHTG = {flag:'../currencyConverter/images/flags/htg.png', currency:'HTG - Haitian Gourde',symbol:'G', amount:$scope.names.USDHTG, id:'htg'};
					$rootScope.checkHTG = true;
                }else{
				    delete $rootScope.currencies.USDHTG;
					$rootScope.checkHTG = false;
				}
			}else if(list == 'ils'){
			    $rootScope.ILS = ($rootScope.ILS + 1)%2;
				if($rootScope.ILS == 0){
					$rootScope.currencies.USDILS = {flag:'../currencyConverter/images/flags/ils.png', currency:'ILS - Israeli New Sheqel',symbol:'₪', amount:$scope.names.USDILS, id:'ils'};
					$rootScope.checkILS = true;
				}else{
				    delete $rootScope.currencies.USDILS;
					$rootScope.checkILS = false;
				}	
			}else if(list == 'imp'){
			    $rootScope.IMP = ($rootScope.IMP + 1)%2;
				if($rootScope.IMP == 0){
					$rootScope.currencies.USDIMP = {flag:'../currencyConverter/images/flags/imp.png', currency:'IMP - Manx pound',symbol:'£', amount:$scope.names.USDIMP, id:'imp'};
					$rootScope.checkIMP = true;
				}else{
				    delete $rootScope.currencies.USDIMP;
					$rootScope.checkIMP = false;
				}	
			}else if(list == 'iqd'){
			    $rootScope.IQD = ($rootScope.IQD + 1)%2;
				if($rootScope.IQD  == 0){
					$rootScope.currencies.USDIQD = {flag:'../currencyConverter/images/flags/iqd.png', currency:'IQD - Iraqi Dinar',symbol:'د.ع', amount:$scope.names.USDIQD, id:'iqd'};
					$rootScope.checkIQD = true;
				}else{
				    delete $rootScope.currencies.USDIQD ;
					$rootScope.checkIQD  = false;
				}		
			}else if(list == 'irr'){
			    $rootScope.IRR = ($rootScope.IRR + 1)%2;
				if($rootScope.IRR == 0){
					$rootScope.currencies.USDIRR = {flag:'../currencyConverter/images/flags/irr.png', currency:'IRR - Iranian Rial',symbol:'﷼', amount:$scope.names.USDIRR, id:'irr'};
					$rootScope.checkIRR = true;
				}else{
				    delete $rootScope.currencies.USDIRR;
					$rootScope.checkIRR = false;
				}	
			}else if(list == 'isk'){
			    $rootScope.ISK = ($rootScope.ISK + 1)%2;
				if($rootScope.ISK == 0){
					$rootScope.currencies.USDISK = {flag:'../currencyConverter/images/flags/isk.png', currency:'ISK - Icelandic Króna',symbol:'kr', amount:$scope.names.USDISK, id:'isk'};
					$rootScope.checkISK = true;
				}else{
				    delete $rootScope.currencies.USDISK;
					$rootScope.checkISK = false;
				}	
			}else if(list == 'jep'){
			    $rootScope.JEP = ($rootScope.JEP + 1)%2;
				if($rootScope.JEP == 0){
					$rootScope.currencies.USDJEP = {flag:'../currencyConverter/images/flags/rub.png', currency:'JEP - Jersey Pound',symbol:'£', amount:$scope.names.USDJEP, id:'jep'};
					$rootScope.checkJEP = true;
				}else{
				    delete $rootScope.currencies.USDJEP;
					$rootScope.checkJEP = false;
				}	
			}else if(list == 'jmd'){
			    $rootScope.JMD = ($rootScope.JMD + 1)%2;
				if($rootScope.JMD == 0){
					$rootScope.currencies.USDJMD = {flag:'../currencyConverter/images/flags/jmd.png', currency:'JMD - Jamaican Dollar',symbol:'J$', amount:$scope.names.USDJMD, id:'jmd'};
					$rootScope.checkJMD = true;
				}else{
				    delete $rootScope.currencies.USDJMD;
					$rootScope.checkJMD = false;
				}	
			}else if(list == 'jod'){
			    $rootScope.JOD = ($rootScope.JOD + 1)%2;
				if($rootScope.JOD == 0){
					$rootScope.currencies.USDJOD = {flag:'../currencyConverter/images/flags/jod.png', currency:'JOD - Jordanian Dinar',symbol:'JD', amount:$scope.names.USDJOD, id:'jod'};
					$rootScope.checkJOD = true;
				}else{
				    delete $rootScope.currencies.USDJOD;
					$rootScope.checkJOD = false;
				}	
			}else if(list == 'kes'){
			    $rootScope.KES = ($rootScope.KES + 1)%2;
				if($rootScope.KES == 0){
					$rootScope.currencies.USDKES = {flag:'../currencyConverter/images/flags/kes.png', currency:'KES - Kenyan Shilling',symbol:'Ksh', amount:$scope.names.USDKES, id:'kes'};
					$rootScope.checkKES = true;
				}else{
				    delete $rootScope.currencies.USDKES;
					$rootScope.checkKES = false;
				}		
			}else if(list == 'kgs'){
			    $rootScope.KGS = ($rootScope.KGS + 1)%2;
				if($rootScope.KGS == 0){
					$rootScope.currencies.USDKGS = {flag:'../currencyConverter/images/flags/kgs.png', currency:'KGS - Kyrgystani Som',symbol:'лв', amount:$scope.names.USDKGS, id:'kgs'};
					$rootScope.checkKGS = true;
				}else{
				    delete $rootScope.currencies.USDKGS;
					$rootScope.checkKGS = false;
				}		
			}else if(list == 'khr'){
			    $rootScope.KHR = ($rootScope.KHR + 1)%2;
				if($rootScope.KHR == 0){
					$rootScope.currencies.USDKHR = {flag:'../currencyConverter/images/flags/khr.png', currency:'KHR - Cambodian Riel',sym:'../currencyConverter/images/symbols/khr.gif', amount:$scope.names.USDKHR, id:'khr'};
					$rootScope.checkKHR = true;
				}else{
				    delete $rootScope.currencies.USDKHR;
					$rootScope.checkKHR = false;
				}	
			}else if(list == 'kmf'){
			    $rootScope.KMF = ($rootScope.KMF + 1)%2;
				if($rootScope.KMF == 0){
					$rootScope.currencies.USDKMF = {flag:'../currencyConverter/images/flags/kmf.png', currency:'KMF - Comorian Franc',symbol:'CF', amount:$scope.names.USDKMF, id:'kmf'};
					$rootScope.checkKMF = true;
				}else{
				    delete $rootScope.currencies.USDKMF;
					$rootScope.checkKMF = false;
				}	
			}else if(list == 'kpw'){
			    $rootScope.KPW = ($rootScope.KPW + 1)%2;
				if($rootScope.KPW == 0){
					$rootScope.currencies.USDKPW = {flag:'../currencyConverter/images/flags/kpw.png', currency:'KPW - North Korean Won',symbol:'₩', amount:$scope.names.USDKPW, id:'kpw'};
					$rootScope.checkKPW = true;
				}else{
				    delete $rootScope.currencies.USDKPW;
					$rootScope.checkKPW = false;
				}		
			}else if(list == 'kwd'){
			    $rootScope.KWD = ($rootScope.KWD + 1)%2;
				if($rootScope.KWD == 0){
					$rootScope.currencies.USDKWD = {flag:'../currencyConverter/images/flags/kwd.png', currency:'KWD - Kuwaiti Dinar',symbol:'د.ك', amount:$scope.names.USDKWD, id:'kwd'};
					$rootScope.checkKWD = true;
				}else{
				    delete $rootScope.currencies.USDKWD;
					$rootScope.checkKWD = false;
				}	
			}else if(list == 'kyd'){
			    $rootScope.KYD = ($rootScope.KYD + 1)%2;
				if($rootScope.KYD == 0){
					$rootScope.currencies.USDKYD = {flag:'../currencyConverter/images/flags/kyd.png', currency:'KYD - Cayman Islands Dollar',symbol:'$', amount:$scope.names.USDKYD, id:'kyd'};
					$rootScope.checkKYD = true;
				}else{
				    delete $rootScope.currencies.USDKYD;
					$rootScope.checkKYD = false;
				}	
			}else if(list == 'kzt'){
			    $rootScope.KZT = ($rootScope.KZT + 1)%2;
				if($rootScope.KZT == 0){
					$rootScope.currencies.USDKZT = {flag:'../currencyConverter/images/flags/kzt.png', currency:'KZT - Kazakhstani Tenge',symbol:'лв', amount:$scope.names.USDKZT, id:'kzt'};
					$rootScope.checkKZT = true;
				}else{
				    delete $rootScope.currencies.USDKZT;
					$rootScope.checkKZT = false;
				}	
			}else if(list == 'lak'){
			    $rootScope.LAK = ($rootScope.LAK + 1)%2;
				if($rootScope.LAK == 0){
					$rootScope.currencies.USDLAK = {flag:'../currencyConverter/images/flags/lak.png', currency:'LAK - Laotian Kip',symbol:'₭', amount:$scope.names.USDLAK, id:'lak'};
					$rootScope.checkLAK = true; 
				}else{
				    delete $rootScope.currencies.USDLAK;
					$rootScope.checkLAK = false;
				}	
			}else if(list == 'lbp'){
			    $rootScope.LBP = ($rootScope.LBP + 1)%2;
				if($rootScope.LBP == 0){
					$rootScope.currencies.USDLBP = {flag:'../currencyConverter/images/flags/lbp.png', currency:'LBP - Lebanese Pound',symbol:'LL', amount:$scope.names.USDLBP, id:'lbp'};
					$rootScope.checkLBP = true;
				}else{
				    delete $rootScope.currencies.USDLBP;
					$rootScope.checkLBP = false;
				}	
			}else if(list == 'lkr'){
			    $rootScope.LKR = ($rootScope.LKR + 1)%2;
				if($rootScope.LKR == 0){
					$rootScope.currencies.USDLKR = {flag:'../currencyConverter/images/flags/lkr.png', currency:'LKR - Sri Lankan Rupee',symbol:'Rs', amount:$scope.names.USDLKR, id:'lkr'};
					$rootScope.checkLKR = true;
				}else{
				    delete $rootScope.currencies.USDLKR;
					$rootScope.checkLKR = false;
				}	
			}else if(list == 'lrd'){
			    $rootScope.LRD = ($rootScope.LRD + 1)%2;
				if($rootScope.LRD == 0){
					$rootScope.currencies.USDLRD = {flag:'../currencyConverter/images/flags/lrd.png', currency:'LRD - Liberian Dollar',symbol:'$', amount:$scope.names.USDLRD, id:'lrd'};
					$rootScope.checkLRD = true;
				}else{
				    delete $rootScope.currencies.USDLRD;
					$rootScope.checkLRD = false;
				}	
			}else if(list == 'lsl'){
			    $rootScope.LSL = ($rootScope.LSL + 1)%2;
				if($rootScope.LSL == 0){
					$rootScope.currencies.USDLSL = {flag:'../currencyConverter/images/flags/lsl.png', currency:'LSL - Lesotho Loti',symbol:'M', amount:$scope.names.USDLSL, id:'lsl'};
					$rootScope.checkLSL = true;
				}else{
				    delete $rootScope.currencies.USDLSL;
					$rootScope.checkLSL = false;
				}
			}else if(list == 'ltl'){
			    $rootScope.LTL = ($rootScope.LTL + 1)%2;
				if($rootScope.LTL == 0){
					$rootScope.currencies.USDLTL = {flag:'../currencyConverter/images/flags/ltl.png', currency:'LTL - Lithuanian Litas',symbol:'Lt', amount:$scope.names.USDLTL, id:'ltl'};
					$rootScope.checkLTL = true;
				}else{
				    delete $rootScope.currencies.USDLTL;
					$rootScope.checkLTL = false;
				}	
			}else if(list == 'lvl'){
			    $rootScope.LVL = ($rootScope.LVL + 1)%2;
				if($rootScope.LVL  == 0){
					$rootScope.currencies.USDLVL = {flag:'../currencyConverter/images/flags/lvl.png', currency:'LVL - Latvian Lats',symbol:'Ls', amount:$scope.names.USDLVL, id:'lvl'};
					$rootScope.checkLVL = true;
				}else{
				    delete $rootScope.currencies.USDLVL ;
					$rootScope.checkLVL  = false;
				}	
			}else if(list == 'lyd'){
			    $rootScope.LYD = ($rootScope.LYD + 1)%2;
				if($rootScope.LYD == 0){
					$rootScope.currencies.USDLYD = {flag:'../currencyConverter/images/flags/lyd.png', currency:'LYD - Libyan Dinar',symbol:'ل.د', amount:$scope.names.USDLYD, id:'lyd'};
					$rootScope.checkLYD = true;
				}else{
				    delete $rootScope.currencies.USDLYD;
					$rootScope.checkLYD = false;
				}	
			}else if(list == 'mad'){
			    $rootScope.MAD = ($rootScope.MAD + 1)%2;
				if($rootScope.MAD == 0){
					$rootScope.currencies.USDMAD = {flag:'../currencyConverter/images/flags/mad.png', currency:'MAD - Moroccan Dirham',symbol:'د.م.', amount:$scope.names.USDMAD, id:'mad'};
					$rootScope.checkMAD = true;
				}else{
				    delete $rootScope.currencies.USDMAD;
					$rootScope.checkMAD = false;
				}	
			}else if(list == 'mdl'){
			    $rootScope.MDL = ($rootScope.MDL + 1)%2;
				if($rootScope.MDL == 0){
					$rootScope.currencies.USDMDL = {flag:'../currencyConverter/images/flags/mdl.png', currency:'MDL - Moldovan Leu',symbol:'', amount:$scope.names.USDMDL, id:'mdl'};
					$rootScope.checkMDL = true;
				}else{
				    delete $rootScope.currencies.USDMDL;
					$rootScope.checkMDL = false;
				}	
			}else if(list == 'mga'){
			    $rootScope.MGA = ($rootScope.MGA + 1)%2;
				if($rootScope.MGA == 0){
					$rootScope.currencies.USDMGA = {flag:'../currencyConverter/images/flags/mga.png', currency:'MGA - Malagasy Ariary',symbol:'Ar', amount:$scope.names.USDMGA, id:'mga'};
					$rootScope.checkMGA = true;
				}else{
				    delete $rootScope.currencies.USDMGA;
					$rootScope.checkMGA = false;
				}	
			}else if(list == 'mkd'){
			    $rootScope.MKD = ($rootScope.MKD + 1)%2;
				if($rootScope.MKD == 0){
					$rootScope.currencies.USDMKD = {flag:'../currencyConverter/images/flags/mkd.png', currency:'MKD - Macedonian Denar',symbol:'ден', amount:$scope.names.USDMKD, id:'mkd'};
					$rootScope.checkMKD = true;
				}else{
				    delete $rootScope.currencies.USDMKD;
					$rootScope.checkMKD = false;
				}	
			}else if(list == 'mmk'){
			    $rootScope.MMK = ($rootScope.MMK + 1)%2;
				if($rootScope.MMK == 0){
					$rootScope.currencies.USDMMK = {flag:'../currencyConverter/images/flags/mmk.png', currency:'MMK - Myanma Kyat',symbol:'K', amount:$scope.names.USDMMK, id:'mmk'};
					$rootScope.checkMMK = true;
				}else{
				    delete $rootScope.currencies.USDMMK;
					$rootScope.checkMMK = false;
				}	
			}else if(list == 'mnt'){
			    $rootScope.MNT = ($rootScope.MNT + 1)%2;
				if($rootScope.MNT == 0){
					$rootScope.currencies.USDMNT = {flag:'../currencyConverter/images/flags/mnt.png', currency:'MNT - Mongolian Tugrik',symbol:'₮', amount:$scope.names.USDMNT, id:'mnt'};
					$rootScope.checkMNT = true;
				}else{
				    delete $rootScope.currencies.USDMNT;
					$rootScope.checkMNT = false;
				}		
			}else if(list == 'mop'){
			    $rootScope.MOP = ($rootScope.MOP + 1)%2;
				if($rootScope.MOP == 0){
					$rootScope.currencies.USDMOP = {flag:'../currencyConverter/images/flags/mop.png', currency:'MOP - Macanese Pataca',symbol:'MOP$', amount:$scope.names.USDMOP, id:'mop'};
					$rootScope.checkMOP = true;
				}else{
				    delete $rootScope.currencies.USDMOP;
					$rootScope.checkMOP = false;
				}	
			}else if(list == 'mro'){
			    $rootScope.MRO = ($rootScope.MRO + 1)%2;
				if($rootScope.MRO == 0){
					$rootScope.currencies.USDMRO = {flag:'../currencyConverter/images/flags/mro.png', currency:'MRO - Mauritanian Ouguiya',symbol:'UM', amount:$scope.names.USDMRO, id:'mro'};
					$rootScope.checkMRO = true;
				}else{
				    delete $rootScope.currencies.USDMRO;
					$rootScope.checkMRO = false;
				}	
			}else if(list == 'mur'){
			    $rootScope.MUR = ($rootScope.MUR + 1)%2;
				if($rootScope.MUR == 0){
					$rootScope.currencies.USDMUR = {flag:'../currencyConverter/images/flags/mur.png', currency:'MUR - Mauritian Rupee',symbol:'Rs', amount:$scope.names.USDMUR, id:'mur'};
					$rootScope.checkMUR = true;
				}else{
				    delete $rootScope.currencies.USDMUR;
					$rootScope.checkMUR = false;
				}	
			}else if(list == 'mvr'){
			    $rootScope.MVR = ($rootScope.MVR + 1)%2;
				if($rootScope.MVR == 0){
					$rootScope.currencies.USDMVR = {flag:'../currencyConverter/images/flags/mvr.png', currency:'MVR - Maldivian Rufiyaa',symbol:'Rf.', amount:$scope.names.USDMVR, id:'mvr'};
					$rootScope.checkMVR = true;
				}else{
				    delete $rootScope.currencies.USDMVR;
					$rootScope.checkMVR = false;
				}	
			}else if(list == 'mwk'){
			    $rootScope.MWK = ($rootScope.MWK + 1)%2;
				if($rootScope.MWK == 0){
					$rootScope.currencies.USDMWK = {flag:'../currencyConverter/images/flags/mwk.png', currency:'MWK - Malawian Kwacha',symbol:'MK', amount:$scope.names.USDMWK, id:'mwk'};
					$rootScope.checkMWK = true;
				}else{
				    delete $rootScope.currencies.USDMWK;
					$rootScope.checkMWK = false;
				}	
			}else if(list == 'mzn'){
			    $rootScope.MZN = ($rootScope.MZN + 1)%2;
				if($rootScope.MZN == 0){
					$rootScope.currencies.USDMZN = {flag:'../currencyConverter/images/flags/mzn.png', currency:'MZN - Mozambican Metical',symbol:'MT', amount:$scope.names.USDMZN, id:'mzn'};
					$rootScope.checkMZN = true;
				}else{
				    delete $rootScope.currencies.USDMZN;
					$rootScope.checkMZN = false;
				}		
			}else if(list == 'nad'){
			    $rootScope.NAD = ($rootScope.NAD + 1)%2;
				if($rootScope.NAD == 0){
					$rootScope.currencies.USDNAD = {flag:'../currencyConverter/images/flags/nad.png', currency:'NAD - Namibian Dollar',symbol:'$', amount:$scope.names.USDNAD, id:'nad'};
					$rootScope.checkNAD = true;
				}else{
				    delete $rootScope.currencies.USDNAD;
					$rootScope.checkNAD = false;
				}			
			}else if(list == 'ngn'){
			    $rootScope.NGN = ($rootScope.NGN + 1)%2;
				if($rootScope.NGN == 0){
					$rootScope.currencies.USDNGN = {flag:'../currencyConverter/images/flags/ngn.png', currency:'NGN - Nigerian Naira',symbol:'₦', amount:$scope.names.USDNGN, id:'ngn'};
					$rootScope.checkNGN = true;
				}else{
				    delete $rootScope.currencies.USDNGN;
					$rootScope.checkNGN = false;
				}	
			}else if(list == 'nio'){
			    $rootScope.NIO = ($rootScope.NIO + 1)%2;
				if($rootScope.NIO == 0){
					$rootScope.currencies.USDNIO = {flag:'../currencyConverter/images/flags/nio.png', currency:'NIO - Nicaraguan Córdoba',symbol:'C$', amount:$scope.names.USDNIO, id:'nio'};
					$rootScope.checkNIO = true;
				}else{
				    delete $rootScope.currencies.USDNIO;
					$rootScope.checkNIO = false;
				}		
			}else if(list == 'npr'){
			    $rootScope.NPR = ($rootScope.NPR + 1)%2;
				if($rootScope.NPR == 0){
					$rootScope.currencies.USDNPR = {flag:'../currencyConverter/images/flags/npr.png', currency:'NPR - Nepalese Rupee',symbol:'	Rs', amount:$scope.names.USDNPR, id:'npr'};
					$rootScope.checkNPR = true;
				}else{
				    delete $rootScope.currencies.USDNPR;
					$rootScope.checkNPR = false;
				}	
			}else if(list == 'omr'){
			    $rootScope.OMR = ($rootScope.OMR + 1)%2;
				if($rootScope.OMR == 0){
					$rootScope.currencies.USDOMR = {flag:'../currencyConverter/images/flags/omr.png', currency:'OMR - Omani Rial',symbol:'ر.ع.', amount:$scope.names.USDOMR, id:'omr'};
					$rootScope.checkOMR = true;
				}else{
				    delete $rootScope.currencies.USDOMR;
					$rootScope.checkOMR = false;
				}	
			}else if(list == 'pab'){
			    $rootScope.PAB = ($rootScope.PAB + 1)%2;
				if($rootScope.PAB == 0){
					$rootScope.currencies.USDPAB = {flag:'../currencyConverter/images/flags/pab.png', currency:'PAB - Panamanian Balboa',symbol:'B/.', amount:$scope.names.USDPAB, id:'pab'};
					$rootScope.checkPAB = true;
				}else{
				    delete $rootScope.currencies.USDPAB;
					$rootScope.checkPAB = false;
				}	
			}else if(list == 'pen'){
			    $rootScope.PEN = ($rootScope.PEN + 1)%2;
				if($rootScope.PEN == 0){
					$rootScope.currencies.USDPEN = {flag:'../currencyConverter/images/flags/pen.png', currency:'PEN - Peruvian Nuevo Sol',symbol:'S/.', amount:$scope.names.USDPEN, id:'pen'};
					$rootScope.checkPEN = true;
				}else{
				    delete $rootScope.currencies.USDPEN;
					$rootScope.checkPEN = false;
				}	
			}else if(list == 'pgk'){
			    $rootScope.PGK = ($rootScope.PGK + 1)%2;
				if($rootScope.PGK == 0){
					$rootScope.currencies.USDPGK = {flag:'../currencyConverter/images/flags/pgk.png', currency:'PGK - Papua New Guinean Kina',symbol:'K', amount:$scope.names.USDPGK, id:'pgk'};
					$rootScope.checkPGK = true;
				}else{
				    delete $rootScope.currencies.USDPGK;
					$rootScope.checkPGK = false;
				}	
			}else if(list == 'pkr'){
			    $rootScope.PKR = ($rootScope.PKR + 1)%2;
				if($rootScope.PKR == 0){
					$rootScope.currencies.USDPKR = {flag:'../currencyConverter/images/flags/pkr.png', currency:'PKR - Pakistani Rupee',symbol:'Rs', amount:$scope.names.USDPKR, id:'pkr'};
					$rootScope.checkPKR = true;
				}else{
				    delete $rootScope.currencies.USDPKR;
					$rootScope.checkPKR = false;
				}	
			}else if(list == 'pyg'){
			    $rootScope.PYG = ($rootScope.PYG + 1)%2;
				if($rootScope.PYG == 0){
					$rootScope.currencies.USDPYG = {flag:'../currencyConverter/images/flags/pyg.png', currency:'PYG - Paraguayan Guarani',symbol:'₲', amount:$scope.names.USDPYG, id:'pyg'};
					$rootScope.checkPYG = true;
				}else{
				    delete $rootScope.currencies.USDPYG;
					$rootScope.checkPYG = false;
				}	
			}else if(list == 'qar'){
			    $rootScope.QAR = ($rootScope.QAR + 1)%2;
				if($rootScope.QAR == 0){
					$rootScope.currencies.USDQAR = {flag:'../currencyConverter/images/flags/qar.png', currency:'QAR - Qatari Rial',symbol:'ر.ق', amount:$scope.names.USDQAR, id:'qar'};
					$rootScope.checkQAR = true;
				}else{
				    delete $rootScope.currencies.USDQAR;
					$rootScope.checkQAR = false;
				}	
			}else if(list == 'ron'){
			    $rootScope.RON = ($rootScope.RON + 1)%2;
				if($rootScope.RON == 0){
					$rootScope.currencies.USDRON = {flag:'../currencyConverter/images/flags/ron.png', currency:'RON - Romanian Leu',symbol:'lei', amount:$scope.names.USDRON, id:'ron'};
					$rootScope.checkRON = true;
				}else{
				    delete $rootScope.currencies.USDRON;
					$rootScope.checkRON = false;
				}	
			}else if(list == 'rsd'){
			    $rootScope.RSD = ($rootScope.RSD + 1)%2;
				if($rootScope.RSD == 0){
					$rootScope.currencies.USDRSD = {flag:'../currencyConverter/images/flags/rsd.png', currency:'RSD - Serbian Dinar',symbol:'дин', amount:$scope.names.USDRSD, id:'rsd'};
					$rootScope.checkRSD = true;
				}else{
				    delete $rootScope.currencies.USDRSD;
					$rootScope.checkRSD = false;
				}	
			}else if(list == 'rwf'){
			    $rootScope.RWF = ($rootScope.RWF + 1)%2;
				if($rootScope.RWF == 0){
					$rootScope.currencies.USDRWF = {flag:'../currencyConverter/images/flags/rwf.png', currency:'RWF - Rwandan Franc',symbol:'FRw', amount:$scope.names.USDRWF, id:'rwf'};
					$rootScope.checkRWF = true;
				}else{
				    delete $rootScope.currencies.USDRWF;
					$rootScope.checkRWF = false;
				}
			}else if(list == 'sar'){
			    $rootScope.SAR = ($rootScope.SAR + 1)%2;
				if($rootScope.SAR == 0){
					$rootScope.currencies.USDSAR = {flag:'../currencyConverter/images/flags/sar.png', currency:'SAR - Saudi Riyal',symbol:'ر.س', amount:$scope.names.USDSAR, id:'sar'};
					$rootScope.checkSAR = true;
				}else{
				    delete $rootScope.currencies.USDSAR;
					$rootScope.checkSAR = false;
				}	
			}else if(list == 'sbd'){
			    $rootScope.SBD = ($rootScope.SBD + 1)%2;
				if($rootScope.SBD == 0){
					$rootScope.currencies.USDSBD = {flag:'../currencyConverter/images/flags/sbd.png', currency:'SBD - Solomon Islands Dollar',symbol:'$', amount:$scope.names.USDSBD, id:'sbd'};
					$rootScope.checkSBD = true;
				}else{
				    delete $rootScope.currencies.USDSBD;
					$rootScope.checkSBD = false;
				}	
			}else if(list == 'scr'){
			    $rootScope.SCR = ($rootScope.SCR + 1)%2;
				if($rootScope.SCR == 0){
					$rootScope.currencies.USDSCR  = {flag:'../currencyConverter/images/flags/scr.png', currency:'SCR - Seychellois Rupee',symbol:'SRe', amount:$scope.names.USDSCR , id:'scr'};
					$rootScope.checkSCR  = true;
				}else{
				    delete $rootScope.currencies.USDSCR;
					$rootScope.checkSCR = false;
				}	
			}else if(list == 'sdg'){
			    $rootScope.SDG = ($rootScope.SDG + 1)%2;
				if($rootScope.SDG == 0){
					$rootScope.currencies.USDSDG = {flag:'../currencyConverter/images/flags/sdg.png', currency:'SDG - Sudanese Pound',symbol:'', amount:$scope.names.USDSDG, id:'sdg'};
					$rootScope.checkSDG = true;
				}else{
				    delete $rootScope.currencies.USDSDG;
					$rootScope.checkSDG = false;
				}	
			}else if(list == 'shp'){
			    $rootScope.SHP = ($rootScope.SHP + 1)%2;
				if($rootScope.SHP == 0){
					$rootScope.currencies.USDSHP = {flag:'../currencyConverter/images/flags/shp.png', currency:'SHP - Saint Helena Pound',symbol:'£', amount:$scope.names.USDSHP, id:'shp'};
					$rootScope.checkSHP = true;
				}else{
				    delete $rootScope.currencies.USDSHP;
					$rootScope.checkSHP = false;
				}	
			}else if(list == 'sll'){
			    $rootScope.SLL = ($rootScope.SLL + 1)%2;
				if($rootScope.SLL == 0){
					$rootScope.currencies.USDSLL = {flag:'../currencyConverter/images/flags/sll.png', currency:'SLL - Sierra Leonean Leone',symbol:'Le', amount:$scope.names.USDSLL, id:'sll'};
					$rootScope.checkSLL = true;
				}else{
				    delete $rootScope.currencies.USDSLL;
					$rootScope.checkSLL = false;
				}	
			}else if(list == 'sos'){
			    $rootScope.SOS = ($rootScope.SOS + 1)%2;
				if($rootScope.SOS == 0){
					$rootScope.currencies.USDSOS = {flag:'../currencyConverter/images/flags/sos.png', currency:'SOS - Somali Shilling',symbol:'Sh.So.', amount:$scope.names.USDSOS, id:'sos'};
					$rootScope.checkSOS = true;
				}else{
				    delete $rootScope.currencies.USDSOS;
					$rootScope.checkSOS = false;
				}	
			}else if(list == 'srd'){
			    $rootScope.SRD = ($rootScope.SRD + 1)%2;
				if($rootScope.SRD == 0){
					$rootScope.currencies.USDSRD = {flag:'../currencyConverter/images/flags/srd.png', currency:'SRD - Surinamese Dollar',symbol:'$', amount:$scope.names.USDSRD, id:'srd'};
					$rootScope.checkSRD = true;
				}else{
				    delete $rootScope.currencies.USDSRD;
					$rootScope.checkSRD = false;
				}	
			}else if(list == 'std'){
			    $rootScope.STD = ($rootScope.STD + 1)%2;
				if($rootScope.STD == 0){
					$rootScope.currencies.USDSTD = {flag:'../currencyConverter/images/flags/std.png', currency:'STD - São Tomé and Príncipe Dobra',symbol:'Db', amount:$scope.names.USDSTD, id:'std'};
					$rootScope.checkSTD = true;
				}else{
				    delete $rootScope.currencies.USDSTD;
					$rootScope.checkSTD = false;
				}	
			}else if(list == 'svc'){
			    $rootScope.SVC = ($rootScope.SVC + 1)%2;
				if($rootScope.SVC == 0){
					$rootScope.currencies.USDSVC = {flag:'../currencyConverter/images/flags/svc.png', currency:'SVC - Salvadoran Colón',symbol:'₡', amount:$scope.names.USDSVC, id:'svc'};
					$rootScope.checkSVC = true;
				}else{
				    delete $rootScope.currencies.USDSVC;
					$rootScope.checkSVC = false;
				}	
			}else if(list == 'syp'){
			    $rootScope.SYP = ($rootScope.SYP + 1)%2;
				if($rootScope.SYP == 0){
					$rootScope.currencies.USDSYP = {flag:'../currencyConverter/images/flags/syp.png', currency:'SYP - Syrian Pound',symbol:'LS', amount:$scope.names.USDSYP, id:'syp'};
					$rootScope.checkSYP = true;
				}else{
				    delete $rootScope.currencies.USDSYP;
					$rootScope.checkSYP = false;
				}	
			}else if(list == 'szl'){
			    $rootScope.SZL = ($rootScope.SZL + 1)%2;
				if($rootScope.SZL == 0){
					$rootScope.currencies.USDSZL = {flag:'../currencyConverter/images/flags/szl.png', currency:'SZL - Swazi Lilangeni',symbol:'E', amount:$scope.names.USDSZL, id:'szl'};
					$rootScope.checkSZL = true;
				}else{
				    delete $rootScope.currencies.USDSZL;
					$rootScope.checkSZL = false;
				}
			}else if(list == 'tjs'){
			    $rootScope.TJS = ($rootScope.TJS + 1)%2;
				if($rootScope.TJS == 0){
					$rootScope.currencies.USDTJS = {flag:'../currencyConverter/images/flags/tjs.png', currency:'TJS - Tajikistani Somoni',symbol:'', amount:$scope.names.USDTJS, id:'tjs'};
					$rootScope.checkTJS = true;
				}else{
				    delete $rootScope.currencies.USDTJS;
					$rootScope.checkTJS = false;
				}	
			}else if(list == 'tmt'){
			    $rootScope.TMT = ($rootScope.TMT + 1)%2;
				if($rootScope.TMT == 0){
					$rootScope.currencies.USDTMT = {flag:'../currencyConverter/images/flags/tmt.png', currency:'TMT - Turkmenistani Manat',symbol:'', amount:$scope.names.USDTMT, id:'tmt'};
					$rootScope.checkTMT = true;
				}else{
				    delete $rootScope.currencies.USDTMT;
					$rootScope.checkTMT = false;
				}	
			}else if(list == 'tnd'){
			    $rootScope.TND = ($rootScope.TND + 1)%2;
				if($rootScope.TND == 0){
					$rootScope.currencies.USDTND = {flag:'../currencyConverter/images/flags/tnd.png', currency:'TND - Tunisian Dinar',symbol:'د.ت', amount:$scope.names.USDTND, id:'tnd'};
					$rootScope.checkTND = true;
				}else{
				    delete $rootScope.currencies.USDTND;
					$rootScope.checkTND = false;
				}	
			}else if(list == 'top'){
			    $rootScope.TOP = ($rootScope.TOP + 1)%2;
				if($rootScope.TOP == 0){
					$rootScope.currencies.USDTOP = {flag:'../currencyConverter/images/flags/top.png', currency:'TOP - Tongan Paʻanga',symbol:'$', amount:$scope.names.USDTOP, id:'top'};
					$rootScope.checkTOP = true;
				}else{
				    delete $rootScope.currencies.USDTOP;
					$rootScope.checkTOP = false;
				}	
			}else if(list == 'try'){
			    $rootScope.TRY = ($rootScope.TRY + 1)%2;
				if($rootScope.TRY == 0){
					$rootScope.currencies.USDTRY = {flag:'../currencyConverter/images/flags/try.png', currency:'TRY - Turkish Lira',sym:'../currencyConverter/images/symbols/try.png', amount:$scope.names.USDTRY, id:'try'};
					$rootScope.checkTRY = true;
				}else{
				    delete $rootScope.currencies.USDTRY;
					$rootScope.checkTRY = false;
				}	
			}else if(list == 'ttd'){
			    $rootScope.TTD = ($rootScope.TTD + 1)%2;
				if($rootScope.TTD == 0){
					$rootScope.currencies.USDTTD = {flag:'../currencyConverter/images/flags/ttd.png', currency:'TTD - Trinidad and Tobago Dollar',symbol:'$', amount:$scope.names.USDTTD, id:'ttd'};
					$rootScope.checkTTD = true;
				}else{
				    delete $rootScope.currencies.USDTTD;
					$rootScope.checkTTD = false;
				}	
			}else if(list == 'tzs'){
			    $rootScope.TZS = ($rootScope.TZS + 1)%2;
				if($rootScope.TZS == 0){
					$rootScope.currencies.USDTZS = {flag:'../currencyConverter/images/flags/tzs.png', currency:'TZS - Tanzanian Shilling',symbol:'', amount:$scope.names.USDTZS, id:'tzs'};
					$rootScope.checkTZS = true;
				}else{
				    delete $rootScope.currencies.USDTZS;
					$rootScope.checkTZS = false;
				}	
			}else if(list == 'uah'){
			    $rootScope.UAH = ($rootScope.UAH + 1)%2;
				if($rootScope.UAH == 0){
					$rootScope.currencies.USDUAH = {flag:'../currencyConverter/images/flags/uah.png', currency:'UAH - Ukrainian Hryvnia',symbol:'₴', amount:$scope.names.USDUAH, id:'uah'};
					$rootScope.checkUAH = true;
				}else{
				    delete $rootScope.currencies.USDUAH;
					$rootScope.checkUAH = false;
				}		
			}else if(list == 'ugx'){
			    $rootScope.UGX = ($rootScope.UGX + 1)%2;
				if($rootScope.UGX == 0){
					$rootScope.currencies.USDUGX = {flag:'../currencyConverter/images/flags/ugx.png', currency:'UGX - Ugandan Shilling',symbol:'USh', amount:$scope.names.USDUGX, id:'ugx'};
					$rootScope.checkUGX = true;
				}else{
				    delete $rootScope.currencies.USDUGX;
					$rootScope.checkUGX = false;
				}					
			}else if(list == 'uyu'){
			    $rootScope.UYU = ($rootScope.UYU + 1)%2;
				if($rootScope.UYU == 0){
					$rootScope.currencies.USDUYU = {flag:'../currencyConverter/images/flags/uyu.png', currency:'UYU - Uruguayan Peso',symbol:'$', amount:$scope.names.USDUYU, id:'uyu'};
					$rootScope.checkUYU = true;
				}else{
				    delete $rootScope.currencies.USDUYU;
					$rootScope.checkUYU = false;
				}	
			}else if(list == 'uzs'){
			    $rootScope.UZS = ($rootScope.UZS + 1)%2;
				if($rootScope.UZS == 0){
					$rootScope.currencies.USDUZS = {flag:'../currencyConverter/images/flags/uzs.png', currency:'UZS - Uzbekistan Som',symbol:'лв', amount:$scope.names.USDUZS, id:'uzs'};
					$rootScope.checkUZS = true;
				}else{
				    delete $rootScope.currencies.USDUZS;
					$rootScope.checkUZS = false;
				}	
			}else if(list == 'vef'){
			    $rootScope.VEF = ($rootScope.VEF + 1)%2;
				if($rootScope.VEF == 0){
					$rootScope.currencies.USDVEF = {flag:'../currencyConverter/images/flags/vef.png', currency:'VEF - Venezuelan Bolívar Fuerte',symbol:'Bs.', amount:$scope.names.USDVEF, id:'vef'};
					$rootScope.checkVEF = true;
				}else{
				    delete $rootScope.currencies.USDVEF;
					$rootScope.checkVEF = false;
				}	
			}else if(list == 'vnd'){
			    $rootScope.VND = ($rootScope.VND + 1)%2;
				if($rootScope.VND  == 0){
					$rootScope.currencies.USDVND = {flag:'../currencyConverter/images/flags/vnd.png', currency:'VND - Vietnamese Dong',symbol:'₫', amount:$scope.names.USDVND, id:'vnd'};
					$rootScope.checkVND = true;
				}else{
				    delete $rootScope.currencies.USDVND;
					$rootScope.checkVND  = false;
				}		
			}else if(list == 'vuv'){
			    $rootScope.VUV = ($rootScope.VUV + 1)%2;
				if($rootScope.VUV == 0){
					$rootScope.currencies.USDVUV = {flag:'../currencyConverter/images/flags/vuv.png', currency:'VUV - Vanuatu Vatu',symbol:'VT', amount:$scope.names.USDVUV, id:'vuv'};
					$rootScope.checkVUV = true;
				}else{
				    delete $rootScope.currencies.USDVUV;
					$rootScope.checkVUV = false;
				}	
			}else if(list == 'wst'){
			    $rootScope.WST = ($rootScope.WST + 1)%2;
				if($rootScope.WST == 0){
					$rootScope.currencies.USDWST = {flag:'../currencyConverter/images/flags/wst.png', currency:'WST - Samoan Tala',symbol:'WS$', amount:$scope.names.USDWST, id:'wst'};
					$rootScope.checkWST = true;
				}else{
				    delete $rootScope.currencies.USDWST;
					$rootScope.checkWST = false;
				}	
			}else if(list == 'xaf'){
			    $rootScope.XAF = ($rootScope.XAF + 1)%2;
				if($rootScope.XAF == 0){
					$rootScope.currencies.USDXAF = {flag:'../currencyConverter/images/flags/xaf.png', currency:'XAF - CFA Franc BEAC',symbol:'', amount:$scope.names.USDXAF, id:'xaf'};
					$rootScope.checkXAF = true;
				}else{
				    delete $rootScope.currencies.USDXAF;
					$rootScope.checkXAF = false;
				}	
			}else if(list == 'xag'){
			    $rootScope.XAG = ($rootScope.XAG + 1)%2;
				if($rootScope.XAG == 0){
					$rootScope.currencies.USDXAG = {flag:'../currencyConverter/images/flags/xag.png', currency:'XAG - Silver (troy ounce)',symbol:'', amount:$scope.names.USDXAG, id:'xag'};
					$rootScope.checkXAG = true;
				}else{
				    delete $rootScope.currencies.USDXAG;
					$rootScope.checkXAG = false;
				}	
			}else if(list == 'xau'){
			    $rootScope.XAU = ($rootScope.XAU + 1)%2;
				if($rootScope.XAU == 0){
					$rootScope.currencies.USDXAU = {flag:'../currencyConverter/images/flags/xau.png', currency:'XAU - Gold (troy ounce)',symbol:'', amount:$scope.names.USDXAU, id:'xau'};
					$rootScope.checkXAU = true;
				}else{
				    delete $rootScope.currencies.USDXAU;
					$rootScope.checkXAU = false;
				}	
			}else if(list == 'xcd'){
			    $rootScope.XCD = ($rootScope.XCD + 1)%2;
				if($rootScope.XCD == 0){
					$rootScope.currencies.USDXCD = {flag:'../currencyConverter/images/flags/xcd.png', currency:'XCD - East Caribbean Dollar',symbol:'$', amount:$scope.names.USDXCD, id:'xcd'};
					$rootScope.checkXCD = true;
				}else{
				    delete $rootScope.currencies.USDXCD;
					$rootScope.checkXCD = false;
				}	
			}else if(list == 'xdr'){
			    $rootScope.XDR = ($rootScope.XDR + 1)%2;
				if($rootScope.XDR == 0){
					$rootScope.currencies.USDXDR = {flag:'../currencyConverter/images/flags/xdr.png', currency:'XDR - Special Drawing Rights',symbol:'', amount:$scope.names.USDXDR, id:'xdr'};
					$rootScope.checkXDR = true;
				}else{
				    delete $rootScope.currencies.USDXDR;
					$rootScope.checkXDR = false;
				}		
			}else if(list == 'xof'){
			    $rootScope.XOF = ($rootScope.XOF + 1)%2;
				if($rootScope.XOF == 0){
					$rootScope.currencies.USDXOF = {flag:'../currencyConverter/images/flags/xof.png', currency:'XOF - CFA Franc BCEAO',symbol:'', amount:$scope.names.USDXOF, id:'xof'};
					$rootScope.checkXOF = true;
				}else{
				    delete $rootScope.currencies.USDXOF;
					$rootScope.checkXOF = false;
				}	
			}else if(list == 'xpf'){
			    $rootScope.XPF = ($rootScope.XPF + 1)%2;
				if($rootScope.XPF == 0){
					$rootScope.currencies.USDXPF = {flag:'../currencyConverter/images/flags/xpf.png', currency:'XPF - CFP Franc',symbol:'', amount:$scope.names.USDXPF, id:'xpf'};
					$rootScope.checkXPF = true;
				}else{
				    delete $rootScope.currencies.USDXPF;
					$rootScope.checkXPF = false;
				}	
			}else if(list == 'yer'){
			    $rootScope.YER = ($rootScope.YER + 1)%2;
				if($rootScope.YER == 0){
					$rootScope.currencies.USDYER = {flag:'../currencyConverter/images/flags/yer.png', currency:'YER - Yemeni Rial',symbol:'﷼', amount:$scope.names.USDYER, id:'yer'};
					$rootScope.checkYER = true;
				}else{
				    delete $rootScope.currencies.USDYER;
					$rootScope.checkYER = false;
				}		
			}else if(list == 'zmk'){
			    $rootScope.ZMK = ($rootScope.ZMK + 1)%2;
				if($rootScope.ZMK == 0){
					$rootScope.currencies.USDZMK = {flag:'../currencyConverter/images/flags/rub.png', currency:'ZMK - Zambian Kwacha (pre-2013)',symbol:'ZK', amount:$scope.names.USDZMK, id:'zmk'};
					$rootScope.checkZMK = true;
				}else{
				    delete $rootScope.currencies.USDZMK;
					$rootScope.checkZMK = false;
				}		
			}else if(list == 'zmw'){
			    $rootScope.ZMW = ($rootScope.ZMW + 1)%2;
				if($rootScope.ZMW  == 0){
					$rootScope.currencies.USDZMW = {flag:'../currencyConverter/images/flags/zmk.png', currency:'ZMW - Zambian Kwacha',symbol:'ZK', amount:$scope.names.USDZMW, id:'zmw'};
					$rootScope.checkZMW = true;
				}else{
				    delete $rootScope.currencies.USDZMW ;
					$rootScope.checkZMW  = false;
				}	
			}else if(list == 'zwl'){
			    $rootScope.ZWL = ($rootScope.ZWL + 1)%2;
				if($rootScope.ZWL == 0){
					$rootScope.currencies.USDZWL = {flag:'../currencyConverter/images/flags/zwl.png', currency:'ZML - Zimbabwean Dollar',symbol:'Z$', amount:$scope.names.USDZWL, id:'zwl'};
					$rootScope.checkZWL = true;
				}else{
				    delete $rootScope.currencies.USDZWL;
					$rootScope.checkZWL = false;
				}		
			}
		}   

		countProperities();
	} 
    // The function below allows for the removal of currencies from the selection on the main page of the app
	$scope.remove = function(indexNum){ // 'indexNum' stores the position of the currency that has been deselected 
	   if($rootScope.currencies.key(indexNum).id == "usd" ){ // this line checks to see which currency was clicked on
	        $rootScope.USD = ($rootScope.USD + 1)%2; // this updates $rootScope.USD variable so it remains in sync with the addCurrencies function
			delete $rootScope.currencies.USDUSD; // deletes the deselected currency
			$rootScope.checkUSD = false; // set to false so that it will no longer be indicated as being selected on the currency table
       }else if($rootScope.currencies.key(indexNum).id == "gbp"){
	        $rootScope.GBP = ($rootScope.GBP + 1)%2;
	        delete $rootScope.currencies.USDGBP;
			$rootScope.checkGBP = false;
	   }else if($rootScope.currencies.key(indexNum).id == "cad"){
	        $rootScope.CAD = ($rootScope.CAD + 1)%2;
	        delete $rootScope.currencies.USDCAD;
			$rootScope.checkCAD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "aud"){
	         $rootScope.AUD = ($rootScope.AUD + 1)%2;
	        delete $rootScope.currencies.USDAUD;
			 $rootScope.checkAUD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "aed"){
	        $rootScope.AED = ($rootScope.AED + 1)%2;
	        delete $rootScope.currencies.USDAED;
			$rootScope.checkAED = false;
	   }else if($rootScope.currencies.key(indexNum).id == "afn"){
	        $rootScope.AFN = ($rootScope.AFN + 1)%2;
	        delete $rootScope.currencies.USDAFN;
			$rootScope.checkAFN = false;
	   }else if($rootScope.currencies.key(indexNum).id == "all"){
	        $rootScope.ALL = ($rootScope.ALL + 1)%2;
	        delete $rootScope.currencies.USDALL;
			$rootScope.checkALL = false;
	   }else if($rootScope.currencies.key(indexNum).id == "amd"){
	        $rootScope.AMD = ($rootScope.AMD + 1)%2;
	        delete $rootScope.currencies.USDAMD;
			$rootScope.checkAMD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "ang"){
	        $rootScope.ANG = ($rootScope.ANG + 1)%2;
	        delete $rootScope.currencies.USDANG;
			$rootScope.checkANG = false;
	   }else if($rootScope.currencies.key(indexNum).id == "aoa"){
	        $rootScope.AOA = ($rootScope.AOA + 1)%2;
	        delete $rootScope.currencies.USDAOA;
			$rootScope.checkAOA = false;
	   }else if($rootScope.currencies.key(indexNum).id == "ars"){
	        $rootScope.ARS = ($rootScope.ARS + 1)%2;
	        delete $rootScope.currencies.USDARS;
			$rootScope.checkARS = false;
	   }else if($rootScope.currencies.key(indexNum).id == "awg"){
	        $rootScope.AWG = ($rootScope.AWG + 1)%2;
	        delete $rootScope.currencies.USDAWG;
			$rootScope.checkAWG = false;
	   }else if($rootScope.currencies.key(indexNum).id == "azn"){
	        $rootScope.AZN = ($rootScope.AZN + 1)%2;
	        delete $rootScope.currencies.USDAZN;
			$rootScope.checkAZN = false;
	   }else if($rootScope.currencies.key(indexNum).id == "eur"){
	        $rootScope.EUR = ($rootScope.EUR + 1)%2;
	        delete $rootScope.currencies.USDEUR;
			$rootScope.checkEUR = false;
/**********************************************************************************************************/			
	   }else if($rootScope.currencies.key(indexNum).id == "rub"){
	        $rootScope.RUB = ($rootScope.RUB + 1)%2;
	        delete $rootScope.currencies.USDRUB;
			$rootScope.checkRUB = false;
	   }else if($rootScope.currencies.key(indexNum).id == "jpy"){
	        $rootScope.JPY = ($rootScope.JPY + 1)%2;
	        delete $rootScope.currencies.USDJPY;
			$rootScope.checkJPY = false;
	   }else if($rootScope.currencies.key(indexNum).id == "inr"){
	        $rootScope.INR = ($rootScope.INR + 1)%2;
	        delete $rootScope.currencies.USDINR;
			$rootScope.checkINR = false;
	   }else if($rootScope.currencies.key(indexNum).id == "bgn"){
	        $rootScope.BGN = ($rootScope.BGN+ 1)%2;
	        delete $rootScope.currencies.USDBGN;
			$rootScope.checkBGN = false;
	   }else if($rootScope.currencies.key(indexNum).id == "nzd"){
	        $rootScope.NZD = ($rootScope.NZD + 1)%2;
	        delete $rootScope.currencies.USDNZD;
			$rootScope.checkNZD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "chf"){
	        $rootScope.CHF = ($rootScope.CHF + 1)%2;
	        delete $rootScope.currencies.USDCHF;
			$rootScope.checkCHF = false;
	   }else if($rootScope.currencies.key(indexNum).id == "zar"){
	        $rootScope.ZAR = ($rootScope.ZAR + 1)%2;
	        delete $rootScope.currencies.USDZAR;
			$rootScope.checkZAR = false;
	   }else if($rootScope.currencies.key(indexNum).id == "sgd"){
	        $rootScope.SGD = ($rootScope.SGD + 1)%2;
	        delete $rootScope.currencies.USDSGD;
			$rootScope.checkSGD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "hkd"){
	        $rootScope.HKD = ($rootScope.HKD + 1)%2;
	        delete $rootScope.currencies.USDHKD;
			$rootScope.checkHKD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "sek"){
	        $rootScope.SEK = ($rootScope.SEK + 1)%2;
	        delete $rootScope.currencies.USDSEK;
			$rootScope.checkSEK = false;
	   }else if($rootScope.currencies.key(indexNum).id == "thb"){
	        $rootScope.THB = ($rootScope.THB + 1)%2;
	        delete $rootScope.currencies.USDTHB;
			$rootScope.checkTHB = false;
	   }else if($rootScope.currencies.key(indexNum).id == "huf"){
	        $rootScope.HUF = ($rootScope.HUF + 1)%2;
	        delete $rootScope.currencies.USDHUF;
			$rootScope.checkHUF = false;
	   }else if($rootScope.currencies.key(indexNum).id == "cny"){
	        $rootScope.CNY = ($rootScope.CNY + 1)%2;
	        delete $rootScope.currencies.USDCNY;
			$rootScope.checkCNY = false;
	   }else if($rootScope.currencies.key(indexNum).id == "nok"){
	        $rootScope.NOK = ($rootScope.NOK + 1)%2;
	        delete $rootScope.currencies.USDNOK;
			$rootScope.checkNOK = false;
	   }else if($rootScope.currencies.key(indexNum).id == "mxn"){
	        $rootScope.MXN = ($rootScope.MXN + 1)%2;
	        delete $rootScope.currencies.USDMXN;
			$rootScope.checkMXN = false;
	   }else if($rootScope.currencies.key(indexNum).id == "dkk"){
	        $rootScope.DKK = ($rootScope.DKK + 1)%2;
	        delete $rootScope.currencies.USDDKK;
			$rootScope.checkDKK = false;
	   }else if($rootScope.currencies.key(indexNum).id == "myr"){
	        $rootScope.MYR = ($rootScope.MYR + 1)%2;
	        delete $rootScope.currencies.USDMYR;
			$rootScope.checkMYR = false;
	   }else if($rootScope.currencies.key(indexNum).id == "pln"){
	        $rootScope.PLN = ($rootScope.PLN + 1)%2;
	        delete $rootScope.currencies.USDPLN;
			$rootScope.checkPLN = false;
	   }else if($rootScope.currencies.key(indexNum).id == "brl"){
	        $rootScope.BRL = ($rootScope.BRL + 1)%2;
	        delete $rootScope.currencies.USDBRL;
			$rootScope.checkBRL = false;
	   }else if($rootScope.currencies.key(indexNum).id == "php"){
	        $rootScope.PHP = ($rootScope.PHP + 1)%2;
	        delete $rootScope.currencies.USDPHP;
			$rootScope.checkPHP = false;
	   }else if($rootScope.currencies.key(indexNum).id == "idr"){
	        $rootScope.IDR = ($rootScope.IDR + 1)%2;
	        delete $rootScope.currencies.USDIDR;
			$rootScope.checkIDR = false;
	   }else if($rootScope.currencies.key(indexNum).id == "czk"){
	        $rootScope.CZK = ($rootScope.CZK + 1)%2;
	        delete $rootScope.currencies.USDCZK;
			$rootScope.checkCZK = false;
	   }else if($rootScope.currencies.key(indexNum).id == "aed"){
	        $rootScope.AED = ($rootScope.AED + 1)%2;
	        delete $rootScope.currencies.USDAED;
			$rootScope.checkAED = false;
	   }else if($rootScope.currencies.key(indexNum).id == "twd"){
	        $rootScope.TWD = ($rootScope.TWD + 1)%2;
	        delete $rootScope.currencies.USDTWD;
			$rootScope.checkTWD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "krw"){
	        $rootScope.KRW = ($rootScope.KRW + 1)%2;
	        delete $rootScope.currencies.USDKRW;
			$rootScope.checkKRW = false;
	   }else if($rootScope.currencies.key(indexNum).id == "bam"){
	        $rootScope.BAM = ($rootScope.BAM + 1)%2;
	        delete $rootScope.currencies.USDBAM;
			$rootScope.checkBAM = false;
	   }else if($rootScope.currencies.key(indexNum).id == "bbd"){
	        $rootScope.BBD = ($rootScope.BBD + 1)%2;
	        delete $rootScope.currencies.USDBBD;
			$rootScope.checkBBD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "bdt"){
	        $rootScope.BDT = ($rootScope.BDT + 1)%2;
	        delete $rootScope.currencies.USDBDT;
			$rootScope.checkBDT = false;
	   }else if($rootScope.currencies.key(indexNum).id == "bhd"){
	        $rootScope.BHD = ($rootScope.BHD + 1)%2;
	        delete $rootScope.currencies.USDBHD;
			$rootScope.checkBHD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "bif"){
	        $rootScope.BIF = ($rootScope.BIF + 1)%2;
	        delete $rootScope.currencies.USDBIF;
			$rootScope.checkBIF= false;
	   }else if($rootScope.currencies.key(indexNum).id == "bmd"){
	        $rootScope.BMD = ($rootScope.BMD + 1)%2;
	        delete $rootScope.currencies.USDBMD;
			$rootScope.checkBMD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "bnd"){
	        $rootScope.BND = ($rootScope.BND + 1)%2;
	        delete $rootScope.currencies.USDBND;
			$rootScope.checkBND = false;
	   }else if($rootScope.currencies.key(indexNum).id == "bob"){
	        $rootScope.BOD = ($rootScope.BOB + 1)%2;
	        delete $rootScope.currencies.USDBOB;
			$rootScope.checkBOB = false;
	   }else if($rootScope.currencies.key(indexNum).id == "bsd"){
	        $rootScope.BSD = ($rootScope.BSD + 1)%2;
	        delete $rootScope.currencies.USDBSD;
			$rootScope.checkBSD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "btc"){
	        $rootScope.BTC = ($rootScope.BTC + 1)%2;
	        delete $rootScope.currencies.USDBTC;
			$rootScope.checkBTC = false;
	   }else if($rootScope.currencies.key(indexNum).id == "btn"){
	        $rootScope.BTN = ($rootScope.BTN + 1)%2;
	        delete $rootScope.currencies.USDBTN;
			$rootScope.checkBTN = false;
	   }else if($rootScope.currencies.key(indexNum).id == "bwp"){
	        $rootScope.BWP = ($rootScope.BWP + 1)%2;
	        delete $rootScope.currencies.USDBWP;
			$rootScope.checkBWP = false;
	   }else if($rootScope.currencies.key(indexNum).id == "byr"){
	        $rootScope.BYR = ($rootScope.BYR+ 1)%2;
	        delete $rootScope.currencies.USDBYR;
			$rootScope.checkBYR = false;
	   }else if($rootScope.currencies.key(indexNum).id == "bzd"){
	        $rootScope.BZD = ($rootScope.BZD + 1)%2;
	        delete $rootScope.currencies.USDBZD;
			$rootScope.checkBZD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "cdf"){
	        $rootScope.CDF = ($rootScope.CDF + 1)%2;
	        delete $rootScope.currencies.USDCDF;
			$rootScope.checkCDF = false;
	   }else if($rootScope.currencies.key(indexNum).id == "clf"){
	        $rootScope.CLF = ($rootScope.CLF + 1)%2;
	        delete $rootScope.currencies.USDCLF;
			$rootScope.checkCLF = false;
	   }else if($rootScope.currencies.key(indexNum).id == "clp"){
	        $rootScope.CLF = ($rootScope.CLF + 1)%2;
	        delete $rootScope.currencies.USDCLP;
			$rootScope.checkCLP = false;
	   }else if($rootScope.currencies.key(indexNum).id == "cop"){
	        $rootScope.COP = ($rootScope.COP + 1)%2;
	        delete $rootScope.currencies.USDCOP;
			$rootScope.checkCOP = false;
	   }else if($rootScope.currencies.key(indexNum).id == "crc"){
	        $rootScope.CRC = ($rootScope.CRC + 1)%2;
	        delete $rootScope.currencies.USDCRC;
			$rootScope.checkCRC = false;
	   }else if($rootScope.currencies.key(indexNum).id == "cuc"){
	        $rootScope.CUC = ($rootScope.CUC + 1)%2;
	        delete $rootScope.currencies.USDCUC;
			$rootScope.checkCUC = false;
	   }else if($rootScope.currencies.key(indexNum).id == "cup"){
	        $rootScope.CUP = ($rootScope.CUP + 1)%2;
	        delete $rootScope.currencies.USDCUP;
			$rootScope.checkCUP = false;
	   }else if($rootScope.currencies.key(indexNum).id == "cve"){
	        $rootScope.CVE = ($rootScope.CVE + 1)%2;
	        delete $rootScope.currencies.USDCVE;
			$rootScope.checkCVE = false;
	   }else if($rootScope.currencies.key(indexNum).id == "djf"){
	        $rootScope.DJF = ($rootScope.DJF + 1)%2;
	        delete $rootScope.currencies.USDDJF;
			$rootScope.checkDJF = false;
	   }else if($rootScope.currencies.key(indexNum).id == "dop"){
	        $rootScope.DOP = ($rootScope.DOP + 1)%2;
	        delete $rootScope.currencies.USDDOP;
			$rootScope.checkDOP = false;
	   }else if($rootScope.currencies.key(indexNum).id == "dzd"){
	        $rootScope.DZD = ($rootScope.DZD + 1)%2;
	        delete $rootScope.currencies.USDDZD;
			$rootScope.checkDZD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "eek"){
	        $rootScope.EEK = ($rootScope.EEK + 1)%2;
	        delete $rootScope.currencies.USDEEK;
			$rootScope.checkEEK = false;
	   }else if($rootScope.currencies.key(indexNum).id == "egp"){
	        $rootScope.EGP = ($rootScope.EGP + 1)%2;
	        delete $rootScope.currencies.USDEGP;
			$rootScope.checkEGP = false;
	   }else if($rootScope.currencies.key(indexNum).id == "ern"){
	        $rootScope.ERN = ($rootScope.ERN + 1)%2;
	        delete $rootScope.currencies.USDERN;
			$rootScope.checkERN = false;
	   }else if($rootScope.currencies.key(indexNum).id == "etb"){
	        $rootScope.ETB = ($rootScope.ETB + 1)%2;
	        delete $rootScope.currencies.USDETB;
			$rootScope.checkETB = false;
	   }else if($rootScope.currencies.key(indexNum).id == "fjd"){
	        $rootScope.FJD = ($rootScope.FJD + 1)%2;
	        delete $rootScope.currencies.USDFJD;
			$rootScope.checkFJD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "fkd"){
	        $rootScope.FKD = ($rootScope.FKD + 1)%2;
	        delete $rootScope.currencies.USDFKD;
			$rootScope.checkFKD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "gel"){
	        $rootScope.GEL = ($rootScope.GEL + 1)%2;
	        delete $rootScope.currencies.USDGEL;
			$rootScope.checkGEL = false;
	   }else if($rootScope.currencies.key(indexNum).id == "ggp"){
	        $rootScope.GGP = ($rootScope.GGP + 1)%2;
	        delete $rootScope.currencies.USDGGP;
			$rootScope.checkGGP = false;
	   }else if($rootScope.currencies.key(indexNum).id == "ghs"){
	        $rootScope.GHS = ($rootScope.GHS + 1)%2;
	        delete $rootScope.currencies.USDGHS;
			$rootScope.checkGHS = false;
	   }else if($rootScope.currencies.key(indexNum).id == "gip"){
	        $rootScope.GIP = ($rootScope.GIP + 1)%2;
	        delete $rootScope.currencies.USDGIP;
			$rootScope.checkGIP = false;
	   }else if($rootScope.currencies.key(indexNum).id == "gmd"){
	        $rootScope.GMD = ($rootScope.GMD + 1)%2;
	        delete $rootScope.currencies.USDGMD;
			$rootScope.checkGMD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "gnf"){
	        $rootScope.GNF = ($rootScope.GNF + 1)%2;
	        delete $rootScope.currencies.USDGNF;
			$rootScope.checkGNF = false;
	   }else if($rootScope.currencies.key(indexNum).id == "gtq"){
	        $rootScope.GTQ = ($rootScope.GTQ + 1)%2; 
	        delete $rootScope.currencies.USDGTQ;
			$rootScope.checkGTQ = false;
	   }else if($rootScope.currencies.key(indexNum).id == "gyd"){
	        $rootScope.GYD = ($rootScope.GYD + 1)%2;
	        delete $rootScope.currencies.USDGYD;
			$rootScope.checkGYD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "hkd"){
	        $rootScope.HKD = ($rootScope.HKD + 1)%2;
	        delete $rootScope.currencies.USDHKD;
			$rootScope.checkHKD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "hnl"){
	        $rootScope.HNL = ($rootScope.HNL + 1)%2;
	        delete $rootScope.currencies.USDHNL;
			$rootScope.checkHNL = false;
	   }else if($rootScope.currencies.key(indexNum).id == "hrk"){
	        $rootScope.HRK = ($rootScope.HRK + 1)%2;
	        delete $rootScope.currencies.USDHRK;
			$rootScope.checkHRK = false;
	   }else if($rootScope.currencies.key(indexNum).id == "htg"){
	        $rootScope.HTG = ($rootScope.HTG + 1)%2;
	        delete $rootScope.currencies.USDHTG;
			$rootScope.checkHTG = false;
	   }else if($rootScope.currencies.key(indexNum).id == "ils"){
	        $rootScope.ILS = ($rootScope.ILS + 1)%2;
	        delete $rootScope.currencies.USDILS;
			$rootScope.checkILS = false;
	   }else if($rootScope.currencies.key(indexNum).id == "imp"){
	        $rootScope.IMP = ($rootScope.IMP + 1)%2;
	        delete $rootScope.currencies.USDIMP;
			$rootScope.checkIMP = false;
	   }else if($rootScope.currencies.key(indexNum).id == "iqd"){
	        $rootScope.IGD = ($rootScope.IGD + 1)%2; 
	        delete $rootScope.currencies.USDIQD;
			$rootScope.checkIQD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "irr"){
	        $rootScope.IRR = ($rootScope.IRR + 1)%2;
	        delete $rootScope.currencies.USDIRR;
			$rootScope.checkIRR = false;
	   }else if($rootScope.currencies.key(indexNum).id == "isk"){
	        $rootScope.ISK = ($rootScope.ISK + 1)%2;
	        delete $rootScope.currencies.USDISK;
			$rootScope.checkISK = false;
	   }else if($rootScope.currencies.key(indexNum).id == "jep"){
	        $rootScope.JEP = ($rootScope.JEP + 1)%2;
	        delete $rootScope.currencies.USDJEP;
			$rootScope.checkJEP = false;
	   }else if($rootScope.currencies.key(indexNum).id == "jmd"){
	        $rootScope.JMD = ($rootScope.JMD + 1)%2;
	        delete $rootScope.currencies.USDJMD;
			$rootScope.checkJMD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "jod"){
	        $rootScope.JOD = ($rootScope.JOD + 1)%2;
	        delete $rootScope.currencies.USDJOD;
			$rootScope.checkJOD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "kes"){
	        $rootScope.KES = ($rootScope.KES + 1)%2;
	        delete $rootScope.currencies.USDKES;
			$rootScope.checkKES = false;
	   }else if($rootScope.currencies.key(indexNum).id == "kgs"){
	        $rootScope.KGS = ($rootScope.KGS + 1)%2;
	        delete $rootScope.currencies.USDKGS;
			$rootScope.checkKGS = false;
	   }else if($rootScope.currencies.key(indexNum).id == "khr"){
	        $rootScope.KHR = ($rootScope.KHR + 1)%2;
	        delete $rootScope.currencies.USDKHR;
			$rootScope.checkKHR = false;
	   }else if($rootScope.currencies.key(indexNum).id == "kmf"){
	        $rootScope.KMF = ($rootScope.KMF + 1)%2;
	        delete $rootScope.currencies.USDKMF;
			$rootScope.checkKMF = false;
	   }else if($rootScope.currencies.key(indexNum).id == "kpw"){
	        $rootScope.KPW = ($rootScope.KPW + 1)%2;
	        delete $rootScope.currencies.USDKPW;
			$rootScope.checkKPW = false;
	   }else if($rootScope.currencies.key(indexNum).id == "kwd"){
	        $rootScope.KWD = ($rootScope.KWD + 1)%2;
	        delete $rootScope.currencies.USDKWD;
			$rootScope.checkKWD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "kyd"){
	        $rootScope.KYD = ($rootScope.KYD + 1)%2;
	        delete $rootScope.currencies.USDKYD;
			$rootScope.checkKYD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "kzt"){
	        $rootScope.KZT = ($rootScope.KZT + 1)%2;
	        delete $rootScope.currencies.USDKZT;
			$rootScope.checkKZT = false;
	   }else if($rootScope.currencies.key(indexNum).id == "lak"){
	        $rootScope.LAK = ($rootScope.LAK + 1)%2;
	        delete $rootScope.currencies.USDLAK;
			$rootScope.checkLAK = false;
	   }else if($rootScope.currencies.key(indexNum).id == "lbp"){
	        $rootScope.LBP = ($rootScope.LBP + 1)%2;
	        delete $rootScope.currencies.USDLBP;
			$rootScope.checkLBP = false;
	   }else if($rootScope.currencies.key(indexNum).id == "lkr"){
	        $rootScope.LKR = ($rootScope.LKR + 1)%2;
	        delete $rootScope.currencies.USDLKR;
			$rootScope.checkLKR = false;
	   }else if($rootScope.currencies.key(indexNum).id == "lrd"){
	        $rootScope.LRD = ($rootScope.LRD + 1)%2;
	        delete $rootScope.currencies.USDLRD;
			$rootScope.checkLRD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "lsl"){
	        $rootScope.LSL = ($rootScope.LSL + 1)%2;
	        delete $rootScope.currencies.USDLSL;
			$rootScope.checkLSL = false;
	   }else if($rootScope.currencies.key(indexNum).id == "ltl"){
	        $rootScope.LTL= ($rootScope.LTL + 1)%2;
	        delete $rootScope.currencies.USDLTL;
			$rootScope.checkLTL = false;
	   }else if($rootScope.currencies.key(indexNum).id == "lvl"){
	        $rootScope.LVL = ($rootScope.LVL + 1)%2;
	        delete $rootScope.currencies.USDLVL;
			$rootScope.checkLVL = false;
	   }else if($rootScope.currencies.key(indexNum).id == "lyd"){
	        $rootScope.LYD = ($rootScope.LYD + 1)%2;
	        delete $rootScope.currencies.USDLYD;
			$rootScope.checkLYD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "mad"){
	        $rootScope.MAD = ($rootScope.MAD + 1)%2;
	        delete $rootScope.currencies.USDMAD;
			$rootScope.checkMAD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "mdl"){
	        $rootScope.MDL = ($rootScope.MDL + 1)%2;
	        delete $rootScope.currencies.USDMDL;
			$rootScope.checkMDL = false;
	   }else if($rootScope.currencies.key(indexNum).id == "mga"){
	        $rootScope.MGA = ($rootScope.MGA + 1)%2;
	        delete $rootScope.currencies.USDMGA;
			$rootScope.checkMGA = false;
	   }else if($rootScope.currencies.key(indexNum).id == "mkd"){
	        $rootScope.MKD = ($rootScope.MKD + 1)%2;
	        delete $rootScope.currencies.USDMKD;
			$rootScope.checkMKD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "mmk"){
	        $rootScope.MMK = ($rootScope.MMK + 1)%2;
	        delete $rootScope.currencies.USDMMK;
			$rootScope.checkMMK = false;
	   }else if($rootScope.currencies.key(indexNum).id == "mnt"){
	        $rootScope.MNT = ($rootScope.MNT + 1)%2;
	        delete $rootScope.currencies.USDMNT;
			$rootScope.checkMNT = false;
	   }else if($rootScope.currencies.key(indexNum).id == "mop"){
	        $rootScope.MOP = ($rootScope.MOP + 1)%2;
	        delete $rootScope.currencies.USDMOP;
			$rootScope.checkMOP = false;
	   }else if($rootScope.currencies.key(indexNum).id == "mro"){
	        $rootScope.MRO = ($rootScope.MRO + 1)%2;
	        delete $rootScope.currencies.USDMRO;
			$rootScope.checkMRO = false;
	   }else if($rootScope.currencies.key(indexNum).id == "mur"){
	        $rootScope.MUR = ($rootScope.MUR + 1)%2;
	        delete $rootScope.currencies.USDMUR;
			$rootScope.checkMUR = false;
	   }else if($rootScope.currencies.key(indexNum).id == "mvr"){
	        $rootScope.MVR = ($rootScope.MVR + 1)%2;
	        delete $rootScope.currencies.USDMVR;
			$rootScope.checkMVR = false;
	   }else if($rootScope.currencies.key(indexNum).id == "mwk"){
	        $rootScope.MWK = ($rootScope.MWK + 1)%2;
	        delete $rootScope.currencies.USDMWK;
			$rootScope.checkMWK = false;
	   }else if($rootScope.currencies.key(indexNum).id == "mzn"){
	        $rootScope.MZN = ($rootScope.MZN + 1)%2; 
	        delete $rootScope.currencies.USDMZN;
			$rootScope.checkMZN = false;
	   }else if($rootScope.currencies.key(indexNum).id == "nad"){
	        $rootScope.NAD = ($rootScope.NAD + 1)%2;
	        delete $rootScope.currencies.USDNAD;
			$rootScope.checkNAD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "ngn"){
	        $rootScope.NGN = ($rootScope.NGN + 1)%2;
	        delete $rootScope.currencies.USDNGN;
			$rootScope.checkNGN = false;
	   }else if($rootScope.currencies.key(indexNum).id == "nio"){
	        $rootScope.NIO = ($rootScope.NIO + 1)%2;
	        delete $rootScope.currencies.USDNIO;
			$rootScope.checkNIO = false;
	   }else if($rootScope.currencies.key(indexNum).id == "npr"){
	        $rootScope.NPR = ($rootScope.NPR + 1)%2;
	        delete $rootScope.currencies.USDNPR;
			$rootScope.checkNPR = false;
	   }else if($rootScope.currencies.key(indexNum).id == "omr"){
	        $rootScope.OMR = ($rootScope.OMR + 1)%2;
	        delete $rootScope.currencies.USDOMR;
			$rootScope.checkOMR = false;
	   }else if($rootScope.currencies.key(indexNum).id == "pab"){
	        $rootScope.PAB = ($rootScope.PAB + 1)%2;
	        delete $rootScope.currencies.USDPAB;
			$rootScope.checkPAB = false;
	   }else if($rootScope.currencies.key(indexNum).id == "pen"){
	        $rootScope.PEN = ($rootScope.PEN + 1)%2;
	        delete $rootScope.currencies.USDPEN;
			$rootScope.checkPEN = false;
	   }else if($rootScope.currencies.key(indexNum).id == "pgk"){
	        $rootScope.PGK = ($rootScope.PGK + 1)%2;
	        delete $rootScope.currencies.USDPGK;
			$rootScope.checkPGK = false;
	   }else if($rootScope.currencies.key(indexNum).id == "pkr"){
	        $rootScope.PKR = ($rootScope.PKR + 1)%2;
	        delete $rootScope.currencies.USDPKR;
			$rootScope.checkPKR = false;
	   }else if($rootScope.currencies.key(indexNum).id == "qar"){
	        $rootScope.QAR = ($rootScope.QAR + 1)%2;
	        delete $rootScope.currencies.USDQAR;
			$rootScope.checkQAR = false;
	   }else if($rootScope.currencies.key(indexNum).id == "ron"){
	        $rootScope.RON = ($rootScope.RON + 1)%2;
	        delete $rootScope.currencies.USDRON;
			$rootScope.checkRON = false;
	   }else if($rootScope.currencies.key(indexNum).id == "rsd"){
	        $rootScope.RSD = ($rootScope.RSD + 1)%2;
	        delete $rootScope.currencies.USDRSD;
			$rootScope.checkRSD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "rwf"){
	        $rootScope.RWF = ($rootScope.RWF + 1)%2;
	        delete $rootScope.currencies.USDRWF;
			$rootScope.checkRWF = false;
	   }else if($rootScope.currencies.key(indexNum).id == "sar"){
	        $rootScope.SAR = ($rootScope.SAR + 1)%2;
	        delete $rootScope.currencies.USDSAR;
			$rootScope.checkSAR = false;
	   }else if($rootScope.currencies.key(indexNum).id == "sbd"){
	        $rootScope.SBD = ($rootScope.SBD + 1)%2;
	        delete $rootScope.currencies.USDSBD;
			$rootScope.checkSBD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "scr"){
	        $rootScope.SCR = ($rootScope.SCR + 1)%2;
	        delete $rootScope.currencies.USDSCR;
			$rootScope.checkSCR = false;
	   }else if($rootScope.currencies.key(indexNum).id == "sdg"){
	        $rootScope.SDG = ($rootScope.SDG + 1)%2;
	        delete $rootScope.currencies.USDSDG;
			$rootScope.checkSDG = false;
	   }else if($rootScope.currencies.key(indexNum).id == "shp"){
	        $rootScope.SHP = ($rootScope.SHP + 1)%2; 
	        delete $rootScope.currencies.USDSHP;
			$rootScope.checkSHP = false;
	   }else if($rootScope.currencies.key(indexNum).id == "sll"){
	        $rootScope.SLL = ($rootScope.SLL + 1)%2;
	        delete $rootScope.currencies.USDSLL;
			$rootScope.checkSLL = false;
	   }else if($rootScope.currencies.key(indexNum).id == "sos"){
	        $rootScope.SOS = ($rootScope.SOS + 1)%2;
	        delete $rootScope.currencies.USDSOS;
			$rootScope.checkSOS = false;
	   }else if($rootScope.currencies.key(indexNum).id == "srd"){
	        $rootScope.SRD = ($rootScope.SRD + 1)%2;
	        delete $rootScope.currencies.USDSRD;
			$rootScope.checkSRD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "std"){
	        $rootScope.STD = ($rootScope.STD + 1)%2;
	        delete $rootScope.currencies.USDSTD;
			$rootScope.checkSTD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "svc"){
	        $rootScope.SVC = ($rootScope.SVC + 1)%2;
	        delete $rootScope.currencies.USDSVC;
			$rootScope.checkSVC = false;
	   }else if($rootScope.currencies.key(indexNum).id == "syp"){
	        $rootScope.SYP = ($rootScope.SYP + 1)%2;
	        delete $rootScope.currencies.USDSYP;
			$rootScope.checkSYP = false;
	   }else if($rootScope.currencies.key(indexNum).id == "szl"){
	        $rootScope.SZL = ($rootScope.SZL + 1)%2;
	        delete $rootScope.currencies.USDSZL;
			$rootScope.checkSZL = false;
	   }else if($rootScope.currencies.key(indexNum).id == "tjs"){
	        $rootScope.TJS = ($rootScope.TJS + 1)%2;
	        delete $rootScope.currencies.USDTJS;
			$rootScope.checkTJS = false;
	   }else if($rootScope.currencies.key(indexNum).id == "tmt"){
	        $rootScope.TMT = ($rootScope.TMT + 1)%2;
	        delete $rootScope.currencies.USDTMT;
			$rootScope.checkTMT = false;
	   }else if($rootScope.currencies.key(indexNum).id == "tnd"){
	        $rootScope.TND = ($rootScope.TND + 1)%2;
	        delete $rootScope.currencies.USDTND;
			$rootScope.checkTND = false;
	   }else if($rootScope.currencies.key(indexNum).id == "top"){
	        $rootScope.TOP = ($rootScope.TOP + 1)%2;
	        delete $rootScope.currencies.USDTOP;
			$rootScope.checkTOP = false;
	   }else if($rootScope.currencies.key(indexNum).id == "try"){
	        $rootScope.TRY = ($rootScope.TRY + 1)%2;
	        delete $rootScope.currencies.USDTRY;
			$rootScope.checkTRY = false;
	   }else if($rootScope.currencies.key(indexNum).id == "ttd"){
	        $rootScope.TTD = ($rootScope.TTD + 1)%2;
	        delete $rootScope.currencies.USDTTD;
			$rootScope.checkTTD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "tzs"){
	        $rootScope.TZS = ($rootScope.TZS + 1)%2;
	        delete $rootScope.currencies.USDTZS;
			$rootScope.checkTZS = false;
	   }else if($rootScope.currencies.key(indexNum).id == "uah"){
	        $rootScope.UAH = ($rootScope.UAH + 1)%2;
	        delete $rootScope.currencies.USDUAH;
			$rootScope.checkUAH = false;
	   }else if($rootScope.currencies.key(indexNum).id == "ugx"){
	        $rootScope.UGX = ($rootScope.UGX + 1)%2;
	        delete $rootScope.currencies.USDUGX;
			$rootScope.checkUGX = false;
	   }else if($rootScope.currencies.key(indexNum).id == "uyu"){
	        $rootScope.UYU = ($rootScope.UYU + 1)%2;
	        delete $rootScope.currencies.USDUYU;
			$rootScope.checkUYU = false;
	   }else if($rootScope.currencies.key(indexNum).id == "uzs"){
	        $rootScope.UZS = ($rootScope.UZS + 1)%2;
	        delete $rootScope.currencies.USDUZS;
			$rootScope.checkUZS = false;
	   }else if($rootScope.currencies.key(indexNum).id == "vef"){
	        $rootScope.VEF = ($rootScope.VEF + 1)%2;
	        delete $rootScope.currencies.USDVEF;
			$rootScope.checkVEF = false;
	   }else if($rootScope.currencies.key(indexNum).id == "vnd"){
	        $rootScope.VND = ($rootScope.VND + 1)%2;
	        delete $rootScope.currencies.USDVND;
			$rootScope.checkVND = false;
	   }else if($rootScope.currencies.key(indexNum).id == "vuv"){
	        $rootScope.VUV = ($rootScope.VUV + 1)%2;
	        delete $rootScope.currencies.USDVUV;
			$rootScope.checkVUV = false;
	   }else if($rootScope.currencies.key(indexNum).id == "wst"){
	        $rootScope.WST = ($rootScope.WST + 1)%2;
	        delete $rootScope.currencies.USDWST;
			$rootScope.checkWST = false;
	   }else if($rootScope.currencies.key(indexNum).id == "xaf"){
	        $rootScope.XAF = ($rootScope.XAF + 1)%2;
	        delete $rootScope.currencies.USDXAF;
			$rootScope.checkXAF = false;
	   }else if($rootScope.currencies.key(indexNum).id == "xag"){
	        $rootScope.XAG = ($rootScope.XAG + 1)%2;
	        delete $rootScope.currencies.USDXAG;
			$rootScope.checkXAG = false;
	   }else if($rootScope.currencies.key(indexNum).id == "xau"){
	        $rootScope.XAU = ($rootScope.XAU + 1)%2;
	        delete $rootScope.currencies.USDXAU;
			$rootScope.checkXAU = false;
	   }else if($rootScope.currencies.key(indexNum).id == "xcd"){
	        $rootScope.XCD = ($rootScope.XCD + 1)%2;
	        delete $rootScope.currencies.USDXCD;
			$rootScope.checkXCD = false;
	   }else if($rootScope.currencies.key(indexNum).id == "xdr"){
	        $rootScope.XDR = ($rootScope.XDR + 1)%2;
	        delete $rootScope.currencies.USDXDR;
			$rootScope.checkXDR = false;
	   }else if($rootScope.currencies.key(indexNum).id == "xof"){
	        $rootScope.XOF = ($rootScope.XOF + 1)%2;
	        delete $rootScope.currencies.USDXOF;
			$rootScope.checkXOF = false;
	   }else if($rootScope.currencies.key(indexNum).id == "xpf"){
	        $rootScope.XDF = ($rootScope.XDF + 1)%2;
	        delete $rootScope.currencies.USDXPF;
			$rootScope.checkXPF = false;
	   }else if($rootScope.currencies.key(indexNum).id == "yer"){
	        $rootScope.YER = ($rootScope.YER + 1)%2;
	        delete $rootScope.currencies.USDYER;
			$rootScope.checkYER = false;
	   }else if($rootScope.currencies.key(indexNum).id == "zmk"){
	        $rootScope.ZMK = ($rootScope.ZMK + 1)%2;
	        delete $rootScope.currencies.USDZMK;
			$rootScope.checkZMK = false;
	   }else if($rootScope.currencies.key(indexNum).id == "zmw"){
	        $rootScope.ZMK = ($rootScope.ZMK + 1)%2;
	        delete $rootScope.currencies.USDZMW;
			$rootScope.checkZMW = false;
	   }else if($rootScope.currencies.key(indexNum).id == "zwl"){
	        $rootScope.ZMK = ($rootScope.ZMK + 1)%2;
	        delete $rootScope.currencies.USDZWL;
			$rootScope.checkZWL = false;
	   }else if($rootScope.currencies.key(indexNum).id == "fkp"){
	        $rootScope.ZMK = ($rootScope.ZMK + 1)%2;
	        delete $rootScope.currencies.USDFKP;
			$rootScope.checkFKP = false;
	   }else if($rootScope.currencies.key(indexNum).id == "pyg"){
	        $rootScope.PYG = ($rootScope.PYG + 1)%2;
	        delete $rootScope.currencies.USDPYG;
			$rootScope.checkPYG = false;
	   }	 	   
	   
		countProperities();
	}	
	
	
	
	$rootScope.init = function(){
		$rootScope.currencies = {
		   key: function(n){  // this code returns the objects enumerable own properties into an array 
				return this[Object.keys(this)[n]]; // making it possible to count how many items there are in it
			},
		    // the $rootScope.currencies table is populated with four initial currencies to begin with
		   "USDUSD": {flag:'../currencyConverter/images/flags/usd.png', currency:'USD - United States Dollar',symbol:'$', amount:$rootScope.names.USDUSD, id:'usd'},
		   "USDEUR": {flag:'../currencyConverter/images/flags/eur.png', currency:'EUR - Euro',symbol:'€', amount:$rootScope.names.USDEUR, id:'eur',id:'eur'},
		   "USDGBP": {flag:'../currencyConverter/images/flags/gbp.png', currency:'GBP - British Pound Sterling',symbol:'£', amount:$rootScope.names.USDGBP, id:'gbp'},
		   "USDCAD": {flag:'../currencyConverter/images/flags/cad.png', currency:'CAD - Canadian Dollar',symbol:'$', amount:$rootScope.names.USDCAD, id:'cad', id:'cad'}	  
		}
	}	
	
	function countProperities(currencies){
	   $scope.count = 0;
	  for(var key in $rootScope.currencies){  //this code counts the number of items there are in the object
		if ($rootScope.currencies.hasOwnProperty(key)){
		  ++$scope.count; // this line increments the $scope.count variable
		}
	  }
	 return $scope.count; //returns the count
	}	
	
	$scope.$watch('count', function(){
		if(countProperities()<11){  // checks to see if the count of items in the object has exceeded the allowed limit
			$scope.listNumCheck = false;  
		}else {
			$scope.listNumCheck = true; 
		}
	})
		
	$scope.convertToDate = function(dt){
        return new Date(dt*1000);  // gets the time stamp number from the API and converts to seconds from milliseconds
    } 
}); 