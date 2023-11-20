import os
import sys


from flask import Flask, render_template, jsonify, request
from app.HeaterController import HeaterController, get_current_city


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True, template_folder='templates', static_folder='static')
    version = '0.1-alpha'

    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    heater_controller = HeaterController()
    if heater_controller.get_external_temperature() is None:
        sys.exit(1)



    @app.route('/update_temperature_room', methods=['POST'])
    def update_temperature_room():
        try:
            data = request.json
            roomTemp = data['roomTemp']

            # Update the heater controller with new temperatures
            heater_controller.room_temperature= int(roomTemp)

            return jsonify({'status': 'success', 'roomTemp': heater_controller.room_temperature})
        except Exception as e:
            return jsonify({'status': 'error'})
    @app.route('/update_temperatures_boiler', methods=['POST'])
    def update_temperatures_boiler():
        try:
            data = request.json
            min_temp = data['minTemperature']
            max_temp = data['maxTemperature']

            # Update the heater controller with new temperatures
            heater_controller.min_heater_temperature = int(min_temp)
            heater_controller.max_heater_temperature = int(max_temp)

            return jsonify({'status': 'success', 'minTemperature': min_temp, 'maxTemperature': max_temp})
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)})

    @app.route('/')
    def index():
        external_temperature = round(heater_controller.get_external_temperature(),1)
        heater_temperature = round(heater_controller.get_heater_temperature(), 1)
        room_temperature = heater_controller.get_wanted_room_temperature()
        city_name = get_current_city()
        heater_variant = heater_controller.get_heater_variant()
        return render_template('base.html',
                               app_version=version,
                               external_temperature=external_temperature,
                               heater_temperature=heater_temperature,
                               room_temperature=room_temperature,
                               city_name=city_name,
                               heater_variant=heater_variant)

    @app.route('/test', methods=['POST'])
    def test():
        data = heater_controller.get_data_diagram()
        # Return the data as a JSON response
        return jsonify(data)

    return app
