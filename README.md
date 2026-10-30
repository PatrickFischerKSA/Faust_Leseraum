# Am Anfang war der Text

Eine interaktive, szenenbasierte Lernplattform zu Johann Wolfgang von Goethes **Faust I**. Die 84 Aufgaben aus der bereitgestellten Fragensammlung werden mit präzise gesetzten Ausschnitten der Gründgens/Quadflieg-Verfilmung von 1960 verbunden.

## Funktionen

- 28 Szenen und 84 vollständig übernommene Arbeitsfragen
- eingebettete Filmsequenzen mit Zeitmarken und Links zur Originalquelle
- zusätzliche Einzelclips für den Pakt und „Der König in Thule“
- Antwortfelder mit automatischer Speicherung im Browser
- Bearbeitungsstand, Suche und Filter
- Markdown-Export aller Antworten
- responsive Oberfläche ohne Anmeldung oder Server-Datenbank

## Lokal starten

```bash
npm install
npm run dev
```

Die lokale Vorschau läuft danach standardmäßig unter `http://localhost:3000`.

## Produktionsbuild

```bash
npm run build
```

Das Projekt nutzt React, Next.js/Vinext und ist als statische, clientseitige Lernanwendung ohne geheime Umgebungsvariablen angelegt. Es kann als GitHub-Repository versioniert und über eine Cloudflare-Worker-kompatible Plattform veröffentlicht werden.

## Auf GitHub Pages aktivieren

Die Veröffentlichungs-Automation ist bereits vollständig eingerichtet. Es sind nur diese Schritte nötig:

1. Auf GitHub ein leeres Repository namens `faust-leseraum` anlegen.
2. Dieses Projekt dorthin übertragen:

   ```bash
   git remote add origin https://github.com/DEIN-GITHUB-NAME/faust-leseraum.git
   git push -u origin main
   ```

3. Im GitHub-Repository **Settings → Pages** öffnen und bei **Source** die Option **GitHub Actions** wählen.

Der enthaltene Workflow baut und veröffentlicht die Lernplattform danach automatisch. Jeder weitere Push auf `main` aktualisiert die öffentliche GitHub-Pages-Seite. Der Repository-Name darf auch anders lauten; der Basispfad wird automatisch erkannt.

Für einen lokalen Test des GitHub-Pages-Builds:

```bash
GITHUB_ACTIONS=true GITHUB_REPOSITORY=lokal/faust-leseraum \
NEXT_PUBLIC_BASE_PATH=/faust-leseraum npm run build:github
```

## Quellen

- Goethe-Volltext: [Projekt Gutenberg](https://www.projekt-gutenberg.org/goethe/faust1/chap001.html)
- Filmfassung: *FAUST* – Goethe · Gustaf Gründgens · Will Quadflieg (1960)

Die 28 Unterrichtssequenzen liegen als lokale, komprimierte MP4-Dateien im Projekt. Die Website verbindet sich beim Abspielen nicht mit YouTube. Die vollständige 4K-Schnittquelle wird nicht im Repository veröffentlicht.

Der Hero der Startseite verwendet `public/faust-pakt-hintergrund.mp4` als stumme, weichgezeichnete Endlosschleife. Besucherinnen und Besucher können die Wiedergabe jederzeit anhalten und wieder starten.

Der Titelbereich der Wissenswelten verwendet `public/studierzimmer-hintergrund.mp4` nach demselben Prinzip: lokal, stumm, moderat weichgezeichnet, endlos wiederholt und jederzeit pausierbar.

Ganz oben im Leseraum stehen drei lokal eingebettete Kurzfassungen zur Wahl: *Goethes Faust in 90 Sekunden*, *Faust in 5 Minuten* und *Faust I to go · MeinSenf*. Die Dateien sind für das Web komprimiert und werden direkt von der Plattform geladen.

## Rückmeldungen zu den 84 Lektürefragen

Jede Frage hat ein eigenes Prüfprofil in `app/feedbackProfiles.ts` mit einem konkreten Aufgabenhinweis. `app/feedbackEngine.ts` erkennt sprachliche Anknüpfungen, Beleg- und Begründungssignale. Umlaute werden konsistent normalisiert und Wortanfänge statt beliebiger Teilzeichenfolgen geprüft. Die Rückmeldung bescheinigt keine inhaltliche Richtigkeit; eigene Formulierungen sind zulässig. Der Bearbeitet-Status kann bei einer nicht leeren Antwort unabhängig von der heuristischen Erkennung gesetzt werden. Antworten und bisheriger Bearbeitungsstand bleiben im vorhandenen Speicherformat erhalten.

Regressionstest: `node scripts/test-feedback.cjs`.


## Musterlösungen nach der eigenen Antwort

Alle 84 Lektürefragen enthalten einen eigenständigen Lösungsvorschlag in `app/modelAnswers.ts`. Sobald das Antwortfeld einen nicht leeren eigenen Text enthält, erscheint unter der Rückmeldung „Musterlösung zu Frage … anzeigen“. Die Lösung bleibt zunächst eingeklappt, öffnet sich auf Wunsch und verschwindet bei leerem Antwortfeld wieder. Beim Fragenwechsel wird die Aufklappansicht zurückgesetzt. Gespeicherte Antworten ermöglichen den Vergleich auch nach dem Neuladen. Keine Freigabe durch die heuristische Signalprüfung ist nötig.

Jede Lösung umfasst einen ausgeführten Antwortvorschlag, einen individuellen Vergleichshinweis und den Link zur passenden Originalszene bei Projekt Gutenberg. Offene Deutungen, persönliche Beispiele und noch selbst auszuführende Rechercheteile sind gekennzeichnet. Inszenierungsbeobachtungen sind am konkreten Film zu prüfen. Sachlich ungenaue Voraussetzungen der Originalfragen werden ausdrücklich eingeordnet, etwa Johannesevangelium/Genesis, Fausts vorläufige Übersetzungsentscheidung und die Stimmen im Dom. Die Lösungen verändern und überschreiben keine eigenen Antworten.

Grundlage: Goethes gemeinfreier Originaltext, [Faust: Eine Tragödie, Projekt Gutenberg](https://projekt-gutenberg.org/authors/johann-wolfgang-von-goethe/books/faust-eine-tragoedie/), eigene didaktische Formulierungen. Stand: 30. Oktober 2026.
