# recipes

Our project contains secret recipes from all over the world. you have been chosen to add (or edit) secret recipes of your own. considre yourself lucky. 
In this project you will find different "ingredients" of the full stack world- javascript,html,css,bootstarp,routing, DB, frontend, backend, and more cool stuff.

in order to be able to get access and enjoy the website, you would have to do the following steps:

1)go to  VS, add the folder with the files that were sent to you.
  go to terminal and install npm with the commands- `npm install`

2)in "config.yaml" change the values (root,user,pass,port) as they written in your mysql

3)go to MYSQL workbench and run the written rows bellow -

```
CREATE database recipes;
USE recipes;

create TABLE recipes (
	id int primary key AUTO_INCREMENT not null,
    name varchar (50),
    ethnic varchar (50),
    ingredients varchar (500),
    preparation text
  
```
4)go back to VS , open the terminal in the rout of our folder and initate the app with the command- `node index.js`

5)go to the web-  http://localhost:3000  and enjoy the app :)


