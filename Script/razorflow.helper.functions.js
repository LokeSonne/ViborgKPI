function filtering(unfilteredData, filteredData, filterKey, filterValue) {
    unfilteredData.filter(function (item) {
        var filterKeyName = filterKey;
        if (item[filterKeyName] === filterValue) {
            filteredData.push(item);
        }
    });
    return filteredData;
};


function alignSeries(objIn, objOut, categoryParam, seriesParam) {
    //Quit if objIn has no elements
    if (typeof objIn !== 'undefined'){
        if (objIn.length !== 0) {
            //Add distinct values of series names to array seriesKey
            var seriesKey = [];
            var unique = {};
            //Get array with unique values of series
            if (typeof seriesParam !== 'undefined') {
                for (var i in objIn) {
                    if (typeof (unique[objIn[i][seriesParam]]) == "undefined") {
                        seriesKey.push(objIn[i][seriesParam]);
                    }
                    unique[objIn[i][seriesParam]] = 0;
                }
            }
            //If seriesParam doesn't corrospond to a key in objIn then use seriesParam as series name
            if (typeof seriesKey[0] === 'undefined') {
                seriesKey[0] = seriesParam;
                var lastSeriesKeyIndex = 0;
                var lastElementIndex = 0;
                lastElementIndex = objIn.length;
                for (var i = 0; i < lastElementIndex; ++i) {
                    element = objIn[i];
                    //If category element doesn't exists add this one
                    if (!(element[categoryParam] in objOut)) {
                        objOut[element[categoryParam]] = {}
                        //For the newly created category element, add series with seriesParam as name and assign value of 0
                        if (seriesParam !== 'undefined') {
                            var seriesArr = [];
                            seriesArr.push(seriesKey[0])
                            objOut[element[categoryParam]][seriesArr] = 0;
                        }
                    }
                    //If category already exists add 1 to the value
                    objOut[element[categoryParam]][seriesParam] += 1;
                }
                return objOut;
            }
            else {
                seriesKey.sort();
                var lastSeriesKeyIndex = 0;
                lastSeriesKeyIndex = seriesKey.length;
                var lastElementIndex = 0;
                lastElementIndex = objIn.length;
                for (var i = 0; i < lastElementIndex; ++i) {
                    element = objIn[i];
                    //If category element doesn't exists add this one
                    if (!(element[categoryParam] in objOut)) {
                        objOut[element[categoryParam]] = {}
                        //For the newly created category element, add every series name element and assign value of 0
                        if (seriesParam !== 'undefined') {
                            for (var e = 0; e < lastSeriesKeyIndex; ++e) {
                                var seriesArr = [];
                                seriesArr.push(seriesKey[e])
                                objOut[element[categoryParam]][seriesArr] = 0;
                            }
                        }
                    }
                    //If category already exists add 1 to the value
                    objOut[element[categoryParam]][element[seriesParam]] += 1;
                }
                return objOut;
            }
        }
    }
    return false;
}

function addDrillstepChart(options) {

    var dataUrl = options.dataUrl
    var myChartName = options.myChartName
    var chartCaption = options.chartCaption
    var chartType = options.chartType || 'column'
    var isStacked = options.isStacked || false
    var chartHeight = options.chartHeight || 4
    var chartWidth = options.chartWidth || 4
    var showLegend = options.showLegend || true
    var baseObj = options.baseObj
    var filterKeyLevel1 = options.filterKeyLevel1
    var filterValueLevel1 = options.filterValueLevel1
    var categoriesLevel1 = options.categoriesLevel1
    var seriesLevel1 = options.seriesLevel1
    var categoriesLevel2 = options.categoriesLevel2
    var seriesLevel2 = options.categoriesLevel2
    var categoriesLevel3 = options.categoriesLevel3
    var seriesLevel3 = options.categoriesLevel3

    var chartName = new ChartComponent();
    chartName.setDimensions(chartWidth, chartHeight);
    chartName.setYAxis("", { numberDecimalPoints: 2, numberDecimalsSeparator: ",", numberThousandsSeparator: "." });
    chartName.setCaption(chartCaption);
    chartName.lock();
    db.addComponent(chartName);
    var resultLevel1;

    $.when($.getJSON(dataUrl))
    .then(function (baseObj) {
        if (typeof baseObj !== "undefined"){
            if (baseObj.length !== 0) {
                //If a key and value for filtering the data is defined, then the following will execute. Else, the unfiltered data is used.
                var filteredObjLevel1 = {};
                if (typeof filterKeyLevel1 !== "undefined" && filterValueLevel1 !== "undefined") {
                    var filteredObjLevel1 = {};
                    filtering(baseObj, filteredObjLevel1, filterKeyLevel1, filterValueLevel1);
                }
                else {
                    filteredObjLevel1 = baseObj;
                };
                var chartDataObject = [];
                chartDataObject.filteredObjLevel1 = filteredObjLevel1;
                return chartDataObject;
            }
        }
        return false;
    })
    .then(function (chartDataObject) {
        var seriesObjLevel1 = [];
        alignSeries(chartDataObject.filteredObjLevel1, seriesObjLevel1, categoriesLevel1, seriesLevel1);
        chartDataObject.seriesObjLevel1 = seriesObjLevel1;
        return chartDataObject;
    })
    .then(function (chartDataObject) {
        var categories = Object.keys(chartDataObject.seriesObjLevel1);
        var seriesArray = Object.keys(chartDataObject.seriesObjLevel1[categories[0]]);
        var dataArrayCollection = [];

        for (var g = 0; g < seriesArray.length; ++g) {
            var dataArray = [];
            for (var o = 0; o < categories.length; ++o) {
                dataArray.push(chartDataObject.seriesObjLevel1[categories[o]][seriesArray[g]]);
            }
            dataArrayCollection.push(dataArray);
        };

        chartName.setLabels(categories);
        for (var f = 0; f < seriesArray.length; ++f) {
            chartName.addSeries("series" + f, seriesArray[f], dataArrayCollection[f], {
                seriesDisplayType: chartType,
                seriesStacked: isStacked,
            });
        };
        chartName.unlock();

        resultLevel1 = chartDataObject;
        return chartDataObject;
    });


    var resultLevel2;
    if (typeof categoriesLevel2 !== 'undefined') {
        chartName.addDrillStep(function (done, params) {
            var filteredObjLevel2 = [];
            $.when(filtering(resultLevel1.filteredObjLevel1, filteredObjLevel2, categoriesLevel1, params.label))
            .then(function (filteredObjOut) {
                resultLevel1.filteredObjLevel2 = filteredObjLevel2;
                var chartDataObject = resultLevel1;
                return chartDataObject;
            })
            .then(function (chartDataObject) {
                // TODO: Perhaps add parameter for series key. For now, the series key from level 1 is passed through.
                var seriesObjLevel2 = [];
                alignSeries(chartDataObject.filteredObjLevel2, seriesObjLevel2, categoriesLevel2, seriesLevel1);
                var categories = [];
                var categories = Object.keys(seriesObjLevel2);
                var seriesArray = Object.keys(seriesObjLevel2[categories[0]]);
                var dataArrayCollection = [];

                for (var g = 0; g < seriesArray.length; ++g) {
                    var dataArray = [];
                    for (var o = 0; o < categories.length; ++o) {
                        dataArray.push(seriesObjLevel2[categories[o]][seriesArray[g]]);
                    }
                    dataArrayCollection.push(dataArray);
                };
                chartName.setLabels(categories);

                for (var f = 0; f < seriesArray.length; ++f) {
                    chartName.addSeries("series" + f + "2", seriesArray[f], dataArrayCollection[f], {
                        seriesDisplayType: chartType,
                        seriesStacked: isStacked
                    });
                }
                done();
                resultLevel2 = chartDataObject;
                return chartDataObject;
            });
        });
    };


    var resultLevel3;
    if (typeof categoriesLevel3 !== 'undefined') {
        chartName.addDrillStep(function (done, params) {
            var filteredObjLevel3 = [];
            $.when(filtering(resultLevel2.filteredObjLevel2, filteredObjLevel3, categoriesLevel2, params.label))
            .then(function (filteredObjOut) {
                resultLevel2.filteredObjLevel3 = filteredObjLevel3;
                var chartDataObject = resultLevel2;
                return chartDataObject;
            })
            .then(function (chartDataObject) {
                // TODO: Perhaps add parameter for series key. For now, the series key from level 1 is passed through.
                var seriesObjLevel3 = [];
                alignSeries(chartDataObject.filteredObjLevel3, seriesObjLevel3, categoriesLevel3, seriesLevel1);
                var categories = [];
                var categories = Object.keys(seriesObjLevel3);
                var seriesArray = Object.keys(seriesObjLevel3[categories[0]]);
                var dataArrayCollection = [];

                for (var g = 0; g < seriesArray.length; ++g) {
                    var dataArray = [];
                    for (var o = 0; o < categories.length; ++o) {
                        dataArray.push(seriesObjLevel3[categories[o]][seriesArray[g]]);
                    }
                    dataArrayCollection.push(dataArray);
                };
                chartName.setLabels(categories);

                for (var f = 0; f < seriesArray.length; ++f) {
                    chartName.addSeries("series" + f + "2", seriesArray[f], dataArrayCollection[f], {
                        seriesDisplayType: chartType,
                        seriesStacked: isStacked
                    });
                }
                done();
                resultLevel3 = chartDataObject;
                return chartDataObject;
            });
        });
    };
};

function addDrillstepChartWithFilter(options) {

    var dataUrl = options.dataUrl
    var dataUrlParams = options.dataUrlParams
    var chartName = options.chartName
    var chartCaption = options.chartCaption
    var chartType = options.chartType || 'column'
    var isStacked = options.isStacked || false
    var chartHeight = options.chartHeight || 4
    var chartWidth = options.chartWidth || 4
    var showLegend = options.showLegend || true
    var baseObj = options.baseObj
    var filterKeyLevel1 = options.filterKeyLevel1
    var filterValueLevel1 = options.filterValueLevel1
    var categoriesLevel1 = options.categoriesLevel1
    var seriesLevel1 = options.seriesLevel1
    var categoriesLevel2 = options.categoriesLevel2
    var seriesLevel2 = options.categoriesLevel2
    var categoriesLevel3 = options.categoriesLevel3
    var seriesLevel3 = options.categoriesLevel3

    //Add chart component to the property named chart of the global object chartObj
    //Why? To ne able to let the formfilter refer to it
    chartObj[chartName] = {};
    chartObj[chartName]['chart'] = new ChartComponent();
    chartObj[chartName]['chart'].setDimensions(chartWidth, chartHeight);
    chartObj[chartName]['chart'].setDimensions(chartWidth, chartHeight);
    chartObj[chartName]['chart'].setYAxis("", { numberDecimalPoints: 2, numberDecimalsSeparator: ",", numberThousandsSeparator: "." });
    chartObj[chartName]['chart'].setCaption(chartCaption);
    chartObj[chartName]['chart'].lock();
    chartObj[chartName]['resultLevel1'] = {};
    chartObj[chartName]['resultLevel2'] = {};
    chartObj[chartName]['resultLevel3'] = {};
    chartObj[chartName]['dataUrl'] = dataUrl;
    chartObj[chartName]['dataUrlParams'] = dataUrlParams;
    chartObj[chartName]['filterKeyLevel1'] = filterKeyLevel1;
    chartObj[chartName]['categoriesLevel1'] = categoriesLevel1;
    chartObj[chartName]['seriesLevel1'] = seriesLevel1;
    chartObj[chartName]['isStacked'] = isStacked;
    chartObj[chartName]['chartType'] = chartType;

    db.addComponent(chartObj[chartName]['chart']);
    var slashUri = "/";
    $.when($.getJSON(dataUrl.concat(slashUri).concat(dataUrlParams)))
    .then(function (baseObj) {
        if (typeof baseObj !== "undefined"){
            if (baseObj.lenght !== 0) {
                //If a key and value for filtering the data is defined, then the following will execute. Else, the unfiltered data is used.
                var filteredObjLevel1 = {};
                if (typeof filterKeyLevel1 !== "undefined" && filterValueLevel1 !== "undefined") {
                    var filteredObjLevel1 = {};
                    filtering(baseObj, filteredObjLevel1, filterKeyLevel1, filterValueLevel1);
                }
                else {
                    filteredObjLevel1 = baseObj;
                };
                var chartDataObject = [];
                chartDataObject.filteredObjLevel1 = filteredObjLevel1;
                return chartDataObject;
            }
        }
        return false;
    })
    .then(function (chartDataObject) {
        var seriesObjLevel1 = [];
        alignSeries(chartDataObject.filteredObjLevel1, seriesObjLevel1, categoriesLevel1, seriesLevel1);
        chartDataObject.seriesObjLevel1 = seriesObjLevel1;
        return chartDataObject;
    })
    .then(function (chartDataObject) {
        var categories = Object.keys(chartDataObject.seriesObjLevel1);
        var seriesArray = Object.keys(chartDataObject.seriesObjLevel1[categories[0]]);
        var dataArrayCollection = [];

        for (var g = 0; g < seriesArray.length; ++g) {
            var dataArray = [];
            for (var o = 0; o < categories.length; ++o) {
                dataArray.push(chartDataObject.seriesObjLevel1[categories[o]][seriesArray[g]]);
            }
            dataArrayCollection.push(dataArray);
        };

        chartObj[chartName]['chart'].setLabels(categories);
        for (var f = 0; f < seriesArray.length; ++f) {
            chartObj[chartName]['chart'].addSeries("series" + f, seriesArray[f], dataArrayCollection[f], {
                seriesDisplayType: chartType,
                seriesStacked: isStacked,
            });
        };
        chartObj[chartName]['chart'].unlock();

        chartObj[chartName]['resultLevel1'] = chartDataObject;
        return chartDataObject;
    });

    if (typeof categoriesLevel2 !== 'undefined') {
        chartObj[chartName]['chart'].addDrillStep(function (done, params) {
            var filteredObjLevel2 = [];
            $.when(filtering(chartObj[chartName]['resultLevel1'].filteredObjLevel1, filteredObjLevel2, categoriesLevel1, params.label))
            .then(function (filteredObjOut) {
                chartObj[chartName]['resultLevel2'].filteredObjLevel2 = filteredObjLevel2;
                var chartDataObject = chartObj[chartName]['resultLevel2'];
                return chartDataObject;
            })
            .then(function (chartDataObject) {
                // TODO: Perhaps add parameter for series key. For now, the series key from level 1 is passed through.
                var seriesObjLevel2 = [];
                alignSeries(chartDataObject.filteredObjLevel2, seriesObjLevel2, categoriesLevel2, seriesLevel1);
                var categories = [];
                var categories = Object.keys(seriesObjLevel2);
                var seriesArray = Object.keys(seriesObjLevel2[categories[0]]);
                var dataArrayCollection = [];

                for (var g = 0; g < seriesArray.length; ++g) {
                    var dataArray = [];
                    for (var o = 0; o < categories.length; ++o) {
                        dataArray.push(seriesObjLevel2[categories[o]][seriesArray[g]]);
                    }
                    dataArrayCollection.push(dataArray);
                };
                chartObj[chartName]['chart'].setLabels(categories);

                for (var f = 0; f < seriesArray.length; ++f) {
                    chartObj[chartName]['chart'].addSeries("series" + f + "2", seriesArray[f], dataArrayCollection[f], {
                        seriesDisplayType: chartType,
                        seriesStacked: isStacked
                    });
                }
                done();
                return chartDataObject;
            });
        });
    };

    if (typeof categoriesLevel3 !== 'undefined') {
        chartObj[chartName]['chart'].addDrillStep(function (done, params) {
            var filteredObjLevel3 = [];
            $.when(filtering(chartObj[chartName]['resultLevel2'].filteredObjLevel2, filteredObjLevel3, categoriesLevel2, params.label))
            .then(function (filteredObjOut) {
                chartObj[chartName]['resultLevel3'].filteredObjLevel3 = filteredObjLevel3;
                var chartDataObject = chartObj[chartName]['resultLevel3'];
                return chartDataObject;
            })
            .then(function (chartDataObject) {
                // TODO: Perhaps add parameter for series key. For now, the series key from level 1 is passed through.
                var seriesObjLevel3 = [];
                alignSeries(chartDataObject.filteredObjLevel3, seriesObjLevel3, categoriesLevel3, seriesLevel1);
                var categories = [];
                var categories = Object.keys(seriesObjLevel3);
                var seriesArray = Object.keys(seriesObjLevel3[categories[0]]);
                var dataArrayCollection = [];

                for (var g = 0; g < seriesArray.length; ++g) {
                    var dataArray = [];
                    for (var o = 0; o < categories.length; ++o) {
                        dataArray.push(seriesObjLevel3[categories[o]][seriesArray[g]]);
                    }
                    dataArrayCollection.push(dataArray);
                };
                chartObj[chartName]['chart'].setLabels(categories);

                for (var f = 0; f < seriesArray.length; ++f) {
                    chartObj[chartName]['chart'].addSeries("series" + f + "2", seriesArray[f], dataArrayCollection[f], {
                        seriesDisplayType: chartType,
                        seriesStacked: isStacked
                    });
                }
                done();
                return chartDataObject;
            });
        });
    };
};

function filteredChart(filterChartName,param1,param2) {
    //var defaultPeriodEndDate = moment(inputValues['id'][1]).format('YYYY-MM-DD');
    //var defaultPeriodStartDate = moment(inputValues['id'][0]).format('YYYY-MM-DD');
    var baseUri = chartObj[filterChartName]['dataUrl'];
    var slashUri = "/";
    var fullUri = baseUri.concat(slashUri).concat(param1).concat(slashUri).concat(param2);


    $.when($.getJSON(fullUri))
    .then(function (baseObj) {
        if (baseObj.length !== 0) {
            //If a key and value for filtering the data is defined, then the following will execute. Else, the unfiltered data is used.
            var filteredObjLevel1 = {};
            if (typeof filterKeyLevel1 !== "undefined" && filterValueLevel1 !== "undefined") {
                var filteredObjLevel1 = {};
                filtering(baseObj, filteredObjLevel1, filterKeyLevel1, filterValueLevel1);
            }
            else {
                filteredObjLevel1 = baseObj;
            };

            //// Filter rows which fall between a range of values
            //if (filterForm.isFieldSet('id')) {
            //    filteredObjLevel1 = rf._.filter(filteredObjLevel1, function (row) {
            //        return row['startDateTimeRf'] >= inputValues['id'][0] && row['startDateTimeRf'] <= inputValues['id'][1]
            //    })
            //}

            // Filter rows which fall between a range of dates
            //var filteredObjLevel1 = filteredObjLevel1.filter(
            //        function (a) {
            //            var startDateTime2 = new Date(a.startDateTime)
            //            return (startDateTime2) >= inputValues['id'][0] && (startDateTime2) <= inputValues['id'][1];
            //        });

            var chartDataObject = [];
            chartDataObject.filteredObjLevel1 = filteredObjLevel1;
            return chartDataObject;
        }
        $("div.errorNoData").html("<p>Ingen data i den valgte periode</p>");
        return false;
    })
    .then(function (chartDataObject) {
        var seriesObjLevel1 = [];
        alignSeries(chartDataObject.filteredObjLevel1, seriesObjLevel1, chartObj[filterChartName]['categoriesLevel1'], chartObj[filterChartName]['seriesLevel1']);
        chartDataObject.seriesObjLevel1 = seriesObjLevel1;
        if (typeof seriesObjLevel1 !== "undefined") {
            return chartDataObject;
        }
        return false;
    })
    .then(function (chartDataObject) {
        if (typeof chartDataObject.seriesObjLevel1 !== "undefined") {
            var categories = Object.keys(chartDataObject.seriesObjLevel1);
            var seriesArray = Object.keys(chartDataObject.seriesObjLevel1[categories[0]]);
            var dataArrayCollection = [];

            for (var g = 0; g < seriesArray.length; ++g) {
                var dataArray = [];
                for (var o = 0; o < categories.length; ++o) {
                    dataArray.push(chartDataObject.seriesObjLevel1[categories[o]][seriesArray[g]]);
                }
                dataArrayCollection.push(dataArray);
            };
            chartObj[filterChartName]['chart'].lock();
            chartObj[filterChartName]['chart'].clearChart();
            chartObj[filterChartName]['chart'].resetBreadCrumbs();
            chartObj[filterChartName]['chart'].setLabels(categories);
            for (var f = 0; f < seriesArray.length; ++f) {
                chartObj[filterChartName]['chart'].addSeries("series" + f, seriesArray[f], dataArrayCollection[f], {
                    seriesDisplayType: chartObj[filterChartName]['chartType'],
                    seriesStacked: chartObj[filterChartName]['isStacked'],
                });
            };
            chartObj[filterChartName]['chart'].unlock();

            resultLevel1 = chartDataObject;
            chartObj[filterChartName]['resultLevel1'] = chartDataObject;


            //Activates close menu button. TODO: Build this into the menu.js code
            var closeMenuButton = document.getElementById("closeMenuButton");
            closeMenuButton.click();
            $("div.errorNoData").empty();
            return chartDataObject;
        }
        return false;
    });
};