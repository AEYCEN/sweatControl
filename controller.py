
from model import HeaterModel
from openweathermap_api import OpenWeatherMapAPI

class HeaterController:
    def __init__(self, api_key, city_name):
        self.api = OpenWeatherMapAPI(api_key, city_name)
        self.model = HeaterModel()

    def get_external_temperature(self):
        return self.api.get_external_temperature()

    def get_heater_temperature(self):
        # Hier die Temperatur der Heizung von deinem Modell abrufen
        pass

    def update_heater_temperature(self, new_temperature):
        # Hier die Temperatur der Heizung aktualisieren
        pass
