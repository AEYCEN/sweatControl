import pandas as pd
from sklearn.linear_model import LinearRegression


class HeaterModel:
    def __init__(self):
        data = {
            'external_temperature': [20, 18, 15, 13, 10, 8, 5, 0, -5, -8, -10, -13, -15, -18, -20],
            'selected_heater_temperature': [14, 16, 17, 18, 20, 22, 23, 24, 25, 26, 28, 30, 32, 34, 35],
            'target_vorlauftemperatur': [30, 33, 35, 40, 43, 45, 50, 53, 55, 60, 63, 65, 70, 73, 80]
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
