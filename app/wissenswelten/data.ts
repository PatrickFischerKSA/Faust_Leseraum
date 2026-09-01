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
    id: 'werkstatt', number: '01', title: 'Versionen, Fehler, Neustarts', question: 'Warum ist Version 1.0 fast nie die beste?',
    intro: 'Faust war kein fertiger Geistesblitz. Goethe änderte, strich und startete über Jahrzehnte neu – wie bei einem Projekt, das mit jeder Version etwas anderes kann.', texts: 'Urfaust · Fragment (1790) · Faust I (1808) · Faust II (1832/33)',
    basis: ['Goethe arbeitete über Jahrzehnte an verschiedenen Fassungen.', '„Urfaust“ ist eine spätere Bezeichnung; der Text wurde nicht unter diesem Titel von Goethe publiziert.', 'Fassungsvergleich bedeutet: Unterschiede beschreiben, belegen und erst dann deuten.'],
    deeper: ['Zeitleiste: 1772–75 frühe Arbeit · 1790 Fragment · 1797 intensive Wiederaufnahme · 1808 Faust I · 1831 Abschlussarbeit an Faust II · 1833 postumer Druck.', 'Die Werkstatt-Perspektive widerspricht der Idee eines einzigen, plötzlich entstandenen Meisterwerks.'],
    research: ['Vergleiche eine Passage in zwei Fassungen der historisch-kritischen Faustedition.', 'Dokumentiere Lesart, Materialität und mögliche dramaturgische Wirkung getrennt.'],
    tasks: [
      task('w-self','Dein Versionenverlauf','Selbst',12,'Zeige an einem echten Projekt: Was war Version 1.0, was hat nicht funktioniert und was würdest du heute updaten?','Privates Update-Log (120–180 Wörter)',['Nimm ein unverfängliches Beispiel.','Halte drei konkrete Versionen fest.','Schreibe einen Satz: Das würde ich heute anders machen.']),
      task('w-pair','Was ändert ein einziges Wort?','Tandem',24,'Findet in zwei Faust-Fassungen drei Änderungen. Beschreibt nicht nur, was anders ist, sondern was beim Lesen oder Spielen dadurch passiert.','Vorher-Nachher-Tabelle mit drei Textbelegen',['Lest beide Fassungen.','Markiert dieselbe Stelle.','Formuliert für jede Änderung eine Wirkung.'],['Findet Änderungen','Testet die Wirkung']),
      task('w-trio','Welche Version würdet ihr zeigen?','Trio',30,'Ihr habt 90 Sekunden, um eure Fassungswahl für eine heutige Inszenierung zu pitchen. Eine Person muss bewusst dagegenhalten.','90-Sekunden-Pitch plus stärkstes Gegenargument',['Jede Person bringt einen Beleg.','Nehmt das Gegenargument ernst.','Trefft einen gemeinsamen Entscheid.'],['Textbeleg','Bühnenidee','Reality-Check'])
    ]
  },
  {
    id:'krise', number:'02', title:'Zu viel Wissen, kein Plan?', question:'Was bringt Wissen, wenn du trotzdem nicht weisst, was du tun sollst?',
    intro:'Faust kennt unfassbar viel und fühlt sich trotzdem leer. Das ist keine verstaubte Gelehrtenfrage: Auch zwölf Tabs, Tutorials und Feeds ergeben noch keine Richtung.', texts:'Nacht · Vor dem Tor',
    basis:['Faust zählt akademische Wissensgebiete auf und erklärt sie für unzureichend.','Seine Krise ist zugleich Erkenntnis-, Sinn- und Lebenskrise.','Wagner vertraut stärker auf überliefertes, methodisches Wissen.'],
    deeper:['Wissen, Erfahrung und Sinn sind im Monolog nicht dasselbe.','Die Gründgens-Verfilmung macht die Krise durch Stimme, Blick, Raum und Rhythmus körperlich wahrnehmbar.'],
    research:['Prüfe, wie Bühnenanweisungen und filmische Mittel unterschiedliche Deutungen erzeugen.','Entwickle eine begründete Diagnose ohne Faust psychologisch festzuschreiben.'],
    tasks:[
      task('k-self','Zwölf Tabs, keine Antwort','Selbst',10,'Beschreibe einen Moment, in dem du viel recherchiert hast und danach trotzdem nicht wusstest, was richtig ist. Was fehlte wirklich?','Kurzer Reality-Check: Information / Orientierung / nächster Schritt',['Teile nur, was okay ist.','Nenne die konkrete Frage.','Formuliere einen hilfreichen nächsten Schritt.']),
      task('k-pair','Faust vs. Wagner – Seitenwechsel','Tandem',22,'Eine Person verteidigt Fausts Drang nach echter Erfahrung, die andere Wagners geduldiges Lernen. Nach fünf Minuten tauscht ihr die Seite.','Vier-Felder-Check mit Stärken und Risiken',['Verteidigt eure erste Seite.','Wechselt wirklich die Position.','Baut aus beiden Seiten einen brauchbaren Rat.'],['Stimme Faust','Stimme Wagner']),
      task('k-trio','Sprecht den Breakdown','Trio',25,'Spielt dieselben 45 Sekunden aus Fausts Monolog einmal kontrolliert und einmal kurz vor dem Zusammenbruch. Was verändert sich?','Zwei Clips/Lesungen plus drei konkrete Beobachtungen',['Wählt eine kurze Textstelle.','Testet zwei extreme Spielweisen.','Nennt drei Wirkungsunterschiede.'],['Spricht','Inszeniert','Beobachtet'])
    ]
  },
  {
    id:'natur', number:'03', title:'Was siehst du wirklich?', question:'Wann wird aus Beobachten schon Bewerten?',
    intro:'Kamera, Filter und Algorithmus sortieren dauernd mit. Hier verlangsamst du den Blick und prüfst, was du tatsächlich wahrnimmst – und was dein Kopf sofort daraus macht.', texts:'Nacht · Wald und Höhle · naturwissenschaftliche Schriften (Kontext)',
    basis:['Goethe betrieb eigene Studien unter anderem zu Pflanzen, Farben und Geologie.','Goethe und Newton stehen nicht schlicht für Gefühl gegen Wissenschaft; sie untersuchen teils verschiedene Fragen und Verfahren.','Eine Beobachtung wird durch Begriffe, Geräte und Erwartungen mitgeprägt.'],
    deeper:['Phänomen, Modell und Erklärung sollten auseinandergehalten werden.','Fausts Wunsch nach Ganzheit kann Erkenntnis antreiben und zugleich methodische Grenzen übergehen.'],
    research:['Entwirf eine Beobachtung, die qualitative und messende Verfahren kombiniert.','Prüfe, welche Aussage dein Verfahren tatsächlich erlaubt.'],
    tasks:[
      task('n-self','Kamera aus, Augen an','Selbst',12,'Beobachte einen Gegenstand sieben Minuten ohne Foto, Suche oder Erklärung. Markiere danach, wo dein Kopf aus einem Detail sofort eine Geschichte gemacht hat.','Zwei Spalten: wirklich gesehen / daraus geschlossen',['Beschreibe zuerst nur Wahrnehmbares.','Ergänze danach deine Deutungen.','Markiere den ersten gedanklichen Sprung.']),
      task('n-pair','Augen vs. Messgerät','Tandem',20,'Untersucht exakt dasselbe kleine Phänomen: eine Person nur mit den Sinnen, die andere mit Uhr, Lineal oder Temperaturanzeige.','Doppelprotokoll: Was kann jede Methode – und was nicht?',['Teilt die Verfahren auf.','Vergleicht eure Ergebnisse.','Nennt je eine blinde Stelle.'],['Beobachtet','Misst']),
      task('n-trio','Dieses Modell lügt ein bisschen','Trio',28,'Nehmt ein Modell aus Schule oder Alltag. Zeigt, was es gut erklärt, wo es vereinfacht und wie ihr diese Grenze sichtbar machen würdet.','Modell-Check mit Verbesserungsskizze',['Erklärt das Modell kurz.','Findet einen irreführenden Punkt.','Skizziert ein ehrlicheres Modell.'],['Erklärt','Findet den Fehler','Baut um'])
    ]
  },
  {
    id:'philosophie', number:'04', title:'Worte, Werte, Entscheidungen', question:'Was kommt zuerst: reden, verstehen, können oder machen?',
    intro:'Faust übersetzt nicht nur einen Satz. Er ringt darum, was wirklich etwas in Bewegung setzt. Genau das passiert auch, wenn du eine Entscheidung nicht nur ankündigen, sondern treffen musst.', texts:'Prolog im Himmel · Studierzimmer · „Im Anfang war die Tat“',
    basis:['Der Prolog erinnert in seiner Versuchsanordnung an das Buch Hiob, ist aber keine einfache Nacherzählung.','Spinoza und Kant können als Kontexte für Natur-, Erkenntnis- und Freiheitsfragen dienen.','Eine philosophische Deutung muss am Wortlaut überprüft werden.'],
    deeper:['„Im Anfang war die Tat“ verschiebt das Verhältnis von Wort, Sinn, Kraft und Handlung.','Kontextwissen ist hilfreich, wenn es Unterschiede ebenso sichtbar macht wie Ähnlichkeiten.'],
    research:['Formuliere zwei konkurrierende Deutungen derselben Passage.','Bewerte, welche Annahmen jeweils aus Text und Kontext stammen.'],
    tasks:[
      task('p-self','Reden oder machen?','Selbst',10,'Ordne Wort, Sinn, Kraft und Tat für eine konkrete Entscheidung dieser Woche. Teste, ob die Reihenfolge wirklich zu deinem Beispiel passt.','Persönliches Ranking mit Begründung',['Ordne die vier Wörter.','Teste sie an einer echten Entscheidung.','Ändere die Reihenfolge, wenn sie nicht passt.']),
      task('p-pair','Textbeleg trifft grosse Idee','Tandem',22,'Eine Person bleibt hart am Wortlaut, die andere bringt eine philosophische Idee ein. Wo hilft der Kontext – und wo überdeckt er den Text?','Zwei Lesarten plus gemeinsame Grenze',['Schreibt getrennte Lesarten.','Fordert gegenseitig Belege.','Notiert, was offen bleibt.'],['Bleibt am Text','Bringt Kontext']),
      task('p-trio','Connection Map ohne Fake Facts','Trio',30,'Verbindet Hiob, Spinoza/Kant und Fausts Tat-Passage. Markiert ehrlich: sicher belegt, plausible Parallele oder offene Frage.','Connection Map mit Unsicherheitslabels',['Jede Person übernimmt einen Kontext.','Markiert die Sicherheit jeder Verbindung.','Erklärt die spannendste Verbindung.'],['Hiob','Spinoza/Kant','Faust'])
    ]
  },
  {
    id:'homunculus', number:'05', title:'KI, Körper, künstliches Leben', question:'Wenn wir etwas Intelligentes bauen: Was schulden wir ihm?',
    intro:'Homunculus ist künstlich geschaffen, kann sprechen und will hinaus. Das führt direkt zu heutigen Fragen über KI, Biotechnologie, Abhängigkeit und Verantwortung.', texts:'Faust II · Laboratorium · Klassische Walpurgisnacht',
    basis:['Homunculus entsteht im Labor und bleibt zunächst an ein Gefäss gebunden.','Die Episode verbindet vormoderne Alchemie mit Fragen, die heute an Biotechnologie und KI erinnern können.','Aktualisierung ist ein Vergleich – keine Behauptung, Goethe habe heutige Technologien vorhergesagt.'],
    deeper:['Wer erzeugt, übernimmt Verantwortung für Bedingungen, Abhängigkeiten und Folgen.','Die Figur irritiert Grenzen zwischen natürlich/künstlich und Körper/Geist.'],
    research:['Vergleiche Homunculus mit einem aktuellen Technologiefall anhand klarer Kriterien.','Kennzeichne Analogien und historische Unterschiede.'],
    tasks:[
      task('h-self','Wo wäre deine rote Linie?','Selbst',12,'Nimm eine konkrete KI- oder Biotech-Anwendung. Was dürfte sie für dich nie ohne Zustimmung tun – und warum?','Wertekompass mit roter Linie und Ausnahme',['Wähle einen konkreten Fall.','Formuliere eine klare Grenze.','Prüfe ein starkes Gegenargument.']),
      task('h-pair','Chat zwischen KI und Entwicklung','Tandem',24,'Schreibt einen Dialog: Das geschaffene System fordert Freiheit, die Entwicklung verweist auf Verantwortung. Dann tauscht ihr die Rollen.','Zwölf Chatnachrichten plus kurzer Macht-Check',['Entwickelt beide Positionen.','Tauscht die Rollen.','Benennt das Machtgefälle.'],['Entwicklung','System']),
      task('h-trio','Release oder Stopp?','Trio',32,'Ein künstliches Wesen kann sprechen, aber noch nicht selbständig überleben. Entscheidet über die Freigabe und formuliert überprüfbare Bedingungen.','Release-Entscheid mit drei Bedingungen und Dissens',['Sammelt Nutzen und Risiken.','Gebt drei Einzelvoten ab.','Dokumentiert Konsens oder Widerspruch.'],['Entwicklung','Ethik','Betroffene'])
    ]
  },
  {
    id:'fortschritt', number:'06', title:'Wer gewinnt, wer zahlt?', question:'Ist etwas schon Fortschritt, nur weil es neu und praktisch ist?',
    intro:'Faust plant gross und blendet Nebenwirkungen aus. Das kennst du von Plattformen, KI, Lieferdiensten oder Bauprojekten: bequem für einige, teuer für andere.', texts:'Faust II · Kaiserhof · Bergschluchten · Grosser Vorhof des Palasts',
    basis:['Faust II verknüpft wirtschaftliche, technische und politische Macht.','Das Papiergeld verspricht Handlungsfähigkeit durch Vertrauen und Zeichen.','Fausts Landprojekt verbindet Zukunftsvision mit Enteignung und Gewalt.'],
    deeper:['Fortschritt ist perspektivisch: Gewinne und Kosten verteilen sich ungleich.','Eine Folgenabschätzung muss Betroffene und nicht beabsichtigte Wirkungen einbeziehen.'],
    research:['Baue eine Wirkungsanalyse mit kurzfristigen und langfristigen Folgen.','Prüfe ein heutiges Grossprojekt, ohne die historischen Situationen gleichzusetzen.'],
    tasks:[
      task('f-self','Praktisch für mich – Problem für wen?','Selbst',12,'Nimm eine Neuerung, die deinen Alltag leichter macht. Finde eine Person, Gruppe oder Umweltfolge, die dafür einen Preis zahlt.','Impact-Check aus drei Perspektiven',['Nenne die konkrete Neuerung.','Beschreibe Nutzen und Preis.','Ergänze eine übersehene Perspektive.']),
      task('f-pair','100 Geldscheine, nur 60 Güter','Tandem',24,'Die Kasse ist leer: Würdet ihr 100 neue Einheiten ausgeben, obwohl nur Güter im Wert von 60 vorhanden sind? Wechselt danach die Position.','Risikoampel und Entscheid mit Bedingungen',['Rechnet mit den Zahlen.','Wechselt die Seite.','Formuliert drei Bedingungen.'],['Will ausgeben','Prüft die Folgen']),
      task('f-trio','10 000 profitieren, 40 verlieren ihr Zuhause','Trio',32,'Ein Küstenprojekt schafft Wohnraum, siedelt aber 40 Haushalte um und verkleinert ein Feuchtgebiet. Verhandelt einen Entscheid, der die Kosten nicht versteckt.','Folgenmatrix, Schutzauflagen und sichtbarer Dissens',['Schreibt drei Einzelvoten.','Tragt Nutzen und Schäden ein.','Verhandelt einen gemeinsamen Beschluss.'],['Plant','Ist betroffen','Vertritt Zukunft/Umwelt'])
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
