
from flask import Flask, render_template
from controller import HeaterController

app = Flask(__name__)
controller = HeaterController()

@app.route('/')
def index():
    external_temperature = controller.get_external_temperature()
    heater_temperature = controller.get_heater_temperature()
    return render_template('index.html', external_temperature=external_temperature, heater_temperature=heater_temperature)

if __name__ == '__main__':
    app.run(debug=True)