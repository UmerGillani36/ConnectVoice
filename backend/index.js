const express = require("express");
const app = express();
const twilio = require("twilio");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.post("/make-call", (req, res) => {
  const accountSid = "AC0abf006b0097a928a4ca8cf4456193c0";
  const authToken = "597cc411cd38956b7343d58a79f277be";
  const client = twilio(accountSid, authToken);

  console.log(" req.body.", req.body);

  const fromNumber = "+14325475746"; // This should be a Twilio phone number you've purchased
  const toNumber = req.body.toNumber; // The number you want to call, provided in the request body

  client.calls
    .create({
      url: "https://733a-116-90-114-57.ngrok-free.app/voice", // Replace this with the URL to TwiML instructions for your call
      to: toNumber,
      from: fromNumber,
    })
    .then((call) => {
      console.log(call.sid);
      res.status(200).json({ message: "Call initiated successfully!" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to initiate call." });
    });
});

app.post("/voice", (req, res) => {
  // Generate your TwiML instructions here
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say("Hello from Twilio! This is a call from your Twilio number.");

  // Set the appropriate content-type for TwiML
  res.set("Content-Type", "text/xml");

  // Send the TwiML response back to Twilio
  res.send(twiml.toString());
});

app.get("/check", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.listen(3000, () => {
  console.log(`Server is running on Port 3000`);
});
