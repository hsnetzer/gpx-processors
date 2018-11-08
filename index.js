var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();
var builder = new xml2js.Builder({rootName: "wpt", headless: true});
builder.rootName = "wpt";

fs.readFile(__dirname + '/' + process.argv[2], function(err, data) {
    parser.parseString(data, function (err, result) {
        let waypoints = result.gpx.wpt;
        let tracks = result.gpx.track;
        var waypointsOut = `<?xml version="1.0" encoding="UTF-8"?>
<gpx xmlns="http://www.topografix.com/GPX/1/1" version="1.1" creator="ExpertGPS 6.11 using GPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.topografix.com/GPX/gpx_overlay/0/3 http://www.topografix.com/GPX/gpx_overlay/0/3/gpx_overlay.xsd http://www.topografix.com/GPX/gpx_modified/0/1 http://www.topografix.com/GPX/gpx_modified/0/1/gpx_modified.xsd">
<metadata>
<extensions>
<time xmlns="http://www.topografix.com/GPX/gpx_modified/0/1">2018-01-07T15:09:35.573Z</time>
</extensions>
</metadata>"
`;
        for (var i = 0; i < waypoints.length; i++) {
          var waypoint = waypoints[i];

          var label = waypoint.extensions[0].label[0].label_text[0];

          waypoint.name = [label];
          console.dir(waypoint);
          var xml = builder.buildObject(waypoint);

          waypointsOut += "\n";
          waypointsOut += xml;
        }

        var xml = builder.buildObject(tracks);

        waypointsOut += xml;
        waypointsOut += "</gpx>";

        fs.writeFile(__dirname + "/" + process.argv[3], waypointsOut, function(err) {
          if(err) {
            return console.log(err);
          }
          console.log("The file was saved!");
        });
    });
});
