const wikiUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&titles="


function random() {
  window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank")
}

function query() {
  var sHtml = "";
  var q = $("#query").val();
  var qString = "";
  q = q.split(" ");
  q.forEach(function(el) {
    qString += "_" + el;

  });


  $.ajax({
    type: "GET",
    url: "https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=" + qString + "&prop=revisions&rvprop=content&callback=?",
    data: {},
    dataType: "json",
    headers: {
      'Api-User-Agent': 'Conor/creagh'
    },
    success: function(data) {
      // alert(JSON.stringify(data));
      console.log(data.query.search);
      for (i in data.query.search) {
        var title = data.query.search[i].title.split(" ").join("_");
        sHtml += "<p>" + "<a href = 'https://en.wikipedia.org/wiki/" + title + "'" + "target='_blank'" + ">" + data.query.search[i].title + "</a>" + "<br>" + data.query.search[i].snippet + "</br></p>";
        // console.log(data.query.search[i]);
        console.log(sHtml);

      }
      $("#search-results").html(sHtml);

    },
    error: function(err) {
      console.log("error: " + JSON.stringify(err));
    }
  });
}
