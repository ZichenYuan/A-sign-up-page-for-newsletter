
const express = require ("express");
const app = express();
const request = require ("request");
const bodyParser = require ("body-parser");
const https = require ("https");

app.use (bodyParser.urlencoded({extended:true}));

app.use(express.static("public")); //express.static() keeps a folder static

app.get("/", (req,res)=>{
  res.sendFile(__dirname+"/signUp.html");
})

app.post("/", (req,res)=>{
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us12.api.mailchimp.com/3.0/lists/f7e8fcaee5"

  const options = {
    method: "POST",
    auth: "sunny:078057737b4e3bfd8a795176a92c596d-us12"
  }

  const request = https.request(url, options, function(response){
    if (response ===200){
      res.send("Successfully subscribed");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }


    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end();
})

app.post("/failure", function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT ||3000, function(){
  console.log("the server is running on port 3000");
});
//work both on heroku and local 3000


// API Key
// 078057737b4e3bfd8a795176a92c596d-us12

//unique audience ID, list ID
// f7e8fcaee5
