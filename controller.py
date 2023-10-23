from model import HeaterModel
from openweathermap_api import OpenWeatherMapAPI


class HeaterController:
    def __init__(self):
        self.api = OpenWeatherMapAPI()
        self.model = HeaterModel()

    def update_external_temperature(self):
        # Aktualisiere die Außentemperatur von der OpenWeatherMapAPI
        self.external_temperature = self.api.get_external_temperature()

    def get_heater_temperature(self, selected_heater_temperature):
        # Rufe die Vorlauftemperatur basierend auf external_temperature und selected_heater_temperature ab
        self.update_external_temperature()  # Aktualisiere die Außentemperatur
        vorlauftemperatur = self.model.predict_vorlauftemperatur(self.external_temperature, selected_heater_temperature)
        return vorlauftemperatur
