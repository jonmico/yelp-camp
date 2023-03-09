const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("database connected");
});

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "63ff9827070967a63bbd7394",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis qui iusto repellendus eaque quibusdam perspiciatis quae incidunt facere eligendi accusantium tempore ipsam minus assumenda quos sed, eius porro magnam ullam.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dfslph3oj/image/upload/v1678066076/YelpCamp/ju88v1vqkgdhal2k3gdg.jpg",
          filename: "YelpCamp/ju88v1vqkgdhal2k3gdg",
        },
        {
          url: "https://res.cloudinary.com/dfslph3oj/image/upload/v1678066076/YelpCamp/brl9sqn3qsmsyxow48na.jpg",
          filename: "YelpCamp/brl9sqn3qsmsyxow48na",
        },
        {
          url: "https://res.cloudinary.com/dfslph3oj/image/upload/v1678066076/YelpCamp/wcedqoang9rg80hwrmhg.jpg",
          filename: "YelpCamp/wcedqoang9rg80hwrmhg",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
