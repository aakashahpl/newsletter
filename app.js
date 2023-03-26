const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

// API key : c45ea8c123881ce28acd452475919507-us21
// Audience ID : 6926e1568d

app.post("/", (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members:[{
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
         }
      }
    ]   
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/6926e1568d";
  const options = {
    method: "POST",
    auth: "aakash1:ac45ea8c123881ce28acd452475919507-us21"
  };
  const request = https.request(url, options, (response) => {

    if(response.statusCode===200){
        res.sendFile(__dirname+'/success.html');
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
 
    response.on("data", (da) => {
      console.log(JSON.parse(da));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post('/failure',(req,res)=>{
    res.redirect('/');
});

app.listen(process.env.PORT);
