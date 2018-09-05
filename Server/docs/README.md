# Setup

The backend of RootAccess is split into several categories; config, controllers, models, and RAL-Core. The first 3 are rather commonplace so I'll spend less time explaining those. If you have any questions feel free to email contact@kehrancarr.com.

- Config - This is where our back-end is configured. You can find all of our express routes here and our mongoose configuration.

- Controllers - These bad boys control (who woulda thought) how our data and requests are handled. Everything to do with model manipulation is done here.

- Models - This directory contains our structures for back-end dats such as users, virtual PCs, etc.

- RAL-Core - this is the 'compiler' for RootAccess Language. Included is an input stream, a lexer or tokenizer, an AST parser, a compiler and a 'Virtual Machine'.
  - The input stream, lexer, and parser work together to build an Abstract Syntax Tree.
  - The compiler reads an AST as input and converts it to working javascript (ES6)
  - RootAccessVM acts as a virtual machine to run RootAccess Language on, making the compiled JS code useful. Things like injecting apps, scanning for ports, etc are all executed here and the result is sent back to the client. In short, users script software and maleware in RAL. When this software is executed the RAL code is sent to the server, compiled and executed here. The results of the outcome are sent back to the client and stored in the database. 