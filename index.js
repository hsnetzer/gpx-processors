var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();
var builder = new xml2js.Builder({rootName: "wpt", headless: true, renderOpts: { 'pretty': true, 'indent': '', 'newline': '\n' }});
builder.rootName = "wpt";

fs.readFile(__dirname + '/' + process.argv[2], function(err, data) {
    parser.parseString(data, function (err, result) {
        let waypoints = result.gpx.wpt;

        var waypointsOut = `<?xml version="1.0" encoding="UTF-8"?><gpx>`;
        for (var i = 0; i < waypoints.length; i++) {
          var waypoint = waypoints[i];

          var label = waypoint.extensions[0].label[0].label_text[0];

          waypoint.name = [label];
          console.dir(waypoint);
          var xml = builder.buildObject(waypoint);

          waypointsOut += "\n";
          waypointsOut += xml;
        }

        waypointsOut += "</gpx>";

        fs.writeFile(__dirname + "/" + process.argv[3], waypointsOut, function(err) {
          if(err) {
            return console.log(err);
          }
          console.log("The file was saved!");
        });
    });
});
