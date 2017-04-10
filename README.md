# webpack-require-http

you can use the 'require' method to load http resource in webpack

## install

```npm install webpack-require-http```

## how to use

in ```webpack.config.js```, you may be set the ```externals``` option like this:

```
{
    ...
    entry:{
        ...
    },
    output:{
        ...
    },
    externals:[
        require('webpack-require-http')
    ]
    ...
}
```

so, you can use it in your own code like:

```
require('http://codemirror.net/lib/codemirror.css');
require('http://codemirror.net/lib/codemirror.js');
require('http://codemirror.net/addon/edit/matchbrackets.js');
require('http://codemirror.net/addon/comment/continuecomment.js');
require('http://codemirror.net/addon/comment/comment.js');
require('http://codemirror.net/mode/javascript/javascript.js');
```

those ```require``` method will return a ```Promise``` object

you can use ```then``` method to wait the resource load complete.

```
Promise.all([
    require('http://codemirror.net/lib/codemirror.css'),
    require('http://codemirror.net/lib/codemirror.js'),
    require('http://codemirror.net/addon/edit/matchbrackets.js'),
    require('http://codemirror.net/addon/comment/continuecomment.js'),
    require('http://codemirror.net/addon/comment/comment.js'),
    require('http://codemirror.net/mode/javascript/javascript.js')
]).then(function() {
    console.log(CodeMirror);
});
```

## config rule

in ```0.4.0```, you can use some rules to parse request, such as adjust ```http:|https:```

```
{
    ...
    entry:{
        ...
    },
    output:{
        ...
    },
    externals:[
        require('webpack-require-http').custom({
            rules:{
                '^#api\/common':'http://static.domain.com/api/common.js'
            }
        })
    ]
    ...
}
```

### using rules

```
custom({
    rules:{
        'some regexp' : 'replace result'
    }
})

custom({
    rules:function(filepath, request) {
        return request;
    }
});
```

## demo

```
var webpackRequireHttp = require('webpack-require-http');

var custom1Function = webpackRequireHttp.custom({
    rules:{
        '^#(.+)\/(.+)':'http://static.something.com/$1/$2.js'
    }
});

custom1Function('', '#api/sdk', function(err, content) {
    console.log('TEST2', content); // script, src=http://static.something.com/api/sdk.js
});

var custom2Function = webpackRequireHttp.custom({
    rules:function(context, request) {
        if(request && request.indexOf('//') == 0) {
            return 'http:' + request;
        }
        return request;
    }
});

custom2Function('', '//something.com/index.js', function(err, content) {
    console.log('TEST3', content); // script, src=http://something.com/index.js
});
```

## logs

0.4.3   add special char to ignore valid url check.
