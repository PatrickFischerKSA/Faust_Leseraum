export type Question = { id: number; source: string; text: string };
export type Scene = { slug: string; title: string; start: number; end: number; note: string; questions: Question[]; extraVideoId?: string; resource?: { label: string; url: string } };

export const FULL_FILM_ID = 'qaogjXLdPow';
export const TEXT_URL = 'https://www.projekt-gutenberg.org/goethe/faust1/chap001.html';

export const scenes: Scene[] = [
  {
    "slug": "zueignung",
    "title": "Zueignung",
    "start": 0,
    "end": 116,
    "note": "Die Zueignung wird in der Filmfassung nicht gesprochen; die Titel- und Eröffnungssequenz dient hier als Kontrastfolie.",
    "questions": [
      {
        "source": "1",
        "text": "Fassen Sie die Aussage der Zueignung in eigenen Worten zusammen! Woraus schöpft das lyrische Ich seinen Stoff?",
        "id": 1
      }
    ]
  },
  {
    "slug": "vorspiel-auf-dem-theater",
    "title": "Vorspiel auf dem Theater",
    "start": 116,
    "end": 383,
    "note": "",
    "questions": [
      {
        "source": "2",
        "text": "Beschreiben Sie die auftretenden Personen! Welche Interessen vertreten sie? Was ist für sie die Motivation?",
        "id": 2
      },
      {
        "source": "3",
        "text": "Was sagen die drei über die Öffentlichkeit, bzw. das Publikum? Wie definieren sie ihr Verhältnis zur Öffentlichkeit?",
        "id": 3
      },
      {
        "source": "4",
        "text": "Wie löst der Direktor den Konflikt auf?",
        "id": 4
      }
    ]
  },
  {
    "slug": "prolog-im-himmel",
    "title": "Prolog im Himmel",
    "start": 383,
    "end": 687,
    "note": "",
    "questions": [
      {
        "source": "5",
        "text": "Schildern Sie die drei Erzengel! Welches Daseinsgefühl – von einem Lebensgefühl kann man ja auf dieser Etage nicht sprechen – vermitteln die drei?",
        "id": 5
      },
      {
        "source": "6",
        "text": "Wie reagiert Mephistopheles unmittelbar darauf? Wie kritisiert er das eben Gesehene und Gehörte? Was bedeutet es, dass sich Gott das Lachen abgewöhnt hat? Was sagt Mephistopheles über die Menschen und ihre angebliche Vernunft? Was hält Mephistopheles infolgedessen von der Aufklärung?",
        "id": 6
      },
      {
        "source": "8",
        "text": "Wie beschreiben Gott und Mephistopheles Faust? Inwiefern unterscheidet sich die Einschätzung der beiden? Erklären Sie, wie die beiden in der Folge zur Wette kommen?",
        "id": 7
      },
      {
        "source": "9",
        "text": "Fassen Sie die Bestimmungen dieses Deals zusammen! Welche Gewinnchancen rechnen sich die beiden aus? Warum? Inwiefern fassen die beiden die Aufgabe ganz anders auf? Welche Gründe haben die beiden?",
        "id": 8
      }
    ]
  },
  {
    "slug": "nacht",
    "title": "Nacht",
    "start": 695,
    "end": 1440,
    "note": "",
    "questions": [
      {
        "source": "10",
        "text": "Schildern Sie die Situation von Faust! Welche Ausbildung hat er absolviert? Wie schätzt er sie ein, was hält er von den anderen Gelehrten und warum bringt ihm das alles nichts?",
        "id": 9
      },
      {
        "source": "11",
        "text": "Wonach sucht er? Welches Dilemma plagt ihn? Warum scheitert er? Welche Auswege sucht er aus dem Schlamassel?",
        "id": 10
      },
      {
        "source": "12",
        "text": "Was bringt ihm die Nostradamus-Anleihe? Warum?",
        "id": 11
      },
      {
        "source": "13",
        "text": "Erläutern Sie die Geisterbeschwörung! Was folgt daraus? Was sagt der Geist über Faust?",
        "id": 12
      },
      {
        "source": "14",
        "text": "Schildern Sie das Gespräch mit Wagner! Was unterscheidet die beiden? Inwiefern unterscheiden sich deren Ansprüche? Wie schätzen Sie Wagner ein? Was sagt Faust über ihn?",
        "id": 13
      },
      {
        "source": "15",
        "text": "Vergegenwärtigen Sie sich vor Ihrem inneren Auge die Schule! Was ist faustisch? Was ist wagnersch? Warum würden Sie sich für das eine oder andere entscheiden?",
        "id": 14
      },
      {
        "source": "16",
        "text": "Lesen Sie sorgfältig den Monolog nach Wagners Abgang! Warum verzweifelt Faust und wie versucht er ihr zu entgehen?",
        "id": 15
      },
      {
        "source": "17",
        "text": "Was rettet ihn? Warum? Was sagt das über Faust aus? Inwiefern widersprechen sich sein intellektueller Anspruch und emotionale Verfassung?",
        "id": 16
      }
    ]
  },
  {
    "slug": "vor-dem-tor-faust-und-wagner-bauern-unter-der-linde",
    "title": "Vor dem Tor/ Faust und Wagner/Bauern unter der Linde",
    "start": 1441,
    "end": 1800,
    "note": "",
    "questions": [
      {
        "source": "18",
        "text": "Fassen Sie kurz die Szene «Vor dem Tor» zusammen! Was erfahren wir über das Freizeitverhalten im ausgehenden 18. Und frühen 19.Jahrhundert? Kommentieren Sie diese Szenen aus der Perspektive der Diskussion in der Szene «Vorspiel auf dem Theater»",
        "id": 17
      },
      {
        "source": "19",
        "text": "Inwiefern gehen Wagner und Faust anders mit der öffentlichen Anerkennung um? Warum? Was ist Ihnen persönlich näher? Warum?",
        "id": 18
      },
      {
        "source": "20",
        "text": "In welchem Dilemma steckt Faust selber? Was heisst «Zwei Seelen wohnen, ach, in meiner Brust?» Kennen Sie dieses Gefühl?",
        "id": 19
      }
    ]
  },
  {
    "slug": "studierzimmer-i",
    "title": "Studierzimmer I",
    "start": 1803,
    "end": 2340,
    "note": "",
    "questions": [
      {
        "source": "19",
        "text": "Schildern Sie Fausts Begegnung mit dem Pudel! Wie macht er sich bemerkbar? Inwiefern stört er Faust bei der Genesis-Übersetzung?",
        "id": 20
      },
      {
        "source": "20",
        "text": "Kommentieren Sie diese Übersetzungsversuche! Warum kommt er nicht zu einem Schluss?",
        "id": 21
      },
      {
        "source": "21",
        "text": "Welche Erscheinung hat Faust beim Übersetzen?",
        "id": 22
      },
      {
        "source": "22",
        "text": "Wie tritt Mephistopheles auf? Welche Rolle nimmt er ein? Wie spielt er sie? Wie stellt sich Mephistopheles vor? Was sagt dies über seine Weltsicht aus? Wie begründet er sie? Was halten Sie davon? Kommentieren Sie diese Position!",
        "id": 23
      },
      {
        "source": "23",
        "text": "Wie lässt sich Mephistopheles auf Fausts Gedankenwelt ein? Wo kann er ihm helfen? Wo hat es Grenzen? Was sagt dies über Mephistopheles aus?",
        "id": 24
      },
      {
        "source": "24",
        "text": "Warum will Mephistopheles Faust wieder verlassen? Was macht er mit Faust vor seinem Abgang? Inwiefern ist dies ein taktisches Manöver?",
        "id": 25
      }
    ]
  },
  {
    "slug": "studierzimmer-ii",
    "title": "Studierzimmer II",
    "start": 2340,
    "end": 3122,
    "note": "",
    "questions": [
      {
        "source": "25",
        "text": "Worum geht es in der nächsten Diskussion zwischen Faust und Mephistopheles? Inwiefern hat sich die Gesprächssituation verändert?",
        "id": 26
      },
      {
        "source": "26",
        "text": "Wie formuliert Faust seine Wünsche? Worum geht es ihm? Was sind seine Ziele?",
        "id": 27
      },
      {
        "source": "27",
        "text": "Wie reagiert Mephistopheles darauf? Was schlägt er ihm vor? Vergleichen Sie diesen Pakt mit der Wette zwischen Mephistopheles und Gott und kommentieren Sie dieses Vorgehen!",
        "id": 28
      },
      {
        "source": "28",
        "text": "Welche Erwartungen hat Faust? Wie behandelt er Mephistopheles?",
        "id": 29
      },
      {
        "source": "29",
        "text": "Warum kommt es zum Rollenspiel? Wie manipuliert Mephistopheles Faust, dass er da einwilligt, wo er doch sonst so skrupulös und gewissenhaft ist?",
        "id": 30
      },
      {
        "source": "30",
        "text": "Kommentieren Sie Mephistopheles’ Studienberatung! Deklinieren Sie die verschiedenen Studienfächer durch und machen Sie einen Faktencheck! Wo hat Mephistopheles recht? Wo nicht? Warum?",
        "id": 31
      },
      {
        "source": "31",
        "text": "Fassen Sie Mephistopheles’ globale Wissenschaftskritik zusammen! Inwiefern ist diese berechtigt und nach wie vor aktuell? Wo nicht? Welche Gefahren birgt diese Position?",
        "id": 32
      },
      {
        "source": "32",
        "text": "Erläutern Sie das Gespräch zwischen Faust und Mephistopheles über den weiteren Weg! Was möchte Faust? Wie und warum manipuliert ihn Mephistopheles?",
        "id": 33
      }
    ]
  },
  {
    "slug": "auerbachs-keller-in-leipzig",
    "title": "Auerbachs Keller in Leipzig",
    "start": 3181,
    "end": 3740,
    "note": "",
    "questions": [
      {
        "source": "33",
        "text": "Schildern Sie die Atmosphäre in der Kneipe! Erläutern Sie den politischen Kontext dieser Kneipenszene! Wann findet das Ganze statt?",
        "id": 34
      },
      {
        "source": "34",
        "text": "Interpretieren Sie das «Lied vom Floh»! Was hat es zu bedeuten, dass ausgerechnet Mephistopheles dieses Lied singt? Ist Politik in diesem Verständnis Teufelszeug? Ist Mephistopheles politisch oder welche Agenda hat er?",
        "id": 35
      }
    ]
  },
  {
    "slug": "hexenkueche",
    "title": "Hexenküche",
    "start": 3758,
    "end": 4020,
    "note": "",
    "questions": [
      {
        "source": "35",
        "text": "Erklären Sie Mephistopheles’ Skepsis gegen die Zauberei! Was will er dagegen?",
        "id": 36
      },
      {
        "source": "36",
        "text": "Was geht in dieser Hexenküche vor sich? Was bezweckt Mephistopheles damit? Erläutern Sie das Anti-Aging-Programm!",
        "id": 37
      },
      {
        "source": "37",
        "text": "Was sieht Faust im Spiegel, welcher ihm vorgehalten wird? Welche Strategie von Mephistopheles verbirgt sich dahinter?",
        "id": 38
      },
      {
        "source": "38",
        "text": "Was befindet sich im Hexenkessel, der überzulaufen droht? Welche Wirkung hat der Inhalt auf Faust? Wie kommentiert Faust dieses Hokuspokus?",
        "id": 39
      }
    ]
  },
  {
    "slug": "strasse-i",
    "title": "Strasse I",
    "start": 4034,
    "end": 4140,
    "note": "",
    "questions": [
      {
        "source": "39",
        "text": "Schildern Sie die Begegnung auf der Strasse! Charakterisieren Sie Margarete! Erklären Sie ihre Reaktion! Inwiefern war Faust frech?",
        "id": 40
      },
      {
        "source": "40",
        "text": "Erklären Sie die Reaktion von Faust! Welchen Auftrag gibt er Mephistopheles? Wie reagiert der darauf? Inwiefern entspricht Fausts Verhalten Mephistopheles’ Strategie?",
        "id": 41
      }
    ]
  },
  {
    "slug": "abend-ein-kleines-reinliches-zimmer",
    "title": "Abend. Ein kleines reinliches Zimmer",
    "start": 4140,
    "end": 4320,
    "note": "",
    "questions": [
      {
        "source": "41",
        "text": "Wie verarbeitet Margarete die Begegnung? Welche Gedanken macht sie sich dazu?",
        "id": 42
      },
      {
        "source": "42",
        "text": "Was plant Mephistopheles? Welche Erwartungen hat Faust?",
        "id": 43
      }
    ]
  },
  {
    "slug": "margarete-mit-einer-lampe",
    "title": "Margarete mit einer Lampe",
    "start": 4320,
    "end": 4460,
    "note": "",
    "questions": [
      {
        "source": "43",
        "text": "Welche Veränderung stellt Margarete in ihrem Zimmer fest? Interpretieren Sie das Lied, bzw. das Gedicht des Königs von Thule!",
        "id": 44
      }
    ]
  },
  {
    "slug": "spaziergang",
    "title": "Spaziergang",
    "start": 4460,
    "end": 4580,
    "note": "",
    "questions": [
      {
        "source": "44",
        "text": "Was erfahren wir aus dem Gespräch zwischen Faust und Mephistopheles über die Charmeoffensive gegenüber Margarete? Warum ist Mephistopheles so wütend? Kommentieren Sie die Meinungsverschiedenheit zwischen Faust und Mephistopheles!",
        "id": 45
      }
    ]
  },
  {
    "slug": "der-nachbarin-haus",
    "title": "Der Nachbarin Haus",
    "start": 4580,
    "end": 4840,
    "note": "",
    "questions": [
      {
        "source": "45",
        "text": "Charakterisieren Sie Frau Marthe Schwerdtlein! Was ist ihr Problem? Was rät sie Margarete?",
        "id": 46
      },
      {
        "source": "46",
        "text": "Wie mischt sich Mephistopheles in die Szene? Fassen Sie das Gespräch zusammen! Was flunkert er Marthe vor? Worum geht es ihr vor allem? Wie verschafft ihr Mephistopheles dies?",
        "id": 47
      }
    ]
  },
  {
    "slug": "strasse-ii",
    "title": "Strasse II",
    "start": 4840,
    "end": 4865,
    "note": "",
    "questions": [
      {
        "source": "47",
        "text": "Inwiefern erkennt Mephistopheles in Frau Marthe eine Chance, an Margarete heranzukommen? Wozu drängt Mephistopheles Faust? Erklären Sie diese Taktik!",
        "id": 48
      }
    ]
  },
  {
    "slug": "garten",
    "title": "Garten",
    "start": 4865,
    "end": 5380,
    "note": "",
    "questions": [
      {
        "source": "48",
        "text": "Beschreiben Sie die beiden Paare, die da durch den Garten lustwandeln! Worüber sprechen sie? Analysieren Sie die Abfolge der Dialoge! Wie enden die beiden Gespräche?",
        "id": 49
      }
    ]
  },
  {
    "slug": "ein-gartenhaeuschen",
    "title": "Ein Gartenhäuschen",
    "start": 5380,
    "end": 5420,
    "note": "",
    "questions": [
      {
        "source": "49",
        "text": "Warum drängt Mephistopheles zu Abschied? Warum kann ihm eine Affäre von Faust mit Margarete nicht so recht sein? Welchen taktischen Fehler hat er gemacht? Warum kommt er gegen Margarete nicht an?",
        "id": 50
      }
    ]
  },
  {
    "slug": "wald-und-hoehle",
    "title": "Wald und Höhle",
    "start": 5420,
    "end": 5632,
    "note": "",
    "questions": [
      {
        "source": "50",
        "text": "Fassen Sie die Diskussion zwischen Faust und Mephistopheles zusammen! Worin unterscheiden sich die Wünsche von Faust und Mephistopheles? Wie denken die beiden über die Liebe?",
        "id": 51
      }
    ]
  },
  {
    "slug": "gretchen-am-spinnrad",
    "title": "Gretchen am Spinnrad",
    "start": 5632,
    "end": 5724,
    "note": "",
    "questions": [
      {
        "source": "51",
        "text": "Interpretieren Sie das Lied/Gedicht! Wer und was spinnt da? Hören Sie sich dazu die Schubert-Vertonung",
        "id": 52
      }
    ]
  },
  {
    "slug": "marthens-garten",
    "title": "Marthens Garten",
    "start": 5724,
    "end": 6000,
    "note": "",
    "questions": [
      {
        "source": "52",
        "text": "Beschreiben Sie das Date von Faust und Gretchen! Wie gehen die beiden Turteltauben miteinander um?",
        "id": 53
      },
      {
        "source": "53",
        "text": "Auf welche Frage lenkt Gretchen das Gespräch? Was ist die sogenannte Gretchenfrage?",
        "id": 54
      },
      {
        "source": "54",
        "text": "In welcher Zwickmühle befindet sich Faust? Warum versucht er immer wieder abzuwiegeln und abzulenken?",
        "id": 55
      },
      {
        "source": "55",
        "text": "Welche religiöse Auffassung schützt Faust in diesem Gespräch vor? Glauben Sie Faust? Begründen Sie Ihre Einschätzung!",
        "id": 56
      },
      {
        "source": "56",
        "text": "Was sagt Gretchen über Mephisto? Wie begründet sie ihre Meinung?",
        "id": 57
      },
      {
        "source": "57",
        "text": "Was planen Faust und Gretchen als nächstes?",
        "id": 58
      },
      {
        "source": "58",
        "text": "Wie platzt Mephistopheles in die Szene? Wie bezeichnet er Gretchen? Wie kommentiert er die vorangegangene Diskussion!",
        "id": 59
      }
    ]
  },
  {
    "slug": "am-brunnen",
    "title": "Am Brunnen",
    "start": 6000,
    "end": 6091,
    "note": "",
    "questions": [
      {
        "source": "59",
        "text": "Fassen Sie die folgende Szene zusammen! Was tratschen die Mädchen? Warum ist Gretchen so still? Erklären Sie die dramaturgische Funktion dieser Szene!",
        "id": 60
      }
    ]
  },
  {
    "slug": "zwinger",
    "title": "Zwinger",
    "start": 6091,
    "end": 6182,
    "note": "",
    "questions": [
      {
        "source": "60",
        "text": "Interpretieren Sie Gretchens Gebet! Wie reflektiert sie ihr eigenes Dilemma!",
        "id": 61
      }
    ]
  },
  {
    "slug": "nacht-strasse-vor-gretchens-tuere",
    "title": "Nacht. Strasse vor Gretchens Türe",
    "start": 6182,
    "end": 6530,
    "note": "",
    "questions": [
      {
        "source": "61",
        "text": "Stellen Sie Valentin vor! Wer ist er? Warum kommt er nachhause? Wie denkt er über seine Schwester?",
        "id": 62
      },
      {
        "source": "62",
        "text": "Was führen Mephistopheles und Faust im Schilde? Wie machen sie auf sich aufmerksam?",
        "id": 63
      },
      {
        "source": "63",
        "text": "Wie kommt es zur Konfrontation mit Valentin? Schildern Sie den Kampf! Wie endet er und warum?",
        "id": 64
      },
      {
        "source": "64",
        "text": "Kommentieren Sie die Reaktionen auf das Ende des Kampfs!",
        "id": 65
      },
      {
        "source": "65",
        "text": "Was sagt Valentin zum Schluss zu Gretchen? Wie reagiert sie?",
        "id": 66
      }
    ]
  },
  {
    "slug": "dom",
    "title": "Dom",
    "start": 6534,
    "end": 6630,
    "note": "",
    "questions": [
      {
        "source": "66",
        "text": "Beschreiben Sie das zweite Gebet von Gretchen und vergleichen Sie es mit der Szene Zwinger! Wie hat sich Gretchen entwickelt? Wie reagiert sie auf die Gottesstimme?",
        "id": 67
      }
    ]
  },
  {
    "slug": "walpurgisnacht",
    "title": "Walpurgisnacht",
    "start": 6630,
    "end": 6810,
    "note": "",
    "questions": [
      {
        "source": "67",
        "text": "Wohin gehen Faust und Mephistopheles? Wie wirkt diese Gegend unterschiedlich auf die beiden?",
        "id": 68
      },
      {
        "source": "68",
        "text": "Beschreiben Sie das Irrlicht! Was sagt es?",
        "id": 69
      },
      {
        "source": "69",
        "text": "Charakterisieren Sie die Erscheinungen! Was geht da vor sich? Was soll das Ganze?",
        "id": 70
      },
      {
        "source": "70",
        "text": "Wie diskutieren Faust und Mephistopheles über das Erlebte? Inwiefern droht Faust Mephistopheles auf den Leim zu gehen und die Wette zu verlieren? Tod durch Entertainment? Wie schützt sich Faust?",
        "id": 71
      },
      {
        "source": "71",
        "text": "Welche politischen Statements geben der General, der Minister, der Parvenü und der Autor von sich?",
        "id": 72
      },
      {
        "source": "72",
        "text": "Erklären Sie die Erscheinung der Lilith? Wer ist sie? Was hat dies in diesem Kontext zu bedeuten?",
        "id": 73
      }
    ]
  },
  {
    "slug": "walpurgisnachtstraum",
    "title": "Walpurgisnachtstraum",
    "start": 6810,
    "end": 6840,
    "note": "Die Filmfassung kürzt diesen Teil stark. Beobachte bewusst, was die Adaption auslässt.",
    "questions": [
      {
        "source": "73",
        "text": "Recherchieren Sie Shakespeares Sommernachtstraum! Erklären Sie die intertextuellen Bezüge!",
        "id": 74
      },
      {
        "source": "74",
        "text": "Was berichtet die Szene über die gelingende Paarbeziehung?",
        "id": 75
      },
      {
        "source": "75",
        "text": "Wie wirkt das ganze Multimediaspektakel auf Faust?",
        "id": 76
      }
    ]
  },
  {
    "slug": "trueber-tag-feld",
    "title": "Trüber Tag. Feld",
    "start": 6840,
    "end": 6968,
    "note": "",
    "questions": [
      {
        "source": "76",
        "text": "Worüber klagt Faust in dieser – ungereimten – Szene? Was spricht er über das Schicksal von Gretchen an? Wie kommt er darauf? Wie reagiert Mephistopheles?",
        "id": 77
      },
      {
        "source": "77",
        "text": "Schildern Sie die Auseinandersetzung zwischen Faust und Mephistopheles! Was fordert Faust? Wie reagiert Mephistopheles? Erklären Sie die Gefahr, auf welche Mephistopheles hinweist!",
        "id": 78
      }
    ]
  },
  {
    "slug": "kerker",
    "title": "Kerker",
    "start": 6968,
    "end": 7368,
    "note": "",
    "questions": [
      {
        "source": "78",
        "text": "Beschreiben Sie den Zustand von Gretchen! Was sagt sie?",
        "id": 79
      },
      {
        "source": "79",
        "text": "Wie reagiert Gretchen auf Fausts Erscheinen? Erklären Sie das Missverständnis! Was sagt dies über den mentalen Zustand von Gretchen aus?",
        "id": 80
      },
      {
        "source": "80",
        "text": "Was will Gretchen vor dem Tod noch tun? Erklären Sie das Missbehagen von Faust und dem Publikum?",
        "id": 81
      },
      {
        "source": "81",
        "text": "Wie erkennt Gretchen Faust? Was will Faust? Warum widersetzt sich Gretchen? Was offenbart sie Faust? Wie ordnet sie die letzten Dinge ihrer Familie?",
        "id": 82
      },
      {
        "source": "82",
        "text": "Was sagt Gretchen über ihren letzten Lebenstag?",
        "id": 83
      },
      {
        "source": "83",
        "text": "Beschreiben Sie das Ende des Dramas!",
        "id": 84
      }
    ]
  }
];

scenes.find((scene) => scene.title === 'Studierzimmer II')!.extraVideoId = 'Ou3AV5i1754';
scenes.find((scene) => scene.title === 'Margarete mit einer Lampe')!.extraVideoId = 'wvSGWN_9kwk';
scenes.find((scene) => scene.title === 'Gretchen am Spinnrad')!.resource = { label: 'Schubert: Gretchen am Spinnrade', url: 'https://www.youtube.com/watch?v=MY0eeotSDi8' };

