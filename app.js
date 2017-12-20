#! /usr/bin/env node
var argv = require('yargs').argv;
var config_file = (argv.config_file === undefined) ? './config.json' : argv.config_file;

var config = require(config_file);
var request = require('request');
var dash_button = require('node-dash-button');

// These are actions that we may want to perform, as of now it's just the ifttt webhook
var actions = {"ifttt_webhook": ifttt_webhook};

// Register dash buttons that we want to listen to
dash_button_keys = Object.keys(config.buttons);
var dash = dash_button(dash_button_keys, null, null, 'all');

function ifttt_webhook(event_id, api_key){
  url = "https://maker.ifttt.com/trigger/" + event_id + "/with/key/" + api_key;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }else{
      console.log("Error: " + error);
    }
  });
}

dash.on("detected", function (dash_id){
  button = config.buttons[dash_id];
  if(button !== null){
    console.log("Detected dash button: " + button.name);
    actions[button.action](button.id, config.ifttt_key);
  }
});
