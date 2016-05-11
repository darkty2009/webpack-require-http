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