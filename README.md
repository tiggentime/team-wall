# Team Wall

A tiny Next.js app for practicing our Git and GitHub workflow. Every card on the
wall is a JSON file added through a pull request.

## Get it running

You need Node.js 20.9 or newer (`node -v` to check) and Git.

```bash
git clone <REPO-URL>
cd team-wall
npm install
npm run dev
```

Open http://localhost:3000. Leave `npm run dev` running in its own terminal: the
page picks up your changes when you refresh.

## How the code is laid out

| Path | What it is |
| --- | --- |
| `data/members/*.json` | One file per person. This is where your card lives. |
| `data/shoutouts.txt` | One shoutout per line, shown at the bottom of the page. |
| `lib/members.js` | Reads the data files. |
| `components/MemberCard.js` | How a single card looks. |
| `app/page.js` | The page itself. |
| `app/globals.css` | All the styles. |
| `scripts/check.mjs` | Validates member files. Runs on every PR. |

## Workflow for today (the rules)

1. Never commit to `main` directly. `main` is protected and will refuse your push.
2. One branch per task, named `yourname/short-description`
   (e.g. `sam/add-card`, `sam/fix-blank-shoutout`).
3. Run the app and see your change working before you push.
4. Run `npm run check` before you push.
5. Open a pull request, fill in the template, and ask one TL to review.
6. Merge only after an approval and a green check.
7. After a merge, everyone updates: `git switch main && git pull`.

## Round 1: add your card

```bash
git switch main
git pull
git switch -c yourname/add-card
```

Copy `data/members/team-lead.json` to `data/members/<your-github-username>.json`
(all lowercase) and fill in your own details. `color` must be a hex colour like
`#3a7bd5`.

Refresh http://localhost:3000. You should see your card. Then:

```bash
npm run check
git status
git add data/members/<your-github-username>.json
git commit -m "Add <your name>'s card"
git push -u origin yourname/add-card
```

GitHub prints a link after the push. Open it to create your pull request.

## Handy commands

| I want to… | Command |
| --- | --- |
| See what changed | `git status`, `git diff` |
| See history | `git log --oneline --graph --all` |
| Get the latest `main` into my branch | `git switch main && git pull && git switch - && git merge main` |
| Undo changes to a file I haven't committed | `git restore <file>` |
| Unstage a file | `git restore --staged <file>` |
| Fix my last commit message (before pushing) | `git commit --amend` |
| Start over on a branch from fresh main | `git switch main && git pull && git switch -c yourname/new-try` |

## Round 2: the merge conflict!!

1. Create a branch from fresh `main`: `git switch -c yourname/shoutout`
2. Add one line to the **end** of `data/shoutouts.txt` (a shoutout to a teammate, your favorite sentence, a funny joke... your options are limitless).
3. Commit, push, open a PR.

## Resolving a merge conflict

When Git can't combine two changes to the same lines, it stops and marks the file:

```
<<<<<<< HEAD
Your line
=======
Their line
>>>>>>> main
```

1. Open the file and decide what the final version should be (often: keep both lines).
2. Delete the `<<<<<<<`, `=======`, and `>>>>>>>` marker lines.
3. Refresh the app to make sure it still works.
4. `git add <file>` then `git commit` (no message needed; Git suggests one), then `git push`.
