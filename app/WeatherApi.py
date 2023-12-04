import os
import requests

# ANSI color codes
RED = '\033[91m'
RESET = '\033[0m'


class WeatherAPI:
    def __init__(self, city_coordinates):
            print(city_coordinates)
            if "API_KEY" in os.environ:
                self.api_key = os.environ.get("API_KEY")
            else:
                from secret.weather_api import API_KEY
                self.api_key = API_KEY
            self.lat, self.lon = city_coordinates
            self.base_url = "http://api.weatherapi.com/v1/forecast.json"


    def get_external_temperature(self, variant):
        try:
            listOfDelays = {1: 3,
                            2: 4,
                            3: 5,
                            4: 2,
                            5: 0,
                            6: 4,
                            7: 1,
                            8: 2}
            heater_delay = listOfDelays.get(variant, 2)

            params = {
                "key": self.api_key,
                "q": f"{self.lat},{self.lon}",
                "days": 1
            }
            response = requests.get(self.base_url, params=params)
            data = response.json()

            current_hour = int(data['location']['localtime'].split(' ')[1].split(':')[0])
            current_minutes = int(data['location']['localtime'].split(' ')[1].split(':')[1])

            if current_minutes >= 30:
                current_hour += 1

            future_hour = (current_hour + heater_delay) % 24

            for hour in data['forecast']['forecastday'][0]['hour']:
                if int(hour['time'].split(' ')[1].split(':')[0]) == future_hour:
                   data = hour['temp_c']

            external_temperature = data
            return external_temperature

            return None
        except Exception as e:
            print(f"Error: WeatherAPI data could not be retrieved. {e}")
            return None