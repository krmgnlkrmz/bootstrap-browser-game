var culturePoint = 150;
var technologyPoint = 150;
let economyPoint = 150;
let militaryPoint = 150;
let war = 150;
$(function () {

    $("#culturePoint").html('Culture (' + humanizeNumber(culturePoint) + ')');

    $("#technologyPoint").html('Technology (' + humanizeNumber(technologyPoint) + ')');

    $("#economyPoint").html('Economy (' + humanizeNumber(economyPoint) + ')');

    $("#militaryPoint").html('Military (' + humanizeNumber(militaryPoint) + ')');
    

    progressBar();
    addCulturePoint();
    addTechnologyPoint();
    addEconomyPoint();
    drawMap();
});

var countDownDate = new Date("Feb 8, 2019 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("war1").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
  document.getElementById("war2").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
  // If the count down is finished, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("war1").innerHTML = "EXPIRED";
  }
}, 1000);

$(document).ready(function() {
    $('#dtBasicExample').DataTable();
} );

$(document).ready(function() {
    $('#dtBasicExample1').DataTable();
} );

function increaseCulturePoint() {
    culturePoint = (parseInt(culturePoint) + parseInt($("#culture").val()));
    $("#culturePoint").html('Culture (' + humanizeNumber(point) + ')');
}

function increaseTechnologyPoint() {
    console.log(parseInt($("#technology1").val()));
    if ($.trim($("#technology").val()).length != 0) {
        if (parseInt($("#technology").val()) > parseFloat($("#cultureHaving").html())) {
            $(".alert").show('medium');
        } else {
            technologyPoint = (parseInt(technologyPoint) + parseInt($("#technology").val()));
        }

    }

    if ($.trim($("#technology1").val()).length != 0) {
        if (parseInt($("#technology1").val()) > parseFloat($("#economyHaving").html())) {
            $(".alert").show('medium');
        } else {
            technologyPoint = (parseInt(technologyPoint) + parseInt($("#technology1").val()));

        }
    }
    $("#technologyPoint").html('Technology (' + humanizeNumber(technologyPoint) + ')');
    progressBar();
}

function increaseEconomyPoint() {
    if ($.trim($("#economy").val()).length != 0)
        economyPoint = (parseInt(economyPoint) + parseInt($("#economy").val()));
    if ($.trim($("#economy1").val()).length != 0)
        economyPoint = (parseInt(economyPoint) + parseInt($("#economy1").val()));
    $("#economyPoint").html('Economy (' + humanizeNumber(economyPoint) + ')');
    progressBar();
}

function increaseMilitaryPoint() {
    if ($.trim($("#military").val()).length != 0)
        militaryPoint = (parseInt(militaryPoint) + parseInt($("#military").val()));

    $("#militaryPoint").html('Military (' + humanizeNumber(militaryPoint) + ')');
    progressBar();
}

function progressBar() {

    let total = culturePoint + technologyPoint + militaryPoint + economyPoint;
    let mp = (militaryPoint / total) * 100;
    let cp = (culturePoint / total) * 100;
    let tp = (technologyPoint / total) * 100;
    let ep = (economyPoint / total) * 100;
    $('#militaryPoint').css('width', mp + '%').attr('aria-valuenow', mp);
    $('#culturePoint').css('width', cp + '%').attr('aria-valuenow', cp);
    $('#technologyPoint').css('width', tp + '%').attr('aria-valuenow', tp);
    $('#economyPoint').css('width', ep + '%').attr('aria-valuenow', ep);
}

function addCulturePoint() {
    let cp = parseFloat(culturePoint / 6000);
    $(".cultureHaving").html((parseFloat($(".cultureHaving").html()) + cp).toFixed(2));
    setTimeout(addCulturePoint, 1000);
}

function addTechnologyPoint() {
    let tp = parseFloat(technologyPoint / 12000);
    $(".technologyHaving").html((parseFloat($(".technologyHaving").html()) + tp).toFixed(2));
    setTimeout(addTechnologyPoint, 1000);
}

function addEconomyPoint() {
    let ep = parseFloat(economyPoint / 24000);
    $(".economyHaving").html((parseFloat($(".economyHaving").html()) + ep).toFixed(2));
    setTimeout(addEconomyPoint, 1000);
}

  
function drawMap() {
    $("#map").html("");
    let map = new Datamap({
        element: document.getElementById('map'),
        responsive: true,
        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                if(geography.properties.name=="United States")
                $('#myModal').show();
                
            });
        },
        projection: 'mercator',
        geographyConfig: {
            highlightBorderColor: '#A9A9A9',
            highlightFillColor: '#A9A9A9',
            popupTemplate: function (geography, data) {
                return '<div class="hoverinfo">' + geography.properties.name +
                    '<br> Military Power:' + data.electoralVotes + ' '
            },
            highlightBorderWidth: 2
        },
        fills: {
            defaultFill: "#696969",
            authorHasTraveledTo: "#6f42c1"
        },
        data: {
            USA: {
                "fillKey": "authorHasTraveledTo",
                "electoralVotes": militaryPoint
            }
        }
        
    });
    map.arc([
        {
          origin: 'USA',
          destination: 'EGY'
        },
        {
            origin: {
                latitude: 39.861667,
                longitude: -300.673056
            },
            destination: {
                latitude: 35.877778,
                longitude: -78.7875,
                strokeWidth: 2
            },
            options: {
                strokeWidth: 2,
                strokeColor: 'rgba(100, 10, 200, 1)',
                greatArc: false
              }
        }
    ],
        {strokeWidth: 3, arcSharpness: 2}
        );
        
           
          
    var colors = d3.scale.category10();

    
}

function humanizeNumber(n) {
    //n = n.toString()
    //while (true) {
    //  var n2 = n.replace(/(\d)(\d{3})($|,|\.)/g, '$1.$2$3')
    //if (n == n2) break
    // n = n2
    //}
    return n
}