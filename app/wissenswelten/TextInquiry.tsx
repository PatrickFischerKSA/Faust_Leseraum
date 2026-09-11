'use client';

import { useState } from 'react';
import { TextFeedback } from '../feedback';

type TextLab = {
  scene: string;
  title: string;
  intro: string;
  left: string;
  right: string;
  quotes: { label: string; text: string; check: string }[];
  voices: { speaker: string; text: string; thought: string; starter: string }[];
  prompt: string;
};

const labs: Record<string, TextLab> = {
  werkstatt: {
    scene: 'Nacht · Eingangsmonolog',
    title: 'Wie wächst aus einer Bilanz ein Totalurteil?',
    intro: 'Bewege die Sätze einzeln. Entscheidend ist nicht die „richtige Zahl“, sondern ob du ihre unterschiedliche Reichweite am Wortlaut erklären kannst.',
    left: 'prüfbarer Befund', right: 'Totalurteil',
    quotes: [
      { label: 'Studieninventar', text: '„Habe nun, ach! Philosophie, / Juristerei und Medizin … durchaus studiert“', check: 'Das Studium mehrerer Fächer ist ein begrenzter, grundsätzlich überprüfbarer Befund.' },
      { label: 'Selbsturteil', text: '„Da steh ich nun, ich armer Tor!“', check: '„Tor“ misst nicht Wissen, sondern wertet Faust als Person ab.' },
      { label: 'Bilanz', text: '„Und bin so klug als wie zuvor“', check: 'Der Vergleich bleibt ohne benannten Massstab: Was müsste „klüger“ hier bedeuten?' },
      { label: 'Verallgemeinerung', text: '„Dass wir nichts wissen können!“', check: 'Aus Fausts eigener Krise wird eine Behauptung über alle Menschen und alles Wissen.' }
    ],
    voices: [
      { speaker: 'Wagner', text: '„Zwar weiss ich viel, doch möcht’ ich alles wissen.“', thought: 'Begrenztes Wissen ist für ihn kein Scheitern, sondern der Ausgangspunkt weiterer Arbeit.', starter: 'Wagner widerspricht Faust, weil begrenztes Wissen für ihn …' },
      { speaker: 'Fausts eigene Messlatte', text: '„Dass ich erkenne, was die Welt / Im Innersten zusammenhält“', thought: 'Vielleicht scheitert nicht Wissen überhaupt, sondern der Wunsch nach vollständiger Welterkenntnis.', starter: 'Fausts Klage hängt an seiner Messlatte der Totalerkenntnis; das zeigt …' }
    ],
    prompt: 'Faust kann begründet sagen … Zu weit geht sein Schluss bei … Eine genauere Folgerung wäre …'
  },
  krise: {
    scene: 'Nacht · Faust und Wagner',
    title: 'Zwei Arten, dem Nichtwissen zu begegnen',
    intro: 'Ordne nicht einfach Faust links und Wagner rechts ein. Prüfe bei jedem Satz, welche Form von Wissen anerkannt und welche abgewertet wird.',
    left: 'prüfbare Teilkenntnis', right: 'unmittelbare Ganzheit',
    quotes: [
      { label: 'Wagners Ausgangslage', text: '„Zwar weiss ich viel, doch möcht’ ich alles wissen.“', check: 'Wagner behandelt Wissen als erweiterbar: Viel wissen und weiterfragen widersprechen sich nicht.' },
      { label: 'Fausts Einwand', text: '„Das Pergament, ist das der heil’ge Bronnen, / Woraus ein Trunk den Durst auf ewig stillt?“', check: 'Faust bestreitet nicht, dass Texte Wissen enthalten. Er bestreitet, dass dieses Wissen seinen „Durst“ stillt.' },
      { label: 'Nutzenurteil', text: '„Was man nicht weiss, das eben brauchte man, / Und was man weiss, kann man nicht brauchen.“', check: 'Hier beurteilt Faust Wissen nach Brauchbarkeit. Wahrheit und Lebensnutzen werden miteinander verschränkt.' },
      { label: 'Überlieferung', text: '„Was ihr den Geist der Zeiten heisst, / Das ist im Grund der Herren eigner Geist“', check: 'Faust vermutet, dass historische Darstellung die Perspektive der Darstellenden trägt.' }
    ],
    voices: [
      { speaker: 'Wagner', text: '„Ach Gott! die Kunst ist lang; / Und kurz ist unser Leben.“', thought: 'Begrenzte Lebenszeit spricht für geduldige, überlieferte Methoden – nicht gegen sie.', starter: 'Wagners Stärke liegt darin, dass … Seine Grenze zeigt sich, wenn …' },
      { speaker: 'Faust', text: '„Wenn ihr’s nicht fühlt, ihr werdet’s nicht erjagen“', thought: 'Faust fordert innere Beteiligung. Doch Gefühl allein macht eine Aussage noch nicht überprüfbar.', starter: 'Faust erinnert zu Recht daran, dass … Als Erkenntniskriterium reicht Gefühl dennoch nicht, weil …' }
    ],
    prompt: 'Die Pendelaufnahme zeigt … Wagner würde daraus … Faust würde einwenden … Verlässlich wird die Aussage erst, wenn …'
  },
  natur: {
    scene: 'Nacht · Makrokosmos und Erdgeist',
    title: 'Vom sichtbaren Bild zur behaupteten Ganzheit',
    intro: 'Lege die beiden Schattenfotos daneben. Prüfe dann, wann Faust ein Zeichen beschreibt und wann er darin bereits das Ganze der Natur zu sehen glaubt.',
    left: 'begrenzte Erscheinung', right: 'Anspruch aufs Ganze',
    quotes: [
      { label: 'Bild der Ordnung', text: '„Wie alles sich zum Ganzen webt, / Eins in dem andern wirkt und lebt!“', check: 'Das Zeichen bietet Faust ein Modell von Zusammenhang. Ob die Natur selbst so ist, bleibt noch offen.' },
      { label: 'Selbstkorrektur', text: '„Welch Schauspiel! aber ach! ein Schauspiel nur!“', check: 'Faust erkennt die Differenz zwischen Darstellung und Wirklichkeit ausdrücklich.' },
      { label: 'Begegnung', text: '„Du gleichst dem Geist, den du begreifst, / Nicht mir!“', check: 'Der Erdgeist weist Fausts Selbstdeutung zurück: Verstehen ist an die Reichweite des Begreifenden gebunden.' },
      { label: 'Naturerfahrung', text: '„Erhabner Geist, du gabst mir, gabst mir alles, / Warum ich bat.“', check: 'In „Wald und Höhle“ spricht Faust aus Erfahrung. Ob diese Erfahrung allgemeines Wissen liefert, ist eine zweite Frage.' }
    ],
    voices: [
      { speaker: 'Faust, ernüchtert', text: '„Ein Schauspiel nur!“', thought: 'Ein Modell kann begrenzt sein und trotzdem etwas zeigen. Begrenztheit ist noch keine Täuschung.', starter: 'Wie das Schattenfoto zeigt auch das Zeichen … Es lässt jedoch … unsichtbar.' },
      { speaker: 'Der Erdgeist', text: '„Du gleichst dem Geist, den du begreifst“', thought: 'Erkennen hängt auch von den Begriffen und Erwartungen der erkennenden Person ab.', starter: 'Der Erdgeist macht Faust darauf aufmerksam, dass sein Erkenntnismodell …' }
    ],
    prompt: 'Auf Foto A ist …, auf Foto B … Gleich bleibt … Fausts Zeichen leistet ähnlich …, überschreitet aber den Befund bei …'
  },
  philosophie: {
    scene: 'Studierzimmer I · Übersetzung',
    title: 'Vier Übersetzungen erzeugen vier Anfänge',
    intro: 'Hört eure vier Lesarten nochmals an. Verschiebt dann jede Variante zwischen Textbindung und Fausts eigener Setzung.',
    left: 'am Wortlaut orientiert', right: 'von Faust gesetzt',
    quotes: [
      { label: 'Wort', text: '„Im Anfang war das Wort!“', check: '„Wort“ steht zunächst auf dem Blatt. Faust verwirft die Formulierung wegen seines eigenen Zweifels.' },
      { label: 'Sinn', text: '„Im Anfang war der Sinn.“', check: '„Sinn“ deutet bereits: Faust ersetzt den Ausdruck durch das, was er für dessen Bedeutung hält.' },
      { label: 'Kraft', text: '„Im Anfang war die Kraft!“', check: '„Kraft“ verschiebt den Anfang vom Zeichen zu einer wirkenden Ursache.' },
      { label: 'Tat', text: '„Im Anfang war die Tat!“', check: '„Tat“ passt zu Fausts Handlungsdrang. Gerade deshalb muss die Übersetzungsentscheidung geprüft werden.' }
    ],
    voices: [
      { speaker: 'Der zögernde Faust', text: '„Ich kann das Wort so hoch unmöglich schätzen“', thought: 'Sein persönliches Sprachverständnis steuert die Übersetzung schon vor dem Ergebnis.', starter: 'Fausts Vorverständnis wird sichtbar in … Dadurch gewinnt seine Übersetzung …, verliert aber …' },
      { speaker: 'Die Aufnahme', text: 'Betonung, Pause, Geste', thought: 'Eure Ton- und Filmspur zeigt, dass ein einzelnes Wort Körper und Erwartung verändert.', starter: 'Unsere Aufnahme zeigt bei der Variante … eine Veränderung von … Das stützt / widerlegt …' }
    ],
    prompt: 'Die Variante … bleibt nah am Text, weil … Faust setzt mit … einen eigenen Akzent. Unsere Aufnahme macht das hör- oder sichtbar durch …'
  },
  homunculus: {
    scene: 'Prolog im Himmel · Menschenbilder',
    title: 'Ist Irrtum Defekt oder Teil des Strebens?',
    intro: 'Spielt die Wurfaufnahme bis unmittelbar vor die Entscheidung. Prüft dann, welches Menschenbild den Moment besser erklärt – ohne den Ausgang schon als Beweis zu nehmen.',
    left: 'Mephistos Spott', right: 'Vertrauen des Herrn',
    quotes: [
      { label: 'Vernunft als Problem', text: '„Er nennt’s Vernunft und braucht’s allein, / Nur tierischer als jedes Tier zu sein.“', check: 'Mephisto sieht Vernunft nicht als Schutz vor Irrtum, sondern als Werkzeug zur Steigerung des Fehlverhaltens.' },
      { label: 'Irrtum im Prozess', text: '„Es irrt der Mensch, solang er strebt.“', check: 'Der Herr entschuldigt nicht jeden Fehler. Er ordnet Irrtum in einen offenen Entwicklungsprozess ein.' },
      { label: 'Orientierung', text: '„Ein guter Mensch in seinem dunkeln Drange / Ist sich des rechten Weges wohl bewusst.“', check: 'Das Vertrauen gilt einer Orientierung trotz Dunkelheit – nicht lückenlosem Wissen.' },
      { label: 'Mephistos Prognose', text: '„Staub soll er fressen, und mit Lust“', check: 'Mephisto erwartet nicht bloss einen einzelnen Fehler, sondern Fausts dauerhafte Erniedrigung.' }
    ],
    voices: [
      { speaker: 'Mephistopheles', text: 'Vernunft macht den Menschen „tierischer“', thought: 'Eine nachträgliche, schön klingende Begründung der Aufnahme könnte seinen Spott stützen.', starter: 'Mephistos Sicht wird durch die Aufnahme gestützt, wenn … Dagegen spricht …' },
      { speaker: 'Der Herr', text: 'Irrtum geschieht „solang er strebt“', thought: 'Ein Fehlwurf stützt diese Position nur, wenn aus ihm tatsächlich eine veränderte nächste Entscheidung entsteht.', starter: 'Als produktives Streben zählt der Irrtum erst, wenn … In unserer Aufnahme erkennt man …' }
    ],
    prompt: 'Vor dem Wurf sieht / hört man … Nachher begründet die Person … Für Mephisto spricht … Für den Herrn spricht … Entscheidend bleibt …'
  },
  fortschritt: {
    scene: 'Studierzimmer II · Pakt und Gretchentragödie',
    title: 'Einfluss ist sichtbar – Verantwortung muss begründet werden',
    intro: 'Vergleicht neutrale und gelenkte Wahl. Ordnet danach die Textstellen nicht nach Sympathie, sondern nach Information, Alternative und eigenem Entschluss.',
    left: 'starker äusserer Einfluss', right: 'eigene Entscheidung',
    quotes: [
      { label: 'Fausts Bedingung', text: '„Werd’ ich zum Augenblicke sagen: / Verweile doch! du bist so schön!“', check: 'Faust formuliert die Bedingung selbst. Zugleich unterschätzt er möglicherweise, wie Mephisto Situationen herstellen kann.' },
      { label: 'Besiegelung', text: '„Blut ist ein ganz besondrer Saft.“', check: 'Mephisto inszeniert Bedeutung und bindet Faust symbolisch. Das ist Einfluss, aber noch kein Beweis fehlender Entscheidung.' },
      { label: 'Folge bei Gretchen', text: '„Meine Ruh ist hin, / Mein Herz ist schwer“', check: 'Gretchens Stimme macht Folgen sichtbar, die in Fausts Lust- und Wettlogik zuvor ausgeblendet wurden.' },
      { label: 'Grenze im Kerker', text: '„Heinrich! Mir graut’s vor dir.“', check: 'Gretchen erkennt Faust, widerspricht ihm und verweigert am Ende seinen Fluchtplan.' }
    ],
    voices: [
      { speaker: 'Mephistopheles', text: 'Er arrangiert Wege, Dinge und Gelegenheiten.', thought: 'Wie bei der gelenkten Wahl verändert er die Umgebung. Zu prüfen bleibt, welche Alternativen Faust dennoch erkennt.', starter: 'Mephistopheles beeinflusst die Entscheidung konkret durch … Faust hätte dennoch …' },
      { speaker: 'Gretchen', text: '„Mir graut’s vor dir.“', thought: 'Ihre Perspektive unterbricht Fausts Selbstdeutung und macht die Folgen seiner Entscheidungen sichtbar.', starter: 'Gretchens Satz korrigiert Fausts Sicht, weil … Für seine Verantwortung bedeutet das …' }
    ],
    prompt: 'In der Aufnahme lenkt …; entschieden hat … In der Szene zeigt der Wortlaut … Fausts Verantwortung steigt / sinkt, weil er … wusste und … hätte tun können.'
  }
};

export default function TextInquiry({ moduleId, factPrompt, note, onNote }: { moduleId: string; factPrompt: string; note: string; onNote: (value: string) => void }) {
  const lab = labs[moduleId];
  const [scales, setScales] = useState<Record<number, number>>({});
  const append = (text: string) => onNote(`${note}${note.trim() ? ' ' : ''}${text}`);
  return <div className="faustTextBench deepTextBench">
    <header><span>{lab.scene}</span><h3>{lab.title}</h3><p>{lab.intro}</p></header>
    <div className="textScaleList">{lab.quotes.map((item, index) => <label key={item.text}>
      <span><b>{index + 1}</b><em>{item.label}</em></span><blockquote>{item.text}</blockquote>
      <input aria-label={`Einordnung: ${item.label}`} type="range" min="0" max="100" value={scales[index] ?? 50} onChange={event => setScales(current => ({ ...current, [index]: Number(event.target.value) }))}/>
      <small><i>{lab.left}</i><strong>{scales[index] === undefined ? 'erst bewegen, dann prüfen' : scales[index] < 34 ? `näher bei: ${lab.left}` : scales[index] < 67 ? 'Spannung bleibt offen' : `näher bei: ${lab.right}`}</strong><i>{lab.right}</i></small>
      {scales[index] !== undefined && <p className="scaleFeedback">{item.check}</p>}
    </label>)}</div>
    <div className="counterVoices">{lab.voices.map(voice => <article key={voice.speaker}><span>{voice.speaker}</span><blockquote>{voice.text}</blockquote><p>{voice.thought}</p><button onClick={() => append(voice.starter)}>Denkspur übernehmen</button></article>)}</div>
    <label className="dialogWriting compact"><span>Dein Urteil – mit Aufnahme und Wortlaut</span><textarea autoFocus value={note} onChange={event => onNote(event.target.value)} placeholder={lab.prompt}/></label>
    <TextFeedback prompt={`${factPrompt} Beziehe dich auf den Wortlaut, die Beobachtung aus dem Experiment und mindestens eine Gegenposition.`} answer={note}/>
  </div>;
}
