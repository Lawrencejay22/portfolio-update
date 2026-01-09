# Portfolio Website

This is a simple, responsive static portfolio site. Files are in this folder:

- `index.html` — the main page
- `css/styles.css` — styles
- `js/script.js` — tiny interactive bits

How to view locally

1. Open `index.html` in your browser (double-click). For some browsers, `file://` preview is fine.

2. Or serve locally (recommended) with Python (if installed):

```powershell
# from inside this folder
python -m http.server 8000; Start-Process "http://localhost:8000"
```

Customizing

- Replace the placeholder text (Your Name, email, project descriptions).
- Add screenshots in a new `assets/` folder and update the project cards.
- Replace fonts and colors in `css/styles.css`.

Deployment

You can deploy this to GitHub Pages, Netlify, Vercel, or any static web hosting.

License: use as you like.
