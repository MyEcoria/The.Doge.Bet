const WS = require('ws');
const ReconnectingWebSocket = require('reconnecting-websocket');
const request = require('request');

// Create a reconnecting WebSocket.
// In this example, we wait a maximum of 2 seconds before retrying.
const ws = new ReconnectingWebSocket('wss://ws.dogenano.io', [], {
	WebSocket: WS,
	connectionTimeout: 1000,	
	maxRetries: 100000,
	maxReconnectionDelay: 2000,
	minReconnectionDelay: 10 // if not set, initial connection will take a few seconds by default
});

// As soon as we connect, subscribe to block confirmations
ws.onopen = () => {
	const confirmation_subscription = {
		"action": "subscribe", 
		"topic": "confirmation",
                "options": { "accounts": ["xdg_3r8rzwgq8apcdprr97qfk3sr8mk8r9s4c573g84bg564d96jm7fu44aybjrn"] }
	}
	ws.send(JSON.stringify(confirmation_subscription));

	// Other subscriptions can go here
};

// The node sent us a message
ws.onmessage = msg => {
	console.log(msg.data);
	data_json = JSON.parse(msg.data);

	if (data_json.topic === "confirmation") {
		console.log ('Confirmed', data_json.message.hash)
                data = data_json["message"]
                account = data["account"]
                amount = parseInt(data["amount"]);
                amount = amount * 2
                subtype = data["subtype"]
                if (account != "xdg_3r8rzwgq8apcdprr97qfk3sr8mk8r9s4c573g84bg564d96jm7fu44aybjrn") {
                  randomNumber = Math.random() * 2 + 1;
                  if (subtype == "send") {
                    if (randomNumber == 2) {
                      const postData = {
                        action: 'send',
                        wallet: 'B317135FD88904962DC1F9BC206D59FC35CEC5306D32109DDF820C1498172A23',
                        source: 'xdg_3r8rzwgq8apcdprr97qfk3sr8mk8r9s4c573g84bg564d96jm7fu44aybjrn',
                        destination: account,
                        amount: amount
                      };
                      const options = {
                        url: 'http://server.myecoria.com:7030',
                        method: 'POST',
                        json: true,
                        body: postData
                      };

                      request(options, (error, response, body) => {
                        if (error) {
                          console.error(error);
                        } else {
                          console.log(response.statusCode, body);
                        }
                      });
                    }
                  }
                }
	}
};
