'use strict';

google.charts.load('44', { packages: ['corechart'], 'language': 'fr' });

var KPIData //Global variabel til objekt med data til KPI'er og til queries 
var KPIObj = {};
var chartObj = {};
var filterValue = "alle";
var clickedKPI = 'I alt';
var chartQueries = {};

var db = new EmbeddedDashboard ();
var dbCharts = new EmbeddedDashboard ();

//Unge/alle filter    
$(function(){
    $('#ageFilter').click(function(e) 
    {   
        e.preventDefault();
            if (window.filterValue === "alle"){
                window.filterValue = "unge";
                $('#ageFilter').css("background-color", "#D8D8D8");
                $('#ageFilter').text("Viser unge under 30 år");
                addKPIData();
                loadChartDataAll();                            
            }
            else{
                window.filterValue = "alle";
                $('#ageFilter').css("background-color", "none");
                $('#ageFilter').text("Viser alle aldersgrupper");
                addKPIData();
                loadChartDataAll();                
            }
            console.log(window.filterValue);
    });
});

//------------------Tilføjer KPI-bokse - uden data
addKPIs()
//------------------Tilføjer data til KPI-bokse
addKPIData();
//------------------Tilføjer charts - uden data
addChart({
    chartWidth: 12,
    chartHeight: 5,
    isStacked: false,
    showLegend: true,
    chartType: "line",
    chartName: "chartFuldtids",
    chartCaption: "Antal fuldtidspersoner",      
});
addChart({
    chartWidth: 12,
    chartHeight: 5,
    isStacked: false,
    showLegend: true,
    chartType: "line",
    chartName: "chartGnsVar",
    chartCaption: "Gennemsnitlig varighed",      
});
addChart({
    chartWidth: 12,
    chartHeight: 5,
    isStacked: false,
    showLegend: true,
    chartType: "line",
    chartName: "chart3mdr",
    chartCaption: "Andel i beskæftigelse efter 3 måneder",      
});
addChart({
    chartWidth: 12,
    chartHeight: 5,
    isStacked: false,
    showLegend: true,
    chartType: "line",
    chartName: "chartPraktik",
    chartCaption: "Andel i virksomhedspratik eller løntilskud",      
});

//------------------Tilføjer data til alle charts

function loadChartDataAll (){ 
    loadChartData({
        ydelse: clickedKPI,
        alder: filterValue,
        type: "Fuldtids"      
    })
    .then(function(value){
        console.log("got it too!");
        addChartData({
            chartName: "chartFuldtids",
            myData: value      
        });
    })
    .catch(function(err){
    //here you can get an error
    console.log(Error("This is not quite right"));
    });
    loadChartData({
        ydelse: clickedKPI,
        alder: filterValue,
        type: "Gns varighed"      
    })
    .then(function(value){
        console.log("got it too!");
        addChartData({
            chartName: "chartGnsVar",
            myData: value      
        });
    })
    .catch(function(err){
    //here you can get an error
    console.log(Error("This is not quite right"));
    });

    loadChartData({
        ydelse: clickedKPI,
        alder: filterValue,
        type: "3 mdr"      
    })
    .then(function(value){
        console.log("got it too!");
        addChartData({
            chartName: "chart3mdr",
            myData: value      
        });
    })
    .catch(function(err){
    //here you can get an error
    console.log(Error("This is not quite right"));
    });

    loadChartData({
        ydelse: clickedKPI,
        alder: filterValue,
        type: "Andel i praktik mv"      
    })
    .then(function(value){
        console.log("got it too!");
        addChartData({
            chartName: "chartPraktik",
            myData: value      
        });
    })
    .catch(function(err){
    //here you can get an error
    console.log(Error("This is not quite right"));
    });
}
loadChartDataAll()

//------------------funktioner---------------------------------- 

function loadBaseData() {
   
  return new Promise (function (resolve,reject){
    
   function initialize() {
    var myKey = "1lu2D6Mc2m0JuZUdm6suX-6gNxutMdhQgm-Q1B88KeoU"
    var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=Queries");
    query.setQuery("SELECT A,B,C,D,E label A 'ydelse', B 'alder', C 'type', D 'query',E 'result'");
        query.send(function processResponse(response) {
            
            var err = response.isError();
            KPIData = response.getDataTable();
            err === true ? reject(err) : resolve(KPIData);
        });
    };       
    google.charts.setOnLoadCallback(initialize);
  })
}
 


function addKPIs(value){
    KPIObj['KPI1'] = {}
    KPIObj['KPI1'] = new KPIComponent ();
    KPIObj['KPI1'].setDimensions (3, 2);
    db.addComponent (KPIObj['KPI1']);
    KPIObj['KPI1'].lock();
    
    KPIObj['KPI2'] = {}
    KPIObj['KPI2'] = new KPIComponent ();
    KPIObj['KPI2'].setDimensions (3, 2);
    db.addComponent (KPIObj['KPI2']);
    KPIObj['KPI2'].lock();
       
    KPIObj['KPI3'] = {}
    KPIObj['KPI3'] = new KPIComponent ();
    KPIObj['KPI3'].setDimensions (3, 2);
    db.addComponent (KPIObj['KPI3']);
    KPIObj['KPI3'].lock();
    
    KPIObj['KPI4'] = {}
    KPIObj['KPI4'] = new KPIComponent ();
    KPIObj['KPI4'].setDimensions (3, 2);
    db.addComponent (KPIObj['KPI4']);
    KPIObj['KPI4'].lock();
    
    KPIObj['KPI5'] = {}
    KPIObj['KPI5'] = new KPIComponent ();
    KPIObj['KPI5'].setDimensions (3, 2);
    db.addComponent (KPIObj['KPI5']);
    KPIObj['KPI5'].lock();
    
    KPIObj['KPI6'] = {}
    KPIObj['KPI6'] = new KPIComponent ();
    KPIObj['KPI6'].setDimensions (3, 2);
    db.addComponent (KPIObj['KPI6']);
    KPIObj['KPI6'].lock();
    
    KPIObj['KPI7'] = {}
    KPIObj['KPI7'] = new KPIComponent ();
    KPIObj['KPI7'].setDimensions (3, 2);
    db.addComponent (KPIObj['KPI7']);
    KPIObj['KPI7'].lock();   
    
    KPIObj['KPI8'] = {}
    KPIObj['KPI8'] = new KPIComponent ();
    KPIObj['KPI8'].setDimensions (3, 2);
    db.addComponent (KPIObj['KPI8']);    
    KPIObj['KPI8'].lock();   
    return value;   
}

function addKPIData(data){
    KPIData = KPIData || loadBaseData();

    Promise.resolve(KPIData).then(function (data) {

        // var data = KPIData
        KPIObj['KPI1'].lock();    
        var getIndex = data.getFilteredRows([{column: 0, value: 'I alt'},{column: 1, value: filterValue},{column: 2, value: 'Fuldtids'}]);
        KPIObj['KPI1'].setValue(data.getValue(getIndex[0],4),{numberThousandsSeparator: ".",numberDecimalsSeparator: ","});
        KPIObj['KPI1'].setCaption(data.getValue(getIndex[0],0));
        KPIObj['KPI1'].unlock();
        $( "div .rfKPICaption:contains('I alt')" ).parents(".rfComponentContainer").attr('id', 'KPIIalt').addClass("clickableKPI");
        if ( clickedKPI === "I alt"){
            $( "div .rfKPICaption:contains('I alt')" ).parents(".rfComponentContainer").children().addClass("KPIActive");
        }
        
        KPIObj['KPI2'].lock();    
        var getIndex = data.getFilteredRows([{column: 0, value: 'Forsikrede'},{column: 1, value: filterValue},{column: 2, value: 'Fuldtids'}]);
        KPIObj['KPI2'].setValue(data.getValue(getIndex[0],4),{numberThousandsSeparator: ".",numberDecimalsSeparator: ","});
        KPIObj['KPI2'].setCaption(data.getValue(getIndex[0],0));
        KPIObj['KPI2'].unlock();
        $( "div .rfKPICaption:contains('Forsikrede')" ).parents(".rfComponentContainer").attr('id', 'KPIForsikrede').addClass("clickableKPI");
        if ( clickedKPI === "Forsikrede"){
            $( "div .rfKPICaption:contains('Forsikrede')" ).parents(".rfComponentContainer").children().addClass("KPIActive");
        }        
        KPIObj['KPI3'].lock();    
        var getIndex = data.getFilteredRows([{column: 0, value: 'Kontanthjælp'},{column: 1, value: filterValue},{column: 2, value: 'Fuldtids'}]);
        KPIObj['KPI3'].setValue(data.getValue(getIndex[0],4),{numberThousandsSeparator: ".",numberDecimalsSeparator: ","});
        KPIObj['KPI3'].setCaption(data.getValue(getIndex[0],0));
        KPIObj['KPI3'].unlock();
        $( "div .rfKPICaption:contains('Kontanthjælp')" ).parents(".rfComponentContainer").attr('id', 'KPIKontanthjæl').addClass("clickableKPI");
        if ( clickedKPI === "Kontanthjælp"){
            $( "div .rfKPICaption:contains('Kontanthjælp')" ).parents(".rfComponentContainer").children().addClass("KPIActive");
        }               
        
        KPIObj['KPI4'].lock();    
        var getIndex = data.getFilteredRows([{column: 0, value: 'Integrationsydelse'},{column: 1, value: filterValue},{column: 2, value: 'Fuldtids'}]);
        KPIObj['KPI4'].setValue(data.getValue(getIndex[0],4),{numberThousandsSeparator: ".",numberDecimalsSeparator: ","});
        KPIObj['KPI4'].setCaption(data.getValue(getIndex[0],0));
        KPIObj['KPI4'].unlock();
        $( "div .rfKPICaption:contains('Integrationsydelse')" ).parents(".rfComponentContainer").attr('id', 'KPIIntegrationsyd').addClass("clickableKPI");
        if ( clickedKPI === "Integrationsydelse"){
            $( "div .rfKPICaption:contains('Integrationsydelse')" ).parents(".rfComponentContainer").children().addClass("KPIActive");
        }
        
        KPIObj['KPI5'].lock();    
        var getIndex = data.getFilteredRows([{column: 0, value: 'Uddannelseshjælp'},{column: 1, value: filterValue},{column: 2, value: 'Fuldtids'}]);
        KPIObj['KPI5'].setValue(data.getValue(getIndex[0],4),{numberThousandsSeparator: ".",numberDecimalsSeparator: ","});
        KPIObj['KPI5'].setCaption(data.getValue(getIndex[0],0));
        KPIObj['KPI5'].unlock();
        $( "div .rfKPICaption:contains('Uddannelseshjælp')" ).parents(".rfComponentContainer").attr('id', 'KPIUddhj').addClass("clickableKPI");
        if ( clickedKPI === "Uddannelseshjælp"){
            $( "div .rfKPICaption:contains('Uddannelseshjælp')" ).parents(".rfComponentContainer").children().addClass("KPIActive");
        }
        
        KPIObj['KPI6'].lock();    
        var getIndex = data.getFilteredRows([{column: 0, value: 'Ledighedsydelse'},{column: 1, value: filterValue},{column: 2, value: 'Fuldtids'}]);
        KPIObj['KPI6'].setValue(data.getValue(getIndex[0],4),{numberThousandsSeparator: ".",numberDecimalsSeparator: ","});
        KPIObj['KPI6'].setCaption(data.getValue(getIndex[0],0));
        KPIObj['KPI6'].unlock();
        $( "div .rfKPICaption:contains('Ledighedsydelse')" ).parents(".rfComponentContainer").attr('id', 'KPILedighedsydelse').addClass("clickableKPI");
        if ( clickedKPI === "Ledighedsydelse"){
            $( "div .rfKPICaption:contains('Ledighedsydelse')" ).parents(".rfComponentContainer").children().addClass("KPIActive");
        }
        
        KPIObj['KPI7'].lock();    
        var getIndex = data.getFilteredRows([{column: 0, value: 'Sygedagpenge og jobafklaring'},{column: 1, value: filterValue},{column: 2, value: 'Fuldtids'}]);
        KPIObj['KPI7'].setValue(data.getValue(getIndex[0],4),{numberThousandsSeparator: ".",numberDecimalsSeparator: ","});
        KPIObj['KPI7'].setCaption(data.getValue(getIndex[0],0));
        KPIObj['KPI7'].unlock();
        $( "div .rfKPICaption:contains('Sygedagpenge og jobafklaring')" ).parents(".rfComponentContainer").attr('id', 'KPISdpOgJobafkl').addClass("clickableKPI");
        if ( clickedKPI === "Sygedagpenge og jobafklaring"){
            $( "div .rfKPICaption:contains('Sygedagpenge og jobafklaring')" ).parents(".rfComponentContainer").children().addClass("KPIActive");
        }
        
        KPIObj['KPI8'].lock();    
        var getIndex = data.getFilteredRows([{column: 0, value: 'Revalidering og ressourceforløb'},{column: 1, value: filterValue},{column: 2, value: 'Fuldtids'}]);
        KPIObj['KPI8'].setValue(data.getValue(getIndex[0],4),{numberThousandsSeparator: ".",numberDecimalsSeparator: ","});
        KPIObj['KPI8'].setCaption(data.getValue(getIndex[0],0));
        KPIObj['KPI8'].unlock();
        $( "div .rfKPICaption:contains('Revalidering og ressourceforløb')" ).parents(".rfComponentContainer").attr('id', 'KPIRevalOgRess').addClass("clickableKPI");
        if ( clickedKPI === "Revalidering og ressourceforløb"){
            $( "div .rfKPICaption:contains('Revalidering og ressourceforløb')" ).parents(".rfComponentContainer").children().addClass("KPIActive");
        } 

 //TODO: Skal forbedres - har memory leaks
        $(function(){
            // $('.clickableKPI').click(function(e)
            $(document).on('click','.clickableKPI', function(e)
            {   
                e.preventDefault();
                var clickedKPICaption = $(this).find('.rfKPICaption').text();
                    //Tjekker om teksten i den klikkede boks er lig det aktuelle filter
                    if (window.clickedKPI != clickedKPICaption){
                        window.clickedKPI = clickedKPICaption;
                        $(this).children().addClass("KPIActive")
                        $(this).siblings().find('.KPIActive').removeClass("KPIActive");
                        
                        loadChartDataAll();
                    }
                    console.log(window.clickedKPI);
            });              
        });  
        
//Denne alternative løsning har ikke samme problem med leaks, men løser ikke Safari-problemet, hvor
//events forsvinder ved resizing.        
        // var listener = function(event) {
        //     var clickedKPICaption = $(this).find('.rfKPICaption').text();
        //     if (window.clickedKPI != clickedKPICaption){
        //         window.clickedKPI = clickedKPICaption;
        //         $(this).children().addClass("KPIActive")
        //         $(this).siblings().find('.KPIActive').removeClass("KPIActive");
        //         loadChartDataAll();              
        //     }
        // };
       
        // // The DOM elements for the KPI's are removed and added on every execution of loadBaseData.
        // // Therefore the listener must be reattached. Following code removes the listener and reallocates
        // // the DOM elements to speed up garbage collection.
        // if ( item ) {
        //     item[0].removeEventListener("click", listener, false);
        //     item[1].removeEventListener("click", listener, false);
        //     item[2].removeEventListener("click", listener, false);
        //     item[3].removeEventListener("click", listener, false);
        //     item[4].removeEventListener("click", listener, false);
        //     item[5].removeEventListener("click", listener, false);
        //     item[6].removeEventListener("click", listener, false);
        //     item[7].removeEventListener("click", listener, false);
            
        //     item = null;
        // }
        // var item = document.getElementsByClassName("clickableKPI");
        // item[0].addEventListener("click", listener, false);
        // item[1].addEventListener("click", listener, false);
        // item[2].addEventListener("click", listener, false);
        // item[3].addEventListener("click", listener, false);
        // item[4].addEventListener("click", listener, false);
        // item[5].addEventListener("click", listener, false);
        // item[6].addEventListener("click", listener, false);
        // item[7].addEventListener("click", listener, false);
                               
    })               
} 

function addChart(options) {
    var chartType = options.chartType || 'line'
    var isStacked = options.isStacked || false
    var chartHeight = options.chartHeight || 4
    var chartWidth = options.chartWidth || 4
    var chartName = options.chartName
    var chartCaption = options.chartCaption
    var showLegend = options.showLegend || false
    var myShowTotal = options.stackedTotalDisplay || false
    var myNumberDecimalPoints = options.myNumberDecimalPoints || 0

    chartObj[chartName] = {};
    chartObj[chartName]['chart'] = new ChartComponent();
    chartObj[chartName]['chart'].setDimensions(chartWidth, chartHeight);
    chartObj[chartName]['chart'].setYAxis("", { numberDecimalPoints: 2, numberDecimalsSeparator: ",", numberThousandsSeparator: "." });
    chartObj[chartName]['chart'].setCaption(chartCaption);
    chartObj[chartName]['chart'].setOption('showLegendFlag', showLegend);
    chartObj[chartName]['chart'].setOption('numberThousandsSeparator', ".");
    chartObj[chartName]['chart'].setOption('numberDecimalSeparator', ",");
    chartObj[chartName]['chart'].lock();
    dbCharts.addComponent(chartObj[chartName]['chart']);
}

function loadChartData(options){
    KPIData = KPIData || loadBaseData();
    var ydelse = options.ydelse || "I alt";
    var alder = options.alder || "alle";
    var type = options.type || "Fuldtids";
    
    if ( typeof KPIData.then == 'function' ) { //Tjekker om objektet (formentligt) er et Promise. TODO: brug promises og tjek om det er resolved
        
        return KPIData.then(function (data) {
            // Promise.resolve(KPIData).then(function (data) {
        
            var getIndex = data.getFilteredRows([{column: 0, value: ydelse},{column: 1, value: alder},{column: 2, value: type}]) 
            var myQuery = String(data.getValue(getIndex[0],3));   

            return new Promise (function (resolve,reject){
                
            function initialize() {
                var myKey = "1lu2D6Mc2m0JuZUdm6suX-6gNxutMdhQgm-Q1B88KeoU"
                var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=" + type);
                query.setQuery(myQuery);
                    query.send(function processResponse(response) {
                        
                        var err = response.isError();
                        var chartData = response.getDataTable();
                        err === true ? reject(err) : resolve(chartData);
                    });
                };       
                google.charts.setOnLoadCallback(initialize);
            })  
        })
    }
    else {
        var getIndex = KPIData.getFilteredRows([{column: 0, value: ydelse},{column: 1, value: alder},{column: 2, value: type}]) 
        var myQuery = String(KPIData.getValue(getIndex[0],3));
            return new Promise (function (resolve,reject){
                
            function initialize() {
                var myKey = "1lu2D6Mc2m0JuZUdm6suX-6gNxutMdhQgm-Q1B88KeoU"
                var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=" + type);
                query.setQuery(myQuery);
                    query.send(function processResponse(response) {
                        
                        var err = response.isError();
                        var chartData = response.getDataTable();
                        err === true ? reject(err) : resolve(chartData);
                    });
                };       
                google.charts.setOnLoadCallback(initialize);
            })      
     }
}


function addChartData(options) {
    var myData = options.myData
    var chartName = options.chartName
    chartObj[chartName]['chart'].lock();
    chartObj[chartName]['chart'].clearChart();
    chartObj[chartName]['chart'].setOption ('showLegendFlag', true)
    
    var arrayLabels = [];
    var arrayHeadings = [];

    var myNumberOfDataColumns = myData.getNumberOfColumns(0) - 1;
    var myNumberOfRows = myData.getNumberOfRows(0);

    var arrayInput = [];
    for (var x = 1; x <= myNumberOfDataColumns; x++) {
        var arrayElement = "arrayInput" + x;
        arrayInput[arrayElement] = [];
        // for (var e = 0; e < myNumberOfRows ; e++) {
        for (var e = myNumberOfRows-1; e >= 0 ; e--) {
            arrayInput[arrayElement].push(myData.getValue(e, x).toFixed(1));
        }
    }

    // for (var i = 0; i < myNumberOfRows ; i++) {
        //Pga måden data hentes er array'et nødt til at indlæses bagvendt
    for (var i = myNumberOfRows-1; i >= 0 ; i--) {
        arrayLabels.push(myData.getValue(i, 0));
    };

    for (var h = 1; h <= myNumberOfDataColumns ; h++) {
        arrayHeadings.push(myData.getColumnLabel(h));
    };
    
    //Hvis første serie har længde nul, er undefined, eller summen af serien er nul indsættes label 'ingen data'
    // if ( arrayInput["arrayInput1"].length === 0 || !arrayInput["arrayInput1"].length || arrayInput["arrayInput1"].reduce((a, b) => Number(a) + Number(b), 0) === 0){
    var numberOfSeries = 0
    var series1HasData = false
    var series2HasData = false
    var series3HasData = false
    var series4HasData = false
    var series5HasData = false
    var series6HasData = false

    if( myNumberOfDataColumns >= 1 && arrayInput["arrayInput1"].length > 0 && arrayInput["arrayInput1"].reduce(function(a, b){ return Number(a) + Number(b)}, 0) > 0) {
        numberOfSeries = numberOfSeries + 1;
        series1HasData = true;
    } 
    if( myNumberOfDataColumns >= 2 && arrayInput["arrayInput2"].length > 0 && arrayInput["arrayInput2"].reduce(function(a, b){ return Number(a) + Number(b)}, 0) > 0) {
        numberOfSeries = numberOfSeries + 1;
        series2HasData = true;
    }   
    if( myNumberOfDataColumns >= 3 && arrayInput["arrayInput3"].length > 0 && arrayInput["arrayInput3"].reduce(function(a, b){ return Number(a) + Number(b)}, 0) > 0){
        numberOfSeries = numberOfSeries + 1;
        series3HasData = true;
    }   
    if( myNumberOfDataColumns >= 4 && arrayInput["arrayInput4"].length > 0 && arrayInput["arrayInput4"].reduce(function(a, b){ return Number(a) + Number(b)}, 0) > 0) {
        numberOfSeries = numberOfSeries + 1;
        series4HasData = true;
    }
    if( myNumberOfDataColumns >= 5 && arrayInput["arrayInput5"].length > 0 && arrayInput["arrayInput5"].reduce(function(a, b){ return Number(a) + Number(b)}, 0) > 0) {
        numberOfSeries = numberOfSeries + 1;
        series5HasData = true;
    }
    if( myNumberOfDataColumns >= 6 && arrayInput["arrayInput6"].length > 0 && arrayInput["arrayInput6"].reduce(function(a, b){ return Number(a) + Number(b)}, 0) > 0) {
        numberOfSeries = numberOfSeries + 1;
        series6HasData = true;
    }
    if ( numberOfSeries >= 1 ){
        chartObj[chartName]['chart'].setLabels(arrayLabels);
        if ( series1HasData === true ){
            chartObj[chartName]['chart'].addSeries("deakljoi2", arrayHeadings[0], arrayInput["arrayInput1"], {seriesDisplayType:'line',numberThousandsSeparator: ".",numberDecimalsSeparator: ","});            
        }
        if ( series2HasData === true ){
            chartObj[chartName]['chart'].addSeries("deakljoi3", arrayHeadings[1], arrayInput["arrayInput2"], {seriesDisplayType:'line',numberThousandsSeparator: ".",numberDecimalsSeparator: ","});            
        }
        if ( series3HasData === true ){
            chartObj[chartName]['chart'].addSeries("deakljoi4", arrayHeadings[2], arrayInput["arrayInput3"], {seriesDisplayType:'line',numberThousandsSeparator: ".",numberDecimalsSeparator: ","});            
        }
        if ( series4HasData === true ){
            chartObj[chartName]['chart'].addSeries("deakljoi5", arrayHeadings[3], arrayInput["arrayInput4"], {seriesDisplayType:'line',numberThousandsSeparator: ".",numberDecimalsSeparator: ","});            
        }
        if ( series5HasData === true ){
            chartObj[chartName]['chart'].addSeries("deakljoi6", arrayHeadings[4], arrayInput["arrayInput5"], {seriesDisplayType:'line',numberThousandsSeparator: ".",numberDecimalsSeparator: ","});            
        }
        if ( series6HasData === true ){
            chartObj[chartName]['chart'].addSeries("deakljoi7", arrayHeadings[5], arrayInput["arrayInput6"], {seriesDisplayType:'line',numberThousandsSeparator: ".",numberDecimalsSeparator: ",",seriesColor:'a4c9f3'});            
        }                
    }   
    // var hasData = false;
    // if ( arrayInput["arrayInput1"].length > 0 || arrayInput["arrayInput1"].length || arrayInput["arrayInput1"].reduce(function(a, b){ return Number(a) + Number(b)}, 0) > 0){    
    else {
        chartObj[chartName]['chart'].setLabels(['Ingen data']);
        chartObj[chartName]['chart'].addSeries("deakljoi2", arrayHeadings[0], [1], {seriesDisplayType:'line',seriesColor: 'ffffff'});
        chartObj[chartName]['chart'].setOption ('showLegendFlag', false);
    }    
     
    // Don't forget to call unlock or the data won't be displayed
    chartObj[chartName]['chart'].unlock();
    
};

db.embedTo("dbTarget");
dbCharts.embedTo("dbTargetCharts");

//This is a hack. On resizing Razorflow reloads charts and attached jquery (events, classes, etc.) is removed.
//The code re-attaches all jquery to KPIs on resizing. Further: The captions are not always loaded. Therefore
//a delay of 500 m.sec are set. A Promise could be used instead but, it did not quite work at first try.
$(window).on("resize", function () {
    setTimeout( function (){ 
        console.log("resize");
        
    $( "div .rfKPICaption:contains('I alt')" ).parents(".rfComponentContainer").attr('id', 'KPIIalt').removeClass("clickableKPI");
    if ( clickedKPI === "I alt"){
        $( "div .rfKPICaption:contains('I alt')" ).parents(".rfComponentContainer").children().removeClass("KPIActive");
    }
    $( "div .rfKPICaption:contains('Forsikrede')" ).parents(".rfComponentContainer").attr('id', 'KPIForsikrede').removeClass("clickableKPI");
    if ( clickedKPI === "Forsikrede"){
        $( "div .rfKPICaption:contains('Forsikrede')" ).parents(".rfComponentContainer").children().removeClass("KPIActive");
    }
    $( "div .rfKPICaption:contains('Kontanthjælp')" ).parents(".rfComponentContainer").attr('id', 'KPIKontanthjæl').removeClass("clickableKPI");
    if ( clickedKPI === "Kontanthjælp"){
        $( "div .rfKPICaption:contains('Kontanthjælp')" ).parents(".rfComponentContainer").children().removeClass("KPIActive");
    }               
    $( "div .rfKPICaption:contains('Integrationsydelse')" ).parents(".rfComponentContainer").attr('id', 'KPIIntegrationsyd').removeClass("clickableKPI");
    if ( clickedKPI === "Integrationsydelse"){
        $( "div .rfKPICaption:contains('Integrationsydelse')" ).parents(".rfComponentContainer").children().removeClass("KPIActive");
    }
    $( "div .rfKPICaption:contains('Uddannelseshjælp')" ).parents(".rfComponentContainer").attr('id', 'KPIUddhj').removeClass("clickableKPI");
    if ( clickedKPI === "Uddannelseshjælp"){
        $( "div .rfKPICaption:contains('Uddannelseshjælp')" ).parents(".rfComponentContainer").children().removeClass("KPIActive");
    }
    $( "div .rfKPICaption:contains('Ledighedsydelse')" ).parents(".rfComponentContainer").attr('id', 'KPILedighedsydelse').removeClass("clickableKPI");
    if ( clickedKPI === "Ledighedsydelse"){
        $( "div .rfKPICaption:contains('Ledighedsydelse')" ).parents(".rfComponentContainer").children().removeClass("KPIActive");
    }
    $( "div .rfKPICaption:contains('Sygedagpenge og jobafklaring')" ).parents(".rfComponentContainer").attr('id', 'KPISdpOgJobafkl').removeClass("clickableKPI");
    if ( clickedKPI === "Sygedagpenge og jobafklaring"){
        $( "div .rfKPICaption:contains('Sygedagpenge og jobafklaring')" ).parents(".rfComponentContainer").children().removeClass("KPIActive");
    }
    $( "div .rfKPICaption:contains('Revalidering og ressourceforløb')" ).parents(".rfComponentContainer").attr('id', 'KPIRevalOgRess').removeClass("clickableKPI");
    if ( clickedKPI === "Revalidering og ressourceforløb"){
        $( "div .rfKPICaption:contains('Revalidering og ressourceforløb')" ).parents(".rfComponentContainer").children().removeClass("KPIActive");
    }        
        
    $( "div .rfKPICaption:contains('I alt')" ).parents(".rfComponentContainer").attr('id', 'KPIIalt').addClass("clickableKPI");
    if ( clickedKPI === "I alt"){
        $( "div .rfKPICaption:contains('I alt')" ).parents(".rfComponentContainer").children().addClass("KPIActive");
    }
    $( "div .rfKPICaption:contains('Forsikrede')" ).parents(".rfComponentContainer").attr('id', 'KPIForsikrede').addClass("clickableKPI");
    if ( clickedKPI === "Forsikrede"){
        $( "div .rfKPICaption:contains('Forsikrede')" ).parents(".rfComponentContainer").children().addClass("KPIActive");
    }
    $( "div .rfKPICaption:contains('Kontanthjælp')" ).parents(".rfComponentContainer").attr('id', 'KPIKontanthjæl').addClass("clickableKPI");
    if ( clickedKPI === "Kontanthjælp"){
        $( "div .rfKPICaption:contains('Kontanthjælp')" ).parents(".rfComponentContainer").children().addClass("KPIActive");
    }               
    $( "div .rfKPICaption:contains('Integrationsydelse')" ).parents(".rfComponentContainer").attr('id', 'KPIIntegrationsyd').addClass("clickableKPI");
    if ( clickedKPI === "Integrationsydelse"){
        $( "div .rfKPICaption:contains('Integrationsydelse')" ).parents(".rfComponentContainer").children().addClass("KPIActive");
    }
    $( "div .rfKPICaption:contains('Uddannelseshjælp')" ).parents(".rfComponentContainer").attr('id', 'KPIUddhj').addClass("clickableKPI");
    if ( clickedKPI === "Uddannelseshjælp"){
        $( "div .rfKPICaption:contains('Uddannelseshjælp')" ).parents(".rfComponentContainer").children().addClass("KPIActive");
    }
    $( "div .rfKPICaption:contains('Ledighedsydelse')" ).parents(".rfComponentContainer").attr('id', 'KPILedighedsydelse').addClass("clickableKPI");
    if ( clickedKPI === "Ledighedsydelse"){
        $( "div .rfKPICaption:contains('Ledighedsydelse')" ).parents(".rfComponentContainer").children().addClass("KPIActive");
    }
    $( "div .rfKPICaption:contains('Sygedagpenge og jobafklaring')" ).parents(".rfComponentContainer").attr('id', 'KPISdpOgJobafkl').addClass("clickableKPI");
    if ( clickedKPI === "Sygedagpenge og jobafklaring"){
        $( "div .rfKPICaption:contains('Sygedagpenge og jobafklaring')" ).parents(".rfComponentContainer").children().addClass("KPIActive");
    }
    $( "div .rfKPICaption:contains('Revalidering og ressourceforløb')" ).parents(".rfComponentContainer").attr('id', 'KPIRevalOgRess').addClass("clickableKPI");
    if ( clickedKPI === "Revalidering og ressourceforløb"){
        $( "div .rfKPICaption:contains('Revalidering og ressourceforløb')" ).parents(".rfComponentContainer").children().addClass("KPIActive");
    }
    
    
            
    },500)
});
