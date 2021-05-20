var cityid
var catagoryid
var cityname

function Search(){


  var cityname = document.getElementById("citytext").value;
  console.log(cityname)

  if (cityname == ''){
    alert("please enter all information");
    return;
  }

  

  fetch('https://developers.zomato.com/api/v2.1/locations?query=' + cityname, {
    method: 'GET',
    headers: {
      'user-key': 'a8ba2d2697fc1ca939f30099865c5066'
    }
  }).then(async (response) => {
    result = await response.json()
  
  var cityid = result.location_suggestions[0].city_id
  console.log(cityid)

  
  fetch('https://developers.zomato.com/api/v2.1/categories', {
      method: 'GET',
      headers: {
        'user-key': 'a8ba2d2697fc1ca939f30099865c5066'
      }
  }).then(async (response) => {
      result = await response.json()
      
  });


  var catagoryid = document.getElementById("catagoryselect").value;
  console.log(catagoryid)

  var resultsnum = document.getElementById("optionsselect").value;
  console.log(resultsnum)


  fetch('https://developers.zomato.com/api/v2.1/search?entity_id=' + cityid + '&entity_type=city&count=' + resultsnum + '&category=' + catagoryid, {
    method: 'GET',
    headers: {
      'user-key': 'a8ba2d2697fc1ca939f30099865c5066'
    }
  }).then(async (response) => {
    result = await response.json()
    console.log(result)
    for (let i = 0; i < result.restaurants.length; i++) {
      const element = result.restaurants[i].restaurant
      a = document.createElement('div')
      a.classList.add('card')
      // title was result.stuff[i].title
      a.innerHTML = ` 
          <div class="row grey lighten-2">
            <div class="col m5">
              <div class="card hoverable grey lighten-3" id="newcards">
                <div class="card-image">
                  <img id="currentPhoto" src="${element.featured_image}" onerror="this.onerror=null; this.src='BackgroundThree.jpg'" width="500" height="300">
                  <span class="card-title">${element.name}</span>
                  <a class="btn-floating halfway-fab waves-effect waves-light orange darken-2" href="${element.url}"><i class="material-icons">add</i></a>
                </div>
                <div class="card-content">
                  <p>Address: ${element.location.address}</p>
                </div>
              </div>
            </div>
            <div class="col m7">
              <div class="card blue-grey hoverable">
                <div class="card-content white-text">
                  <span class="card-title row">${element.name}</span>
                  <p>Hours: ${element.timings}</p>
                  <p>Phone Number: ${element.phone_numbers}
                </div>
                <div class="card-action">
                  <p>Ratings: ${element.user_rating.aggregate_rating}</p> 
                  <p>User's comment: ${element.user_rating.rating_text}</p>
                  <p>This restaurant's cuisine(s): ${element.cuisines}</p>
                  <p>Cost for 2 people: ${element.average_cost_for_two}</p>
                </div>
                <div class="card-action">
                  <a class="orange-text darken-2" href="${element.url}">Restaurant Website</a>
                  <a class="orange-text darken-2" href="${element.events_url}">Featured Events</a>
                </div>
              </div>   
            </div>
          </div>
      `

     document.getElementById('restaurantcards').appendChild(a)
    
    var minRatingPercent = document.getElementById("ratingRange").value
    var minRating = (minRatingPercent / 20)
    console.log(minRating)
    setGoldcard(result, element, minRating)

      }
    });
    
    function setGoldcard(result, element, minRating) {
      for (let i = 0; i < result.restaurants.length; i++) {
        if (element.user_rating.aggregate_rating >= minRating){
          a.innerHTML = `
            <div class="row grey lighten-2">
            <div class="col m5">
              <div class="card hoverable goldencard lighten-3" id="newcards">
                <div class="card-image">
                  <img id="currentPhoto" src="${element.featured_image}" onerror="this.onerror=null; this.src='BackgroundThree.jpg'" width="500" height="300">
                  <span class="card-title">${element.name}</span>
                  <a class="btn-floating halfway-fab waves-effect waves-light orange darken-2" href="${element.url}"><i class="material-icons">star</i></a>
                </div>
                <div class="card-content">
                  <p>Address: ${element.location.address}</p>
                </div>
              </div>
            </div>
            <div class="col m7">
              <div class="card goldencard hoverable">
                <div class="card-content black-text">
                  <span class="card-title featuredRestaurant"><i class="small material-icons featuredRestaurant">stars</i> Suggested Restaurant: ${element.name}</span>
                  <p>Hours: ${element.timings}</p>
                  <p>Phone Number: ${element.phone_numbers}<p>
                </div>
                <div class="card-action">
                  <p>Ratings: ${element.user_rating.aggregate_rating}</p> 
                  <p>User's comment: ${element.user_rating.rating_text}</p>
                  <p>This restaurant's cuisine(s): ${element.cuisines}</p>
                  <p>Cost for 2 people: ${element.average_cost_for_two}</p>
                </div>
                <div class="card-action">   
                  <a class="orange-text darken-2" href="${element.url}">Restaurant Website</a>
                  <a class="orange-text darken-2" href="${element.events_url}">Featured Events</a>
                </div>
              </div>
            </div>
          </div>
          `
        }
     }
    
    };

    var searchbutton1 = document.getElementById("searchbutton");
    searchbutton1.classList.add("disabled");

    var clearbutton1 = document.getElementById("clearbutton");
    clearbutton1.classList.remove("disabled");

});

};



fetch('https://developers.zomato.com/api/v2.1/collections?city_id=280&count=3', {
  method: 'GET',
  headers: {
    'user-key': 'a8ba2d2697fc1ca939f30099865c5066'
  }
}).then(async (response) => {
  result = await response.json()
  console.log(result);
  document.getElementById('card1').innerHTML = result.collections[1].collection.description
  document.getElementById('card2').innerHTML = result.collections[2].collection.description
  document.getElementById('featuredimage1').src = result.collections[1].collection.image_url
  document.getElementById('featuredimage2').src = result.collections[2].collection.image_url
  document.getElementById('featuredtitle1').innerHTML = result.collections[1].collection.title
  document.getElementById('featuredtitle2').innerHTML = result.collections[2].collection.title
  document.getElementById('featuredlink1').href = result.collections[1].collection.url
  document.getElementById('featuredlink2').href = result.collections[2].collection.url
});

// fetch('https://developers.zomato.com/api/v2.1/collections?city_id=280&count=2&user-key=39035a5a031d31b73b7dd3cfcc1774f8').then(async (response) => {
// result = await response.json()
// console.log(result);
// })

function darkmode() {
  document.getElementById("sitebackground").className = "blue-grey darken-5";
}

function lightmode(){
  document.getElementById('sitebackground').className = "white";
}

function Clear(){
  var a = document.getElementById("restaurantcards");
  a.innerHTML='';
  var searchbutton1 = document.getElementById("searchbutton");
  searchbutton1.classList.remove("disabled");
  
  var clearbutton1 = document.getElementById("clearbutton");
  clearbutton1.classList.add("disabled");
}