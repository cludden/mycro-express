# mycro-express
an [express]() hook for [mycro](https://github.com/cludden/mycro) apps.



## Installing
```bash
npm install --save mycro-express
```


## Configuration
```javascript
// in /config/express.js
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');

module.exports = function(mycro) {

    return function configureExpress(app, done) {
        app.use(logger('dev'));
        app.use(bodyParser.json({ limit: '500kb' }));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(methodOverride());

        const env = process.env.NODE_ENV || 'development';
        app.set('env', env);
        if (/test/.test(env)) {
            app.set('debug', true);
        }

        const port = process.env.PORT || 8080;
        app.set('port', port);

        process.nextTick(done.bind(null, null, app));
    }
}
```



## Testing
run tests  
```javascript
npm test
```

run coverage
```javascript
npm run coverage
```



## Contributing
1. [Fork it](https://github.com/cludden/mycro-express/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request



## License
Copyright (c) 2016 Chris Ludden.
Licensed under the [MIT license](LICENSE.md).
