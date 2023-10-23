import os

from flask import Flask, render_template
from .HeaterController import HeaterController


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True, template_folder='../templates', static_folder='../static')

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

    heaterController = HeaterController()

    @app.route('/')
    def index():
        external_temperature = heaterController.get_external_temperature()
        external_temperature = round(external_temperature, 1)
        heater_temperature = heaterController.get_heater_temperature()
        room_temperature = heaterController.get_heater_temperature()
        city_name = heaterController.get_current_city()
        return render_template('index.html',
                               external_temperature=external_temperature,
                               heater_temperature=heater_temperature,
                               room_temperature=room_temperature,
                               city_name=city_name)

    return app
