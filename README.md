## Storyblok integration (Vite + React)

### 1) Environment variables

1. Create `.env.local` in project root:

```env
VITE_STORYBLOK_ACCESS_TOKEN=your_preview_token_from_storyblok_space
VITE_STORYBLOK_REGION=eu
```

2. Preview token is taken from Storyblok Space settings (`Settings -> Access Tokens -> Preview`).

### 2) Run locally with HTTPS

```bash
npm install
npm run dev
```

HTTPS is already enabled in `vite.config.js` via `vite-plugin-mkcert` and `server.https: true`.

### 3) Storyblok content model (minimum)

- Root content type: `page`
- `page` should contain a `bloks` field `body`
- Nested block in this project: `component1`
- Suggested fields for `component1`:
  - `title` (text)
  - `button_text` (text)
  - `show_woman_image` (boolean)

### 4) GraphQL fragments requirement

If you fetch with GraphQL, include `__typename` and `id` for all Storyblok components:

```graphql
fragment Component1Fields on Component1 {
  __typename
  id
  title
  button_text
  show_woman_image
}

fragment PageFields on Page {
  __typename
  id
  body {
    __typename
    ... on Component1 {
      ...Component1Fields
    }
  }
}
```

### 5) Build and deploy to Beget

1. Build:

```bash
npm run build
```

2. Upload everything from `dist/` to site public directory on Beget (usually `public_html`).
3. Keep `.htaccess` in deploy artifact (it is copied from `public/.htaccess` during build).
4. Ensure HTTPS is enabled for the domain in Beget panel.

### 6) Manager workflow in Storyblok Visual Editor

1. Open Storyblok and log in.
2. Open required story (`Content -> [story]`).
3. Open `Visual Editor`.
4. Click a block in preview.
5. Edit fields in sidebar (`title`, `button_text`, etc.).
6. Click `Save`.
7. Click `Publish` to make changes public.

### 7) Visual Editor checklist

- [ ] Site opens over HTTPS in local dev and production.
- [ ] Storyblok Visual Editor loads the preview URL without iframe errors.
- [ ] Clicking block in preview highlights correct component.
- [ ] Field edits are reflected in preview.
- [ ] `Save` keeps draft in Storyblok.
- [ ] `Publish` updates content on live site.
