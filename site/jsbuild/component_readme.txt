Component Readme
================

Using Hello component as example to illustrate how a component is created in VueBlcok


The following files are involved:

* component/hello.vue      // component file
* demo/hello.html          // demo html file for component
* demo/hello.js            // demo js file for component, source code
* demo/dist/hello.js       // compiled demo js file, created from demo/hello.js 
* webpack.config.js        // webpack config that compiles demo/hello.js to demo/dist/hello.js


To compile demo/hello.js to demo/dist/hello.js, do the following:

```
npm run build
```

The demo folder linked under public folder so that demo html file is accessible on VueBlock website:

```
http://<vuewebsite>/demo/hello.html
```

