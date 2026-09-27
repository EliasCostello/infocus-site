# iaminfocus.me

The InFocus website: a static site (plain HTML/CSS/JS, no build step) hosted on
GitHub Pages at https://iaminfocus.me.

| Page | Path | Purpose |
|---|---|---|
| Home | `/` | What InFocus is, store buttons |
| Privacy Policy | `/privacy/` | The URL both app stores ask for |
| Support | `/support/` | The support URL Apple asks for; contact + FAQ |
| Download | `/download/` | Smart link: iPhone → App Store, Android → Google Play, computer → both buttons |

## When an app goes live in a store

Edit **`assets/links.js`**, the only place the store links live:

```js
window.INFOCUS_LINKS = {
  appStore:   'https://apps.apple.com/app/id1234567890',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.your.package'
};
```

Commit and push. Every button on the site and the `/download` redirect pick it
up. A store left as `''` shows "Coming soon".

Optional polish once live: swap the text buttons for the official badges
(Apple: developer.apple.com/app-store/marketing/guidelines, Google:
play.google.com/intl/en_us/badges). Both have usage rules.

## Preview locally

```sh
python -m http.server 8765    # then open http://localhost:8765
```

Paths are root-absolute (`/assets/...`), so open it through a server, not as a file.

## Deploying

Push to `main`; GitHub Pages publishes within a minute or two. `CNAME` holds the
custom domain; `.nojekyll` tells Pages to serve the files as-is.

Contact address used on the site: `support@iaminfocus.me` (Namecheap email
forwarding).
