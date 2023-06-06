document.addEventListener("DOMContentLoaded", function() {
    function plotCandlestickGraph() {
        var startDate = document.getElementById("start-date").value;
        var endDate = document.getElementById("end-date").value;

        // Load the data
        Plotly.d3.csv("predicted.csv", function(err, rows) {
            var df = [];
            for (var i = 0; i < rows.length; i++) {
                df.push({
                    Date: rows[i].Date,
                    Open: parseFloat(rows[i].Open),
                    High: parseFloat(rows[i].High),
                    Low: parseFloat(rows[i].Low),
                    Close: parseFloat(rows[i].Close)
                });
            }

            // Filter the data based on user input
            var filteredData = df.filter(function(row) {
                var date = new Date(row.Date);
                return date >= new Date(startDate) && date <= new Date(endDate);
            });

            // Create the candlestick trace
            var candlestick = {
                x: filteredData.map(function(row) { return row.Date; }),
                open: filteredData.map(function(row) { return row.Open; }),
                high: filteredData.map(function(row) { return row.High; }),
                low: filteredData.map(function(row) { return row.Low; }),
                close: filteredData.map(function(row) { return row.Close; }),
                type: 'candlestick'
            };

            // Create the layout
            var layout = {
                title: 'Stock Candlestick Graph',
                xaxis: { title: 'Date' },
                yaxis: { title: 'Price' }
            };

            // Create the figure
            var data = [candlestick];
            Plotly.newPlot('chart', data, layout);
        });
    }

    window.plotCandlestickGraph = plotCandlestickGraph;
});
