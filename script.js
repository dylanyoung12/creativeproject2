
var doggo = document.querySelector("#doggo");
var danceFloor = document.querySelector("#danceFloor");
var dancing = false;


var danceTime = function() {
  dancing = true;
  doggo.style.display = "block";
  danceFloor.style.height = "50vw";
  document.querySelector("#link").style.color = "white";
  //doggo
  var angle = 0, lastTime = null;
  function animate(time) {
    if (lastTime !== null)
    angle += (time - lastTime) * 0.001;
    lastTime = time;
    doggo.style.top = (Math.sin(4 * angle) * 25 + 25) + "%";
    doggo.style.left = (Math.cos(angle) * 25 + 30) + "%";
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
  //colors
  document.body.classList.add("dancing");
  //music
  document.querySelector("#music").play();
}

// Random Dog Breed
$(document).ready(function() {
  $("#randomBreed").click(function(e) {
    e.preventDefault();
    var apiurl = 'https://dog.ceo/api/breeds/image/random';
    $.ajax({
      url : apiurl,
      datatype : "json",
      success : function(json) {
        console.log(json);
        var result = json.message;
        $("#doggo").attr("src", result);
        if (!dancing)
          danceTime();
      }
    });
  });
});


// Dog Breed Search
$(document).ready(function() {
  //console.log("ready");
  $("#breedSubmit").click(function(e) {
    e.preventDefault();
    var breed = $("#dogBreed").val().toLowerCase().replace(/\s/g, '');
    var subBreed = $("#subBreed").val().toLowerCase().replace(/\s/g, '');
    var apiurl = 'https://dog.ceo/api/breed/' + breed;
    if (subBreed !== "")
    apiurl += '/' + subBreed;
    apiurl += '/images/random';
    $.ajax({
      url : apiurl,
      datatype : "json",
      success : function(json) {
        if (json.code == 404) {
          alert("Dog breed not found - try again")
        }
        else {
          console.log(json);
          var result = json.message;
          $("#doggo").attr("src", result);
          if (!dancing)
            danceTime();
        }
      },
      error : function() {
        alert("Dog breed not found - try again")
      }
    });


  });
});
