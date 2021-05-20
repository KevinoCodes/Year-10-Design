//
function displayStar(rating) {
    fetch('https://developers.zomato.com/api/v2.1/search?entity_id=' + cityid + '&entity_type=city&count=' + resultsnum + '&category=' + catagoryid, {
      method: 'GET',
      headers: {
        'user-key': 'a8ba2d2697fc1ca939f30099865c5066'
      }
      }).then(async (response) => {
        result = await response.json()
        console.log(result)
        for (let i = 0; i < result.restaurants.length; i++) {
          var rating = result.restaurants[i].restaurant.user_rating.aggregate_rating
        if (rating > 3)
          console.log('hello')
        else
          console.log('bruh')
        }
  
      })
  
    };