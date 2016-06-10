# MagicMirror 

## Weather

If THE WEATHER section is not working, please generate the API key via following site: openweathermap.org
(Sign up and the key will be generated automatically). Then, paste it here - APPID: 'YOUR_KEY' in config.js file.

## Bluetooth discovery webservice

### Prerequisites
- Python 2.7
- Compatible bluetooth adapter

### Instalation
```
cd python
pip instal pybluez
easy_install web.py
python inoutboard.py
```

### API usage

- GET localhost:8080/discover - devices discovery
- GET localhost:8080/one - closest device
