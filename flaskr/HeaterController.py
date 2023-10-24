import geocoder
from .HeaterModel import HeaterModel
from .OpenWeatherMapAPI import OpenWeatherMapAPI


class HeaterController:
    def __init__(self):
        city_name = self.get_current_city()
        self.api = OpenWeatherMapAPI(city_name)
        self.model = HeaterModel()

    def get_current_city(self):
        location = geocoder.ip('me')
        return location.city

    def get_external_temperature(self):
        return self.api.get_external_temperature()

    def get_heater_temperature(self):
        # Hier die Temperatur der Heizung von deinem Modell abrufen
        pass

    def update_heater_temperature(self, new_temperature):
        # Hier die Temperatur der Heizung aktualisieren
        pass

    def get_wanted_room_temperature(self):
        pass


if __name__ == "__main__":
    controller = HeaterController()
    temperature = controller.get_external_temperature()
    city = controller.get_current_city()
    if temperature:
        print(f"{city} - {temperature}°C")
    else:
        print("Failed to fetch temperature!")
