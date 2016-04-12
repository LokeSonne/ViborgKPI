google.charts.load('44', { packages: ['corechart'] });


var chartObj = {};
var paramKPI = ""
var paramQuery = ""

    StandaloneDashboard(function (db) {

         function addMyKpi(myKpiObjectName, myKey) {
            var KpiYd0 = new KPIComponent ();
            KpiYd0.setDimensions (3, 2);
            KpiYd0.setID("_id");
            db.addComponent (KpiYd0);
            KpiYd0.lock();
            
            var KpiYd1 = new KPIComponent ();
            KpiYd1.setDimensions (3, 2);
            db.addComponent (KpiYd1);
            KpiYd1.lock();
            
            var KpiYd2 = new KPIComponent ();
            KpiYd2.setDimensions (3, 2);
            db.addComponent (KpiYd2);
            KpiYd2.lock();
            
            var KpiYd3 = new KPIComponent ();
            KpiYd3.setDimensions (3, 2);
            db.addComponent (KpiYd3);
            KpiYd3.lock();
            
            var KpiYd4 = new KPIComponent ();
            KpiYd4.setDimensions (3, 2);
            db.addComponent (KpiYd4);
            KpiYd4.lock();
            
            var KpiYd5 = new KPIComponent ();
            KpiYd5.setDimensions (3, 2);
            db.addComponent (KpiYd5);
            KpiYd5.lock();
            
            var KpiYd6 = new KPIComponent ();
            KpiYd6.setDimensions (3, 2);
            db.addComponent (KpiYd6);
            KpiYd6.lock();
            
            var KpiYd7 = new KPIComponent ();
            KpiYd7.setDimensions (3, 2);
            db.addComponent (KpiYd7);
            KpiYd7.lock();
            
            var KpiYd8 = new KPIComponent ();
            KpiYd8.setDimensions (12, 1);
            db.addComponent (KpiYd8);
            // KpiYd8.lock();
            
            
            function initialize() {
                // The URL of the spreadsheet to source data from.
                var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=Fuldtids");
                query.setQuery("SELECT N,E,F,G,H,I,J+K,L+M WHERE O=1 AND AA = 'alle' ORDER BY A desc LIMIT 1 label J+K 'Sygedagpenge og jobafklaring', L+M 'Revalidering og ressourceforløb'");
                query.send(function processResponse(response) {

                    var clickedKPI = "I alt";
                    var isFilterClicked  = 0;
                    
                    var myData = response.getDataTable();
                    var caption0 = 'I alt';
                    var value0 = myData.getValue(0, 0);
                    var caption1 = String(myData.getColumnLabel(1));
                    var value1 = myData.getValue(0, 1);
                    var caption2 = String(myData.getColumnLabel(2));
                    var value2 = myData.getValue(0, 2);
                    var caption3 = String(myData.getColumnLabel(3));
                    var value3 = myData.getValue(0, 3);
                    var caption4 = String(myData.getColumnLabel(4));
                    var value4 = myData.getValue(0, 4);
                    var caption5 = String(myData.getColumnLabel(5));
                    var value5 = myData.getValue(0, 5);
                    var caption6 = String(myData.getColumnLabel(6));
                    var value6 = myData.getValue(0, 6);
                    var caption7 = String(myData.getColumnLabel(7));
                    var value7 = myData.getValue(0, 7);
                    
                    var caption8 = String("Vis kun unge under 30 år");
                    var value8 = 0;                    
    
                    KpiYd0.setCaption (caption0);
                    KpiYd0.setValue (value0);
                    KpiYd0.unlock();                    
                    KpiYd1.setCaption (caption1);
                    KpiYd1.setValue (value1);
                    KpiYd1.unlock();
                    KpiYd2.setCaption (caption2);
                    KpiYd2.setValue (value2);
                    KpiYd2.unlock();
                    KpiYd3.setCaption (caption3);
                    KpiYd3.setValue (value3);
                    KpiYd3.unlock();
                    KpiYd4.setCaption (caption4);
                    KpiYd4.setValue (value4);
                    KpiYd4.unlock();
                    KpiYd5.setCaption (caption5);
                    KpiYd5.setValue (value5);
                    KpiYd5.unlock();
                    KpiYd6.setCaption (caption6);
                    KpiYd6.setValue (value6);
                    KpiYd6.unlock();
                    KpiYd7.setCaption (caption7);
                    KpiYd7.setValue (value7);
                    KpiYd7.unlock();
                    
                    KpiYd8.setCaption (caption8);
                    KpiYd8.setValue (value8, {
                        valueTextColor: "#fff"
                    });
                    
                                 
                    $( "div .rfKPICaption:contains('I alt')" ).attr('id', 'KpiYd0');
                    $('#KpiYd0').parent().addClass("KPIActive");
                    // Dette er kode til hyperlinks på Kpi. Koden gentages for hver Kpi.
                    $('#dbTarget').on('click', '#KpiYd0', function (e) {
                        e.stopPropagation();
                        if ( isFilterClicked === 0 ){
                            filterChart('chart0', "select B,Q,N where O = 1 and AA = 'alle' order by A desc limit 12","Fuldtids");
                            filterChart('chart1', "select B,Q,N,AK where O = 1 and AA = 'alle' order by A desc limit 12","Gns varighed");
                            filterChart('chart2', "select B,Q,N where O = 1 and AA = 'alle' order by A desc limit 4","3 mdr");
                            filterChart('chart3', "select B,Q,N where O = 1 and AA = 'alle' order by A desc limit 12","Andel i praktik mv");    
                        }
                        else {
                            filterChart('chart0', "select B,Q,N where O = 1 and AA = 'unge' order by A desc limit 12","Fuldtids");
                            filterChart('chart1', "select B,Q,N,AK where O = 1 and AA = 'unge' order by A desc limit 12","Gns varighed");
                            filterChart('chart2', "select B,Q,N where O = 1 and AA = 'unge' order by A desc limit 4","3 mdr");
                            filterChart('chart3', "select B,Q,N where O = 1 and AA = 'unge' order by A desc limit 12","Andel i praktik mv");
                        };
                        $(this).parents('.rfComponentContainer').siblings().find('.KPIActive').removeClass("KPIActive");
                        $(this).parent().addClass("KPIActive");
                        clickedKPI = "I alt";
                        return false;                       
                    });     
                    
                    $( "div .rfKPICaption:contains('Forsikrede')" ).attr('id', 'KpiYd1');
                    // Dette er kode til hyperlinks på Kpi. Koden gentages for hver Kpi.
                    $('#dbTarget').on('click', '#KpiYd1', function (e) {
                        e.stopPropagation();
                        if ( isFilterClicked === 0 ){
                            filterChart('chart0', "select B,R,E where O = 1 and AA = 'alle' order by A desc limit 12","Fuldtids");
                            filterChart('chart1', "select B,R,E,AB where O = 1 and AA = 'alle' order by A desc limit 12","Gns varighed");
                            filterChart('chart2', "select B,R,E where O = 1 and AA = 'alle' order by A desc limit 4","3 mdr");
                            filterChart('chart3', "select B,R,E where O = 1 and AA = 'alle' order by A desc limit 12","Andel i praktik mv");    
                        }
                        else {
                            filterChart('chart0', "select B,R,E where O = 1 and AA = 'unge' order by A desc limit 12","Fuldtids");
                            filterChart('chart1', "select B,R,E,AB where O = 1 and AA = 'unge' order by A desc limit 12","Gns varighed");
                            filterChart('chart2', "select B,R,E where O = 1 and AA = 'unge' order by A desc limit 4","3 mdr");
                            filterChart('chart3', "select B,R,E where O = 1 and AA = 'unge' order by A desc limit 12","Andel i praktik mv");
                        };             
                        $(this).parents('.rfComponentContainer').siblings().find('.KPIActive').removeClass("KPIActive");
                        $(this).parent().addClass("KPIActive");
                        clickedKPI = "Forsikrede";
                        return false;
                    });
                    
                    $( "div .rfKPICaption:contains('Kontanthjælp')" ).attr('id', 'KpiYd2');
                    // Dette er kode til hyperlinks på Kpi. Koden gentages for hver Kpi.
                    $('#dbTarget').on('click', '#KpiYd2', function (e) {
                        e.stopPropagation();
                        if ( isFilterClicked === 0 ){
                            filterChart('chart0', "select B,S,F where O = 1 and AA = 'alle' order by A desc limit 12","Fuldtids");
                            filterChart('chart1', "select B,S,F,AC where O = 1 and AA = 'alle' order by A desc limit 12","Gns varighed");
                            filterChart('chart2', "select B,S,F where O = 1 and AA = 'alle' order by A desc limit 4","3 mdr");
                            filterChart('chart3', "select B,S,F where O = 1 and AA = 'alle' order by A desc limit 12","Andel i praktik mv");    
                        }
                        else {
                            filterChart('chart0', "select B,S,F where O = 1 and AA = 'unge' order by A desc limit 12","Fuldtids");
                            filterChart('chart1', "select B,S,F,AC where O = 1 and AA = 'unge' order by A desc limit 12","Gns varighed");
                            filterChart('chart2', "select B,S,F where O = 1 and AA = 'unge' order by A desc limit 4","3 mdr");
                            filterChart('chart3', "select B,S,F where O = 1 and AA = 'unge' order by A desc limit 12","Andel i praktik mv");
                        };
                        $(this).parents('.rfComponentContainer').siblings().find('.KPIActive').removeClass("KPIActive");
                        $(this).parent().addClass("KPIActive");
                        clickedKPI = "Kontanthjælp";
                        return false;
                    });
                    
                    $( "div .rfKPICaption:contains('Integrationsydelse')" ).attr('id', 'KpiYd3');
                    // Dette er kode til hyperlinks på Kpi. Koden gentages for hver Kpi.
                    $('#dbTarget').on('click', '#KpiYd3', function (e) {
                        e.stopPropagation();
                        if ( isFilterClicked === 0 ){
                            filterChart('chart0', "select B,T,G where O = 1 AND G > 0 and AA = 'alle' order by A desc limit 12","Fuldtids");
                            filterChart('chart1', "select B,T,G,AD where O = 1 AND G > 0 and AA = 'alle' order by A desc limit 12","Gns varighed");
                            filterChart('chart2', "select B,T,G where O = 1 AND G > 0 and AA = 'alle' order by A desc limit 4","3 mdr");
                            filterChart('chart3', "select B,T,G where O = 1 AND G > 0 and AA = 'alle' order by A desc limit 12","Andel i praktik mv");    
                        }
                        else {
                            filterChart('chart0', "select B,T,G where O = 1 AND G > 0 and AA = 'unge' order by A desc limit 12","Fuldtids");
                            filterChart('chart1', "select B,T,G,AD where O = 1 AND G > 0 and AA = 'unge' order by A desc limit 12","Gns varighed");
                            filterChart('chart2', "select B,T,G where O = 1 AND G > 0 and AA = 'unge' order by A desc limit 4","3 mdr");
                            filterChart('chart3', "select B,T,G where O = 1 AND G > 0 and AA = 'unge' order by A desc limit 12","Andel i praktik mv");
                        };
                        $(this).parents('.rfComponentContainer').siblings().find('.KPIActive').removeClass("KPIActive");
                        $(this).parent().addClass("KPIActive");
                        clickedKPI = "Integrationsydelse";
                        return false;
                    });
                    
                    $( "div .rfKPICaption:contains('Uddannelseshjælp')" ).attr('id', 'KpiYd4');
                    // Dette er kode til hyperlinks på Kpi. Koden gentages for hver Kpi.
                    $('#dbTarget').on('click', '#KpiYd4', function (e) {
                        e.stopPropagation();
                        if ( isFilterClicked === 0 ){
                            filterChart('chart0', "select B,U,H where O = 1 and AA = 'alle' order by A desc limit 12","Fuldtids");
                            filterChart('chart1', "select B,U,H,AE where O = 1 and AA = 'alle' order by A desc limit 12","Gns varighed");
                            filterChart('chart2', "select B,U,H where O = 1 and AA = 'alle' order by A desc limit 4","3 mdr");
                            filterChart('chart3', "select B,U,H where O = 1 and AA = 'alle' order by A desc limit 12","Andel i praktik mv");    
                        }
                        else {
                            filterChart('chart0', "select B,U,H where O = 1 and AA = 'unge' order by A desc limit 12","Fuldtids");
                            filterChart('chart1', "select B,U,H,AE where O = 1 and AA = 'unge' order by A desc limit 12","Gns varighed");
                            filterChart('chart2', "select B,U,H where O = 1 and AA = 'unge' order by A desc limit 4","3 mdr");
                            filterChart('chart3', "select B,U,H where O = 1 and AA = 'unge' order by A desc limit 12","Andel i praktik mv");
                        };
                        $(this).parents('.rfComponentContainer').siblings().find('.KPIActive').removeClass("KPIActive");
                        $(this).parent().addClass("KPIActive");
                        clickedKPI = "Uddannelseshjælp";
                        return false;                     
                    });
                    
                    $( "div .rfKPICaption:contains('Ledighedsydelse')" ).attr('id', 'KpiYd5');
                    // Dette er kode til hyperlinks på Kpi. Koden gentages for hver Kpi.
                    $('#dbTarget').on('click', '#KpiYd5', function (e) {
                        e.stopPropagation();
                        if ( isFilterClicked === 0 ){
                            filterChart('chart0', "select B,V,I where O = 1 and AA = 'alle' order by A desc limit 12","Fuldtids");
                            filterChart('chart1', "select B,V,I,AF where O = 1 and AA = 'alle' order by A desc limit 12","Gns varighed");
                            filterChart('chart2', "select B,V,I where O = 1 and AA = 'alle' order by A desc limit 4","3 mdr");
                            filterChart('chart3', "select B,V,I where O = 1 and AA = 'alle' order by A desc limit 12","Andel i praktik mv");    
                        }
                        else {
                            filterChart('chart0', "select B,V,I where O = 1 and AA = 'unge' order by A desc limit 12","Fuldtids");
                            filterChart('chart1', "select B,V,I,AF where O = 1 and AA = 'unge' order by A desc limit 12","Gns varighed");
                            filterChart('chart2', "select B,V,I where O = 1 and AA = 'unge' order by A desc limit 4","3 mdr");
                            filterChart('chart3', "select B,V,I where O = 1 and AA = 'unge' order by A desc limit 12","Andel i praktik mv");
                        };
                        $(this).parents('.rfComponentContainer').siblings().find('.KPIActive').removeClass("KPIActive");
                        $(this).parent().addClass("KPIActive");
                        clickedKPI = "Ledighedsydelse";
                        return false;
                    });  
                    $( "div .rfKPICaption:contains('Sygedagpenge og jobafklaring')" ).attr('id', 'KpiYd6');
                    // Dette er kode til hyperlinks på Kpi. Koden gentages for hver Kpi.
                    $('#dbTarget').on('click', '#KpiYd6', function (e) {
                        e.stopPropagation();
                        if ( isFilterClicked === 0 ){
                            filterChart('chart0', "select B,J,K where O = 1 and AA = 'alle' order by A desc limit 12","Fuldtids");
                            filterChart('chart1', "select B,J,K,AG where O = 1 and AA = 'alle' order by A desc limit 12","Gns varighed");
                            filterChart('chart2', "select B,J,K where O = 1 AND J > 0 and AA = 'alle' order by A desc limit 4","3 mdr");
                            filterChart('chart3', "select B,J,K where O = 1 and AA = 'alle' order by A desc limit 12","Andel i praktik mv");    
                        }
                        else {
                            filterChart('chart0', "select B,J,K where O = 1 and AA = 'unge' order by A desc limit 12","Fuldtids");
                            filterChart('chart1', "select B,J,K,AG where O = 1 and AA = 'unge' order by A desc limit 12","Gns varighed");
                            filterChart('chart2', "select B,J,K where O = 1 AND J > 0 and AA = 'unge' order by A desc limit 4","3 mdr");
                            filterChart('chart3', "select B,J,K where O = 1 and AA = 'unge' order by A desc limit 12","Andel i praktik mv");
                        };
                        $(this).parents('.rfComponentContainer').siblings().find('.KPIActive').removeClass("KPIActive");
                        $(this).parent().addClass("KPIActive");
                        clickedKPI = "Sygedagpenge og jobafklaring";
                        return false;
                    });
                    $( "div .rfKPICaption:contains('Revalidering og ressourceforløb')" ).attr('id', 'KpiYd7');
                    // Dette er kode til hyperlinks på Kpi. Koden gentages for hver Kpi.
                    $('#dbTarget').on('click', '#KpiYd7', function (e) {
                        e.stopPropagation();
                        if ( isFilterClicked === 0 ){
                            filterChart('chart0', "select B,L,M where O = 1 and AA = 'alle' order by A desc limit 12","Fuldtids");
                            filterChart('chart1', "select B,L,M,AH where O = 1 and AA = 'alle' order by A desc limit 12","Gns varighed");
                            filterChart('chart2', "select B,L,M where O = 1 and AA = 'alle' order by A desc limit 4","3 mdr");
                            filterChart('chart3', "select B,L,M where O = 1 and AA = 'alle' order by A desc limit 12","Andel i praktik mv");    
                        }
                        else {
                            filterChart('chart0', "select B,L,M where O = 1 and AA = 'unge' order by A desc limit 12","Fuldtids");
                            filterChart('chart1', "select B,L,M,AH where O = 1 and AA = 'unge' order by A desc limit 12","Gns varighed");
                            filterChart('chart2', "select B,L,M where O = 1 and AA = 'unge' order by A desc limit 4","3 mdr");
                            filterChart('chart3', "select B,L,M where O = 1 and AA = 'unge' order by A desc limit 12","Andel i praktik mv");
                        };
                        $(this).parents('.rfComponentContainer').siblings().find('.KPIActive').removeClass("KPIActive");
                        $(this).parent().addClass("KPIActive");
                        clickedKPI = "Revalidering og ressourceforløb";
                        return false;
                    });
                    
                    $( "div .rfKPICaption:contains('Vis kun unge under 30 år')" ).attr('id', 'KpiYd8');
                    $('#KpiYd8').siblings().remove();
                    
                    $('#dbTarget').on('click', '#KpiYd8', function (e) {
                        e.stopPropagation();                       
                        if ( isFilterClicked === 0) {
                            isFilterClicked = 1;
                            $(this).parent().addClass("filterActive");
                            if ( clickedKPI === "I alt") {
                                filterChart('chart0', "select B,Q,N where O = 1 AND AA = 'unge' order by A desc limit 12","Fuldtids");
                                filterChart('chart1', "select B,Q,N,AK where O = 1 AND AA = 'unge' order by A desc limit 12","Gns varighed");
                                filterChart('chart2', "select B,Q,N where O = 1 AND AA = 'unge' order by A desc limit 4","3 mdr");
                                filterChart('chart3', "select B,Q,N where O = 1 AND AA = 'unge' order by A desc limit 12","Andel i praktik mv");
                            }
                            if ( clickedKPI === "Forsikrede") {
                                filterChart('chart0', "select B,R,E where O = 1 AND AA = 'unge' order by A desc limit 12","Fuldtids");
                                filterChart('chart1', "select B,R,E,AB where O = 1 AND AA = 'unge' order by A desc limit 12","Gns varighed");
                                filterChart('chart2', "select B,R,E where O = 1 AND AA = 'unge' order by A desc limit 4","3 mdr");
                                filterChart('chart3', "select B,R,E where O = 1 AND AA = 'unge' order by A desc limit 12","Andel i praktik mv");
                            }
                            if ( clickedKPI === "Kontanthjælp") {
                                filterChart('chart0', "select B,S,F where O = 1 AND AA = 'unge' order by A desc limit 12","Fuldtids");
                                filterChart('chart1', "select B,S,F,AC where O = 1 AND AA = 'unge' order by A desc limit 12","Gns varighed");
                                filterChart('chart2', "select B,S,F where O = 1 AND AA = 'unge' order by A desc limit 4","3 mdr");
                                filterChart('chart3', "select B,S,F where O = 1 AND AA = 'unge' order by A desc limit 12","Andel i praktik mv");
                            }
                            if ( clickedKPI === "Integrationsydelse") {
                                filterChart('chart0', "select B,T,G where O = 1 AND G > 0 AND AA = 'unge' order by A desc limit 12","Fuldtids");
                                filterChart('chart1', "select B,T,G,AD where O = 1 AND G > 0 AND AA = 'unge' order by A desc limit 12","Gns varighed");
                                filterChart('chart2', "select B,T,G where O = 1 AND G > 0 AND AA = 'unge' order by A desc limit 4","3 mdr");
                                filterChart('chart3', "select B,T,G where O = 1 AND G > 0 AND AA = 'unge' order by A desc limit 12","Andel i praktik mv");
                            }
                            if ( clickedKPI === "Uddannelseshjælp") {
                                filterChart('chart0', "select B,U,H where O = 1 AND AA = 'unge' order by A desc limit 12","Fuldtids");
                                filterChart('chart1', "select B,U,H,AE where O = 1 AND AA = 'unge' order by A desc limit 12","Gns varighed");
                                filterChart('chart2', "select B,U,H where O = 1 AND AA = 'unge' order by A desc limit 4","3 mdr");
                                filterChart('chart3', "select B,U,H where O = 1 AND AA = 'unge' order by A desc limit 12","Andel i praktik mv");
                            }
                            if ( clickedKPI === "Ledighedsydelse") {
                                filterChart('chart0', "select B,V,I where O = 1 AND AA = 'unge' order by A desc limit 12","Fuldtids");
                                filterChart('chart1', "select B,V,I,AF where O = 1 AND AA = 'unge' order by A desc limit 12","Gns varighed");
                                filterChart('chart2', "select B,V,I where O = 1 AND AA = 'unge' order by A desc limit 4","3 mdr");
                                filterChart('chart3', "select B,V,I where O = 1 AND AA = 'unge' order by A desc limit 12","Andel i praktik mv");
                            }
                            if ( clickedKPI === "Sygedagpenge og jobafklaring") {
                                filterChart('chart0', "select B,J,K where O = 1 AND AA = 'unge' order by A desc limit 12","Fuldtids");
                                filterChart('chart1', "select B,J,K,AG where O = 1 AND AA = 'unge' order by A desc limit 12","Gns varighed");
                                filterChart('chart2', "select B,J,K where O = 1 AND J > 0 AND AA = 'unge' order by A desc limit 4","3 mdr");
                                filterChart('chart3', "select B,J,K where O = 1 AND AA = 'unge' order by A desc limit 12","Andel i praktik mv");
                            }
                            if ( clickedKPI === "Revalidering og ressourceforløb") {
                                filterChart('chart0', "select B,L,M where O = 1 AND AA = 'unge' order by A desc limit 12","Fuldtids");
                                filterChart('chart1', "select B,L,M,AH where O = 1 AND AA = 'unge' order by A desc limit 12","Gns varighed");
                                filterChart('chart2', "select B,L,M where O = 1 AND AA = 'unge' order by A desc limit 4","3 mdr");
                                filterChart('chart3', "select B,L,M where O = 1 AND AA = 'unge' order by A desc limit 12","Andel i praktik mv");
                            }
                        }
                        else {
                            isFilterClicked = 0;
                            $(this).parent().removeClass("filterActive");
                            if ( clickedKPI === "I alt") {
                                filterChart('chart0', "select B,Q,N where O = 1 AND AA = 'alle' order by A desc limit 12","Fuldtids");
                                filterChart('chart1', "select B,Q,N,AK where O = 1 AND AA = 'alle' order by A desc limit 12","Gns varighed");
                                filterChart('chart2', "select B,Q,N where O = 1 AND AA = 'alle' order by A desc limit 4","3 mdr");
                                filterChart('chart3', "select B,Q,N where O = 1 AND AA = 'alle' order by A desc limit 12","Andel i praktik mv");
                            }
                            if ( clickedKPI === "Forsikrede") {
                                filterChart('chart0', "select B,R,E where O = 1 AND AA = 'alle' order by A desc limit 12","Fuldtids");
                                filterChart('chart1', "select B,R,E,AB where O = 1 AND AA = 'alle' order by A desc limit 12","Gns varighed");
                                filterChart('chart2', "select B,R,E where O = 1 AND AA = 'alle' order by A desc limit 4","3 mdr");
                                filterChart('chart3', "select B,R,E where O = 1 AND AA = 'alle' order by A desc limit 12","Andel i praktik mv");
                            }
                            if ( clickedKPI === "Kontanthjælp") {
                                filterChart('chart0', "select B,S,F where O = 1 AND AA = 'alle' order by A desc limit 12","Fuldtids");
                                filterChart('chart1', "select B,S,F,AC where O = 1 AND AA = 'alle' order by A desc limit 12","Gns varighed");
                                filterChart('chart2', "select B,S,F where O = 1 AND AA = 'alle' order by A desc limit 4","3 mdr");
                                filterChart('chart3', "select B,S,F where O = 1 AND AA = 'alle' order by A desc limit 12","Andel i praktik mv");
                            }
                            if ( clickedKPI === "Integrationsydelse") {
                                filterChart('chart0', "select B,T,G where O = 1 AND G > 0 AND AA = 'alle' order by A desc limit 12","Fuldtids");
                                filterChart('chart1', "select B,T,G,AD where O = 1 AND G > 0 AND AA = 'alle' order by A desc limit 12","Gns varighed");
                                filterChart('chart2', "select B,T,G where O = 1 AND G > 0 AND AA = 'alle' order by A desc limit 4","3 mdr");
                                filterChart('chart3', "select B,T,G where O = 1 AND G > 0 AND AA = 'alle' order by A desc limit 12","Andel i praktik mv");
                            }
                            if ( clickedKPI === "Uddannelseshjælp") {
                                filterChart('chart0', "select B,U,H where O = 1 AND AA = 'alle' order by A desc limit 12","Fuldtids");
                                filterChart('chart1', "select B,U,H,AE where O = 1 AND AA = 'alle' order by A desc limit 12","Gns varighed");
                                filterChart('chart2', "select B,U,H where O = 1 AND AA = 'alle' order by A desc limit 4","3 mdr");
                                filterChart('chart3', "select B,U,H where O = 1 AND AA = 'alle' order by A desc limit 12","Andel i praktik mv");
                            }
                            if ( clickedKPI === "Ledighedsydelse") {
                                filterChart('chart0', "select B,V,I where O = 1 AND AA = 'alle' order by A desc limit 12","Fuldtids");
                                filterChart('chart1', "select B,V,I,AF where O = 1 AND AA = 'alle' order by A desc limit 12","Gns varighed");
                                filterChart('chart2', "select B,V,I where O = 1 AND AA = 'alle' order by A desc limit 4","3 mdr");
                                filterChart('chart3', "select B,V,I where O = 1 AND AA = 'alle' order by A desc limit 12","Andel i praktik mv");
                            }
                            if ( clickedKPI === "Sygedagpenge og jobafklaring") {
                                filterChart('chart0', "select B,J,K where O = 1 AND AA = 'alle' order by A desc limit 12","Fuldtids");
                                filterChart('chart1', "select B,J,K,AG where O = 1 AND AA = 'alle' order by A desc limit 12","Gns varighed");
                                filterChart('chart2', "select B,J,K where O = 1 AND J > 0 AND AA = 'alle' order by A desc limit 4","3 mdr");
                                filterChart('chart3', "select B,J,K where O = 1 AND AA = 'alle' order by A desc limit 12","Andel i praktik mv");
                            }
                            if ( clickedKPI === "Revalidering og ressourceforløb") {
                                filterChart('chart0', "select B,L,M where O = 1 AND AA = 'alle' order by A desc limit 12","Fuldtids");
                                filterChart('chart1', "select B,L,M,AH where O = 1 AND AA = 'alle' order by A desc limit 12","Gns varighed");
                                filterChart('chart2', "select B,L,M where O = 1 AND AA = 'alle' order by A desc limit 4","3 mdr");
                                filterChart('chart3', "select B,L,M where O = 1 AND AA = 'alle' order by A desc limit 12","Andel i praktik mv");
                            }
                        }
                        return false;
                    });
                                       
                    // addTooltip({
                    //     kpiId: "KpiYd0",
                    //     dateInput: String(myData.getValue(0, 1)),
                    //     prefix: "Fuldtidspersoner "
                    // });

                    // addTooltip({
                    //     kpiId: "KpiYd1",
                    //     dateInput: String(myData.getValue(1, 1)),
                    //     prefix: "Fuldtidspersoner "
                    // });

                });
            };
            google.charts.setOnLoadCallback(initialize); 
            
                //--------------------
                function filterChart(chartName, paramQuery,paramSheet){
                    chartObj[chartName]['chart'].lock();
                    chartObj[chartName]['chart'].clearChart();

                    function initializeFilter() {
                        var filterKey = "1lu2D6Mc2m0JuZUdm6suX-6gNxutMdhQgm-Q1B88KeoU";
                        var filterSheet = 'Fuldtids';
                        var filterWhereCond = "\"" + paramQuery + "\"";
                        var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + filterKey + "/gviz/tq?sheet=" + paramSheet);
                        query.setQuery(paramQuery);
                        query.send(function processResponse(response) {
                            var filterData = response.getDataTable();

                            var arrayLabels = [];
                            var arrayHeadings = [];

                            var myNumberOfDataColumns = filterData.getNumberOfColumns(0) - 1;
                            var myNumberOfRows = filterData.getNumberOfRows(0);

                            var arrayInput = [];
                            for (var x = 1; x <= myNumberOfDataColumns; x++) {
                                var arrayElement = "arrayInput" + x;
                                arrayInput[arrayElement] = [];
                                for (var e = myNumberOfRows-1; e >= 0 ; e--) {
                                // for (var e = 0; e < myNumberOfRows ; e++) {
                                    arrayInput[arrayElement].push(filterData.getValue(e, x).toFixed(1));
                                }
                            }
                            for (var i = myNumberOfRows-1; i >= 0 ; i--) {
                            // for (var i = 0; i < myNumberOfRows ; i++) {
                                arrayLabels.push(filterData.getValue(i, 0));
                            };

                            for (var h = 1; h <= myNumberOfDataColumns ; h++) {
                                arrayHeadings.push(filterData.getColumnLabel(h));
                            };


                            
                            // chartObj[chartName]['chart'].addSeries("deakljoi2", arrayHeadings[0], arrayInput["arrayInput1"], {seriesDisplayType:'line'});
                            if ( arrayInput["arrayInput1"].length === 0 || !arrayInput["arrayInput1"].length){
                                chartObj[chartName]['chart'].setLabels(['Ingen data']);
                                chartObj[chartName]['chart'].addSeries("deakljoi2", arrayHeadings[0], [1], {seriesDisplayType:'line',seriesColor: 'ffffff'});
                            }
                            
                            if( myNumberOfDataColumns >= 1 && arrayInput["arrayInput1"].length > 0 ) {
                                chartObj[chartName]['chart'].setLabels(arrayLabels);
                                chartObj[chartName]['chart'].addSeries("deakljoi2", arrayHeadings[0], arrayInput["arrayInput1"], {seriesDisplayType:'line'});    
                            }
                            
                            if( myNumberOfDataColumns >= 2 && arrayInput["arrayInput2"].length > 0 ) {
                                chartObj[chartName]['chart'].addSeries("deakljoi3", arrayHeadings[1], arrayInput["arrayInput2"], {seriesDisplayType:'line'});    
                            }
                            if( myNumberOfDataColumns >= 3 && arrayInput["arrayInput3"].length > 0){
                                chartObj[chartName]['chart'].addSeries("deakljoi4", arrayHeadings[2], arrayInput["arrayInput3"], {seriesDisplayType:'line'});    
                            }
                            if( myNumberOfDataColumns >= 4 && arrayInput["arrayInput4"].length > 0) {
                                chartObj[chartName]['chart'].addSeries("deakljoi5", arrayHeadings[3], arrayInput["arrayInput4"], {seriesDisplayType:'line'});    
                            }
                            
                            chartObj[chartName]['chart'].unlock();
                        });
                    }

                    google.charts.setOnLoadCallback(initializeFilter);
                };
                //--------------------            
            
        };

        addMyKpi("Kpi2", "1lu2D6Mc2m0JuZUdm6suX-6gNxutMdhQgm-Q1B88KeoU");


        function addMyFilterChart(options) {
            var chartType = options.chartType || 'line'
            var isStacked = options.isStacked || false
            var chartHeight = options.chartHeight || 4
            var chartWidth = options.chartWidth || 4
            var myKey = options.myKey
            var mySheet = options.mySheet
            var myQuery = options.myQuery
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
            db.addComponent(chartObj[chartName]['chart']);

            var whatId = chartObj[chartName]['chart'].getID();
            
            
            function initialize(){
                // The URL of the spreadsheet to source data from.
                var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + myKey + "/gviz/tq?sheet=" + mySheet);
                query.setQuery(myQuery);
                query.send(function processResponse(response) {
                    var myData = response.getDataTable();
                    
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


                    chartObj[chartName]['chart'].setLabels(arrayLabels);

                    chartObj[chartName]['chart'].addSeries("deakljoi0", arrayHeadings[0], arrayInput["arrayInput1"], {
                        //numberDecimalSeparator: ",",
                        //numberThousandsSeparator: ".",
                        seriesStacked: isStacked,
                        seriesDisplayType: chartType
                    });

                    chartObj[chartName]['chart'].addSeries("deakljoi1", arrayHeadings[1], arrayInput["arrayInput2"], {
                        //numberDecimalSeparator: ",",
                        //numberThousandsSeparator: ".",
                        seriesStacked: isStacked,
                        seriesDisplayType: chartType
                    });
                    if( myNumberOfDataColumns >= 3){
                        chartObj[chartName]['chart'].addSeries("deakljoi2", arrayHeadings[2], arrayInput["arrayInput3"], {seriesDisplayType:'line'});    
                    };
                    if( myNumberOfDataColumns >= 4){
                        chartObj[chartName]['chart'].addSeries("deakljoi3", arrayHeadings[3], arrayInput["arrayInput4"], {seriesDisplayType:'line'});    
                    };
                    
                    
                    // Don't forget to call unlock or the data won't be displayed
                    chartObj[chartName]['chart'].unlock();
                });
            };
            google.charts.setOnLoadCallback(initialize);
        };
        
        addMyFilterChart({
            myKey: "1lu2D6Mc2m0JuZUdm6suX-6gNxutMdhQgm-Q1B88KeoU",
            mySheet: 'Fuldtids',
            myQuery: "SELECT B,Q,N WHERE O=1 and AA = 'alle' order by A desc LIMIT 12",
            chartWidth: 12,
            chartHeight: 5,
            isStacked: false,
            showLegend: true,
            chartType: "line",
            chartName: "chart0",
            chartCaption: "Antal fuldtidspersoner"
        });
        
        addMyFilterChart({
            myKey: "1lu2D6Mc2m0JuZUdm6suX-6gNxutMdhQgm-Q1B88KeoU",
            mySheet: 'Gns varighed',
            myQuery: "select B,Q,N,AK where O = 1 and AA = 'alle' order by A desc limit 12",
            chartWidth: 12,
            chartHeight: 5,
            isStacked: false,
            showLegend: true,
            chartType: "line",
            chartName: "chart1",
            chartCaption: "Gennemsnitlig varighed"
        });
        addMyFilterChart({
            myKey: "1lu2D6Mc2m0JuZUdm6suX-6gNxutMdhQgm-Q1B88KeoU",
            mySheet: '3 mdr',
            myQuery: "select B,Q,N where O = 1 and AA='alle' order by A desc limit 4",
            chartWidth: 12,
            chartHeight: 5,
            isStacked: false,
            showLegend: true,
            chartType: "line",
            chartName: "chart2",
            chartCaption: "Andel i beskæftigelse efter 3 måneder"
        });
        addMyFilterChart({
            myKey: "1lu2D6Mc2m0JuZUdm6suX-6gNxutMdhQgm-Q1B88KeoU",
            mySheet: 'Andel i praktik mv',
            myQuery: "select B,Q,N where O = 1 and AA='alle' order by A desc limit 12",
            chartWidth: 12,
            chartHeight: 5,
            isStacked: false,
            showLegend: true,
            chartType: "line",
            chartName: "chart3",
            chartCaption: "Andel i virksomhedspratik eller løntilskud"
        });
        

    });
