# node_amazon_dash

Prerequisites
-----------
libpcap must be installed. In linux you may need to `sudo apt install libpcap-dev`, mac `brew install libpcap`

## osMac users
Install Xcode then run: `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`

## Network Permissions
You may need to adjust permissions for your network adapter(s) in order to be able to run this script without
the need of using sudo
https://stackoverflow.com/questions/41126943/wireshark-you-dont-have-permission-to-capture-on-that-device-mac

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
``` $ node index.js ```
