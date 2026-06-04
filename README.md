# Tap Factory Tycoon Prototype

Mobile-first HTML5 clicker prototype prepared for CrazyGames and GitHub Pages.

## Run Locally

Open `index.html` in a browser, or serve the folder:

```powershell
python -m http.server 5173
```

Then open `http://localhost:5173`.

## Prototype Scope

- English UI by default.
- Ukrainian is available from the `UA` toggle.
- Tap production, automatic conveyor/shipping, upgrades, managers, contracts, branches, local save.
- Weekly score is separated from money so the leaderboard can use a controlled rating value.
- CrazyGames SDK wrapper is included and safely falls back when SDK is unavailable.

## CrazyGames Leaderboard

Recommended leaderboard guide:

```text
Grow your factory this week
```

Recommended configuration:

```json
{
  "scoreLabel": "POINTS",
  "scoreSorting": "DESC",
  "minValue": 0,
  "maxValue": 500000,
  "cooldownSeconds": 30,
  "isIncremental": false
}
```

Before live publishing, set the 32-byte base64 CrazyGames encryption key in `src/app.js`:

```js
crazyGamesEncryptionKey: "YOUR_32_BYTE_BASE64_KEY"
```

The game uses `CrazyGames.SDK.user.submitScore({ encryptedScore, score })` when the SDK is active.

## GitHub Pages

This project is static, so GitHub Pages can serve it from the repository root.

```powershell
git init
git add .
git commit -m "Add Tap Factory Tycoon prototype"
gh repo create tap-factory-tycoon --public --source=. --remote=origin --push
```

After the repository is created, enable Pages in GitHub:

`Settings -> Pages -> Deploy from a branch -> main -> /root`

## CrazyGames Upload

Zip these files and folders:

- `index.html`
- `src/`
- `.nojekyll` is optional for GitHub only and does not need to be included.

Do not include external build artifacts or absolute paths.
