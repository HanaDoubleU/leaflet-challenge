// map
// reference: first day's seventh activity
// center and zoom: https://www.openstreetmap.org/#map=4/38.00/-95.84
let map = L.map("map", {
    center: [38.03, -95.84],
    zoom: 4
    }      
);

// tile layer
// reference: first day's seventh activity
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
).addTo(map);

// function for markers' sizes to reflect earthquakes' magnitudes
// reference: first day's ninth activity
// typical values for earthquakes' magnitudes: https://earthquake.usgs.gov/data/comcat/index.php#mag
// xpert
function size(magnitude) {
    if (magnitude < 0) {
        return 100000 + (magnitude * 5)
    } else if (magnitude = 0) {
        return 100000
    //if (magnitude > 0)
    } else {
        return 100000 + (magnitude * 5)
    }
};

// loading data
// reference: second day's fourth activity
let earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// getting data
// reference: first day's seventh activity
d3.json(earthquakes).then(function(data) {
    // iteration and conditional for markers' fillColor to reflect earthquakes' depths
    // reference: second day's fourth activity
    // reference: just-markers.js from second day's second activity
    // typical values for earthquakes' depths: https://earthquake.usgs.gov/data/comcat/index.php#depth
    // xpert
    for (let i = 0; i < data.features.length; i++) {
        let fillColor = "";
        if (data.features[i].geometry.coordinates[2] < 10) {
            fillColor = "#f7cac9";
        } else if (data.features[i].geometry.coordinates[2] < 30) {
            fillColor = "#dec2cb";
        } else if (data.features[i].geometry.coordinates[2] < 50) {
            fillColor = "#c5b9cd";
        } else if (data.features[i].geometry.coordinates[2] < 70) {
            fillColor = "#abb1cf";
        } else if (data.features[i].geometry.coordinates[2] < 90) {
            fillColor = "#92a8d1";
        // if (data.features[i].geometry.coordinates[2] < 1000)
        } else {
            fillColor = "#3a4353"
        }

        // markers
        // reference: first day's seventh activity
        // xpert
        L.circle(data.features[i].geometry.coordinates.slice(0, 2).reverse(), {
            fillOpacity: 0.9,
            color: "white",
            fillColor: fillColor,
            radius: size(data.features[i].properties.mag)
            }
        ).bindPopup(`<h1>${data.features[i].properties.title}</h1><hr><h2>additional information:</h2><br><h3><a href=${data.features[i].properties.url}>link</a></h3>`).addTo(map);
    }

    // legend
    // reference: https://leafletjs.com/examples/choropleth/
    // xpert
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        let depths = [0, 10, 30, 50, 70, 90];
        let colors = ["#f7cac9", "#dec2cb", "#c5b9cd", "#abb1cf", "#92a8d1", "#3a4353"];
        // title
        div.innerHTML += "<h1>Earthquakes' Depths</h1>";
        // loop through intervals for colored squares
        for (let i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + ' km<br>' : '+ km<br>');
        }

        return div;
    };
    // adding to map
    legend.addTo(map);
});