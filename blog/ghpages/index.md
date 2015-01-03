# Running jekyll locally for FOSSASIA

[Github Pages](https://pages.github.com/) allows one to use [Jekyll](http://jekyllrb.com/) on their site. Github compiles everything on their own servers and serves them to visitors.

However, for testing and development, it is a wise idea to have Jekyll running on your local environment. This quick guide will run you through getting jekyll running on your computer.

## Why Jekyll

We've begun to use Jekyll for [FOSSASIA's](http://fossasia.org/) [Google Code-in](http://www.google-melange.com/gci/homepage/google/gci2014) [site](http://fossasia.github.io/). This tutorial was because of a [task on GCI](http://www.google-melange.com/gci/task/view/google/gci2014/5870997106327552). 

Jekyll is useful for sites hosted on Github because it allows using Coffeescript and SASS. You get to separate out the data from the templating by using [Jekyll Data Files](http://jekyllrb.com/docs/datafiles/). You can use [Variables](http://jekyllrb.com/docs/variables/) and [YAML Front Matter](http://jekyllrb.com/docs/frontmatter/) for more advanced templating and customization. 

## Setting Up

First, you should have a local copy of the [fossasia site](https://github.com/fossasia/fossasia.github.io). You'll notice a file called 'Gemfile' in the root, this is required for installing and configuring the gem.

You also need [Ruby](https://www.ruby-lang.org/en/downloads/) and [Node.JS](http://nodejs.org/download/) installed. Windows users can get ruby from [RubyInstaller](http://rubyinstaller.org/).

Next, we'll install Bundler. Bundler is the package manager for Ruby, that will make managing installs of Jekyll and other gems very easy. Install Bundler by running `gem install bundler` in the command line.

Navigate to the fossasia.github.io folder (where the `Gemfile` is located) on the command line. Run `bundle install` to install dependencies for the [`github-pages`](https://github.com/github/pages-gem) gem. The pages gem installs many dependencies, which include jekyll, jekyll-coffeescript, jekyll-sass-converter - All very useful for an average development project.See the [full list here](https://github.com/github/pages-gem#list-dependency-versions). We don't exactly use many of these dependencies, but it is important to have all to exactly mimic Github. Apart from that, the pages gem isn't really much different from the normal jekyll gem.

## Running! 

Running `bundle exec jekyll serve` in the repo's directory will compile and run your site *exactly* how Github would compile and run it. You'll be able to see the site on your computer by visiting `localhost:4000`. Congrats!

![FOSSASIA](images/fossasia.png)