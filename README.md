# nodejs-express-typescript-seed-project
To run this project, from the terminal or command line do the following:

* <code>npm install</code> - This will install typescript, typings, and express.
* <code>typings install</code> - This will import the typings files. We are using DefinitivelyTyped for this project.
* Make sure that port 3000 is available.
* <code>npm start</code> will begin the NodeJS server. Since only the TypeScript is checked in, the TypeScript must be compiled
first. Naviagate to the root of the directory and simply type <code>tsc</code> to compile the <code>.ts</code> files to 
JavaScript. Please not that if you have issues, do the following: <code>npm install -g typescript</code>. Elevated access
may be required to perform this operation.

The server will have some modest console logging, and shall display a page at <code>localhost:3000</code> that demonstates
how to server up a web page.