# ComPania boilerplate

## Based on [ZURB WebApp Template](https://foundation.zurb.com/sites/docs/starter-projects.html#zurb-template)

This boilerplate has a Gulp-powered build system with these features:

- Handlebars HTML templates with Panini
- Sass compilation and prefixing
- JavaScript module bundling with webpack
- Built-in BrowserSync server
- Current version of Bootstrap loaded on default
- For production builds:
  - CSS compression
  - JavaScript module bundling with webpack
  - Image compression

## Installation

To use this template, your computer needs:

- [NodeJS](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [Yarn](https://yarnpkg.com/en/docs/install)

### Setup

To manually set up the template, first download it with Git:

```bash
git clone git@bitbucket.org:staszek998/compania-boilerplate.git projectname
```

Then open the folder in your command line, and install the needed dependencies:

```bash
cd projectname
yarn
```

Finally, run `yarn start` to run Gulp. Your finished site will be created in a folder called `dist`, viewable at this URL:

```
http://localhost:8000
```

To create compressed, production-ready assets, run `yarn run build`.

---

You can also download this repository as a ZIP archive.

## Ejecting the origin

You will likely want to have your own origin for your project's repo. To remove the current origin from this repository run the following command:

```bash
git remote rm origin
```

Now you can connect the local repo to your cloud-based origin:

```bash
git remote add origin https://path-to-your-repo.git
```
