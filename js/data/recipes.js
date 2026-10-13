// Recetas diseñadas para la Nespresso Essenza Mini.
// Para los cafés con leche se asume un espumador externo (la máquina
// no tiene varilla de vapor). Cada paso lleva un temporizador cuando aplica.

export const recipes = [
  // ---------- Espresso ----------
  {
    id: "espresso-clasico",
    name: "Espresso clásico",
    type: "espresso",
    intensity: "intenso",
    capsuleId: "kazaar",
    blurb: "La forma más honesta de empezar el día. 25 ml, sin azúcar.",
    ingredients: [
      { name: "Cápsula Kazaar", qty: "1" },
      { name: "Taza de espresso precalentada", qty: "1" },
    ],
    steps: [
      { text: "Enciende la Essenza y espera a que el botón quede fijo (unos 25 s)." },
      { text: "Coloca la cápsula Kazaar en la máquina." },
      { text: "Pon la tacita debajo de la salida. Pulsa Espresso.", timerSeconds: 25 },
      { text: "Retira la cápsula usada y disfrútalo antes de que se enfríe la crema." },
    ],
    tip: "Precalienta la taza con agua caliente antes de colocar la cápsula. La crema dura más.",
  },
  {
    id: "espresso-suave",
    name: "Espresso dulce",
    type: "espresso",
    intensity: "suave",
    capsuleId: "volluto",
    blurb: "Para los que prefieren un espresso sin amargor y con notas de galleta.",
    ingredients: [
      { name: "Cápsula Volluto", qty: "1" },
      { name: "Azúcar moreno (opcional)", qty: "al gusto" },
    ],
    steps: [
      { text: "Llena el depósito con agua fresca y enciende la Essenza." },
      { text: "Inserta la cápsula Volluto y coloca la tacita." },
      { text: "Pulsa Espresso y deja caer 40 ml.", timerSeconds: 25 },
      { text: "Si lo quieres más dulce, añade media cuchara de azúcar moreno y remueve sin batir." },
    ],
  },
  {
    id: "ristretto-perfecto",
    name: "Ristretto perfecto",
    type: "espresso",
    intensity: "intenso",
    capsuleId: "ristretto",
    blurb: "Extracción corta: solo 25 ml para concentrar todos los aromas.",
    ingredients: [
      { name: "Cápsula Ristretto", qty: "1" },
      { name: "Tacita de porcelana", qty: "1" },
    ],
    steps: [
      { text: "Precalienta la taza con agua caliente y vacíala." },
      { text: "Coloca la cápsula Ristretto en la máquina." },
      { text: "Pulsa Espresso y para la extracción a los 20 segundos con el botón.", timerSeconds: 20 },
      { text: "Sirve inmediatamente. El ristretto se enfría muy rápido." },
    ],
    tip: "Detén la extracción manualmente pulsando el botón otra vez. La Essenza no tiene modo ristretto nativo.",
  },

  // ---------- Lungo ----------
  {
    id: "lungo-intenso",
    name: "Lungo con cuerpo",
    type: "lungo",
    intensity: "intenso",
    capsuleId: "envivo-lungo",
    blurb: "Taza grande de 110 ml, con notas de cacao y fruta madura.",
    ingredients: [
      { name: "Cápsula Envivo Lungo", qty: "1" },
      { name: "Taza grande precalentada", qty: "1" },
    ],
    steps: [
      { text: "Llena el tanque con agua fría hasta la marca." },
      { text: "Inserta la cápsula Envivo Lungo y sitúa la taza grande debajo." },
      { text: "Pulsa Lungo. La extracción se detiene sola a los 110 ml.", timerSeconds: 45 },
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
    ingredients: [
      { name: "Cápsula Master Origin Ethiopia", qty: "1" },
      { name: "Taza de cerámica", qty: "1" },
    ],
    steps: [
      { text: "Precalienta la taza y descarta el agua." },
      { text: "Inserta la cápsula Ethiopia y coloca la taza." },
      { text: "Pulsa Lungo. La extracción toma unos 40 segundos.", timerSeconds: 40 },
      { text: "Si te gusta más suave, diluye con un chorrito de agua caliente." },
    ],
  },

  // ---------- Con leche ----------
  {
    id: "cortado",
    name: "Cortado",
    type: "leche",
    intensity: "medio",
    capsuleId: "corto",
    blurb: "Espresso con un toque de leche caliente. Ratio 1:1.",
    ingredients: [
      { name: "Cápsula Corto", qty: "1" },
      { name: "Leche entera fría", qty: "60 ml" },
    ],
    steps: [
      { text: "Calienta y espuma la leche con tu espumador hasta 60 °C.", timerSeconds: 60 },
      { text: "Mientras tanto, extrae un espresso (40 ml) en una tacita.", timerSeconds: 25 },
      { text: "Vierte la leche espumada sobre el café en ratio 1:1." },
      { text: "Termina con un golpe de espumado por encima con la cuchara." },
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
    ingredients: [
      { name: "Cápsula Arpeggio", qty: "1" },
      { name: "Leche entera fría", qty: "100 ml" },
      { name: "Cacao en polvo", qty: "una pizca" },
    ],
    steps: [
      { text: "Espuma la leche hasta obtener microespuma brillante.", timerSeconds: 75 },
      { text: "Extrae el espresso Arpeggio en una taza de capuchino.", timerSeconds: 25 },
      { text: "Vierte la leche desde altura para integrar, luego baja la jarra para la espuma." },
      { text: "Espolvorea cacao por encima con un colador fino." },
    ],
  },
  {
    id: "latte-macchiato",
    name: "Latte macchiato",
    type: "leche",
    intensity: "suave",
    capsuleId: "livanto",
    blurb: "Tres capas visibles: leche, espresso y espuma. Para los que cuidan la presentación.",
    ingredients: [
      { name: "Cápsula Livanto", qty: "1" },
      { name: "Leche entera fría", qty: "150 ml" },
    ],
    steps: [
      { text: "Espuma la leche y viértela en un vaso alto hasta 2/3.", timerSeconds: 80 },
      { text: "Extrae el espresso Livanto directamente sobre la leche, despacio.", timerSeconds: 30 },
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
    ingredients: [
      { name: "Cápsula Volluto", qty: "1" },
      { name: "Leche entera caliente", qty: "120 ml" },
    ],
    steps: [
      { text: "Calienta la leche sin espumar (máximo 65 °C).", timerSeconds: 60 },
      { text: "Extrae el espresso en una taza grande.", timerSeconds: 25 },
      { text: "Añade la leche caliente y remueve suavemente." },
    ],
  },
  {
    id: "flat-white",
    name: "Flat white",
    type: "leche",
    intensity: "intenso",
    capsuleId: "master-origin-colombia",
    blurb: "Doble ristretto con microespuma sedosa. Origen australiano.",
    ingredients: [
      { name: "Cápsula Master Origin Colombia", qty: "2" },
      { name: "Leche entera fría", qty: "120 ml" },
    ],
    steps: [
      { text: "Espuma la leche hasta textura sedosa (sin burbujas grandes).", timerSeconds: 70 },
      { text: "Extrae un ristretto con la primera cápsula (detén a 20 s).", timerSeconds: 20 },
      { text: "Extrae el segundo ristretto encima del primero.", timerSeconds: 20 },
      { text: "Vierte la leche desde el centro para conseguir el 'punto' blanco en superficie." },
    ],
  },
  {
    id: "macchiato-caramelo",
    name: "Macchiato caramelo",
    type: "leche",
    intensity: "medio",
    capsuleId: "capriccio",
    blurb: "Espresso 'manchado' con leche y un hilo de sirope de caramelo.",
    ingredients: [
      { name: "Cápsula Capriccio", qty: "1" },
      { name: "Leche entera", qty: "30 ml" },
      { name: "Sirope de caramelo", qty: "10 ml" },
    ],
    steps: [
      { text: "Vierte el sirope de caramelo en el fondo de la tacita." },
      { text: "Espuma ligeramente la leche, sin que coja aire.", timerSeconds: 40 },
      { text: "Extrae el espresso Capriccio sobre el caramelo.", timerSeconds: 25 },
      { text: "Termina con una cuchara de leche espumada encima. Dibuja un círculo con la cuchara." },
    ],
  },

  // ---------- Iced & especiales ----------
  {
    id: "cafe-helado",
    name: "Café helado",
    type: "iced",
    intensity: "medio",
    capsuleId: "odacio",
    blurb: "Espresso vertido sobre hielo. Rápido, refrescante, sin diluir.",
    ingredients: [
      { name: "Cápsula Odacio", qty: "1" },
      { name: "Hielo en cubitos", qty: "5-6" },
      { name: "Azúcar líquido (opcional)", qty: "5 ml" },
    ],
    steps: [
      { text: "Llena un vaso alto con hielo hasta tres cuartos." },
      { text: "Si usas azúcar líquido, mézclalo con el hielo antes." },
      { text: "Extrae el espresso Odacio directamente sobre el hielo.", timerSeconds: 25 },
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
    ingredients: [
      { name: "Cápsula Volluto", qty: "1" },
      { name: "Tónica premium", qty: "150 ml" },
      { name: "Hielo", qty: "4-5 cubitos" },
      { name: "Rodaja de naranja", qty: "1" },
    ],
    steps: [
      { text: "Llena un vaso ancho con hielo y añade la tónica fría." },
      { text: "Coloca la rodaja de naranja en el borde del vaso." },
      { text: "Extrae el espresso Volluto directamente sobre la tónica, despacio.", timerSeconds: 25 },
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
    ingredients: [
      { name: "Cápsula Ristretto", qty: "1" },
      { name: "Helado de vainilla", qty: "1 bola generosa" },
      { name: "Cacao en polvo", qty: "una pizca" },
    ],
    steps: [
      { text: "Pon la bola de helado en una copa o taza fría." },
      { text: "Extrae el ristretto (20 ml) justo antes de servir.", timerSeconds: 20 },
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
    ingredients: [
      { name: "Cápsula Arpeggio", qty: "1" },
      { name: "Hielo en cubitos", qty: "4" },
      { name: "Azúcar", qty: "1 cucharadita" },
    ],
    steps: [
      { text: "Pon el hielo y el azúcar en una coctelera o bote hermético." },
      { text: "Extrae el espresso Arpeggio y viértelo sobre el hielo.", timerSeconds: 25 },
      { text: "Cierra y agita enérgicamente quince segundos." },
      { text: "Sirve sin colar en copa fría. La espuma debe quedar densa." },
    ],
  },
];

export const recipeById = (id) => recipes.find((r) => r.id === id);

export const recipesForCapsule = (capsuleId) =>
  recipes.filter((r) => r.capsuleId === capsuleId);

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
