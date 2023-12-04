import geocoder
import pgeocode
import pandas as pd
from app.HeaterModel import HeaterModel
from app.WeatherApi import WeatherAPI

class HeaterController:
    # Später User eingaben
    room_temperature = 25
    min_heater_temperature = 30
    max_heater_temperature = 80
    heater_variant = 4  # Liste der Varianten im Select der Einstellungen definiert (0 bis 8)
    defZip = 47906

    def get_postal_code(self):
        try:
            location = geocoder.ip('me')
            return location.postal if location and location.postal else self.defZip
        except:
            return self.defZip

    def get_current_city_name(self):
        nomi = pgeocode.Nominatim('de')
        for postal_code in [self.defZip, self.get_postal_code()]:
            info = nomi.query_postal_code(postal_code)
            if not info.empty:
                place_name = info['place_name']
                if isinstance(place_name, pd.Series):
                    if place_name.notna().all():
                        return place_name.iloc[0]
                elif isinstance(place_name, str):
                    return place_name
        return "City name could not be determined."

    def get_current_city_coordinates(self):
        nomi = pgeocode.Nominatim('de')
        for postal_code in [self.defZip, self.get_postal_code()]:
            info = nomi.query_postal_code(postal_code)
            if not info.empty and not pd.isna(info['latitude']) and not pd.isna(info['longitude']):
                return info['latitude'], info['longitude']
        return None, None

    def __init__(self):
        self.api = WeatherAPI(self.get_current_city_coordinates())
        self.model = HeaterModel()

    def get_external_temperature(self):
        return round(self.api.get_external_temperature(self.heater_variant), 1)

    def get_room_temperature(self):
        return self.room_temperature

    def get_heater_temperature(self):
        return round(self.model.predict_heater_temperature(self.get_external_temperature(),
                                                           self.get_room_temperature(),
                                                           self.min_heater_temperature,
                                                           self.max_heater_temperature), 1)

    def update_room_temperature(self, new_temperature):
        self.room_temperature = new_temperature

    def get_data_diagram(self):
        x = [-20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
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
