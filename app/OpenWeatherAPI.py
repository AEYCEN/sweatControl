import os
import requests

# ANSI color codes
RED = '\033[91m'
RESET = '\033[0m'


class OpenWeatherAPI:
    def __init__(self, city_name):
        if "OPENWEATHER_API_KEY" in os.environ:
            self.api_key = os.environ.get("OPENWEATHER_API_KEY")
        else:
            from secret.open_weather import API_KEY
            self.api_key = API_KEY
        self.city_name = city_name
        self.base_url = "http://api.openweathermap.org/data/2.5/weather"

    def get_external_temperature(self):
        try:
            params = {
                "q": self.city_name,
                "appid": self.api_key,
                "units": "metric"  # Temperature in Celsius
            }
            response = requests.get(self.base_url, params=params)
            data = response.json()
            external_temperature = data["main"]["temp"]
            return external_temperature
        except Exception as e:
            print(f"{RED}Error: OpenWeather API data {e} could not be retrieved. The API key is probably incorrect!"f"{RESET}")
            return None
