# acn_int
[![Build Status](https://semaphoreci.com/api/v1/developersoul/acn_int/branches/master/shields_badge.svg)](https://semaphoreci.com/developersoul/acn_int)

## Run Tests
```bash
$ yarn jest
```

## Compile frontend
```bash
$ webpack --p
```

## deploy 
```bash
ssh -i key.pem user@ip 'cd wp/wp-content/themes/acn_int && git pull origin master'
```

## todos
- [ ] add test to backend apis
	-	[ ] location
	- [ ] stripe
	- [ ] convertloop
	- [ ] posts

## frontend
- es6 with babel
- react
- axios

#### tests
- [jest](https://facebook.github.io/jest/)
- [enzyme](http://airbnb.io/enzyme/)
- moxios

## backend
- php
- wordpress

#### tests
- phpunit
