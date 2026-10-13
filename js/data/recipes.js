// Recetas diseñadas para la Nespresso Essenza Mini.
// Para los cafés con leche se asume un espumador externo (la máquina
// no tiene varilla de vapor). Cada paso lleva un temporizador cuando aplica.
// `substeps` desglosa un paso en acciones pequeñas numeradas. `tip` aparece
// dentro del paso y aporta contexto puntual.

// Catálogo de imágenes Unsplash, elegidas por tema y encuadre editorial.
// width=600 / quality=80 / auto=format = buena calidad para retina sin penalizar
// la descarga en móvil. Si la red falla, el componente Photo pinta un fondo
// de "void" con un glyph SVG, así nunca se ve un recuadro roto.
const img = (id) =>
  `https://images.unsplash.com/photo-${id}?w=720&q=80&auto=format&fit=crop`;

export const recipes = [
  // ============================================================
  // ESPRESSO — individuales
  // ============================================================
  {
    id: "espresso-clasico",
    name: "Espresso clásico",
    type: "espresso",
    intensity: "intenso",
    capsuleId: "kazaar",
    blurb: "La forma más honesta de empezar el día. 40 ml, sin azúcar.",
    servings: 1,
    image: img("1510707577719-ae7c14805e3a"),
    ingredients: [
      { name: "Cápsula Kazaar", qty: "1" },
      { name: "Taza de espresso precalentada", qty: "1" },
      { name: "Agua fresca (para precalentar)", qty: "100 ml" },
    ],
    steps: [
      {
        text: "Prepara la máquina y la taza",
        substeps: [
          "Llena el depósito con agua fresca y fría",
          "Enciende la Essenza. El piloto parpadea mientras calienta (~25 s)",
          "Cuando quede fijo, abre el grifo y deja correr 30 ml de agua para purgar",
          "Pon la tacita bajo la salida y deja caer el agua residual para precalentarla; vacíala",
        ],
      },
      { text: "Inserta la cápsula Kazaar en la máquina." },
      {
        text: "Pon la tacita precalentada bajo la salida y pulsa el botón Espresso",
        substeps: [
          "La extracción tarda unos 25 segundos",
          "Para en cuanto el color pase de miel a agua clara",
        ],
        timerSeconds: 25,
        tip: "No pulses el botón dos veces. La Essenza no se apaga sola si extraes menos del volumen programado.",
      },
      {
        text: "Saca la cápsula y sírvelo",
        substeps: [
          "Levanta la palanca para expulsar la cápsula al cajetín",
          "La crema debe cubrir al menos 2 mm; si es más fina, sube la dosis de café o baja la molienda (no aplicable en cápsulas, pero sí la temperatura del agua)",
        ],
        tip: "Bebe antes de 30 segundos. Pasado ese tiempo, los aromas se oxidan.",
      },
    ],
    tip: "Si el agua de tu zona es muy dura, usa agua filtrada. La cal arruina la crema en tres meses.",
  },
  {
    id: "espresso-suave",
    name: "Espresso dulce",
    type: "espresso",
    intensity: "suave",
    capsuleId: "volluto",
    blurb: "Tueste ligero, sin amargor. Para los que prefieren el café sin 'morder'.",
    servings: 1,
    image: img("1525088553748-01d6e210e00b"),
    ingredients: [
      { name: "Cápsula Volluto", qty: "1" },
      { name: "Azúcar moreno (opcional)", qty: "al gusto" },
      { name: "Taza precalentada", qty: "1" },
    ],
    steps: [
      { text: "Llena el depósito con agua fresca y enciende la Essenza. Espera a que el piloto quede fijo." },
      { text: "Precalienta la taza con agua caliente de la máquina y vacíala." },
      { text: "Inserta la cápsula Volluto y coloca la tacita debajo de la salida." },
      {
        text: "Pulsa Espresso y deja caer 40 ml",
        substeps: [
          "Si lo prefieres más corto, detén la extracción a los 20 s (queda como un ristretto dulce)",
          "Si lo quieres largo, deja correr hasta 60 ml (más suave todavía)",
        ],
        timerSeconds: 25,
      },
      {
        text: "Endulza y remueve",
        substeps: [
          "Añade media cucharadita de azúcar moreno si quieres",
          "Remueve con cuchara de metal, sin batir: que no se rompa la crema",
        ],
      },
    ],
  },
  {
    id: "ristretto-perfecto",
    name: "Ristretto perfecto",
    type: "espresso",
    intensity: "intenso",
    capsuleId: "ristretto",
    blurb: "Extracción corta: 20 ml para concentrar todos los aromas.",
    servings: 1,
    image: img("1485808191679-5f86510681a2"),
    ingredients: [
      { name: "Cápsula Ristretto", qty: "1" },
      { name: "Tacita de porcelana (no vidrio)", qty: "1" },
    ],
    steps: [
      {
        text: "Precalienta a fondo",
        substeps: [
          "Llena la tacita con agua caliente del grifo y déjala dos minutos",
          "Vacíala justo antes de colocar bajo la salida",
        ],
        tip: "La porcelana retiene mejor el calor que el cristal. La diferencia entre un ristretto tibio y uno caliente es abismal.",
      },
      { text: "Inserta la cápsula Ristretto en la máquina." },
      {
        text: "Pulsa Espresso y para la extracción manualmente a los 20 segundos",
        substeps: [
          "Pulsa el botón otra vez para detener",
          "La Essenza no tiene modo ristretto nativo: lo simulas deteniendo la extracción",
        ],
        timerSeconds: 20,
        warn: "Si te despistas y dejas correr los 40 ml, obtienes un espresso normal, no un ristretto. El amargor sube mucho.",
      },
      { text: "Sírvelo inmediatamente. No esperes a enfriarse." },
    ],
  },

  // ============================================================
  // DOBLES Y TRIPLES — usan 2-3 cápsulas
  // ============================================================
  {
    id: "doppio",
    name: "Doppio",
    type: "espresso",
    intensity: "intenso",
    capsuleId: "arpeggio",
    blurb: "Dos extracciones servidas juntas. Base perfecta para flat whites y lattes.",
    servings: 1,
    capsules: ["arpeggio", "arpeggio"],
    image: img("1509042239860-f550ce710b93"),
    ingredients: [
      { name: "Cápsula Arpeggio", qty: "2" },
      { name: "Taza mediana precalentada", qty: "1 (120 ml mínimo)" },
    ],
    steps: [
      { text: "Precalienta la taza y deja la Essenza lista con agua purgada." },
      {
        text: "Primera extracción",
        substeps: [
          "Inserta la primera cápsula Arpeggio",
          "Pulsa Espresso y deja caer 40 ml en la taza",
        ],
        timerSeconds: 25,
      },
      {
        text: "Segunda extracción",
        substeps: [
          "Saca la primera cápsula",
          "Inserta la segunda cápsula inmediatamente",
          "Vuelve a pulsar Espresso y deja caer otros 40 ml sobre la misma taza",
        ],
        timerSeconds: 25,
        tip: "Si dejas pasar más de 30 segundos entre extracciones, la primera se enfría y la crema se rompe.",
      },
      { text: "Sirve sin remover. Los dos espressos deben quedar visibles como dos capas." },
    ],
    tip: "Si quieres un doppio 'auténtico' (dos extracciones en la misma tacita pequeña), usa cápsulas Ristretto y detén cada una a 20 s.",
  },
  {
    id: "triple-espresso",
    name: "Triple espresso",
    type: "espresso",
    intensity: "intenso",
    capsuleId: "kazaar",
    blurb: "Tres extracciones cortas. Para los días que necesitas un motor de arranque.",
    servings: 1,
    capsules: ["kazaar", "kazaar", "kazaar"],
    ingredients: [
      { name: "Cápsula Kazaar", qty: "3" },
      { name: "Vaso o taza grande (mín. 200 ml)", qty: "1" },
    ],
    steps: [
      { text: "Precalienta el vaso y deja la máquina lista." },
      {
        text: "Tres extracciones seguidas",
        substeps: [
          "Inserta cápsula 1, extrae 40 ml",
          "Sin pausa, inserta cápsula 2, extrae 40 ml",
          "Inserta cápsula 3, extrae 40 ml",
        ],
        timerSeconds: 75,
        warn: "No apagues la máquina entre extracciones. Cada encendido gasta 25 s de calentamiento y diluye el café con agua fría.",
      },
      { text: "Sírvelo en vaso. Se bebe caliente, sin leche ni azúcar." },
    ],
    tip: "Si la primera extracción sale con crema pobre, aborta y empieza de nuevo. Una cápsula húmeda no extrae bien.",
  },
  {
    id: "lungo-intenso",
    name: "Lungo con cuerpo",
    type: "lungo",
    intensity: "intenso",
    capsuleId: "envivo-lungo",
    blurb: "Taza grande de 110 ml, con notas de cacao y fruta madura.",
    servings: 1,
    image: img("1497935586351-b67a49e012bf"),
    ingredients: [
      { name: "Cápsula Envivo Lungo", qty: "1" },
      { name: "Taza grande (mín. 150 ml) precalentada", qty: "1" },
    ],
    steps: [
      { text: "Llena el tanque con agua fría hasta la marca y enciende la máquina." },
      { text: "Precalienta la taza con agua caliente y vacíala." },
      { text: "Inserta la cápsula Envivo Lungo y sitúa la taza grande debajo." },
      {
        text: "Pulsa Lungo. La extracción se detiene sola a los 110 ml",
        substeps: [
          "La extracción toma unos 45 segundos",
          "Si ves que la crema sube demasiado rápido y se queda blanca, baja la dosis en la próxima",
        ],
        timerSeconds: 45,
      },
      { text: "Deja reposar diez segundos y sirve." },
    ],
  },
  {
    id: "lungo-floral",
    name: "Lungo floral",
    type: "lungo",
    intensity: "suave",
    capsuleId: "master-origin-ethiopia",
    blurb: "Notas de azahar y bergamota. Casi té, sin amargor.",
    servings: 1,
    image: img("1541167760496-1628856ab772"),
    ingredients: [
      { name: "Cápsula Master Origin Ethiopia", qty: "1" },
      { name: "Taza de cerámica", qty: "1" },
      { name: "Agua caliente adicional (opcional)", qty: "30 ml" },
    ],
    steps: [
      { text: "Precalienta la taza y descarta el agua." },
      { text: "Inserta la cápsula Ethiopia y coloca la taza." },
      { text: "Pulsa Lungo. La extracción toma unos 40 segundos.", timerSeconds: 40 },
      {
        text: "Si te gusta más suave, diluye con un chorrito de agua caliente",
        tip: "A diferencia del espresso, el lungo admite agua extra sin 'lavar' el sabor.",
      },
    ],
  },

  // ============================================================
  // CON LECHE — clásicas
  // ============================================================
  {
    id: "cortado",
    name: "Cortado",
    type: "leche",
    intensity: "medio",
    capsuleId: "corto",
    blurb: "Espresso con un toque de leche caliente. Ratio 1:1.",
    servings: 1,
    image: img("1572442388796-11668a67e53d"),
    ingredients: [
      { name: "Cápsula Corto", qty: "1" },
      { name: "Leche entera fría", qty: "60 ml" },
    ],
    steps: [
      {
        text: "Calienta y espume la leche con tu espumador hasta 60 °C",
        substeps: [
          "Vierte 60 ml de leche entera fría en la jarra",
          "Espuma hasta que la temperatura alcance 60 °C (si no tienes termómetro, para cuando la jarra queme al tacto)",
        ],
        timerSeconds: 60,
      },
      {
        text: "Mientras tanto, extrae un espresso (40 ml) en una tacita",
        substeps: ["Inserta la cápsula Corto", "Pulsa Espresso", "Detén a los 25 segundos si quieres más cuerpo"],
        timerSeconds: 25,
      },
      {
        text: "Vierte la leche espumada sobre el café en ratio 1:1",
        substeps: [
          "Inclina la jarra y vierte desde baja altura",
          "Termina con la espuma por encima, ayudándote con una cuchara",
        ],
      },
    ],
    tip: "La cápsula Corto está diseñada específicamente para cortado: tueste medio y amargor bajo.",
  },
  {
    id: "capuchino",
    name: "Capuchino",
    type: "leche",
    intensity: "medio",
    capsuleId: "arpeggio",
    blurb: "Espresso, leche espumada y un dedo de espuma. La proporción italiana clásica.",
    servings: 1,
    image: img("1572442388796-11668a67e53d"),
    ingredients: [
      { name: "Cápsula Arpeggio", qty: "1" },
      { name: "Leche entera fría", qty: "100 ml" },
      { name: "Cacao en polvo", qty: "una pizca" },
    ],
    steps: [
      {
        text: "Espuma la leche hasta obtener microespuma brillante",
        substeps: [
          "Vierte 100 ml de leche entera fría en la jarra",
          "Baja la varilla y enciende",
          "Sube la varilla hasta la superficie cuando empiecen a salir burbujas",
          "Para cuando la leche alcance 65 °C",
        ],
        timerSeconds: 75,
        tip: "La microespuma brilla como pintura satinada. Si queda mate o con burbujas grandes, baja la temperatura o usa leche más fresca.",
      },
      {
        text: "Extrae el espresso Arpeggio en una taza de capuchino",
        substeps: ["Inserta la cápsula", "Pulsa Espresso", "40 ml en total"],
        timerSeconds: 25,
      },
      {
        text: "Vierte la leche desde altura para integrar, luego baja la jarra para la espuma",
        substeps: [
          "Empieza vertiendo desde 15 cm de altura para mezclar",
          "Cuando la taza esté al 80%, baja la jarra a 3 cm y deja salir solo la espuma",
          "Dibuja un corazón o un tulipán moviendo la jarra mientras viertes",
        ],
      },
      { text: "Espolvorea cacao por encima con un colador fino." },
    ],
  },
  {
    id: "capuchino-grande",
    name: "Capuchino grande",
    type: "leche",
    intensity: "medio",
    capsuleId: "arpeggio",
    blurb: "Versión generosa para esos desayunos lentos. Doble ración de todo.",
    servings: 1,
    capsules: ["arpeggio", "arpeggio"],
    ingredients: [
      { name: "Cápsula Arpeggio", qty: "2" },
      { name: "Leche entera fría", qty: "200 ml" },
      { name: "Cacao en polvo o canela", qty: "una pizca" },
    ],
    steps: [
      {
        text: "Espuma 200 ml de leche hasta 65 °C",
        substeps: [
          "Usa jarra de 400 ml mínimo",
          "Espuma primero los primeros 100 ml, luego añade los otros 100 y vuelve a espumar",
        ],
        timerSeconds: 120,
      },
      {
        text: "Doble extracción: dos espressos seguidos en taza grande",
        timerSeconds: 50,
        substeps: [
          "Primera cápsula, extrae 40 ml",
          "Segunda cápsula, extrae 40 ml sobre la misma taza",
        ],
      },
      { text: "Vierte toda la leche en la taza, con cuidado de no romper la crema del espresso." },
      { text: "Termina con cacao o canela por encima." },
    ],
  },
  {
    id: "latte-macchiato",
    name: "Latte macchiato",
    type: "leche",
    intensity: "suave",
    capsuleId: "livanto",
    blurb: "Tres capas visibles: leche, espresso y espuma. Para los que cuidan la presentación.",
    servings: 1,
    image: img("1453614512568-c4024d13c247"),
    ingredients: [
      { name: "Cápsula Livanto", qty: "1" },
      { name: "Leche entera fría", qty: "150 ml" },
    ],
    steps: [
      {
        text: "Espuma la leche y viértela en un vaso alto hasta 2/3",
        substeps: ["Espuma hasta 65 °C", "Vierte despacio para que quede cremosa, sin espuma separada"],
        timerSeconds: 80,
      },
      {
        text: "Extrae el espresso Livanto directamente sobre la leche, despacio",
        substeps: [
          "Pon el vaso bajo la salida de la máquina",
          "Deja caer el espresso muy lentamente para que la densidad cree capas",
        ],
        timerSeconds: 30,
        tip: "Si viertes demasiado rápido, las capas se mezclan y queda un café con leche normal.",
      },
      { text: "Deja que las capas se separen un minuto antes de beber." },
    ],
  },
  {
    id: "cafe-con-leche",
    name: "Café con leche",
    type: "leche",
    intensity: "suave",
    capsuleId: "volluto",
    blurb: "El desayuno de siempre. Ratio 1:3, sin espuma densa.",
    servings: 1,
    image: img("1559496417-e7f25cb247f3"),
    ingredients: [
      { name: "Cápsula Volluto", qty: "1" },
      { name: "Leche entera caliente", qty: "120 ml" },
    ],
    steps: [
      {
        text: "Calienta la leche sin espumar (máximo 65 °C)",
        substeps: [
          "Si tu espumador tiene modo 'calentar', úsalo",
          "Si no, calienta en microondas 1 minuto a 600 W",
        ],
        timerSeconds: 60,
      },
      { text: "Extrae el espresso en una taza grande." , timerSeconds: 25 },
      { text: "Añade la leche caliente y remueve suavemente con cuchara." },
    ],
  },
  {
    id: "cafe-con-mucha-leche",
    name: "Café con mucha leche",
    type: "leche",
    intensity: "suave",
    capsuleId: "livanto",
    blurb: "Para los que toman el café más como pretexto que como bebida. Ratio 1:5.",
    servings: 1,
    capsules: ["livanto"],
    image: img("1495474472287-4d71bcdd2085"),
    ingredients: [
      { name: "Cápsula Livanto", qty: "1" },
      { name: "Leche entera caliente", qty: "200 ml" },
      { name: "Azúcar o miel (opcional)", qty: "al gusto" },
    ],
    steps: [
      {
        text: "Calienta 200 ml de leche hasta 60 °C",
        substeps: [
          "Más cantidad = más tiempo en el espumador",
          "Si ves que empieza a hervir, baja la potencia",
        ],
        timerSeconds: 90,
      },
      { text: "Extrae el espresso Livanto en una taza o vaso grande (250 ml mínimo)." , timerSeconds: 25 },
      {
        text: "Vierte la leche sobre el café",
        substeps: [
          "Ratio aproximado: 1 parte de café por 5 partes de leche",
          "Remueve para integrar",
        ],
      },
      {
        text: "Endulza al gusto",
        substeps: [
          "El azúcar moreno aporta notas de caramelo",
          "La miel combina especialmente bien con Volluto",
        ],
      },
    ],
    tip: "Si te gusta más 'con sabor a café', añade una segunda cápsula Livanto antes de la leche.",
  },
  {
    id: "flat-white",
    name: "Flat white",
    type: "leche",
    intensity: "intenso",
    capsuleId: "master-origin-colombia",
    blurb: "Doble ristretto con microespuma sedosa. Origen australiano.",
    servings: 1,
    capsules: ["master-origin-colombia", "master-origin-colombia"],
    ingredients: [
      { name: "Cápsula Master Origin Colombia", qty: "2" },
      { name: "Leche entera fría", qty: "120 ml" },
    ],
    steps: [
      {
        text: "Espuma la leche hasta textura sedosa (sin burbujas grandes)",
        substeps: [
          "Compara con pintura: la leche debe quedar satinada, brillante",
          "Si hay burbujas grandes, golpea la jarra contra la mesa para romperlas",
        ],
        timerSeconds: 70,
      },
      {
        text: "Extrae un ristretto con la primera cápsula (detén a 20 s)",
        timerSeconds: 20,
        substeps: ["Precalienta la taza", "Detén la extracción manualmente"],
      },
      { text: "Extrae el segundo ristretto encima del primero.", timerSeconds: 20 },
      {
        text: "Vierte la leche desde el centro para conseguir el 'punto' blanco en superficie",
        substeps: [
          "Empieza vertiendo desde 8 cm para integrar",
          "Baja a 2 cm cuando quede 1 cm de leche en la jarra",
          "Dibuja un pequeño círculo o corazón con el chorro final",
        ],
      },
    ],
  },
  {
    id: "flat-white-doble",
    name: "Flat white doble",
    type: "leche",
    intensity: "intenso",
    capsuleId: "ristretto",
    blurb: "Cuatro cápsulas para los flat white lovers. Para una mañana con trabajo serio.",
    servings: 1,
    capsules: ["ristretto", "ristretto", "ristretto", "ristretto"],
    image: img("1509042239860-f550ce710b93"),
    ingredients: [
      { name: "Cápsula Ristretto", qty: "4" },
      { name: "Leche entera fría", qty: "180 ml" },
    ],
    steps: [
      { text: "Precalienta una taza grande (300 ml)." },
      {
        text: "Extrae cuatro ristretti seguidos en la misma taza",
        substeps: [
          "Detén cada extracción a los 20 segundos",
          "Hazlo rápido: no dejes pasar más de 10 segundos entre cápsulas",
        ],
        timerSeconds: 80,
      },
      {
        text: "Espuma los 180 ml de leche hasta textura sedosa",
        timerSeconds: 90,
      },
      { text: "Vierte la leche sobre los ristretti, con cuidado de no romper la crema." },
    ],
    tip: "Si cuatro cápsulas te parecen excesas, prueba con tres. Sigue siendo un flat white 'doble'.",
  },
  {
    id: "macchiato-caramelo",
    name: "Macchiato caramelo",
    type: "leche",
    intensity: "medio",
    capsuleId: "capriccio",
    blurb: "Espresso 'manchado' con leche y un hilo de sirope de caramelo.",
    servings: 1,
    ingredients: [
      { name: "Cápsula Capriccio", qty: "1" },
      { name: "Leche entera", qty: "30 ml" },
      { name: "Sirope de caramelo", qty: "10 ml" },
    ],
    steps: [
      { text: "Vierte el sirope de caramelo en el fondo de la tacita." },
      {
        text: "Espuma ligeramente la leche, sin que coja aire",
        substeps: ["Solo 30 ml, suficiente para una capa fina de espuma"],
        timerSeconds: 40,
      },
      { text: "Extrae el espresso Capriccio sobre el caramelo." , timerSeconds: 25 },
      { text: "Termina con una cuchara de leche espumada encima. Dibuja un círculo con la cuchara." },
    ],
  },

  // ============================================================
  // LATTE — especialidad con sirope
  // ============================================================
  {
    id: "latte-vainilla",
    name: "Latte vainilla",
    type: "leche",
    intensity: "suave",
    capsuleId: "vanilla",
    capsuleNote: "Usa Volluto si no tienes cápsula de vainilla",
    blurb: "El clásico de café de especialidad. Dulce sin empalagar.",
    servings: 1,
    image: img("1509042239860-f550ce710b93"),
    ingredients: [
      { name: "Cápsula Volluto", qty: "1" },
      { name: "Leche entera fría", qty: "180 ml" },
      { name: "Sirope de vainilla", qty: "15 ml" },
    ],
    steps: [
      { text: "Vierte el sirope de vainilla en el fondo de una taza grande (300 ml)." },
      {
        text: "Espuma los 180 ml de leche hasta 65 °C",
        timerSeconds: 90,
      },
      { text: "Extrae el espresso Volluto directamente sobre el sirope." , timerSeconds: 25 },
      {
        text: "Vierte la leche espumada sobre el espresso",
        substeps: [
          "Empieza desde altura para mezclar con el sirope",
          "Termina con la espuma por encima",
        ],
      },
    ],
  },
  {
    id: "latte-caramelo",
    name: "Latte caramelo",
    type: "leche",
    intensity: "medio",
    capsuleId: "capriccio",
    blurb: "Café con leche y sirope de caramelo. El preferido de media tarde.",
    servings: 1,
    image: img("1485808191679-5f86510681a2"),
    ingredients: [
      { name: "Cápsula Capriccio", qty: "1" },
      { name: "Leche entera fría", qty: "180 ml" },
      { name: "Sirope de caramelo", qty: "20 ml" },
      { name: "Sal marina en escamas", qty: "una pizca" },
    ],
    steps: [
      { text: "Vierte 15 ml de sirope en el fondo de la taza. Guarda 5 ml para decorar." },
      {
        text: "Espuma la leche hasta textura sedosa",
        timerSeconds: 90,
      },
      { text: "Extrae el espresso sobre el sirope." , timerSeconds: 25 },
      { text: "Vierte la leche en la taza, formando un círculo con el chorro." },
      { text: "Termina con un hilo del sirope reservado y unas escamas de sal marina por encima." },
    ],
    tip: "La sal marina potencia el sabor del caramelo sin añadir sodio perceptible. Pruébalo: cambia el postre entero.",
  },
  {
    id: "mocha",
    name: "Mochaccino",
    type: "leche",
    intensity: "intenso",
    capsuleId: "dharkan",
    blurb: "Espresso, chocolate y leche. Para los que no se deciden entre café y postre.",
    servings: 1,
    image: img("1572442388796-11668a67e53d"),
    ingredients: [
      { name: "Cápsula Dharkan", qty: "1" },
      { name: "Leche entera fría", qty: "180 ml" },
      { name: "Sirope de chocolate o 2 cucharaditas de cacao en polvo disueltas en agua caliente", qty: "20 ml" },
      { name: "Nata montada (opcional)", qty: "30 ml" },
    ],
    steps: [
      { text: "Vierte el sirope de chocolate en el fondo de la taza." },
      { text: "Si usas cacao en polvo, disuélvelo primero con 20 ml de agua caliente hasta hacer una pasta." },
      {
        text: "Espuma la leche hasta 65 °C",
        timerSeconds: 90,
      },
      { text: "Extrae el espresso Dharkan sobre el chocolate." , timerSeconds: 30 },
      { text: "Vierte la leche en la taza, empezando desde altura para mezclar el chocolate con el café." },
      {
        text: "Si quieres rematarlo, añade nata montada por encima",
        substeps: ["Usa nata para montar (35% MG)", "Móntala con varillas hasta que forme picos suaves"],
      },
    ],
  },
  {
    id: "cafe-bombon",
    name: "Café bombón",
    type: "leche",
    intensity: "suave",
    capsuleId: "capriccio",
    blurb: "Espresso sobre leche condensada. Dulce, denso, festivo.",
    servings: 1,
    image: img("1559496417-e7f25cb247f3"),
    ingredients: [
      { name: "Cápsula Capriccio", qty: "1" },
      { name: "Leche condensada", qty: "30 ml" },
      { name: "Leche entera (opcional, para aligerar)", qty: "50 ml" },
    ],
    steps: [
      { text: "Vierte la leche condensada en el fondo de un vaso de tubo." },
      { text: "Si la quieres menos dulce, añade la leche entera y remueve hasta integrar." },
      { text: "Extrae el espresso directamente sobre la leche condensada." , timerSeconds: 25 },
      { text: "Deja reposar un minuto. Las dos capas deben quedar visibles: condensada abajo, café arriba." },
    ],
    tip: "Es un café de domingo. Si lo haces entre semana, sube la dosis de café a 2 cápsulas.",
  },
  {
    id: "cafe-au-lait",
    name: "Café au lait",
    type: "leche",
    intensity: "suave",
    capsuleId: "fortissio-lungo",
    capsules: ["fortissio-lungo", "fortissio-lungo"],
    blurb: "Estilo francés. Dos lungos con mucha leche caliente en tazón grande.",
    servings: 1,
    capsules: ["fortissio-lungo", "fortissio-lungo"],
    image: img("1559496417-e7f25cb247f3"),
    ingredients: [
      { name: "Cápsula Fortissio Lungo", qty: "2" },
      { name: "Leche entera caliente", qty: "200 ml" },
    ],
    steps: [
      {
        text: "Calienta 200 ml de leche hasta 65 °C sin espumar",
        substeps: [
          "Usa un tazón grande (300 ml mínimo)",
          "Si el espumador tiene modo calentar (sin aire), es perfecto",
        ],
        timerSeconds: 90,
      },
      {
        text: "Extrae dos lungos seguidos en el tazón",
        timerSeconds: 80,
      },
      { text: "Vierte la leche caliente en el tazón y remueve suavemente." },
    ],
  },

  // ============================================================
  // AMERICANOS Y GRANDES
  // ============================================================
  {
    id: "americano-grande",
    name: "Americano grande",
    type: "lungo",
    intensity: "intenso",
    capsuleId: "envivo-lungo",
    blurb: "Tres lungos para llenar un vaso grande. Estilo brunch.",
    servings: 1,
    capsules: ["envivo-lungo", "envivo-lungo", "envivo-lungo"],
    image: img("1497935586351-b67a49e012bf"),
    ingredients: [
      { name: "Cápsula Envivo Lungo", qty: "3" },
      { name: "Vaso grande (400 ml) precalentado", qty: "1" },
    ],
    steps: [
      { text: "Precalienta el vaso con agua caliente y vacíalo." },
      {
        text: "Extrae tres lungos seguidos en el mismo vaso",
        substeps: [
          "110 ml × 3 = 330 ml en total",
          "Mantén la máquina encendida entre extracciones",
        ],
        timerSeconds: 135,
      },
      {
        text: "Si lo prefieres más suave, añade agua caliente hasta los 400 ml",
        substeps: ["Un lungo + agua al gusto es la receta americana clásica"],
      },
    ],
  },
  {
    id: "iced-latte-grande",
    name: "Iced latte grande",
    type: "iced",
    intensity: "suave",
    capsuleId: "odacio",
    capsules: ["odacio", "odacio"],
    blurb: "Doble espresso sobre hielo con 200 ml de leche fría. Para los días de calor.",
    servings: 1,
    capsules: ["odacio", "odacio"],
    image: img("1461023058943-07fcbe16d735"),
    ingredients: [
      { name: "Cápsula Odacio", qty: "2" },
      { name: "Leche entera fría", qty: "200 ml" },
      { name: "Hielo en cubitos", qty: "8-10" },
      { name: "Sirope de vainilla (opcional)", qty: "10 ml" },
    ],
    steps: [
      { text: "Llena un vaso grande (400 ml) con hielo hasta tres cuartos." },
      { text: "Vierte la leche fría sobre el hielo. Si usas sirope, mézclalo primero con la leche." },
      {
        text: "Extrae los dos espressos directamente sobre la leche con hielo",
        substeps: [
          "Vierte despacio para que se formen capas: hielo abajo, leche, café flotando",
          "Si lo viertes muy rápido, todo queda marrón uniforme",
        ],
        timerSeconds: 50,
      },
      { text: "Remueve con cuchara larga. Sirve con pajita." },
    ],
  },
  {
    id: "cold-brew-style",
    name: "Cold brew rápido",
    type: "iced",
    intensity: "intenso",
    capsuleId: "kazaar",
    capsules: ["kazaar", "kazaar", "kazaar"],
    blurb: "Tres espressos diluidos en agua fría. Sabor suave, poca acidez. Para llevar.",
    servings: 2,
    capsules: ["kazaar", "kazaar", "kazaar"],
    image: img("1497935586351-b67a49e012bf"),
    ingredients: [
      { name: "Cápsula Kazaar", qty: "3" },
      { name: "Agua fría", qty: "500 ml" },
      { name: "Hielo", qty: "al gusto" },
    ],
    steps: [
      { text: "En una jarra de 1 litro, mezcla el agua fría con hielo (1/3 hielo, 2/3 agua)." },
      {
        text: "Extrae los tres espressos directamente sobre el agua fría",
        substeps: [
          "El choque térmico baja la temperatura del espresso a 5-10 °C",
          "Remueve en cuanto caiga cada espresso",
        ],
        timerSeconds: 75,
      },
      { text: "Tapa la jarra y deja en la nevera 30 minutos." },
      { text: "Sirve en vaso con hielo. Rinde dos vasos grandes." },
    ],
    tip: "Este 'cold brew rápido' no es un cold brew auténtico (12-24h de maceración), pero el resultado se le parece: menos ácido, más redondo.",
  },

  // ============================================================
  // HELADOS Y ESPECIALES
  // ============================================================
  {
    id: "cafe-helado",
    name: "Café helado",
    type: "iced",
    intensity: "medio",
    capsuleId: "odacio",
    blurb: "Espresso vertido sobre hielo. Rápido, refrescante, sin diluir.",
    servings: 1,
    image: img("1461023058943-07fcbe16d735"),
    ingredients: [
      { name: "Cápsula Odacio", qty: "1" },
      { name: "Hielo en cubitos", qty: "5-6" },
      { name: "Azúcar líquido (opcional)", qty: "5 ml" },
    ],
    steps: [
      { text: "Llena un vaso alto con hielo hasta tres cuartos." },
      { text: "Si usas azúcar líquido, mézclalo con el hielo antes." },
      { text: "Extrae el espresso Odacio directamente sobre el hielo." , timerSeconds: 25 },
      { text: "Remueve con cuchara larga. Sirve con pajita." },
    ],
    tip: "El choque térmico del espresso sobre hielo forma una crema fina que no se disuelve rápido.",
  },
  {
    id: "espresso-tonic",
    name: "Espresso tónico",
    type: "iced",
    intensity: "suave",
    capsuleId: "volluto",
    blurb: "Espresso sobre tónica con hielo. El bitter del café encuentra la quinina.",
    servings: 1,
    image: img("1525088553748-01d6e210e00b"),
    ingredients: [
      { name: "Cápsula Volluto", qty: "1" },
      { name: "Tónica premium", qty: "150 ml" },
      { name: "Hielo", qty: "4-5 cubitos" },
      { name: "Rodaja de naranja", qty: "1" },
    ],
    steps: [
      { text: "Llena un vaso ancho con hielo y añade la tónica fría." },
      { text: "Coloca la rodaja de naranja en el borde del vaso." },
      { text: "Extrae el espresso Volluto directamente sobre la tónica, despacio." , timerSeconds: 25 },
      { text: "No remuevas: deja que la crema flote arriba." },
    ],
  },
  {
    id: "affogato",
    name: "Affogato al cacao",
    type: "iced",
    intensity: "intenso",
    capsuleId: "ristretto",
    blurb: "Espresso caliente sobre helado de vainilla. Postre en treinta segundos.",
    servings: 1,
    image: img("1509042239860-f550ce710b93"),
    ingredients: [
      { name: "Cápsula Ristretto", qty: "1" },
      { name: "Helado de vainilla", qty: "1 bola generosa" },
      { name: "Cacao en polvo", qty: "una pizca" },
    ],
    steps: [
      { text: "Pon la bola de helado en una copa o taza fría." },
      { text: "Extrae el ristretto (20 ml) justo antes de servir." , timerSeconds: 20 },
      { text: "Vierte el ristretto sobre el helado. Debe crujir al contacto." },
      { text: "Espolvorea cacao por encima y come con cuchara antes de que se derrita." },
    ],
  },
  {
    id: "caffe-shakerato",
    name: "Caffè shakerato",
    type: "iced",
    intensity: "intenso",
    capsuleId: "arpeggio",
    blurb: "Espresso batido con hielo y azúcar. Crema espesa, textura aterciopelada.",
    servings: 1,
    image: img("1485808191679-5f86510681a2"),
    ingredients: [
      { name: "Cápsula Arpeggio", qty: "1" },
      { name: "Hielo en cubitos", qty: "4" },
      { name: "Azúcar", qty: "1 cucharadita" },
    ],
    steps: [
      { text: "Pon el hielo y el azúcar en una coctelera o bote hermético." },
      { text: "Extrae el espresso Arpeggio y viértelo sobre el hielo." , timerSeconds: 25 },
      { text: "Cierra y agita enérgicamente quince segundos." },
      { text: "Sirve sin colar en copa fría. La espuma debe quedar densa." },
    ],
  },
  {
    id: "shakerato-doble",
    name: "Shakerato doble",
    type: "iced",
    intensity: "intenso",
    capsuleId: "arpeggio",
    blurb: "Para los que un shakerato se les queda corto. Dos cápsulas, más hielo, misma energía.",
    servings: 1,
    capsules: ["arpeggio", "arpeggio"],
    image: img("1485808191679-5f86510681a2"),
    ingredients: [
      { name: "Cápsula Arpeggio", qty: "2" },
      { name: "Hielo en cubitos", qty: "6" },
      { name: "Azúcar moreno", qty: "1.5 cucharaditas" },
    ],
    steps: [
      { text: "Pon el hielo y el azúcar en una coctelera grande o tarro de 500 ml." },
      {
        text: "Extrae los dos espressos seguidos y viértelos sobre el hielo",
        timerSeconds: 50,
      },
      { text: "Cierra y agita veinte segundos. La coctelera debe enfriarse por fuera." },
      { text: "Sirve sin colar en copa grande o vaso bajo." },
    ],
  },
  {
    id: "marocchino",
    name: "Marocchino",
    type: "leche",
    intensity: "intenso",
    capsuleId: "ristretto",
    blurb: "Espresso, cacao y leche en vaso pequeño. Estilo piamontés.",
    servings: 1,
    image: img("1572442388796-11668a67e53d"),
    ingredients: [
      { name: "Cápsula Ristretto", qty: "1" },
      { name: "Leche entera fría", qty: "60 ml" },
      { name: "Cacao en polvo", qty: "1 cucharadita" },
    ],
    steps: [
      { text: "Espolvorea cacao en polvo en el fondo de un vaso de cristal pequeño." },
      {
        text: "Espuma 60 ml de leche hasta 65 °C",
        timerSeconds: 60,
      },
      { text: "Vierte la mitad de la leche sobre el cacao. Remueve para que se disuelva." },
      { text: "Extrae el ristretto directamente sobre la mezcla." , timerSeconds: 20 },
      { text: "Termina con la espuma de leche restante y otra pizca de cacao por encima." },
    ],
  },
  {
    id: "espresso-panna",
    name: "Espresso con panna",
    type: "espresso",
    intensity: "intenso",
    capsuleId: "arpeggio",
    blurb: "Espresso coronado con nata montada. El antepasado del cappuccino.",
    servings: 1,
    image: img("1509042239860-f550ce710b93"),
    ingredients: [
      { name: "Cápsula Arpeggio", qty: "1" },
      { name: "Nata para montar (35% MG)", qty: "50 ml" },
      { name: "Azúcar glas (opcional)", qty: "1 cucharadita" },
    ],
    steps: [
      {
        text: "Monta la nata",
        substeps: [
          "Pon la nata muy fría en un bol de metal (también frío)",
          "Bate con varillas hasta que forme picos suaves",
          "Si quieres, añade azúcar glas al final y termina de montar",
        ],
        timerSeconds: 180,
      },
      { text: "Precalienta la tacita y extrae el espresso Arpeggio." , timerSeconds: 25 },
      { text: "Cubre el espresso con una capa generosa de nata montada, justo antes de servir." },
    ],
    warn: "Pon la nata en el último momento. Si esperas más de 30 segundos, se derrite sobre el café caliente.",
  },
  {
    id: "cafe-completo",
    name: "Café completo",
    type: "espresso",
    intensity: "intenso",
    capsuleId: "kazaar",
    blurb: "El desayuno de café: espresso, lungo y vaso de leche. Tres extracciones en cinco minutos.",
    servings: 1,
    capsules: ["kazaar", "envivo-lungo"],
    image: img("1509042239860-f550ce710b93"),
    ingredients: [
      { name: "Cápsula Kazaar", qty: "1" },
      { name: "Cápsula Envivo Lungo", qty: "1" },
      { name: "Leche entera caliente", qty: "200 ml" },
    ],
    steps: [
      { text: "Precalienta dos tazas: una de espresso, una de leche." },
      { text: "Inserta la cápsula Kazaar y extrae un espresso (40 ml) en la tacita." , timerSeconds: 25 },
      { text: "Inserta la cápsula Envivo Lungo y extrae un lungo (110 ml) en otra taza." , timerSeconds: 45 },
      {
        text: "Calienta 200 ml de leche hasta 65 °C sin espumar",
        timerSeconds: 90,
      },
      { text: "Sírvelos los tres juntos: tacita de espresso, taza de lungo, vaso de leche. Bebe en este orden." },
    ],
    tip: "Orden recomendado: espresso primero (más concentrado), luego el lungo, luego la leche para limpiar.",
  },

  // ============================================================
  // DESCAFEINADOS (noche)
  // ============================================================
  {
    id: "deca-latte",
    name: "Latte descafeinado",
    type: "leche",
    intensity: "suave",
    capsuleId: "decaffeinato-lungo",
    blurb: "Café con leche sin cafeína. Para la cena o para después de las seis de la tarde.",
    servings: 1,
    image: img("1559496417-e7f25cb247f3"),
    ingredients: [
      { name: "Cápsula Decaffeinato Lungo", qty: "1" },
      { name: "Leche entera fría", qty: "180 ml" },
    ],
    steps: [
      {
        text: "Espuma los 180 ml de leche hasta 65 °C",
        timerSeconds: 90,
      },
      { text: "Extrae el lungo descafeinado en una taza grande." , timerSeconds: 40 },
      { text: "Vierte la leche en la taza, mezclando con cuidado." },
    ],
  },
  {
    id: "deca-grande",
    name: "Descafeinado con mucha leche",
    type: "leche",
    intensity: "suave",
    capsuleId: "decaffeinato-lungo",
    capsules: ["decaffeinato-lungo", "decaffeinato-lungo"],
    blurb: "Dos lungos descafeinados con 250 ml de leche. Bebida nocturna por excelencia.",
    servings: 1,
    capsules: ["decaffeinato-lungo", "decaffeinato-lungo"],
    image: img("1495474472287-4d71bcdd2085"),
    ingredients: [
      { name: "Cápsula Decaffeinato Lungo", qty: "2" },
      { name: "Leche entera caliente", qty: "250 ml" },
    ],
    steps: [
      {
        text: "Calienta 250 ml de leche hasta 65 °C sin espumar",
        timerSeconds: 120,
      },
      {
        text: "Extrae los dos lungos descafeinados en una taza o vaso grande",
        timerSeconds: 80,
      },
      { text: "Vierte la leche caliente en el vaso. Remueve suavemente." },
    ],
    tip: "La cafeína del descafeinado es residual: menos del 0.1%. No debería quitarte el sueño.",
  },
];

export const recipeById = (id) => recipes.find((r) => r.id === id);

export const recipesForCapsule = (capsuleId) =>
  recipes.filter((r) => {
    if (r.capsuleId === capsuleId) return true;
    if (Array.isArray(r.capsules) && r.capsules.includes(capsuleId)) return true;
    return false;
  });

export const recipeTypes = [
  { id: "all", label: "Todas" },
  { id: "espresso", label: "Espresso" },
  { id: "lungo", label: "Lungo" },
  { id: "leche", label: "Con leche" },
  { id: "iced", label: "Helado" },
];

export const intensityFilters = [
  { id: "all", label: "Todo" },
  { id: "suave", label: "Suave" },
  { id: "medio", label: "Medio" },
  { id: "intenso", label: "Intenso" },
];

// Cantidad de cápsulas que usa cada receta (1, 2, 3, 4...)
export const capsuleCount = (r) => {
  if (Array.isArray(r.capsules) && r.capsules.length) return r.capsules.length;
  return 1;
};
