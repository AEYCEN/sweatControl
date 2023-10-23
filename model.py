import pandas as pd
from sklearn.linear_model import LinearRegression

class HeaterModel:
    def __init__(self):
        # Dummy-Daten für das Beispiel
        # Du solltest deine eigenen Daten für das Training verwenden
        data = {
            'external_temperature': [0, 5, 10, 15, 20, 25, 30],
            'selected_heater_temperature': [15, 16, 17, 18, 19, 20, 21],
            'target_vorlauftemperatur': [40, 42, 44, 45, 46, 47, 48]
        }

        # Daten in ein Pandas DataFrame laden
        df = pd.DataFrame(data)

        # Feature (X) und Target (y) Daten vorbereiten
        X = df[['external_temperature', 'selected_heater_temperature']]
        y = df['target_vorlauftemperatur']

        # Lineare Regression initialisieren und trainieren
        self.model = LinearRegression()
        self.model.fit(X, y)

    def predict_vorlauftemperatur(self, external_temperature, selected_heater_temperature):
        # Vorhersage treffen
        predicted_vorlauftemperatur = self.model.predict([[external_temperature, selected_heater_temperature]])
        return predicted_vorlauftemperatur[0]
