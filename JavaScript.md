<style>
  h2 {
    color: green;
    font-style: bold;
    text-decoration-line: underline;
  }
</style>

## [JavaScript in 100 Seconds](https://youtu.be/DHjqpvDnNGE)
<i>28.09.2022</i>

Keywords: `High level`, `Single threaded`, `Garbage colected`, `Interpreted and JIT-compiled` (converted to machine code at runtime), `Prototyped based`, `Multi-paradigm`, `Dynamic language`, `Non-blocking event loop` (excellent at handling IO-intensive jobs)

Created in 1995 in one week by Brendan Eich to the Netscape Browser. Originally named Mocha, but then changed to the then hyped name **Java**script.

> JavaScript evolution:  
> Mocha > ES3 > ES5 > ES6 > TypeScript

JS work on a single thread, the Event Loop. Asynchronous requests are listened by the Event Loop and are registered in the Callback Stack.. When the task is completed in the background, the callback returns to the Event Loop. This prevents the main thread of being blocked, permiting IO intensive tasks to run and the webpages still be responsive to the user.

Most well known for building front-end web applications because it's the only (bar WebAssembly) natively supported language in browsers. Notwithstanding, Atwood's Law states 
> if something can be built with JS, it sooner or later will

JS is also used in server-side applications (node.js), mobile applications (react native, ionic), desktop applications (electron).

On a Website, JS is often used to grab an element from the DOM (the html document): 
```javascript
// VARIABLE DECLARATION
// var     original flavour, avoid
// let     can be reassigned
// const   cannot be reassigned
const btn = document.querySelector('button');

// Make the btn interactive by adding an Event Listener
// The Event Loop will execute it always when someone clicks on it.
btn.onclick = function() {
  alert('you clicked me 😄!')
}

// (...) arrow syntax
btn.onclick = () => {
  alert('you clicked me 😄!')
}
```
Functions are first-class objects and support FP. Nevertheless, JS also supports OOP:
```javascript
class Hummanoid {
  constructor()  {
    this.dna = '🧬'
  }

  walk() {
    console.log('going for a walk...')
  }
}
```
Even though it is single-threaded, it can do work  asynchronously with the Promise API, which also supports the async way syntax
```javascript
const  wait = new Promise ((resolve, reject)) => {
  setTimeout(() => {
    resolve('thank you for waiting ⏰');
  }, 1000);
}

wait.then(doSomething).catch(handleErr)

// async syntax
async function pausableFun() {
  await longRunningJob();
}
```
JavaScript can also run in the server thanks to the node.js runtime. Instead of the buttons on a webpage, it can
 ```javascript
import { readFile } from 'fs/promises';

readFile('.')
```
---
How I would learn to code (If I could start over) - Jason Goodison
https://youtu.be/9s29LKfEFjQ

<i>12.10.2022</i>

He suggests to learn how to code useful but not hard things right off the bat.
These are languages and respective frameworks he finds worth learning
    Python - Django/Flask
    JavaScript - express.js (simplified node.js for backend); react.js (front end)
    Database - mongodb

---

## [Curso em vídeo - Gustavo Guanabara](https://youtu.be/Ptbk2af68e8)

## Aula #01 - O que JavaScript faz?
### **Client vs Server**
The Client (computer browser or mobile) requests the Server via the internet infrastructure (cloud). The Server looks for the html and sents a copy of it back.  
![client_vs_server](./images/client_vs_server.svg)  

### **The three agents**
1. HTML (Hypertext Markup Language): 
Linguagem de Marcação, como um jornalista mantém o conteúdo
2. CSS (Cascading Style Sheets): 
Linguagem de Estilos, como um designer mantém o design, a arte
3. JS (JavaScript): 
Linguagem de Programação, como um programador mantém a lógica, a interação e a integração

node.JS (RTE and library used for running applications outside the client's browser)
  Why was node JS created?
  provide devs w the power to use JS for server-side scripiting and unifying
  web application development around a single programming language

---

## Aula #02 - Evolução do JavaScript
### **Abridged History of JavaScript**
|Year | Description |
|---|---|
|1970 |Arpanet by Darpa, Dwight Eisenhower (precessor of the internet -- USA fearing getting their military bases destroyed by the Russian Satellite Sputnik, and consequentely losing all military data)|
|1993 |WWW by Tim Berners-Lee (CERN) and, consequently, also HTML and the protocol HTTP; Mosaic (1st browser) by Mark Anderson|
|1994 |Mozilla by Netscape (Mark Anderson & Jim Clark)|
|1995 |<s>Mocha? Livescript?</s> No! **JavaScript** by Netscape (Brandon Nike)|
|1997 |ECMAScript (Netscape decides to standardize their JavaScript because Microsoft was trying to release their version of the language, called JScript)|
|2002 |Netscape vs Microsoft battle ends with Microsoft incorporating Internet Explorer to Windows, which leads Netscape to bankrupcy. Netscape closes and opens the Mozilla Foundation|
|2008 |Google Chrome by Google.|
|2009 |V8 by Google, a JavaScript open engine that comes with the Chrome and generate JIT-code|
|2010 |node.js by some developers who derived it from V8|

### **Abridged History of ECMA**
| Year | ECMA version| Description |
|------|-------------|-------------|
|1997|1.0||
|1998|2.0||
|1999|3.0|Regular expression, try-catch block (that Java and C already had) |
|???|4.0|Promised too much, but never saw/came to light|
|2009|5.0|compatible with almost any current browser, works with JSON, methods to deal with arrays|
|2015|6.0|let, const, template strings|
|2016|ES2016|some funcitonalities like the power operator|
|2017|ES2017|some funcitonalities like compatibility with asynchronous functions|
|2018|ES2018|some functionalities like regex and promises|


### **On some common, related technologies**
|Technology|Description|
|---|---|
|JQuery| called framework, but it is a set of libraries, famous for many years but recently lost a bit of ground, created by people from Mozilla, made it easier to use interactive in JavaScript|
|Angular| by Google, facilitate creating web apps, less imperative but more declarative, there's a beef between vanilla version users and more contemporary ones|
|React|by Facebook, like Angular but more flexible|
|Vue|2014, ex-employee from Google made a better version||
|Electron|maintained by GitHub, made for building GUI (eg VS code, WhatsApp desktop, Discord, Slack)|
|Ionic|sdk to make mobile apps|
|Cordova|other to make mobile apps|

---

## Aula #03
### Recommended Bibliography:
- **Books**  
  JS o guia definitivo - David Flanegam, O'Riley El  
  JS: guia do programador - Mario Jor, Mauricio Sami Silva
- **Online Documentation**  
  Mozilla (developer mozilla org) -> referência de JS, html, CSS  
  ECMA (Standard) ecma international org [ECMA-262] < Referência *(no curso trabalharemos com ECMA5 e ECMA6)*

We're gonna use **Google Chrome** (to run our code); **VS Code** (write code – great integration with 1 and 3); **nodejs** (facilitates learning). When installing nodejs, add it to PATH and add the package manager (NPM)

---
## Aula #04
```docker
docker pull node:lts
sudo docker run -it --rm -v /home/julianofinck/javascript:/workspace --name nodejs_env node:lts
```

Quando criar um arquivo html no VSC,
ao digitar ,,html'' o intelisense da IDE
sugerirá ,,html:5". Clicando nele será 
apresentado um código. 
Pelo file explorer, abrir o html em
meia tela no Chrome. Atualizando a
página, posso ver os avanços.

<!DOCTYPE html>
<html lang="pt-br">
<head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width-device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie-edge">
     <title> Meu primeiro programa... </title>
</head>
<body>
      <h1>Olá, mundo!</h1>
      <p>Já me livrei da maldição</p>
</body>
</html>

JavaScript fica geralmente escrito no final de /body, depois que já foi carregado o código base.
◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
13/10/2022 - 5ª Aula
◘◘◘◘ Curso em vídeo JavaScript #05 ◘◘◘◘
typeof variavel

"string"
'string'
`string`




FullStack GIS Job Example

<b>Tasks</b>
- Fazer análise de dados espaciais
- Utilizar boas práticas de desenvolvimento;
- Interface com clientes;
- Participar e colaborar com os Squads Ágeis em seus rituais;
- Definir soluções de forma propositiva, apresentar as suas recomendações e ideias;
- Desenvolver ferramentas customizadas utilizando ArcPy
- Desenvolver, implementar e realizar manutenções em soluções GIS
- Desenvolver códigos reutilizáveis, testáveis e eficientes
- Elaborar documentação técnica

<b>Requirements</b>
- Grande proficiência com JavaScript;
- Conhecimento intermediário de HTML5 e CSS3;
- Conhecimento em banco de dados Postgres, SQL ou Oracle;
- Compreender a natureza da programação assíncrona e suas peculiaridades e soluções alternativas (JQuery);
- Conhecimento em ArcGIS Web AppBuilder, ArcObjects, ArcGIS Server, ArcGIS Desktop, Portal for ArcGIS,
ArcGIS API JS

- Boa vivência com ferramentas ESRI
- Integração de múltiplas fontes de dados e bancos de dados em um sistema;
- Compreender os princípios fundamentais de design por trás de um aplicativo escalonável; (Arquitetura de Projeto, Design Pattern);
- Conhecimento em JWT e sua integração com API’s.
- Grande proficiência em Phyton,
- Conhecimento em C#, .Net Core e/ou .Net 5.0;
- Conhecimento em TypeScript e React
- Compreensão proficiente de ferramentas de controle de versão de código como Git;

<b>We are surprised if you have...</b>
- Conhecimento em mapas e tecnologias de geoprocessamento (ArcGis, OpenLayers, MapBox, LeFlat)
- Conhecimento básico em cartografia
- Experiência com processo de ETL
- Implementação de plataformas de testes automatizadas e teste de unidade (TDD – AnyTest, Any Unit, JUnity)
- Certificações de Developer ESRI
- Autenticação e autorização do usuário entre vários sistemas, servidores e ambientes (OAuth2.0)

Disponibilidade Imediata
Na ZUKK acreditamos no respeito, na diversidade e na busca por inclusão. Contamos com um ambiente descontraído, informal e inclusivo com um leque de benefícios como day off no dia do aniversário, aulas de inglês, descanso remunerado (apesar da contratação ser PJ), entre outros.