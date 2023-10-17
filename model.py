import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error


class HeaterModel:
    def __init__(self):
        # Dummy-Daten für das Beispiel
        # Du solltest deine eigenen Daten für das Training verwenden
        data = {
            'external_temperature': [0, 5, 10, 15, 20, 25, 30],
            'heater_temperature': [20, 22, 25, 28, 30, 32, 35]
        }

        # Daten in ein Pandas DataFrame laden
        df = pd.DataFrame(data)

        # Feature (X) und Target (y) Daten vorbereiten
        X = df[['external_temperature']]
        y = df['heater_temperature']

        # Daten in Trainings- und Testsets aufteilen
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Lineare Regression initialisieren und trainieren
        self.model = LinearRegression()
        self.model.fit(X_train, y_train)

        # Modellgenauigkeit auf dem Testset überprüfen
        y_pred = self.model.predict(X_test)
        mse = mean_squared_error(y_test, y_pred)
        print(f'Mean Squared Error on Test Data: {mse}')

    def predict_temperature(self, external_temperature):
        # Vorhersage treffen
        predicted_temperature = self.model.predict([[external_temperature]])
        return predicted_temperature[0]
