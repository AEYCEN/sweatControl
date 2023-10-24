<p align="center">
  <picture>
    <source
      width="256px"
      media="(prefers-color-scheme: dark)"
    >
    <img 
      src="static/img/sweatControl-full.png"
    >
  </picture>
  <br><br>
  <b style="font-size: 16px">© 2023 [IT-12] Marcus Adolfs / Alexander Campbell-Smith / Jakub Krymowski</b>
   <br>
   Making heating cool again.
</p>

# SweatControl

<p style="font-size: 17px">Smart home heating solution, dynamically adjusting heat output based on real-time weather data, powered by a neural network algorithm</p>

![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/ReVanced/revanced-patches/release.yml)
![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)

## 💪🏼 Features

Some of the features the patches provide are:

* 🌦️ **Weather-Based Heating**: Automatically adjusting heating in real-time based on current weather conditions, ensuring optimal comfort
* 🧠 **Neural Network Integration**: Neural network algorithms power the intelligent decision-making process for precise temperature control
* 👤 **User-Friendly Interface**: An interface that makes it easy for homeowners to interact with and customize their heating preferences
* 🌿 **Energy Efficiency**: Prioritizing energy efficiency, helping you save on heating costs while maintaining a comfortable environment
* ✨ **And more!**

## 🚀 Installation

SweatControl requires Python >= 3.10 on the machine in order to run. 
First, create and activate an environment to run the application. Navigate in the `sweatControl` folder and run the following 2 commands:

🐧 Linux:

    python3 -m venv .venv
    . .venv/bin/activate

🪟 Windows:

    py -3 -m venv .venv
    .venv\Scripts\activate

(If you want to end the running environment, just enter `deactivate` inside the venv root directory)

Finally, install all the required plugins:

    pip install Flask pandas scikit-learn requests geocoder geopy

## 🛠️ Usage

To run SweatControl, use the following command:

    python run.py

To run it in debug mode instead, use:

    flask --app flaskr run --debug

Head over to [localhost:5000](http://127.0.0.1:5000/), and you should see the running application.

If another program is already using port 5000, you’ll see OSError: [Errno 98] or OSError: [WinError 10013] when the server tries to start. See [Address already in use](https://flask.palletsprojects.com/en/3.0.x/server/#address-already-in-use) for how to handle that.

*Source: [Flask Guide](https://flask.palletsprojects.com/en/3.0.x/quickstart/)*
## 📖 Imprint

**Development, Administration, Project Management & Design**<br>
*Team from Class IT-12:*<br>
Marcus Adolfs<br>
Alexander Campbell-Smith<br>
Jakub Krymowski

**On behalf of**<br>
Frank Mühlen & Thomas Breder<br>
Berufskolleg Uerdingen<br>
Alte Krefelder Str. 93<br>
47829 Krefeld<br>
Germany

## 📜 Licence

SweatControl is licensed under the GPLv3 licence. Please see the [licence file](LICENSE) for more information.
[tl;dr](https://www.tldrlegal.com/license/gnu-general-public-license-v3-gpl-3) you may copy, distribute and modify SweatControl as long as you track changes/dates in source files.
Any modifications to SweatControl must also be made available under the GPL along with build & install instructions.