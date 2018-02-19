$(document).ready(main);

function main() {
  var quote = null;
  const api = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count2"
  $.ajax({
    type: "POST",
    url: api,
    data: {},
    dataType: 'json',
    success: function(data) {


      $("#quote").html("<p>" + data.quote + "</p><br>" + "-" + data.author + "</br>");
      quote = data;
    },
    error: function(err) {
      $("#quote").html("<p Failed with error: >" + err + "</p>");
    },
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-Mashape-Authorization", "Sk0OVzgukJmshPa2gor5Ckm51twup1FYNXojsn1FiGYglPcWRs")

    }
  });

  function tweet() {
    window.open("https://twitter.com/intent/tweet?text=" + quote.quote + "-" + quote.author, "_blank");
  }

  $("#tweet").on("click", tweet);
};
