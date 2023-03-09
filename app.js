const express = require('express'); 
 const app = express(); 
 const https = require("https");
 const bodyparser = require('body-parser'); 
//  const request = require("request");
 app.use(bodyparser.urlencoded({extended:true}));	
 app.use(express.static("public"));

 app.get("/", function (req, res) {
   res.sendFile(__dirname + "/signup.html");
 })

app.post("/", function (req, res) {

   const firstname = req.body.Fname;
   const lastname = req.body.Lname;
   const email = req.body.email;
   
   const data = {
      members: [
         {
            email_address: email,
            status : "subscribed",
            merge_fields :{
               FNAME: firstname,
               LNAME: lastname
            }
         }
      ]
   };

   const jsondata = JSON.stringify(data);

   const url = "https://us21.api.mailchimp.com/3.0/lists/3a09e3e776"

   const options = {
      method: "POST",
      auth: "abhinav:9cb162cfd1e4c8e326ed5129f4cab1e4-us21"
   }
   const request = https.request(url, options, function (response) {

      if(response.statusCode === 200)
      {
         res.sendFile(__dirname + "/success.html");
      }
      else {
         res.sendFile(__dirname + "/failure.html");
      }

      response.on("data", function (data) {
         console.log(JSON.parse(data));
        })
     })

     request.write(jsondata);
     request.end();

  });

app.post("/failure", function(req, res){
res.redirect("/");
})


// apikey
// 9cb162cfd1e4c8e326ed5129f4cab1e4-us21
//listid
// 3a09e3e776













 app.listen(process.env.PORT || 3000, function () {
    console.log("Server running on port 3000");
 })
