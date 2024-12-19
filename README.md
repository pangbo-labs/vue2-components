# vue2-components

## Introduction

Vue is just an infrastructure for developing browser-based UI, but when using it to develop applications, you still need many works to create components to statisfy your business requirements, and many or these components are commonly used in almost all projects.

There are many existing third-party component libraries, and the most used one is the Element UI. But, after using it for years, I found it's difficult to use in some cases. I had to write some code to enhance it, or even had to write some my own components to use instead.

Finally, I decide to make my own component library to hold these new components, or write my own version of all common used ones, after all, most of them are quite simple.

## How To Use

Because this components library is under developing, most of the code or components are in the early stage, and are far from mature and stable. So, the best way to use this is integrating this into your project by put all the source codes into your project, therefore, once you encountered issues, you can update the source code directly to fix or enhance it.

In order to make it easy to leverage the latest changes, when you put the source code into your project, please keep all the source code in a dedicated folder, for instance `pblabs-components`. And then create a text file to record the commit number. This make it easy to locate your copy in the code repository's change histories, and find suitable changes and bug fixes.

## Install

Run following command in the root directory of your project:

```
npm install @pangbolabs/pblabs-ui-vue2 -S
```

Then add following lines into you `<project-root>/src/main.js` before the code for creating the Vue instance:

```javascript
import PbLabsUI from '@pangbolabs/pblabs-ui-vue2'
import '@pangbolabs/pblabs-ui-vue2/dist/index.css'
import '@pangbolabs/pblabs-ui-vue2/themes/default.css'
Vue.use( PbLabsUI )
```









