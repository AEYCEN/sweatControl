import requests


class OpenWeatherMapAPI:
    def __init__(self):
        self.api_key = '925e8087cd21eaf80a3bc597e291a144'
        self.city_name = 'Krefeld'
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
            print(f"Error fetching external temperature: {e}")
            return None
