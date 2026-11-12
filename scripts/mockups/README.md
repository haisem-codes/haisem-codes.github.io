# Product mockups

Original product-UI scenes for the Work showcase. No client names, logos, people or
metrics beyond the CV-allowed ones (`job-search/shared/profile-facts.md`); all names
and data in the scenes are fictional.

- `scenes/<name>.html` — one 1600×1000 scene per project. Shared frame, tokens and
  icons live in `scenes/_base.css` and `scenes/_base.js` (laptop browser window for web
  apps, three phones for mobile apps). `?theme=night` switches to the night palette.
- `render.mjs` — opens each scene in system Chrome (puppeteer-core), screenshots at
  @2x, and writes `public/work/<slug>[-night]-{800,1600}.{avif,webp}` plus blur
  placeholders to `src/data/workImages.json`.

```bash
node scripts/mockups/render.mjs            # all scenes
node scripts/mockups/render.mjs voice coach  # some scenes
CHROME_PATH=/path/to/chrome node scripts/mockups/render.mjs
```

Needs network for Google Fonts; the script fails if the fonts did not load.
Keep `public/work` at or under 4 MB (the script prints the total).
To preview a scene, open the HTML file in a browser at 1600×1000.
