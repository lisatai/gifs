
// Initial array of animals
var animals = ["rabbit", "horse", "squirrel"];

// Function for displaying animals data
function renderButtons() {
    $("#animal-buttons").empty();
    animals.forEach(animal => {
        let btn = $("<button>");
        btn.addClass("btn btn-secondary");
        btn.attr("data-animal", animal);
        btn.text(animal);
        $("#animal-buttons").append(btn);
    });

}

// This function handles events where one button is clicked
$("#add-animal").on("click", function () {

    var animal = $("#animal-input").val().trim();
    if (animal != "") {
        animals.push(animal);
        event.preventDefault();
        renderButtons();
        $("#animal-input").val("");
    }else{
        return false;
    }
    
});

renderButtons();

$(document).on("click", "#animal-buttons button", function () {
    var animal = $(this).data("animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='card'>");

                var rating = results[i].rating;

                var p = $("<p class='card-text'>").text("Rating: " + rating);

                var animalImage = $("<img class='card-img-top'>");
                animalImage.addClass("gif");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-state","still");
                animalImage.attr("data-still",results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate",results[i].images.fixed_height.url);

                gifDiv.append(p);
                gifDiv.append(animalImage);

                $("#animal-gifs").prepend(gifDiv);
            }
        });
});

$(document).on("click", ".gif", function () {
    var state=$(this).attr("data-state");
    if(state=='still'){
        $(this).attr('src',$(this).attr('data-animate'));
        $(this).attr('data-state','animate');
      }
      
      if(state=='animate'){
        $(this).attr('src',$(this).attr('data-still'));
        $(this).attr('data-state','still');
      }
});
