var topics = ["Nobuo Uematsu", "Lego", "Back to the Future", "Poker"];

function renderButtons() {
    $(".js-buttonsdiv").empty();
    for (let i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("topic");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $(".js-buttonsdiv").append(button);
        
    }
}

function addButton() {
    var topic = $(".topic-input").val().trim();
    topics.push(topic);
}

function imageCall() {
    let topicName = $(this).attr("data-name");
    console.log(this);
    let key="&api_key=2QvLCmSXtXv6mLiUJwJw1o0jopTFcUrl"
    let queryBase="https://api.giphy.com/v1/gifs/search?q="

    $.ajax({
        url: queryBase + topicName + key,
        method: "GET"
    }).then(function(response) {
        var result = response.data;
        for (let i = 0; i < result.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = result[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var topicImage = $("<img>");
            topicImage.attr("src", result[i].images.fixed_height_still.url);
            gifDiv.append(p);
            gifDiv.append(topicImage);
            $(".js-gifsDiv").prepend(gifDiv);
        }
    })


}









//Initial Button Render on Page Load
renderButtons();
//Adding Button Event
$(".add-topic").on("click", function(event){
    event.preventDefault();
    addButton();
    renderButtons();
})
//Clicking Button Event
$(document).on("click", ".topic", imageCall);

//Clicking Image Event
