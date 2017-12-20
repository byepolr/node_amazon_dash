# node_amazon_dash

Prerequisites
-----------
libpcap must be installed. In linux you may need to `sudo apt install libpcap-dev`, mac `brew install libpcap`

## osMac users
Install Xcode then run: `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`

## Network Permissions
### Mac
You may need to adjust permissions for your network adapter(s) in order to be able to run this script without
the need of using sudo
https://stackoverflow.com/questions/41126943/wireshark-you-dont-have-permission-to-capture-on-that-device-mac

### Raspberry pi
run the following in a terminal window
```sudo setcap 'cap_net_raw,cap_net_admin+eip' $(readlink -f $(which node)```

IFTTT Webhooks
--------------
https://ifttt.com/maker_webhooks

Configuration
-------------
you will need to create a file called *config.json*
```
{
  "ifttt_key": "<your_key_here>",
  "buttons": {
    <mac:address:goes:here>: {
      "id": <event_name_on_ifttt>,
      "name": "Some useful name for logging purposes",
      "action": <action_taken>
    },
    "12:34:56:78:90:ab": {
      "id": "my_ifttt_webhook_event_id",
      "name": "Super Secret Action",
      "action": "ifttt_webhook"
    }
  }
}
```

Run
---
``` $ node app.js --config_file=${HOME}/config.json ```

Global Run
----------
You can install this globally and then just run this like a shell command

## Install
run the following command in the repo
``` $ npm install -g ```

## Run
``` $ node_amazon_dash --config_file=${HOME}/config.json ```

Raspberry pi Service
--------------------
* $ sudo vim /lib/systemd/system/amazon_dash.service *
```
[Unit]
Description=Amazon Dash Button Action Trigger
After=network.target

[Service]
ExecStart=/home/pi/node_amazon_dash/app.js --config_file=/home/pi/.dash_config.json
WorkingDirectory=/home/pi
StandardOutput=inherit
StandardError=inherit
Restart=always
User=pi

[Install]
WantedBy=multi-user.target
```
# start the service
sudo systemctl start amazon_dash.service

# stop service
sudo systemctl stop amazon_dash.service

# sevice status
sudo systemctl status amazon_dash.service
