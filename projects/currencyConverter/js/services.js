
myApp.service('currencyService', function($rootScope, $http){
	
 //	$http.get("http://www.apilayer.net/api/live?access_key=268e302bc6f31b42898248709bc63efd&format=1") //api data is retrieved
    $http.get("http://kenankomah.com/currencyData.json")	
	.success(function (response){
	
	  $rootScope.names = response.quotes;  // the api JSON data is stored into the variable $rootScope.names 
	  $rootScope.date = response.timestamp; 
	  $rootScope.baseSwitch();
	   
	  $rootScope.currencies = {}; 
	  
	  $rootScope.init(); //Calls the init() functions
	  
	  //Initialises the currency table to show the four preselected currencies.
	  $rootScope.checkCAD = true;    
	  $rootScope.checkGBP = true;
	  $rootScope.checkUSD = true;
	  $rootScope.checkEUR = true;	

	  //initialises the currencies to a deselected position on the currency table
      $rootScope.AED = 1;
	  $rootScope.AFN = 1;
	  $rootScope.ALL = 1;
	  $rootScope.AMD = 1;
	  $rootScope.ANG = 1;
	  $rootScope.AOA = 1;
	  $rootScope.ARS = 1;
	  $rootScope.AUD = 1;
	  $rootScope.AWG = 1;
	  $rootScope.AZN = 1;
	  
	  $rootScope.BAM = 1;
	  $rootScope.BBD = 1;
	  $rootScope.BDT = 1;
	  $rootScope.BGN = 1;
	  $rootScope.BHD = 1;
	  $rootScope.BIF = 1;
	  $rootScope.BMD = 1;
	  $rootScope.BND = 1;
	  $rootScope.BOB = 1;
	  $rootScope.BRL = 1;
	  $rootScope.BSD = 1;
	  $rootScope.BTC = 1;
	  $rootScope.BTN = 1;
	  $rootScope.BWP = 1;
	  $rootScope.BYR = 1;
	  $rootScope.BZD = 1;
	  
	  $rootScope.CAD = 0;
	  $rootScope.CDF = 1;
	  $rootScope.CHF = 1;
	  $rootScope.CLF = 1;
	  $rootScope.CLP = 1;
	  $rootScope.CNY = 1;
	  $rootScope.COP = 1;
	  $rootScope.CRC = 1;
	  $rootScope.CUC = 1;
	  $rootScope.CUP = 1;
	  $rootScope.CVE = 1;
	  $rootScope.CZK = 1;
	  
	  $rootScope.DJF = 1;
	  $rootScope.DKK = 1;
	  $rootScope.DOP = 1;
	  $rootScope.DZD = 1;
	  
	  $rootScope.EEK = 1;
	  $rootScope.EGP = 1;
	  $rootScope.ERN = 1;
	  $rootScope.ETB = 1;
	  $rootScope.EUR = 0;
	  
	  $rootScope.FJD = 1;
	  $rootScope.FKP = 1;
	  
	  $rootScope.GBP = 0;
	  $rootScope.GEL = 1;
	  $rootScope.GGP = 1;
	  $rootScope.GHS = 1;
	  $rootScope.GIP = 1;
	  $rootScope.GMD = 1;
	  $rootScope.GNF = 1;
	  $rootScope.GTQ = 1;
	  $rootScope.GYD = 1;
	  
	  $rootScope.HKD = 1;
	  $rootScope.HNL = 1;
	  $rootScope.HRK = 1;
	  $rootScope.HTG = 1;
	  $rootScope.HUF = 1;
	  
	  $rootScope.IDR = 1;
	  $rootScope.ILS = 1;
	  $rootScope.IMP = 1;
	  $rootScope.INR = 1;
	  $rootScope.IQD = 1;
	  $rootScope.IRR = 1;
	  $rootScope.ISK = 1;
	  
	  $rootScope.JEP = 1;
	  $rootScope.JMD = 1;
	  $rootScope.JOD = 1;
	  $rootScope.JPY = 1;
	  
	  $rootScope.KES = 1;
	  $rootScope.KGS = 1;
	  $rootScope.KHR = 1;
	  $rootScope.KMF = 1;
	  $rootScope.KPW = 1;
	  $rootScope.KRW = 1;
	  $rootScope.KWD = 1;
	  $rootScope.KYD = 1;
	  $rootScope.KZT = 1;
	  
	  $rootScope.LAK = 1;
	  $rootScope.LBP = 1;
	  $rootScope.LKR = 1;
	  $rootScope.LRD = 1;
	  $rootScope.LSL = 1;
	  $rootScope.LTL = 1;
	  $rootScope.LVL = 1;
	  $rootScope.LYD = 1;
	  
	  $rootScope.MAD = 1;
	  $rootScope.MDL = 1;
	  $rootScope.MGA = 1;
	  $rootScope.MKD = 1;
	  $rootScope.MMK = 1;
	  $rootScope.MNT = 1;
	  $rootScope.MOP = 1;
	  $rootScope.MRO = 1;
	  $rootScope.MUR = 1;
	  $rootScope.MVR = 1;
	  $rootScope.MWK = 1;
	  $rootScope.MXN = 1;
	  $rootScope.MYR = 1;
	  $rootScope.MZN = 1;
	  
	  $rootScope.NAD = 1;
	  $rootScope.NGN = 1;
	  $rootScope.NIO = 1;
	  $rootScope.NOK = 1;
	  $rootScope.NPR = 1;
	  $rootScope.NZD = 1;
	  
	  $rootScope.OMR = 1;
	  
	  $rootScope.PAB = 1;
	  $rootScope.PEN = 1;
	  $rootScope.PGK = 1;
	  $rootScope.PHP = 1;
	  $rootScope.PKR = 1;
	  $rootScope.PLN = 1;
	  $rootScope.PYG = 1;
	  
	  $rootScope.QAR = 1;
	  
	  $rootScope.RON = 1;
	  $rootScope.RSD = 1;
	  $rootScope.RUB = 1;
	  $rootScope.RWF = 1;
	  
	  $rootScope.SAR = 1;
	  $rootScope.SBD = 1;
	  $rootScope.SCR = 1;
	  $rootScope.SDG = 1;
	  $rootScope.SEK = 1;
	  $rootScope.SGD = 1;
	  $rootScope.SHP = 1;
	  $rootScope.SLL = 1;
	  $rootScope.SOS = 1;
	  $rootScope.SRD = 1;
	  $rootScope.STD = 1;
	  $rootScope.SVC = 1;
	  $rootScope.SYP = 1;
	  $rootScope.SZL = 1;
	  
	  $rootScope.THB = 1;
	  $rootScope.TJS = 1;
	  $rootScope.TMT = 1;
	  $rootScope.TND = 1;
	  $rootScope.TOP = 1;
	  $rootScope.TRY = 1;
	  $rootScope.TTD = 1;
	  $rootScope.TWD = 1;
	  $rootScope.TZS = 1;
	  
	  $rootScope.UAH = 1;
	  $rootScope.UGX = 1;
	  $rootScope.USD = 0;
	  $rootScope.UYU = 1;
	  $rootScope.UZS = 1;
	  
	  $rootScope.VEF = 1;
	  $rootScope.VND = 1;
	  $rootScope.VUV = 1;
	  
	  $rootScope.WST = 1;
	  
	  $rootScope.XAF = 1;
	  $rootScope.XAG = 1;
	  $rootScope.XAU = 1;
	  $rootScope.XCD = 1;
	  $rootScope.XDR = 1;
	  $rootScope.XOF = 1;
	  $rootScope.XPF = 1;
	  
	  $rootScope.YER = 1;
	  
	  $rootScope.ZAR = 1;
	  $rootScope.ZMK = 1; 
	  $rootScope.ZMW = 1;
	  $rootScope.ZWL = 1;       	  
	   
	});
});
