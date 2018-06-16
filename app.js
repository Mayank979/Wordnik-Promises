const express   =   require("express"),
      app       =   express(),
      fetch     =   require("node-fetch"),
      Sentencer =   require("sentencer"),
      key       =   require("./config/keys.js");

app.set("view engine", "ejs");

// Routes

// app.get("/", (req, res) => {
//   //https://api.wordnik.com/v4/words.json/randomWord?minLength=5&maxLength=7&api_key=YOURAPIKEY
//   const url = "https://api.wordnik.com/v4/words.json/randomWord?minLength=5&maxLength=7&api_key=" + key.id;
//   fetch(url)
//   .then(result => result.json())
//   .then(json => {
//     console.log(json);
//     res.render("home", { word: json.word});
//   })
//   .catch(err => console.log("err"))
// });


app.get("/", async (req, res) => {
  let noun = Sentencer.make("{{noun}}");
  //https://api.wordnik.com/v4/words.json/randomWord?minLength=5&maxLength=7&api_key=YOURAPIKEY
  const wordnikAPI       = "https://api.wordnik.com/v4/words.json/randomWord?minLength=5&maxLength=7&api_key=" + key.wordnik;
  const giphyAPI_url  = "https://api.giphy.com/v1/gifs/search?api_key=" + key.giphy + "&q=";
  const wordnik_response = await fetch(wordnikAPI);
  const wordnik_json     = await wordnik_response.json();
  let word = wordnik_json.word;
  try{
    const sentencer_gif_response    = await fetch(giphyAPI_url + noun);
    const sentecner_json   = await sentencer_gif_response.json();
    const giphy_response   = await fetch(giphyAPI_url + wordnik_json.word);
    const giphy_json       = await giphy_response.json();
    let url1 = giphy_json.data[0].images.fixed_width.url;
    let url2 = sentecner_json.data[0].images.fixed_width.url
    res.render("home", {word: word, noun: noun, url1:url1, url2: url2});
  } catch(err){
    console.log(err);
    res.render("home", {word: word, error: false})
  }
});



app.listen(8000, () => {
  console.log("server running at port 8000");
});
