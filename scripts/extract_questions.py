"""Read the source DOCX and emit the normalized scene/question model as JSON."""

import json
import re
from docx import Document

HEADINGS = {
    "Zueignung",
    "Vorspiel auf dem Theater",
    "Prolog im Himmel",
    "Nacht",
    "Vor dem Tor/ Faust und Wagner/Bauern unter der Linde",
    "Studierzimmer",
    "Auerbachs Keller in Leipzig",
    "Hexenküche",
    "Strasse I",
    "Abend. Ein kleines reinliches Zimmer",
    "Margarete mit einer Lampe",
    "Spaziergang",
    "Der Nachbarin Haus",
    "Strasse II",
    "Garten",
    "Ein Gartenhäuschen",
    "Wald und Höhle",
    "Gretchen am Spinnrad",
    "Marthens Garten",
    "Am Brunnen",
    "Zwinger",
    "Nacht. Strasse vor Gretchens Türe",
    "Dom",
    "Walpurgisnacht",
    "Walpurgisnachtstraum",
    "Trüber Tag. Feld",
    "Kerker",
}

TIMES = {
    "Zueignung": (0, 116),
    "Vorspiel auf dem Theater": (116, 383),
    "Prolog im Himmel": (383, 687),
    "Nacht": (695, 1440),
    "Vor dem Tor/ Faust und Wagner/Bauern unter der Linde": (1441, 1800),
    "Studierzimmer I": (1803, 2340),
    "Studierzimmer II": (2340, 3122),
    "Auerbachs Keller in Leipzig": (3181, 3740),
    "Hexenküche": (3758, 4020),
    "Strasse I": (4034, 4140),
    "Abend. Ein kleines reinliches Zimmer": (4140, 4320),
    "Margarete mit einer Lampe": (4320, 4460),
    "Spaziergang": (4460, 4580),
    "Der Nachbarin Haus": (4580, 4840),
    "Strasse II": (4840, 4865),
    "Garten": (4865, 5380),
    "Ein Gartenhäuschen": (5380, 5420),
    "Wald und Höhle": (5420, 5632),
    "Gretchen am Spinnrad": (5632, 5724),
    "Marthens Garten": (5724, 6000),
    "Am Brunnen": (6000, 6091),
    "Zwinger": (6091, 6182),
    "Nacht. Strasse vor Gretchens Türe": (6182, 6530),
    "Dom": (6534, 6630),
    "Walpurgisnacht": (6630, 6810),
    "Walpurgisnachtstraum": (6810, 6840),
    "Trüber Tag. Feld": (6840, 6968),
    "Kerker": (6968, 7368),
}

NOTES = {
    "Zueignung": "Die Zueignung wird in der Filmfassung nicht gesprochen; die Titel- und Eröffnungssequenz dient hier als Kontrastfolie.",
    "Walpurgisnachtstraum": "Die Filmfassung kürzt diesen Teil stark. Beobachte bewusst, was die Adaption auslässt.",
}

document = Document("Fragen zu Goethes Faust I.docx")
scenes = []
current = None
study_count = 0

for paragraph in document.paragraphs:
    text = " ".join(paragraph.text.replace("\u00a0", " ").split())
    if not text or text == "Fragen zu Goethes Faust I":
        continue
    if text in HEADINGS:
        title = text
        if title == "Studierzimmer":
            study_count += 1
            title = f"Studierzimmer {['I', 'II'][study_count - 1]}"
        start, end = TIMES[title]
        current = {
            "slug": re.sub(r"[^a-z0-9]+", "-", title.lower().replace("ä", "ae").replace("ö", "oe").replace("ü", "ue").replace("ß", "ss")).strip("-"),
            "title": title,
            "start": start,
            "end": end,
            "note": NOTES.get(title, ""),
            "questions": [],
        }
        scenes.append(current)
        continue
    if current is None:
        continue
    matches = list(re.finditer(r"(?<!\d)(\d+)\.\)\s*", text))
    if not matches:
        continue
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        question = text[match.end():end].strip()
        question = re.sub(r"https://www\.youtube\.com/watch\?v=MY0eeotSDi8", "", question).strip()
        current["questions"].append({"source": match.group(1), "text": question})

counter = 0
for scene in scenes:
    for question in scene["questions"]:
        counter += 1
        question["id"] = counter

print(json.dumps(scenes, ensure_ascii=False))
