# README

# Zillion - Zillow Clone
[Live Site](https://authenticate-me-a23z.onrender.com/)

This is a full stack website clone of online real estate marketplace, [Zillow](Zillow.com). Zillow is an American online real estate marketplace that allows users to search and list properties for sale or rent, estimate property values, and obtain other real estate-related information. This web application was created in a 2 week sprint and replicates the features of Zillow. 

## Table of Contents
1. Technologies
2. Features
3. Code Highlights

## Technologies
+ React
+ Redux
+ Ruby on Rails
+ PostgresSQL
+ HTML/CSS
+ Javascript/Jbuilder/AJAX
+ AWS
+ Render & Heroku

## Features
**User Authentication: Login/Sign up** 
+ Zillion has a user authentication system. It includes a demo user login, creating a new account, and error handling for incorrect entries. Users are required to login when trying to create and update a listing. It is also required to add a listing to favorites. 
![UserAuthentication](https://github.com/bilalashc/Zillow_Clone/assets/122466002/c0ea4a18-82a9-4848-ba3e-75367fc35c69)

**Listings**
+ Zillion features a listings index page on the home page, along with a show page for each listing. Users can view listing details and sell their own listing. Users must be logged in to create/edit/delete their own listing. Users can create and sell multiple listings. 
![ListingShow](https://github.com/bilalashc/Zillow_Clone/assets/122466002/1bd774bc-49f5-470e-955f-3e46d4e5ad79)

**Favorites**
+ Zillion features a favorite feature. Users can add and remove a listing from their favorites by clicking on the "heart" icon on the listing. Users must be logged in to use the favorites feature. 
![Favorites](https://github.com/bilalashc/Zillow_Clone/assets/122466002/ee463fb4-646a-471a-a11b-ad5149676f55)

**Search**
+ Users can also search for listings via the search bar. It is not required to log in to use the search feature. A user can search listings based on the listing's address, city and state.
![Search](https://github.com/bilalashc/Zillow_Clone/assets/122466002/2b039274-f0b7-48cc-9ffb-e624b7f9bf52)

**Google Maps**
+ The application leverages Google Maps API to precisely showcase the geographical positioning of listings.

**Tours**
+ Users have the ability to submit tour requests and subsequently grant approval based on specific dates and times.
![RequestTour](https://github.com/bilalashc/Zillow_Clone/assets/122466002/5d738c52-7fa0-4d41-9a48-bb005d07c2d8)

## Code Snippets

+ The following is a snippet of the code for creating a new listing.
```javascript
const AddListing = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    home_type: "",
    address: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    bedrooms: "",
    bathrooms: "",
    listing_size: "",
    home_price: "",
    rent_estimate: "",
    home_overview: "",
    images: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const { name, files } = event.target;
    setFormData({ ...formData, [name]: files });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
    const reqData = new FormData();
    reqData.append("listing[home_type]", formData.home_type);
    reqData.append("listing[address]", formData.address);
    reqData.append("listing[street]", formData.street);
    reqData.append("listing[city]", formData.city);
    reqData.append("listing[state]", formData.state);
    reqData.append("listing[zip_code]", formData.zip_code);
    reqData.append("listing[bedrooms]", formData.bedrooms);
    reqData.append("listing[bathrooms]", formData.bathrooms);
    reqData.append("listing[listing_size]", formData.listing_size);
    reqData.append("listing[home_price]", formData.rent_estimate);
    reqData.append("listing[rent_estimate]", formData.rent_estimate);
    reqData.append("listing[home_overview]", formData.home_overview);
    for (let i = 0; i < formData.images.length; i += 1) {
      reqData.append("listing[images][]", formData.images[i]);
    }


    axios(`${BASE_URL}/listings`, {
      method: "POST",
      headers: { Authorization: localStorage.getItem("authorization") },
      data: reqData,
    })
      .then((response) => {
        if (response.status === 201) {
          alert("The Listing Has Been Created Successfully!")
          navigate("/");

          // Handle successful creation of Listing
        } else {
          throw new Error("Failed to create Listing");
        }
      })
      .catch((error) => {
        alert(error.message)
        // Handle error creating Listing
      });
  };
  
  return (
    <>
     <Header />
      <ListingForm
      formData={formData}
      handleInputChange={handleInputChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      text="Submit"
    />
    </>
  );
};

```

+ The following is a snippet of the code that allows the user to add or remove a listing to their favorites. 
```javascript
  const addFavorite = async (listing) => {
    const reqData = new FormData();
    reqData.append("favorite[listing_id]", listing?.id);

    axios(`${BASE_URL}/favorites`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("authorization"),
        "Content-Type": "application/json",
      },
      data: reqData,
    }).then((res) => {
      const res1 = listings?.find((list) => list.id === listing.id);
      if (res1) res1.favorite = !res1.favorite;

      setIsFavourite(listing.favorite);
    });
  };

  const deleteFavorite = async (listing) => {
    const reqData = new FormData();
    reqData.append("favorite[listing_id]", listing?.id);
    const response = await axios(`${BASE_URL}/favorites/${listing?.id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("authorization"),
        "Content-Type": "application/json",
      },
    }).then((res) => {
      const res1 = listings?.find((list) => list.id === listing.id);
      if (res1) res1.favorite = !res1.favorite;

      setIsFavourite(listing.favorite);
    });
  };

  const handleFavorite = (listing) => {
    if (sessionUser) {
      if (!listing?.favorite) addFavorite(listing);
      else {
        deleteFavorite(listing);
      }
      setLoad(!load);
    } else {
      alert("Please login to add into favorite");
    }
  };
```

+ The following are snippets of code that showcase the implementation of the search feature. 
```javascript
 const handleSearch = async () => {
    const res = await axios(`${BASE_URL}/listings/search?q=${search}`);
    localStorage.setItem("searched_listings", JSON.stringify(res.data));
    navigate("/Search");
  };

   const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value == "") {
      debugger;
      const list = JSON.parse(localStorage.getItem("listings"));
      setListings(list);
    }
  };

```



