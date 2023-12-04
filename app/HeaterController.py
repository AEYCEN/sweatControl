import geocoder
from app.HeaterModel import HeaterModel
from app.WeatherApi import WeatherAPI



def get_current_city_name():
    location = geocoder.ip('me')
    city_name = location.city
    return city_name


def get_current_city_coordinates():
    location = geocoder.ip('me')
    city_coordinates = location.latlng
    return city_coordinates


class HeaterController:
    # Später User eingaben
    room_temperature = 25
    min_heater_temperature = 30
    max_heater_temperature = 80
    heater_variant = 4  # Liste der Varianten im Select der Einstellungen definiert (0 bis 8)

    def __init__(self):
        self.api = WeatherAPI(get_current_city_coordinates())
        self.model = HeaterModel()

    def get_external_temperature(self):
        return round(self.api.get_external_temperature(self.heater_variant), 1)

    def get_room_temperature(self):
        return self.room_temperature

    def get_heater_temperature(self):
        return round(self.model.predict_heater_temperature(self.get_external_temperature(), self.get_room_temperature(),
                                                           self.min_heater_temperature, self.max_heater_temperature), 1)

    def update_room_temperature(self, new_temperature):
        self.room_temperature = new_temperature

    def get_data_diagram(self):
        x = [-20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18,
             20]
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


if __name__ == "__main__":
    controller = HeaterController()
    temperature = controller.get_external_temperature()
    city = get_current_city_name()
    if temperature:
        print(f"{city} - {temperature}°C")
    else:
        print("Failed to fetch temperature!")
