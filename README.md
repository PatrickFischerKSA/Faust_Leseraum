# Faust Leseraum

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

## Quellen

- Goethe-Volltext: [Projekt Gutenberg](https://www.projekt-gutenberg.org/goethe/faust1/chap001.html)
- Film: [FAUST – Goethe – Gustaf Gründgens – Will Quadflieg (1960)](https://www.youtube.com/watch?v=qaogjXLdPow)
- Pakt-Einzelclip: [Faust – Pakt](https://www.youtube.com/watch?v=Ou3AV5i1754)
- Lied-Einzelclip: [Es war ein König in Thule – Faust (1960)](https://www.youtube.com/watch?v=wvSGWN_9kwk)

Die Videos werden nicht kopiert, sondern datensparsam über `youtube-nocookie.com` eingebettet. Verfügbarkeit und Rechte liegen bei den jeweiligen Anbietern.
