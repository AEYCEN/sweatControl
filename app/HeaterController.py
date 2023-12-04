import geocoder
from app.HeaterModel import HeaterModel
from app.WeatherApi import WeatherAPI
from app.OpenWeatherAPI import OpenWeatherAPI


def get_current_city():
    location = geocoder.ip('me')
    coordinates = location.latlng
    city_name = location.city
    return city_name
    return coordinates


class HeaterController:
    # Später User eingaben
    room_temperature = 25
    min_heater_temperature = 30
    max_heater_temperature = 80
    heater_variant = 4  # Liste der Varianten im Select der Einstellungen definiert (0 bis 8)

    def __init__(self):
        city_coordinates = get_current_city()
        self.api = OpenWeatherAPI(city_coordinates)
        self.model = HeaterModel()

    def get_external_temperature(self):
        return self.api.get_external_temperature()

    def get_room_temperature(self):
        return self.room_temperature

    def get_heater_temperature(self):
        return self.model.predict_heater_temperature(round(self.get_external_temperature(), 2), self.get_room_temperature(),
                                                     self.min_heater_temperature, self.max_heater_temperature)

    def update_room_temperature(self, new_temperature):
        self.room_temperature = new_temperature

    def get_data_diagram(self):
        x = [20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0, -2, -4, -6, -8, -10, -12, -14, -16, -18, -20]
        predicted_values = []

        for temperature_aussen in x:
            predicted_temperature = self.model.predict_heater_temperature(temperature_aussen,
                                                                          self.get_room_temperature(),
                                                                          self.min_heater_temperature,
                                                                          self.max_heater_temperature)
            predicted_values.append(predicted_temperature)

        return predicted_values

    def get_wanted_room_temperature(self):
        return self.room_temperature

    def get_heater_variant(self):
        return self.heater_variant

