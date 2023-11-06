import pandas as pd
from sklearn.linear_model import LinearRegression


class HeaterModel:
    def __init__(self):
        data = {
            'external_temperature': [-20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30],
            'selected_heater_temperature': [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
            'target_vorlauftemperatur': [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70]
        }

        # Daten in ein Pandas DataFrame laden
        df = pd.DataFrame(data)

        # Feature (x) und Target (y) Daten vorbereiten
        x = df[['external_temperature', 'selected_heater_temperature']]
        y = df['target_vorlauftemperatur']

        # Lineare Regression initialisieren und trainieren
        self.model = LinearRegression()
        self.model.fit(x, y)

    def predict_heater_temperature(self, external_temperature, selected_heater_temperature, min_temp, max_temp):
        predicted_vorlauftemperatur = self.model.predict([[external_temperature, selected_heater_temperature]])
        return max(min(predicted_vorlauftemperatur[0], max_temp), min_temp)
