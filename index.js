const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Default route
app.get('/', (req, res) => {
  res.send('🦊 Welcome to Redfox Courier API!');
});

// Webhook route
app.post('/webhook', (req, res) => {
  console.log('Incoming Gupshup message:', req.body);

  const { type, payload } = req.body;

  if (type === 'message') {
    const userMessage = payload.payload.text?.trim();

    let reply;

    switch (userMessage) {
      case '1':
        reply = '🦊 You chose: Get a Quote. Please send your pickup and delivery locations.';
        break;
      case '2':
        reply = '📦 You chose: Book a Pickup. Please send the pickup address and package details.';
        break;
      case '3':
        reply = '🔍 You chose: Track My Package. Please enter your tracking ID.';
        break;
      case '4':
        reply = '🧑‍💬 You chose: Talk to Support. Our team will contact you shortly.';
        break;
      default:
        reply = '🤖 Sorry, I didn’t understand that. Please reply with 1, 2, 3, or 4.';
    }

    // TODO: Send reply via Gupshup API (we’ll handle this in next step)
    console.log('Responding with:', reply);
  }

  res.status(200).send('ok');
});

app.listen(port, () => {
  console.log(`🦊 Redfox Courier API running on port ${port}`);
});
