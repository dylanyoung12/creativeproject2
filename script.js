var breed = null;
var doggo = document.querySelector("#doggo");
var danceFloor = document.querySelector("#danceFloor");
var subBreeds = document.querySelector("#subBreeds");
var subBreedsList = document.querySelector("#subBreedsList");
var dancing = false;


var capitalizeFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var clearList = function() {
  while (subBreedsList.firstChild) {
    subBreedsList.removeChild(subBreedsList.firstChild);
  }
  document.querySelector("#subText").style.display = "none";
}


var getDoggo = function(sub) {
  subBreedsList.childNodes.forEach(function(e) {
    e.classList.remove("active");
  });
  var myurl = 'https://dog.ceo/api/breed/' + breed;
  if (sub !== null) {
    sub.classList.add("active");
    var name = sub.textContent;
    if (name !== "Ibizan") {
      name = name.toLowerCase().replace(/\s/g, '');
    }
    console.log(name);
    myurl += '/' + name;
  }
  myurl += '/images/random';
  $.ajax({
    url : myurl,
    datatype : "json",
    success : function(json) {
      console.log(json);
      var result = json.message;
      $("#doggo").attr("src", result);
      if (!dancing) danceTime();
    }
  });
}


var danceTime = function() {
  dancing = true;
  doggo.style.display = "block";
  danceFloor.style.height = "50vw";
  document.querySelector("#link").style.color = "white";
  //doggo
  var angle = 0, lastTime = null;
  function animate(time) {
    if (lastTime !== null) {
      angle += (time - lastTime) * 0.001;
    }
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
    clearList();
    var apiurl = 'https://dog.ceo/api/breeds/image/random';
    $.ajax({
      url : apiurl,
      datatype : "json",
      success : function(json) {
        console.log(json);
        var result = json.message;
        $("#doggo").attr("src", result);
        if (!dancing) danceTime();
      }
    });
  });
});


// Dog Breed Search
$(document).ready(function() {
  //console.log("ready");
  $("#breedSubmit").click(function(e) {
    e.preventDefault();
    breed = $("#dogBreed").val().toLowerCase().replace(/\s/g, '');
    console.log(breed);
    var apiurl = 'https://dog.ceo/api/breed/' + breed;
    apiurl += '/list';
    $.ajax({
      url : apiurl,
      datatype : "json",
      success : function(json) {
        clearList();
        if (json.code == 404) {
          alert("Dog breed not found - try again")
        }
        else {
          console.log(json);
          // Dog has sub-breeds
          if (json.message.length !== 0) {
            document.querySelector("#subText").style.display = "block";
            var subBreeds = json.message;
            subBreeds.forEach(function(name) {
              //console.log(name);
              var li = document.createElement("li");
              li.textContent = capitalizeFirstLetter(name);
              li.classList.add("list-group-item");
              li.setAttribute("onclick", "getDoggo(this)");
              subBreedsList.appendChild(li);
            });
          }
          // Dog has no sub-breeds
          else {
            document.querySelector("#subText").style.display = "none";
            getDoggo(null);
          }
        }
      },
      error : function() {
        clearList();
        alert("Dog breed not found - try again");
      }
    });
  });
});
