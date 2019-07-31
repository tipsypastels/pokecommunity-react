# PokéCommunity Themes

Welcome traveller! So you've decided to create a theme for PokéCommunity? Let's go over how.

## Installing PC3

Firstly, make sure you have a working local copy of PokéCommunity3 on your computer. You will need to install `git`, a tool for storing and managing code projects, and `node`, a JavaScript engine.

Installation will vary by operating system, but you should be easily able to find instructions on google.

Once you're ready, open a terminal. Type `git` and `node` to make sure everything is installed properly - make sure you don't get any "command not found" errors, etc.

You have a couple more things you need to do in your terminal. Before you start, make sure that your terminal is open to a folder where you want to store the PC codebase - for example, My Documents.

Now enter the following commands, one at a time.

```bash
git clone https://github.com/thepokecommunity/pokecommunity-react
cd pokecommunity-react
npm install --global yarn
yarn install
yarn start
```

Once everything is complete, navigate to `http://localhost:3000/threads/165` in your browser.

## Creating a branch

Branching is a feature (sorely lacking in vBulletin) that allows multiple developers to work at the same time without the possibility of accidental overwrites. The main branch is called "master", and for most projects we create other branches, which then get "merged" into master when complete.

You should use a branch for your theme(s). You can name it whatever you like. Create your branch like so:

```bash
git checkout -b BRANCH_NAME_HERE
```

## Creating a theme

I've created a command that makes it easy to generate themes. Simply use:

```bash
yarn create:theme
```

then fill out the answers as prompted. This will automatically generate all the necessary files for your theme.

## The editing process

Note: I *highly* recommend using [Visual Studio Code](https://code.visualstudio.com/) for editing PC3 code.

To edit your theme, go into the src/styles/themes folder and open the scss file with the name of your theme. From there you can edit the variables as needed. Your theme file will also include some further instructions on how to edit it.

## Missing stuff

PC3 is extremely new, and theme customization is a little limited at the moment - for one thing, the only visually complete page is showthread. Also, there are many hardcoded values in other Sass files. You are welcome to help by seeking them out and replacing them with variables (make sure to define corresponding variables in your theme).

## Submitting your work

Easy. Repeat after me:

```bash
git add .
git commit -m "write a message here about what you're submitting"
git push --set-upstream origin BRANCH_NAME_HERE
```
(Note that the quotes in `git commit` are not part of the placeholder, you do need to include them around your message).

The React discord channel should light up with a message if you have successfully submitted your work. Once I or someone else have had the chance to review it, your branch will be merged into the master branch.