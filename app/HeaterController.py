import geocoder
from app.HeaterModel import HeaterModel
from app.OpenWeatherAPI import OpenWeatherAPI


class HeaterController:

    room_temperature = 25

    def __init__(self):
        city_name = self.get_current_city()
        self.api = OpenWeatherAPI(city_name)
        self.model = HeaterModel()

    def get_current_city(self):
        location = geocoder.ip('me')
        return location.city

    def get_external_temperature(self):
        return self.api.get_external_temperature()

    def get_room_temperature(self):
        return self.room_temperature

    def get_heater_temperature(self):
        return self.model.predict_vorlauftemperatur(self.get_external_temperature(), self.get_room_temperature())


    def update_room_temperature(self, new_temperature):
        self.room_temperature = new_temperature

    def get_data_diagram(self):
        x = [-20,-19,-18,-17,-16,-15,-14,-13,-12,-11,-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
        predicted_values = []

        for temperature_aussen in x:
            predicted_temperature = self.model.predict_vorlauftemperatur(temperature_aussen, self.get_room_temperature())
            predicted_values.append(predicted_temperature)

        return predicted_values

    def get_wanted_room_temperature(self):
        return 25


if __name__ == "__main__":
    controller = HeaterController()
    temperature = controller.get_external_temperature()
    city = controller.get_current_city()
    if temperature:
        print(f"{city} - {temperature}°C")
    else:
        print("Failed to fetch temperature!")
