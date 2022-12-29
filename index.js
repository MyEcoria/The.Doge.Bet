const WS = require('ws');
const ReconnectingWebSocket = require('reconnecting-websocket');
const request = require('request');

// Variables d'environnement
const nodeRPC = process.env.noderpc;
const nodeWallet = process.env.nodewallet;
const nodeWS = process.env.nodews;
const nodesource = process.env.nodesource;

const min = 0;
const max = 2;

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
                "options": { "accounts": [nodesource] }
	}
	ws.send(JSON.stringify(confirmation_subscription));

	// Other subscriptions can go here
};

// The node sent us a message
ws.onmessage = msg => {
	
	data_json = JSON.parse(msg.data);

	if (data_json.topic === "confirmation") {
		console.log ('Confirmed', data_json.message.hash)
                data = data_json["message"]
                account = data["account"]
                amount = data["amount"]
                console.log(account);
                console.log(amount);
                subtype = data_json.message.block.subtype
                console.log(subtype);
                if (account != nodesource) {
                  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                  console.log(randomNumber);
                  if (subtype == "send") {
                    console.log("Send");
                    if (randomNumber == 2) {
                      console.log("Num 2");
                      const postData = {
                        action: 'send',
                        wallet: nodeWallet,
                        source: nodesource,
                        destination: account,
                        amount: amount
                      };
                      const options = {
                        url: nodeRPC,
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
