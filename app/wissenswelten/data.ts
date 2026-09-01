export type Task = {
  id: string;
  title: string;
  form: 'Selbst' | 'Tandem' | 'Trio';
  minutes: number;
  prompt: string;
  steps: string[];
  roles?: string[];
  product: string;
};

export type Module = {
  id: string;
  number: string;
  title: string;
  question: string;
  intro: string;
  texts: string;
  basis: string[];
  deeper: string[];
  research: string[];
  tasks: Task[];
};

export type TaskGuide = { material: string; format: string; example: string; criteria: string[] };

const task = (id: string, title: string, form: Task['form'], minutes: number, prompt: string, product: string, steps: string[], roles?: string[]): Task => ({ id, title, form, minutes, prompt, product, steps, roles });

export const modules: Module[] = [
  {
    id: 'werkstatt', number: '01', title: 'Goethes Faust-Werkstatt', question: 'Wie verändert ein Lebenswerk seine Form?',
    intro: 'Vom frühen Entwurf bis zum postum gedruckten zweiten Teil: Entstehung wird hier als offener Denkprozess sichtbar.', texts: 'Urfaust · Fragment (1790) · Faust I (1808) · Faust II (1832/33)',
    basis: ['Goethe arbeitete über Jahrzehnte an verschiedenen Fassungen.', '„Urfaust“ ist eine spätere Bezeichnung; der Text wurde nicht unter diesem Titel von Goethe publiziert.', 'Fassungsvergleich bedeutet: Unterschiede beschreiben, belegen und erst dann deuten.'],
    deeper: ['Zeitleiste: 1772–75 frühe Arbeit · 1790 Fragment · 1797 intensive Wiederaufnahme · 1808 Faust I · 1831 Abschlussarbeit an Faust II · 1833 postumer Druck.', 'Die Werkstatt-Perspektive widerspricht der Idee eines einzigen, plötzlich entstandenen Meisterwerks.'],
    research: ['Vergleiche eine Passage in zwei Fassungen der historisch-kritischen Faustedition.', 'Dokumentiere Lesart, Materialität und mögliche dramaturgische Wirkung getrennt.'],
    tasks: [
      task('w-self','Mein unfertiges Werk','Selbst',12,'Erinnere dich an ein Projekt, das durch Unterbrechungen besser, anders oder schwieriger wurde. Was würde eine Werkstattansicht zeigen?','Private Werkstattnotiz (120–180 Wörter)',['Wähle ein ungefährliches Beispiel.','Notiere drei Wendepunkte.','Formuliere, was du heute anders verstehst.']),
      task('w-pair','Zwei Fassungen – zwei Wirkungen','Tandem',24,'Vergleicht eine frühe und eine spätere Textfassung. Trennt Beobachtung und Deutung.','Vergleichstabelle mit drei belegten Veränderungen',['Lest beide Fassungen einzeln.','Markiert dieselbe Passage.','Einigt euch auf drei Unterschiede.'],['Textdetektiv:in','Wirkungsprüfer:in']),
      task('w-trio','Redaktionskonferenz','Trio',30,'Entscheidet begründet, welche Fassung ihr auf einer Bühne zeigen würdet.','90-Sekunden-Pitch plus Gegenargument',['Jede Person bringt einen Textbeleg ein.','Diskutiert ein Gegenargument.','Formuliert einen gemeinsamen Entscheid.'],['Historiker:in','Dramaturg:in','Skeptiker:in'])
    ]
  },
  {
    id:'krise', number:'02', title:'Die Krise des Gelehrten', question:'Was geschieht, wenn Wissen nicht mehr trägt?',
    intro:'Fausts Eingangsmonolog verbindet Wissensbilanz, Selbstzweifel und Grenzüberschreitung. Wagner bildet dazu eine produktive Kontrastfigur.', texts:'Nacht · Vor dem Tor',
    basis:['Faust zählt akademische Wissensgebiete auf und erklärt sie für unzureichend.','Seine Krise ist zugleich Erkenntnis-, Sinn- und Lebenskrise.','Wagner vertraut stärker auf überliefertes, methodisches Wissen.'],
    deeper:['Wissen, Erfahrung und Sinn sind im Monolog nicht dasselbe.','Die Gründgens-Verfilmung macht die Krise durch Stimme, Blick, Raum und Rhythmus körperlich wahrnehmbar.'],
    research:['Prüfe, wie Bühnenanweisungen und filmische Mittel unterschiedliche Deutungen erzeugen.','Entwickle eine begründete Diagnose ohne Faust psychologisch festzuschreiben.'],
    tasks:[
      task('k-self','Wo Wissen endet','Selbst',10,'Beschreibe eine Situation, in der mehr Information ein Problem nicht gelöst hat. Welche andere Form von Orientierung half?','Reflexionskarte mit „Wissen / Erfahrung / Wert“',['Wähle nur, was du teilen möchtest.','Trenne Fakten, Gefühle und Wertungen.','Markiere einen offenen Punkt.']),
      task('k-pair','Faust oder Wagner?','Tandem',22,'Übernehmt gegensätzliche Positionen: radikale Erfahrung oder geduldige Gelehrsamkeit. Wechselt nach fünf Minuten die Seite.','Gemeinsames Urteil mit je zwei Stärken und Risiken',['Position A verteidigen.','Rollenwechsel.','Gemeinsames drittes Urteil bilden.'],['Faust-Stimme','Wagner-Stimme']),
      task('k-trio','Krisen-Lesung','Trio',25,'Inszeniert 45 Sekunden des Monologs und begründet drei Entscheidungen zu Stimme, Raum und Pause.','Mini-Inszenierung plus Regienotiz',['Textstelle festlegen.','Drei Varianten testen.','Wirkung gemeinsam auswerten.'],['Sprecher:in','Regie','Beobachter:in'])
    ]
  },
  {
    id:'natur', number:'03', title:'Natur erkennen', question:'Beobachten wir Natur – oder ordnen wir sie?',
    intro:'Goethes naturwissenschaftliches Denken lädt dazu ein, genaue Anschauung, Modell und Messung gegeneinander zu prüfen.', texts:'Nacht · Wald und Höhle · naturwissenschaftliche Schriften (Kontext)',
    basis:['Goethe betrieb eigene Studien unter anderem zu Pflanzen, Farben und Geologie.','Goethe und Newton stehen nicht schlicht für Gefühl gegen Wissenschaft; sie untersuchen teils verschiedene Fragen und Verfahren.','Eine Beobachtung wird durch Begriffe, Geräte und Erwartungen mitgeprägt.'],
    deeper:['Phänomen, Modell und Erklärung sollten auseinandergehalten werden.','Fausts Wunsch nach Ganzheit kann Erkenntnis antreiben und zugleich methodische Grenzen übergehen.'],
    research:['Entwirf eine Beobachtung, die qualitative und messende Verfahren kombiniert.','Prüfe, welche Aussage dein Verfahren tatsächlich erlaubt.'],
    tasks:[
      task('n-self','Sieben Minuten sehen','Selbst',12,'Beobachte einen alltäglichen Naturgegenstand sieben Minuten, ohne ihn zu erklären. Wann beginnen deine Begriffe das Sehen zu lenken?','Beobachtungsprotokoll plus Metareflexion',['Nur beschreiben.','Dann erste Deutungen ergänzen.','Unterschied farbig markieren.']),
      task('n-pair','Zwei Erkenntniswege','Tandem',20,'Untersucht dasselbe Phänomen einmal qualitativ, einmal messend.','Doppelprotokoll mit Reichweite und Grenze',['Verfahren aufteilen.','Ergebnisse austauschen.','Gemeinsam Grenzen formulieren.'],['Anschauung','Messung']),
      task('n-trio','Modellgericht','Trio',28,'Bewertet ein Erklärungsmodell: Was macht es sichtbar, was blendet es aus?','Urteil mit Beleg, Grenze und Verbesserung',['Modell rekonstruieren.','Gegenbeispiel suchen.','Verbesserung skizzieren.'],['Modellanwalt','Kritiker:in','Richter:in'])
    ]
  },
  {
    id:'philosophie', number:'04', title:'Philosophische Horizonte', question:'Welche Denkmodelle öffnen den Text?',
    intro:'Hiob, Spinoza, Kant und Idealismus dienen als prüfbare Deutungshorizonte – nicht als fertige Schlüssel.', texts:'Prolog im Himmel · Studierzimmer · „Im Anfang war die Tat“',
    basis:['Der Prolog erinnert in seiner Versuchsanordnung an das Buch Hiob, ist aber keine einfache Nacherzählung.','Spinoza und Kant können als Kontexte für Natur-, Erkenntnis- und Freiheitsfragen dienen.','Eine philosophische Deutung muss am Wortlaut überprüft werden.'],
    deeper:['„Im Anfang war die Tat“ verschiebt das Verhältnis von Wort, Sinn, Kraft und Handlung.','Kontextwissen ist hilfreich, wenn es Unterschiede ebenso sichtbar macht wie Ähnlichkeiten.'],
    research:['Formuliere zwei konkurrierende Deutungen derselben Passage.','Bewerte, welche Annahmen jeweils aus Text und Kontext stammen.'],
    tasks:[
      task('p-self','Mein Anfangswort','Selbst',10,'Ordne Wort, Sinn, Kraft und Tat für eine eigene Entscheidung. Wo beginnt Veränderung für dich?','Private Rangfolge mit kurzer Begründung',['Begriffe spontan ordnen.','An einem Beispiel prüfen.','Rangfolge revidieren oder bestätigen.']),
      task('p-pair','Deutung mit Widerstand','Tandem',22,'Eine Person liest die Passage philosophisch, die andere ausschliesslich textnah. Findet eine tragfähige Synthese.','Doppelthese und Synthese',['Zwei getrennte Lesarten schreiben.','Belege austauschen.','Grenzen der Synthese benennen.'],['Kontextleser:in','Textwächter:in']),
      task('p-trio','Horizonte-Karte','Trio',30,'Verknüpft Hiob, Spinoza/Kant und die Tat-Passage, ohne direkte Einflüsse zu erfinden.','Begriffsnetz mit Legende und Unsicherheitsmarken',['Jede Person verantwortet einen Horizont.','Verbindungen als sicher/plausibel/offen markieren.','Netz gemeinsam erklären.'],['Hiob','Spinoza/Kant','Faust-Text'])
    ]
  },
  {
    id:'homunculus', number:'05', title:'Wissenschaft und künstliches Leben', question:'Darf Erkenntnis Leben herstellen?',
    intro:'Homunculus verdichtet Fragen nach Machbarkeit, Verantwortung, Körper und Anerkennung künstlichen Lebens.', texts:'Faust II · Laboratorium · Klassische Walpurgisnacht',
    basis:['Homunculus entsteht im Labor und bleibt zunächst an ein Gefäss gebunden.','Die Episode verbindet vormoderne Alchemie mit Fragen, die heute an Biotechnologie und KI erinnern können.','Aktualisierung ist ein Vergleich – keine Behauptung, Goethe habe heutige Technologien vorhergesagt.'],
    deeper:['Wer erzeugt, übernimmt Verantwortung für Bedingungen, Abhängigkeiten und Folgen.','Die Figur irritiert Grenzen zwischen natürlich/künstlich und Körper/Geist.'],
    research:['Vergleiche Homunculus mit einem aktuellen Technologiefall anhand klarer Kriterien.','Kennzeichne Analogien und historische Unterschiede.'],
    tasks:[
      task('h-self','Meine Machbarkeitsgrenze','Selbst',12,'Bei welcher technischen Möglichkeit wird aus Neugier für dich Verantwortung? Formuliere ein persönliches Kriterium.','Wertekompass mit Grenze und Ausnahme',['Fall wählen.','Wert benennen.','Gegenargument fair ergänzen.']),
      task('h-pair','Schöpfer und Geschöpf','Tandem',24,'Schreibt einen Dialog über Freiheit, Fürsorge und Abhängigkeit. Tauscht danach die Rollen.','Dialog mit Rollenwechsel und Schlussnotiz',['Positionen getrennt entwickeln.','Dialog führen.','Machtgefälle auswerten.'],['Erzeuger:in','Homunculus']),
      task('h-trio','Ethikkommission','Trio',32,'Entscheidet über die Freigabe eines künstlichen Lebensprojekts. Bedingungen sind erlaubt.','Ethikvotum: Entscheid, drei Kriterien, Minderheitsnotiz',['Risiken und Nutzen sammeln.','Jede Rolle gibt ein Votum.','Konsens oder Minderheit dokumentieren.'],['Forschung','Ethik','Betroffene Öffentlichkeit'])
    ]
  },
  {
    id:'fortschritt', number:'06', title:'Fortschritt, Macht und Verantwortung', question:'Wer bezahlt für grosse Entwürfe?',
    intro:'Papiergeld, Geologie und Landgewinnung zeigen Fortschritt als wirksame Erzählung – samt Verdrängung, Gewalt und Nebenfolgen.', texts:'Faust II · Kaiserhof · Bergschluchten · Grosser Vorhof des Palasts',
    basis:['Faust II verknüpft wirtschaftliche, technische und politische Macht.','Das Papiergeld verspricht Handlungsfähigkeit durch Vertrauen und Zeichen.','Fausts Landprojekt verbindet Zukunftsvision mit Enteignung und Gewalt.'],
    deeper:['Fortschritt ist perspektivisch: Gewinne und Kosten verteilen sich ungleich.','Eine Folgenabschätzung muss Betroffene und nicht beabsichtigte Wirkungen einbeziehen.'],
    research:['Baue eine Wirkungsanalyse mit kurzfristigen und langfristigen Folgen.','Prüfe ein heutiges Grossprojekt, ohne die historischen Situationen gleichzusetzen.'],
    tasks:[
      task('f-self','Mein Fortschrittsbegriff','Selbst',12,'Nenne eine Veränderung, die für dich Gewinn und Verlust zugleich war. Wer hätte sie anders bewertet?','Bilanz aus Gewinn, Preis und Perspektivwechsel',['Beispiel eingrenzen.','Zwei Wirkungen benennen.','Fremdperspektive ergänzen.']),
      task('f-pair','Papiergeld-Simulation','Tandem',24,'Eine Person wirbt für die Ausgabe, eine prüft Vertrauen, Deckung und Folgen. Wechselt die Position.','Risikoampel und gemeinsamer Entscheid',['Argumente vorbereiten.','Rollenwechsel.','Drei Bedingungen festlegen.'],['Finanzrat','Kontrollrat']),
      task('f-trio','Landgewinnung: drei Stimmen','Trio',32,'Verhandelt Fausts Projekt aus Sicht von Planung, betroffener Bevölkerung und Umwelt/Zukunft.','Beschluss mit Nutzen, Kosten, Schutzauflagen und Dissens',['Einzelvoten schreiben.','Folgenmatrix erstellen.','Gemeinsamen Beschluss verhandeln.'],['Planung','Betroffene','Umwelt/Zukunft'])
    ]
  }
];

export const glossary = [
  ['Alchemie','Historische Lehre und Praxis der Stoffverwandlung, verbunden mit Naturphilosophie.'],['Analogie','Vergleich struktureller Ähnlichkeiten; keine Gleichsetzung.'],['Anthropozentrismus','Sichtweise, die den Menschen ins Zentrum stellt.'],['Autonomie','Fähigkeit, nach selbst geprüften Gründen zu handeln.'],['Dialektik','Denken in Spannungen, Widersprüchen und ihrer Bewegung.'],['Empirie','Erkenntnis durch systematische Erfahrung und Beobachtung.'],['Erkenntniskritik','Prüfung der Möglichkeiten und Grenzen des Erkennens.'],['Ethik','Begründetes Nachdenken über gutes und verantwortbares Handeln.'],['Fortschritt','Gerichtete Verbesserung; abhängig von Massstab und Perspektive.'],['Ganzheit','Zusammenhang, der nicht vollständig auf Einzelteile reduziert wird.'],['Hermeneutik','Theorie und Praxis des Verstehens und Auslegens.'],['Idealismus','Philosophische Ansätze, die Geist oder Vernunft zentral setzen.'],['Intertextualität','Bezüge eines Textes auf andere Texte.'],['Kausalität','Beziehung von Ursache und Wirkung.'],['Modell','Vereinfachte Darstellung zur Beschreibung oder Erklärung.'],['Morphologie','Lehre von Formen, ihren Bildungen und Verwandlungen.'],['Naturphilosophie','Philosophisches Nachdenken über Natur und Naturerkenntnis.'],['Phänomen','Das, was sich der Erfahrung zeigt.'],['Quelle','Überlieferung oder Zeugnis, auf das eine Aussage gestützt wird.'],['Rezeption','Aufnahme und Weiterverarbeitung eines Werks oder Gedankens.'],['Spekulation','Denken über unmittelbar Belegbares hinaus.'],['Teleologie','Deutung von Vorgängen aus Zwecken oder Zielen.'],['Verantwortung','Rechenschaft für Handlungen, Bedingungen und Folgen.'],['Weltanschauung','Grundlegendes Deutungsmuster von Welt und Mensch.']
] as const;

export const sources = [
  ['Historisch-kritische Faustedition','https://faustedition.net/'],
  ['Projekt Gutenberg: Faust I','https://www.projekt-gutenberg.org/goethe/faust1/chap001.html'],
  ['ARD alpha: Entstehungsgeschichte','https://www.ardalpha.de/lernen/telekolleg/faecher/deutsch/literatur/goethe-faust-entstehungsgeschichte-100.html'],
  ['Klassik Stiftung Weimar: Goethe und Kant','https://www.klassik-stiftung.de/ihr-besuch/ausstellung/goethes-begegnungen-mit-kants-philosophie/'],
  ['Klassik Stiftung: Faust-Begleitbuch (PDF)','https://publikationen.klassik-stiftung.de/servlets/MCRFileNodeServlet/ksw_derivate_00001073/LFTS_Begleitbuch.pdf']
] as const;

export const taskGuides: Record<string, TaskGuide> = {
  'w-self': {
    material:'Ein eigenes, sachliches Beispiel: etwa eine Präsentation, ein Musikstück, ein Sportziel oder eine längere Schularbeit. Keine intime Erfahrung nötig.',
    format:'Zeichne eine Linie mit genau drei Stationen: Anfang – Unterbrechung/Änderung – heutiger Stand. Schreibe zu jeder Station zwei konkrete Sätze.',
    example:'„Am Anfang wollte ich … / Nach der Rückmeldung änderte ich … / Heute erkenne ich …“',
    criteria:['Drei zeitlich unterscheidbare Stationen','Eine konkrete Veränderung statt allgemeiner Aussagen','Ein abschliessender Satz über das eigene Lernen']
  },
  'w-pair': {
    material:'Öffnet gemeinsam die Faustedition. Wählt dieselbe Passage von mindestens sechs Zeilen in einer frühen und einer späteren Fassung.',
    format:'Tabelle mit drei Zeilen und den Spalten: frühe Fassung – spätere Fassung – mögliche Wirkung. Jede Zeile enthält ein kurzes Textzitat.',
    example:'„Wort A wird durch Wort B ersetzt → Faust wirkt dadurch entschlossener.“',
    criteria:['Drei nachprüfbare Textunterschiede','Zu jedem Unterschied ein Wirkungsverb','Beobachtung und Deutung klar getrennt']
  },
  'w-trio': {
    material:'Nutzt die Vergleichstabelle aus dem Tandemauftrag oder erstellt zuerst drei belegte Fassungsunterschiede.',
    format:'90-Sekunden-Pitch: Entscheid – zwei Textbelege – stärkstes Gegenargument – Antwort darauf. Jede Person spricht 20–30 Sekunden.',
    example:'„Wir wählen Fassung …, weil die veränderte Wortwahl …; dagegen spricht …“',
    criteria:['Alle drei Rollen hörbar beteiligt','Mindestens zwei präzise Textbelege','Gegenargument wird fair beantwortet']
  },
  'k-self': {
    material:'Eine überschaubare Alltagssituation, in der Fakten allein nicht gereicht haben, etwa Berufswahl, Teamkonflikt oder Zeitplanung.',
    format:'Fülle drei Abschnitte mit je 2–3 Sätzen: Das wusste ich – Das konnte Wissen nicht entscheiden – Daran orientierte ich mich.',
    example:'„Ich kannte alle Termine. Das löste den Zielkonflikt nicht. Entscheidend war für mich der Wert …“',
    criteria:['Fakten und Wertentscheidung unterschieden','Konkrete Situation genannt','Keine persönliche Information, die du nicht teilen willst']
  },
  'k-pair': {
    material:'Lest in „Nacht“ Fausts Bilanz seiner Studien und das anschliessende Gespräch mit Wagner. Markiert je zwei Aussagen für eure Position.',
    format:'Zwei Runden à fünf Minuten, danach eine Vier-Felder-Tabelle: Stärke Faust – Risiko Faust – Stärke Wagner – Risiko Wagner. Schluss: drei gemeinsame Sätze.',
    example:'„Wagners Geduld schützt vor …; Fausts Erfahrungsdrang ermöglicht …; tragfähig wäre …“',
    criteria:['Rollenwechsel tatsächlich durchgeführt','Vier Felder mit je einem Textbezug','Gemeinsames Urteil verbindet beide Positionen']
  },
  'k-trio': {
    material:'Wählt 6–10 zusammenhängende Zeilen aus Fausts erstem Monolog und seht die entsprechende Filmstelle nochmals an.',
    format:'Spielt dieselben Zeilen zweimal: Variante A ruhig/kontrolliert, Variante B körperlich/verzweifelt. Notiert danach drei beobachtete Wirkungsunterschiede.',
    example:'„Die Pause vor … lässt den Satz wie einen Entschluss statt wie eine Klage wirken.“',
    criteria:['Zwei deutlich verschiedene Spielweisen','Stimme, Körper und Pause berücksichtigt','Wirkung an einem konkreten Moment erklärt']
  },
  'n-self': {
    material:'Ein Blatt, Stein, Glas Wasser oder eine Wolke. Stelle einen Timer auf sieben Minuten; verwende zunächst kein Internet und kein Bestimmungsbuch.',
    format:'Zweispaltiges Protokoll: links 8 reine Beobachtungen, rechts die späteren Deutungen. Unterstreiche Wörter, die bereits eine Erklärung enthalten.',
    example:'Beobachtung: „Der Rand ist unregelmässig.“ Deutung: „Das Blatt wurde angefressen.“',
    criteria:['Mindestens acht sicht-/hör-/fühlbare Merkmale','Beobachtung und Erklärung getrennt','Ein Satz darüber, wann Vorwissen eingesetzt hat']
  },
  'n-pair': {
    material:'Dasselbe kleine Phänomen für beide: etwa Abkühlen von Tee, Schattenlänge oder Fall eines Papierblatts. Benötigt werden Uhr/Lineal nur für die Messrolle.',
    format:'Person A schreibt fünf qualitative Beobachtungen, Person B mindestens fünf Messwerte. Danach: je zwei Aussagen, die nur eines der Verfahren erlaubt.',
    example:'„Messung: 62 °C nach 3 Minuten. Anschauung: An der Oberfläche bildet sich eine dünne Haut.“',
    criteria:['Beide untersuchen exakt dasselbe Phänomen','Mindestens fünf Einträge pro Verfahren','Je eine Grenze beider Verfahren benannt']
  },
  'n-trio': {
    material:'Nehmt ein vertrautes Modell, etwa Sonnensystem-Modell, Wasserkreislauf-Schema oder Atommodell aus einem Lehrmittel.',
    format:'Erstellt ein A4-Blatt mit drei Kästen: Das zeigt das Modell – Das verschweigt es – So würden wir es verbessern. Fügt eine kleine Skizze hinzu.',
    example:'„Das Kugelmodell zeigt Abstände nicht massstabgetreu; unsere Legende kennzeichnet diese Verzerrung.“',
    criteria:['Eine Stärke und zwei Grenzen konkret benannt','Mindestens ein Gegenbeispiel','Verbesserung als Skizze oder genaue Anweisung']
  },
  'p-self': {
    material:'Eine konkrete, noch nicht zu persönliche Entscheidung: lernen oder pausieren, etwas ansprechen oder warten, planen oder beginnen.',
    format:'Ordne Wort – Sinn – Kraft – Tat auf vier Karten. Begründe die Reihenfolge mit genau einem konkreten Entscheidungsbeispiel und ändere sie bei Bedarf.',
    example:'„Bei meinem Beispiel steht zuerst …, weil …; ‚Tat‘ kommt erst an Stelle …“',
    criteria:['Alle vier Begriffe eingeordnet','Reihenfolge an einem Beispiel geprüft','Mindestens eine Spannung zwischen zwei Begriffen erklärt']
  },
  'p-pair': {
    material:'Lest die Übersetzungsszene von „Im Anfang war das Wort“ bis „Im Anfang war die Tat“. Markiert jede Übersetzungsvariante.',
    format:'Person A schreibt eine textnahe These mit zwei Wörtern aus der Passage. Person B ergänzt einen philosophischen Begriff. Danach schreibt ihr eine Synthese und eine offene Frage.',
    example:'„Textnah fällt die Steigerung … auf. Philosophisch lässt sie sich als … lesen. Offen bleibt …“',
    criteria:['Alle Übersetzungsvarianten berücksichtigt','Textbeobachtung vor Kontextdeutung','Offene Grenze der Deutung ausdrücklich genannt']
  },
  'p-trio': {
    material:'Drei Blätter mit den Überschriften Hiob, Spinoza/Kant und Fausts Übersetzungsszene. Jede Person erhält zunächst genau ein Blatt.',
    format:'Begriffsnetz mit mindestens sechs Pfeilen. Jeder Pfeil trägt ein Verb und eine Markierung: sicher belegt – plausible Deutung – offene Frage.',
    example:'Nicht nur „Hiob → Faust“, sondern „Die Prüfungsanordnung erinnert an … [plausibel]“',
    criteria:['Mindestens zwei Beiträge pro Person','Jede Verbindung sprachlich erklärt','Keine mögliche Parallele als sicherer Einfluss ausgegeben']
  },
  'h-self': {
    material:'Wähle eine konkrete Technik: Embryonen-Selektion, Organ-Züchtung, autonomes System oder lernfähige KI. Beschreibe sie zuerst in einem neutralen Satz.',
    format:'Wertekompass mit vier Feldern: möglicher Nutzen – mögliche Betroffene – rote Linie – Ausnahme unter Bedingungen.',
    example:'„Meine rote Linie ist fehlende Zustimmung. Eine Ausnahme wäre nur vertretbar, wenn …“',
    criteria:['Konkrete Technik statt „Technik allgemein“','Betroffene Personengruppe genannt','Grenze und begründete Ausnahme formuliert']
  },
  'h-pair': {
    material:'Ausgangslage: Homunculus verlangt, das Labor verlassen und selbst über seinen Weg entscheiden zu dürfen.',
    format:'Schreibt zwölf kurze Dialogzeilen: je drei pro Rolle, dann Rollenwechsel mit weiteren je drei Zeilen. Schliesst mit zwei Sätzen zum Machtgefälle.',
    example:'„Erzeuger: Ich bin verantwortlich für … / Homunculus: Verantwortung gibt dir nicht das Recht …“',
    criteria:['Genau zwölf Dialogbeiträge','Nach dem Rollenwechsel ändern sich die Argumente','Freiheit und Fürsorge beide angesprochen']
  },
  'h-trio': {
    material:'Fallakte: Ein Labor hat ein empfindungsfähiges künstliches Wesen erzeugt. Es kann sprechen, ist aber ausserhalb seines Gefässes noch nicht lebensfähig.',
    format:'Votum mit vier Überschriften: Entscheid – drei Freigabebedingungen – grösstes Risiko – Minderheitsnotiz. Jede Rolle gibt zuerst ein Einzelvotum ab.',
    example:'„Freigabe nur unter Bedingung 1 …; die Öffentlichkeitsrolle widerspricht bei …“',
    criteria:['Nutzen und Risiko getrennt bewertet','Drei überprüfbare Bedingungen','Abweichende Meinung sichtbar, falls kein Konsens']
  },
  'f-self': {
    material:'Eine konkrete Veränderung aus Schule oder Alltag: neues digitales Werkzeug, neue Regel, Umzug, Ausbau oder Verkehrslösung.',
    format:'Tabelle mit einer Zeile pro Perspektive: Ich – direkt Betroffene – später Betroffene. Spalten: Gewinn – Preis – unbekannte Folge.',
    example:'„Für mich spart … Zeit; für … entsteht dagegen …; langfristig ist unklar …“',
    criteria:['Drei Perspektiven ausgefüllt','Gewinn und Preis konkret benannt','Eine unsichere Langzeitfolge markiert']
  },
  'f-pair': {
    material:'Simulation: Die Staatskasse ist leer. Ihr dürft neue Geldscheine im Wert von 100 Einheiten ausgeben. Es gibt vorerst nur Güter im Wert von 60 Einheiten.',
    format:'Runde 1: Finanzrat wirbt, Kontrollrat prüft. Runde 2: Rollenwechsel. Erstellt danach eine Risikoampel für Vertrauen, Preise und Verteilung sowie einen Entscheid.',
    example:'„Preise: rot, weil mehr Zahlungsmittel auf gleich viele Güter treffen. Ausgabe nur, wenn …“',
    criteria:['Zahlen des Falls im Argument verwendet','Rollenwechsel protokolliert','Entscheid enthält drei konkrete Bedingungen']
  },
  'f-trio': {
    material:'Fallakte: Ein Küstenprojekt schafft Wohnraum für 10 000 Menschen. Dafür werden 40 Haushalte umgesiedelt; ein Feuchtgebiet schrumpft um ein Drittel.',
    format:'Folgenmatrix mit den Zeilen Planung – betroffene Haushalte – Umwelt/Zukunft und den Spalten Nutzen – Schaden – Schutzauflage. Danach ein Beschluss in fünf Sätzen.',
    example:'„Die Planungsrolle stimmt zu, wenn …; die Betroffenenrolle verlangt …; ungelöst bleibt …“',
    criteria:['Alle Zahlen der Fallakte berücksichtigt','Jede Rolle formuliert eine Schutzauflage','Gemeinsamer Beschluss nennt verbleibenden Dissens']
  }
};
