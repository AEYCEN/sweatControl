name: ⭐ Feature
description: Erstelle ein detailliertes Ticket für eine neues Feature.
title: 'feat: '
labels: ['enhancement']
body:
  - type: markdown
    attributes:
      value: |
        # SweatControl feature
        
        Bitte prüfe, ob für dieses Feature bereits Tickets vorhanden sind
        [hier](https://github.com/AEYCEN/sweatControl/labels/enhancement)
        bevor Du ein neues erstellst.
  - type: textarea
    attributes:
      label: Feature-Beschreibung
      description: |
        - Beschreibe die Funktion im Detail
        - Füge nach Möglichkeit Bilder, Videos, Links, Beispiele, Referenzen usw. hinzu
  - type: textarea
    attributes:
      label: Lösung
      description: | 
        Vorschlag, wie das Ticket umgesetzt werden könnte
        
        - Welche Dateien müssten angepasst werden?
        - Welche Techniken können angewendet werden?
        - Gibt es eventuell mehrere Herangehensweisen?
    validations:
      required: true
