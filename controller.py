
from model import HeaterModel
#import openweathermap_api

class HeaterController:
    def __init__(self):
        self.model = HeaterModel()

    def get_external_temperature(self):
        # Hier die Außentemperatur von openweathermap.org API abrufen
        pass

    def get_heater_temperature(self):
        # Hier die Temperatur der Heizung von deinem Modell abrufen
        pass

    def update_heater_temperature(self, new_temperature):
        # Hier die Temperatur der Heizung aktualisieren
        pass
