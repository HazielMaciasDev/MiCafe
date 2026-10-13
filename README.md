# MiCafé

Recetas para tu Nespresso Essenza Mini. Aplicación web estática, mobile-first, sin dependencias.

## Demo
Una vez publicado: `https://<usuario>.github.io/MiCafe/`

## Características
- Catálogo de ~20 cápsulas Original Line con notas de cata, intensidad y origen
- ~15 recetas curadas: espresso, lungo, con leche y para servir frío
- Búsqueda con filtros por tipo e intensidad
- Favoritos persistidos en `localStorage`
- Guía paso a paso con temporizador para cada paso
- PWA-ready: viewport, safe-area, dark, sin imágenes externas
- Funciona sin build step — sólo HTML + CSS + JS

## Estructura
```
MiCafe/
├─ index.html
├─ styles.css
├─ js/
│  ├─ app.js              # router + state
│  ├─ config.js
│  ├─ state.js            # favoritos (localStorage)
│  ├─ data/
│  │  ├─ capsules.js      # ~20 cápsulas
│  │  └─ recipes.js       # ~15 recetas
│  ├─ components/         # header, tabbar, timer, icons, toast
│  └─ views/              # home, capsule, recipe, search, favorites
└─ README.md
```

## Desarrollo local
Necesitas un servidor estático (los ES modules no funcionan sobre `file://`).

```bash
# Python 3
python -m http.server 8080

# Node (npx)
npx serve .

# Abre http://localhost:8080
```

## Publicar en GitHub Pages
1. Sube el repo a GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: MiCafé v1"
   git branch -M main
   git remote add origin https://github.com/<usuario>/MiCafe.git
   git push -u origin main
   ```
2. En GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main** · Folder: **/(root)**
3. La URL aparecerá en la misma página: `https://<usuario>.github.io/MiCafe/`

## Diseño
El sistema visual está basado en `DESIGN.MD` (referencia Wandelmaier):
- canvas negro absoluto (`#000000`)
- headlines en Fraunces weight 100 (sustituto libre de Canela Web)
- UI labels en Inter weight 100 con `letter-spacing: 0.2em` (sustituto de PolySans)
- tres colores accent: meadow `#34a847`, coral `#fbcbcb`, apricot `#f27851`
- sólo shapes stadium (48 / 72 / 10000 px)
- sin sombras, sin gradientes, sin imágenes

## Licencia
MIT
