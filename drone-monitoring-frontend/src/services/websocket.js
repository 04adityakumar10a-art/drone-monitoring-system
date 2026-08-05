import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

let stompClient = null;

/**
 * Connect to Spring Boot WebSocket Server
 */
export function connectWebSocket(onConnected) {
    if (stompClient && stompClient.active) {

        console.log("WebSocket already connected.");

        return;

    }
    stompClient = new Client({

        webSocketFactory: () =>
            new SockJS("http://localhost:8081/ws"),

        reconnectDelay: 5000,

        debug: (message) => {
            console.log(message);
        },

        onConnect: () => {

            console.log("✅ WebSocket Connected");

            if (onConnected) {

                onConnected();

            }

        },

        onStompError: (frame) => {

            console.error("STOMP Error:", frame);

        }

    });

    stompClient.activate();

}

/**
 * Subscribe to a topic
 */
export function subscribe(destination, callback) {

    if (!stompClient) {

        console.log("WebSocket client not initialized.");

        return null;

    }

    if (!stompClient.connected) {

        console.log("Waiting for WebSocket connection...");

        const interval = setInterval(() => {

            if (stompClient.connected) {

                clearInterval(interval);

                stompClient.subscribe(destination, (message) => {

                    callback(JSON.parse(message.body));

                });

                console.log(`Subscribed to ${destination}`);

            }

        }, 200);

        return {

            unsubscribe() {

                clearInterval(interval);

            }

        };

    }

    const subscription = stompClient.subscribe(

        destination,

        (message) => {

            callback(JSON.parse(message.body));

        }

    );

    console.log(`Subscribed to ${destination}`);

    return subscription;

}

/**
 * Send a message
 */
export function send(destination, body) {

    if (!stompClient || !stompClient.connected) {

        return;

    }

    stompClient.publish({

        destination,

        body: JSON.stringify(body)

    });

}

/**
 * Disconnect
 */
export function disconnectWebSocket() {

    if (stompClient) {

        stompClient.deactivate();

    }

}