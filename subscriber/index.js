"use strict";
const mqtt = require("mqtt");
/*
    The publisher and broker run in different containers, meaning they have different IPs.

    Replace the 127.0.0.1 or localhost with the service name of the broker(broker in this case).
*/
const broker_url = "mqtt://broker:1883"

const client = mqtt.connect(broker_url)

const topic = "/prova"

client.on("connect", () => {
    console.log(`Connected to MQTT Broker at ${broker_url}`);

    client.subscribe(topic, (err) => {
        if(!err)
            console.log(`Subscribed to topic: ${topic}`)
        else
            console.error(err)
    })
})

client.on("message", (topic, payload) => {
    console.log(`Received message on topic "${topic}": ${payload.toString()}`);
})

client.on('error', (err) => {
    console.error(`Error connecting to MQTT Broker: ${err}`);
});