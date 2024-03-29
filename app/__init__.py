import os
import sys

from flask import Flask, render_template, jsonify, request
from app.HeaterController import HeaterController


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True, template_folder='templates', static_folder='static')
    version = '0.3-alpha'

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
            heater_controller.room_temperature = int(roomTemp)

            return jsonify({'status': 'success', 'roomTemp': heater_controller.room_temperature})
        except Exception as e:
            return jsonify({'status': 'error'})

    @app.route('/get_diagram', methods=['POST'])
    def test():
        data = {"chartValues": heater_controller.get_data_diagram(),
                "externalTemp": heater_controller.get_external_temperature(),
                "heaterTemp": heater_controller.get_heater_temperature(),
                "city": heater_controller.get_current_city_name()}

        return jsonify(data)

    @app.route('/update_settings', methods=['POST'])
    def update_settings():
        try:
            data = request.json
            plz = data['plz']
            min_temp = data['minTemperature']
            max_temp = data['maxTemperature']
            new_variant = data['heaterVariant']

            # Update the heater controller with new temperatures
            heater_controller.heater_variant = int(new_variant)
            heater_controller.min_heater_temperature = int(min_temp)
            heater_controller.max_heater_temperature = int(max_temp)
            heater_controller.defZip = int(plz)


            return jsonify(
                {'status': 'success', 'minTemperature': min_temp, 'maxTemperature': max_temp, 'variant': new_variant, 'zip': heater_controller.defZip})
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)})

    @app.route('/')
    def index():
        external_temperature = heater_controller.get_external_temperature()
        heater_temperature = heater_controller.get_heater_temperature()
        room_temperature = heater_controller.get_wanted_room_temperature()
        city_name = heater_controller.get_current_city_name()
        city_zip = heater_controller.defZip
        heater_variant = heater_controller.get_heater_variant()
        return render_template('base.html',
                               app_version=version,
                               external_temperature=external_temperature,
                               heater_temperature=heater_temperature,
                               room_temperature=room_temperature,
                               city_name=city_name,
                               city_zip=city_zip,
                               heater_variant=heater_variant)

    return app
