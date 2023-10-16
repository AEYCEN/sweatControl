![SweatControl Logo](/assets/img/sc-logo.png)
# SweatControl
## Smart home heating solution powered by neuronal networks
#### © 2023 [IT-12] Marcus Adolfs / Alexander Campbell-Smith / Jakub Krymowski

## Installation
SweatControl requires Python >= 3.10 on the machine in order to run. 
First, clone the project with either HTTPS or SSH:

- SSH:
`git clone git@github.com:AEYCEN/sweatControl.git`
- HTTPS:
`git clone https://github.com/AEYCEN/sweatControl.git`

Then, create an environment to run the application. First, navigate in the `sweatControl` folder and run the following command:

- Linux:
`python3 -m venv .venv`
- Windows:
`py -3 -m venv .venv`

After creating the environment, activate it with the following command:

- Linux:
`. .venv/bin/activate`
- Windows:
`.venv\Scripts\activate`

Finally, install flask:

`pip install Flask`

If you want to end the running environment, just enter `deactivate` inside the venv root directory.

For the plugins use following command.

`pip install Flask pandas scikit-learn requests`

## Usage

To run SweatControl, use the flask command or python -m flask. You need to tell the Flask where your application is with the --app option.
This starts the Flask app 'hello':

`flask --app hello run`


As a shortcut, if the file is named app.py or wsgi.py, you don’t have to use --app. 

Now head over to [localhost:5000](http://127.0.0.1:5000/), and you should see the running application.

If another program is already using port 5000, you’ll see OSError: [Errno 98] or OSError: [WinError 10013] when the server tries to start. See [Address already in use](https://flask.palletsprojects.com/en/3.0.x/server/#address-already-in-use) for how to handle that.

*Source: [Flask Guide](https://flask.palletsprojects.com/en/3.0.x/quickstart/)*

## Impressum
**Im Auftrag von**<br>
Frank Mühlen & Thomas Breder<br>
Berufskolleg Uerdingen<br>
Alte Krefelder Str. 93<br>
47829 Krefeld

**Entwicklung, Administration, Projektmanagement & Design**<br>
*Team aus der Klasse IT-12:*<br>
Marcus Adolfs<br>
Alexander Campbell-Smith<br>
Jakub Krymowski

