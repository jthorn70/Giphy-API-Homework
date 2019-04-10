var animals = ["snakes", "cats", "dogs", "birds","rabbit","lizard","betty white","memes"];

function renderButtons() {
  $("#buttons-view").empty();

  for (var i = 0; i < animals.length; i++) {
    var a = $("<button>");
    a.addClass("animal");
    a.attr("data-animal", animals[i]);
    a.text(animals[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-animal").on("click", function(event) {
  event.preventDefault();

  var animal = $("#animal-input")
    .val()
    .trim();
  animals.push(animal);

  renderButtons();
});

renderButtons();

$(document).on("click",".animal", function(){
    $("#gifs-appear-here").empty();
    console.log("Button Click Listener Works!")
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);

    $("#animal-form").css("border-radius", "0px");
    $("#gifs-appear-here").css("border-radius", "0px 0px 25px 25px")

    $.ajax({
        url: queryURL,
        methed: "GET"
    }).then(function(response){
        var results = response.data;
        console.log(results); 

        for (var i = 0; i <results.length; i++){
            var animalDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating );
            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);
            animalDiv.append(animalImage);
            animalDiv.append(p);
            $("#gifs-appear-here").prepend(animalDiv)
        }
    })
})
