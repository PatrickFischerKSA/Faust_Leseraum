'use client';
/* eslint-disable @next/next/no-img-element -- previews use local object URLs */

import { useEffect, useRef, useState } from 'react';

type Medium = 'photo' | 'video' | 'audio';
type Capture = { medium: Medium; title: string; shot: string; test: string };

const plans: Record<string, { title: string; intro: string; captures: Capture[]; textReturn: string }> = {
  werkstatt: {
    title: 'Hört man den Sprung vom Fühlen zum Wissen?',
    intro: 'Nehmt nicht das ganze Experiment auf. Sichert genau die zwei Momente, an denen aus Wahrnehmung eine Behauptung wird.',
    captures: [
      { medium: 'audio', title: 'Tonspur vor dem Öffnen', shot: '20–30 Sekunden: Person B nennt zuerst drei Tastbefunde und dann ihre Vermutung. Kein Nachsprechen und keine Korrektur.', test: 'Hört erneut hin: Bei welchem Wort wechselt B unbemerkt vom Befund zum Schluss?' },
      { medium: 'photo', title: 'Beweisfoto nach dem Öffnen', shot: 'Gegenstände und die vier Zettel BEFUND, SCHLUSS, SICHERHEIT, OFFEN müssen gemeinsam im Bild liegen.', test: 'Welche Aussage bleibt trotz sichtbarem Gegenstand noch unsicher oder offen?' }
    ],
    textReturn: 'Legt die Tonspur neben Fausts Satzfolge: Wo wechselt auch er vom belegbaren „habe … studiert“ zum umfassenden „wir nichts wissen können“?'
  },
  krise: {
    title: 'Was zeigt das Pendel, was eure Erinnerung verschluckt?',
    intro: 'Die Aufnahme dient als Messspur: Sie muss einen Vergleich ermöglichen, nicht bloss das Experiment dokumentieren.',
    captures: [
      { medium: 'video', title: 'Zwei Pendel im gleichen Bild', shot: '10–15 Sekunden von der Seite. Startet beide Pendel gleichzeitig; Fadenlängen und ruhende Kamera müssen sichtbar sein.', test: 'Spielt mit halber Geschwindigkeit: Welche Behauptung lässt sich sehen, welche braucht Zählung und Messung?' },
      { medium: 'audio', title: 'Vorhersage vor dem Start', shot: 'Jede Person sagt vor der Messung einen Satz: „Ich erwarte …, weil …“', test: 'Welche Begründung stammt aus Vorwissen, welche bloss aus Bauchgefühl?' }
    ],
    textReturn: 'Vergleicht die beiden Spuren mit Faust und Wagner: Wer würde der Messreihe vertrauen, wer würde ihr vorwerfen, das Wesentliche nicht zu erfassen?'
  },
  natur: {
    title: 'Ein Körper – zwei fotografische Wirklichkeiten',
    intro: 'Haltet Abstand und Bildausschnitt gleich. Nur die Lichtquelle darf sich verändern.',
    captures: [
      { medium: 'photo', title: 'Foto A: Licht von links', shot: 'Papierkörper, Schatten und Position der Lampe müssen sichtbar sein.', test: 'Nennt drei sichtbare Merkmale, ohne „weil“, „wirkt“ oder „bedeutet“ zu verwenden.' },
      { medium: 'photo', title: 'Foto B: Licht von oben', shot: 'Fotografiert aus genau derselben Kameraposition wie bei Foto A.', test: 'Was ist am Gegenstand gleich geblieben, obwohl das Bild eine andere Welt behauptet?' }
    ],
    textReturn: 'Prüft an „Welch Schauspiel! aber ach! ein Schauspiel nur!“: Sind die Fotos Täuschungen – oder begrenzte, aber brauchbare Zugänge zum Gegenstand?'
  },
  philosophie: {
    title: 'Wie verändern Wort, Sinn, Kraft und Tat den Körper?',
    intro: 'Die Aufnahme soll hör- und sichtbar machen, dass Übersetzen nicht nur Wörter ersetzt, sondern Erwartungen erzeugt.',
    captures: [
      { medium: 'audio', title: 'Vier Lesarten', shot: 'Sprecht nacheinander: „Im Anfang war das Wort / der Sinn / die Kraft / die Tat.“ Lasst zwischen den Sätzen zwei Sekunden Pause.', test: 'Wo verändern sich Betonung, Tempo oder Lautstärke – und warum gerade dort?' },
      { medium: 'video', title: 'Vier spontane Gesten', shot: 'Eine Person spricht die Varianten, eine zweite reagiert jeweils sofort mit einer Geste. 20 Sekunden genügen.', test: 'Welche Übersetzung erzeugt Bewegung, welche Nachdenken, welche Autorität?' }
    ],
    textReturn: 'Kehrt zu Fausts Übersetzungsprozess zurück: Entscheidet er aufgrund des griechischen Textes – oder führt ihn seine eigene Sehnsucht zur „Tat“?'
  },
  homunculus: {
    title: 'Der Körper verrät das Risiko vor dem Fehlwurf',
    intro: 'Filmt nicht das Ergebnis allein, sondern Entscheidung, Zögern und Wurf in einer ungeschnittenen Einstellung.',
    captures: [
      { medium: 'video', title: 'Entscheidung und Wurf', shot: '15 Sekunden: Punktwert laut nennen, Distanz wählen, werfen und unmittelbar reagieren.', test: 'Stoppt vor dem Abwurf: Welche Körperzeichen verraten Zweifel, Ehrgeiz oder Leichtsinn?' },
      { medium: 'audio', title: 'Begründung danach', shot: 'Die werfende Person erklärt ohne Vorbereitung, warum sie diese Distanz gewählt hat.', test: 'Erklärt die Person ihre frühere Entscheidung – oder erfindet sie nachträglich eine vernünftige Geschichte?' }
    ],
    textReturn: 'Prüft „Es irrt der Mensch, solang er strebt“: Zeigt die Aufnahme lernfähiges Streben oder bestätigt sie Mephistos Spott über menschliche Vernunft?'
  },
  fortschritt: {
    title: 'Wird Einfluss in der Aufnahme sichtbar?',
    intro: 'Nehmt beide Wahlsituationen aus derselben Perspektive auf. Die wählende Person darf die Absicht vorher nicht kennen.',
    captures: [
      { medium: 'video', title: 'Neutrale und gelenkte Wahl', shot: 'Zwei kurze, ungeschnittene Durchgänge: zuerst neutrale Auslage, dann ein Gegenstand näher und auffälliger platziert.', test: 'Welche Blick- oder Handbewegung geschieht, bevor die Person ihre Wahl begründet?' },
      { medium: 'audio', title: 'Erklärung ohne Hinweis', shot: 'Fragt direkt nach der zweiten Wahl: „Warum genau diesen Gegenstand?“ Verratet die Veränderung erst danach.', test: 'Taucht die Inszenierung in der Begründung auf – oder erlebt die Person ihre Wahl als völlig selbstbestimmt?' }
    ],
    textReturn: 'Übertragt nur das Beobachtbare auf die Paktszene: Wo schafft Mephistopheles Bedingungen, und wo setzt Faust selbst Wort und Unterschrift?'
  }
};

const acceptFor = (medium: Medium) => medium === 'photo' ? 'image/*' : medium === 'video' ? 'video/*' : 'audio/*';
const iconFor = (medium: Medium) => medium === 'photo' ? '▣' : medium === 'video' ? '▶' : '◉';

export default function MediaEvidence({ moduleId, note, onNote }: { moduleId: string; note: string; onNote: (value: string) => void }) {
  const plan = plans[moduleId];
  const [files, setFiles] = useState<Record<number, { url: string; name: string; medium: Medium }>>({});
  const urls = useRef<string[]>([]);
  useEffect(() => () => urls.current.forEach(url => URL.revokeObjectURL(url)), []);
  if (!plan) return null;

  function choose(index: number, medium: Medium, file?: File) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    urls.current.push(url);
    setFiles(current => ({ ...current, [index]: { url, name: file.name, medium } }));
  }

  return <section className="mediaEvidence">
    <header><div><span>MEDIENBEWEIS · LOKAL AUF DIESEM GERÄT</span><h4>{plan.title}</h4></div><p>{plan.intro}</p></header>
    <div className="captureGrid">{plan.captures.map((capture, index) => {
      const file = files[index];
      return <article key={`${capture.medium}-${capture.title}`} className={file ? 'hasMedia' : ''}>
        <div className="captureTitle"><b>{iconFor(capture.medium)}</b><div><span>{capture.medium === 'photo' ? 'Foto' : capture.medium === 'video' ? 'Kurzfilm' : 'Tonaufnahme'}</span><h5>{capture.title}</h5></div></div>
        <p><strong>So aufnehmen:</strong> {capture.shot}</p>
        {file && <div className="mediaPreview">{file.medium === 'photo' ? <img src={file.url} alt={`Lokale Vorschau: ${capture.title}`}/> : file.medium === 'video' ? <video src={file.url} controls playsInline/> : <audio src={file.url} controls/>}<small>{file.name}</small></div>}
        <label className="captureButton"><input type="file" accept={acceptFor(capture.medium)} capture={capture.medium === 'photo' ? 'environment' : 'user'} onChange={event => choose(index, capture.medium, event.target.files?.[0])}/><span>{file ? 'Neu aufnehmen / ersetzen' : `${capture.medium === 'photo' ? 'Foto' : capture.medium === 'video' ? 'Film' : 'Ton'} aufnehmen oder wählen`}</span></label>
        <div className="evidenceTest"><span>Beim Abspielen prüfen</span><p>{capture.test}</p></div>
      </article>;
    })}</div>
    <div className="mediaTextReturn"><div><span>Zurück in den Text</span><p>{plan.textReturn}</p></div><label><span>Was zeigt die Aufnahme, was ihr ohne sie übersehen hättet?</span><textarea value={note} onChange={event => onNote(event.target.value)} placeholder="In der Aufnahme ist bei … zu sehen / zu hören … Das verändert unsere Deutung der Textstelle, weil …"/></label></div>
    <p className="mediaPrivacy">Die Aufnahmen werden nicht hochgeladen. Sie bleiben nur für diese Sitzung im Browser sichtbar. Nehmt keine Personen ohne deren Einverständnis auf.</p>
  </section>;
}
