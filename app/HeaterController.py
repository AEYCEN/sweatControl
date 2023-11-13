import geocoder
from app.HeaterModel import HeaterModel
from app.OpenWeatherAPI import OpenWeatherAPI


def get_current_city():
    location = geocoder.ip('me')
    return location.city


class HeaterController:
    # Später User eingaben
    room_temperature = 25
    min_heater_temperature = 30
    max_heater_temperature = 80

    def __init__(self):
        city_name = get_current_city()
        self.api = OpenWeatherAPI(city_name)
        self.model = HeaterModel()

    def get_external_temperature(self):
        return self.api.get_external_temperature()

    def get_room_temperature(self):
        return self.room_temperature

    def get_heater_temperature(self):
        return self.model.predict_heater_temperature(self.get_external_temperature(), self.get_room_temperature(),
                                                     self.min_heater_temperature, self.max_heater_temperature)

    def update_room_temperature(self, new_temperature):
        self.room_temperature = new_temperature

    def get_data_diagram(self):
        x = [-20, -18, -16, -14, -12, -10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
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


if __name__ == "__main__":
    controller = HeaterController()
    temperature = controller.get_external_temperature()
    city = get_current_city()
    if temperature:
        print(f"{city} - {temperature}°C")
    else:
        print("Failed to fetch temperature!")
