var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/waypoints.gpx', function(err, data) {
    parser.parseString(data, function (err, result) {
        console.dir(result);
        var displayName = result.extensions.display_name;
	result.name = displayNAme;
    });
});