# ACN International [![Build Status](https://semaphoreci.com/api/v1/developersoul/acn_int/branches/master/shields_badge.svg)](https://semaphoreci.com/developersoul/acn_int)

## Wordpress Shortcode
[Documentation](https://codex.wordpress.org/Shortcode_API)

## Visual composer Map
[Documentation](https://wpbakery.atlassian.net/wiki/pages/viewpage.action?pageId=524332)

## install javascript dependencies
```bash
npm install
``` 
or
```bash
yarn install
``` 
## Run Tests
Yarn it's like npm, but more faster
```bash
yarn jest
```

## Compile frontend
We use [webpack](https://webpack.js.org/)
```bash
yarn build
```

## deploy 
```bash
ssh -i key.pem user@ip 'cd wp/wp-content/themes/acn_int && git pull origin master'
```
## install php dependencies
Only neccesary when a new copy the this theme is installed
[composer](https://getcomposer.org/)
```bash
composer install
``` 


## frontend
- [es6 with babel](https://babeljs.io/)
- [react](https://facebook.github.io/react/)
- [axios for ajax requests](https://github.com/mzabriskie/axios)

#### tests
- [jest](https://facebook.github.io/jest/)
- [enzyme](http://airbnb.io/enzyme/)
- [moxios for mock ajax requests](https://github.com/mzabriskie/moxios)

## backend
- Wordpress

## todos
- [ ] add test to backend apis
	-	[ ] location
	- [ ] stripe
	- [ ] convertloop
	- [ ] posts
