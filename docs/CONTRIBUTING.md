## Contributing

Thanks for your interest in contributing to this project.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to me!

## Tech Stack

- Next.js
- Typescript
- TailwindCSS
- shadcn/ui
- Spotify API
- Last.fm API

## Structure

This repository is structured as follows:

```
app
  └── /...
  └── layout.tsx
  └── page.tsx

components
  └── ui
      └── ...
  └── ...

docs
  └── CONTRIBUTING.md (you are here)

lib
  └── ...

styles
  └── globals.css
  └── fonts.ts
  └── ...

public
  └── favicon.ico
  └── ...
```

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/your-username/taste-card.git
```

### Navigate to project directory

```bash
cd taste-card
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
npm install
```

### Create a new .env.local file and populate it as such

```bash
# you can get one @ https://www.last.fm/api/account/create
LAST_FM_API_KEY="CHANGE THIS"
# see: https://developer.spotify.com/documentation/web-api/concepts/apps
SPOTIFY_CLIENT_ID="CHANGE THIS"
SPOTIFY_CLIENT_SECRET="CHANGE THIS"
# make sure to add this callback route when creating your spotify app
# change this if you are using a different callback route
SPOTIFY_REDIRECT_URI="http://localhost:3000/callback"
```

## Commit Conventions

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(components): add new prop to the avatar component`

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Requests for new features

If you have a request for a new feature, please open a discussion on GitHub or contact me. I'll be happy to help you out.
