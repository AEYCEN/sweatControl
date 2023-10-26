VENV = .venv
PYTHON = $(VENV)/bin/python3
PIP = $(VENV)/bin/pip
os = l

build: requirements.txt
ifeq ($(os),w)
	py -3 -m venv $(VENV)
else
	python3 -m venv $(VENV)
endif
	$(PIP) install -r requirements.txt

clean:
	rm -rf __pycache__
	rm -rf $(VENV)