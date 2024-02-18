---
tags: 
  - post
  - rails
  - javascript
  - little-post
layout: layouts/post.njk
title: Jsbundling-rails and friends. 
description: Taking my understanding from Lil' John, "WHAT?!!" to Lil' John "OKAY!!".
---

![Lil John looking at a laptop](/assets/images/posts/jsbundling-rails/lil-john.jpeg)
_Lil' John smiles in confusion as he attempts to migrate his Rails asset bundling from Webpacker to Jsbundling-rails._

We've recently been migrating our Rails apps from Webpacker to Jsbundling-rails. This is by no means a full and comprehensive guide on how Jsbundling-rails, Webpack, Sprockets, or any of the other bits mentioned work. Just my general understanding and some extra learnings after running through a process that was mostly smooth but occassionally had me doing my best Lil' John impression into the void.

## WHAT?!!

Somewhat unsurprisingly, Jsbundling-rails facilitates the bundling of javascript in Rails apps. It works with [Bun](https://bun.sh/), [esbuild](https://esbuild.github.io/), [Rollup.js](https://rollupjs.org/) and [Webpack](https://webpack.js.org/), and it plays nicely with Sprockets and the Rails asset pipeline.

_"But Dan"_ you say, _"Thats just technical word salad that doesnt get me any closer to understanding what it actually does."_ and to that I would say you are correct.

### What is JS bundling?
- Js bundle turn many js into one or less many bundles of js + builds a dependancy tree

### Sprockets, a short view to the past
- Sprockets was standard Rails asset pipeline management until Rails 7
- Rails 7 introduced import maps instead. A fancy new technology that does some other fancy stuff with opinions that are probably their entire own post.
- Now Sprockets is optional installed via the sprockets-rails gem
- Sprockets compress
- Sprockets transform
- Sprockets pipeline
- Sprockets fingerprint
- [there is a very good write up of how sprockets works here if you would like to know more](https://github.com/rails/sprockets/blob/main/guides/how_sprockets_works.md)


## Why?
It has a good logical migration flow from Webpacker that works for the current state of our Rails apps.

We want more control over how our assets are served so that we can dish out just the bits we actually want rather than absolutely everything all the time.
## How and how work?
[We gotta guide to migrate our stuff](https://github.com/FlickElectric/how_to_tech_team/blob/main/Front-end/rails/migrate-to-jsbundling.md#installing-jsbundling) which is largely an adapted version of the [webpacker to jsbundling-rails guide](https://github.com/rails/jsbundling-rails/blob/main/docs/switch_from_webpacker.md) from jsbundling-rails itself.

### Local dev
bin/dev
- It serve
- It watch
- runs rails server and yarn build --watch at the same time
- yarn build is a wrapper script listed in the package.json file that runs webpacker's build command.
- yarn build compiles all of your webpack assets into the assets/builds folder.
- the watch option allows for compiling on the fly as you make changes to your assets.
- this avoids the need to run yarn build every time you change one of your js or scss files.
- You can still run rails server by itself and yarn build by itself. You can even run yarn build watch in a separate terminal window to your rails server one so bin/dev is a convinience script to run both from a single window

### Production
assets:precompile
- the build command tags into rails assets:precompile task, builds the files you've configured it to, and then inserts them into the asset pipeline.


Some interesting exceptions.
- Webpacker did a lot of work to split individual packs into separate entry points. That meant you could load just the bits you wanted for a specific view. Sprockets doesnt do this by default and js-bundling just facilitates the addition of webpack so a number of our apps now how webpack configs that extend the base flick-build one in order to manually list out the entry points.
- In the future we could possibly look at doing some kind of standard config rule for this, although that would lean flick-build into being a bit rails specific which might be unfair any node apps using it.
