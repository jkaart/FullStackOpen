# Exercise 0.4: New note diagram

```mermaid
sequenceDiagram
  participant user
  participant browser
  participant server

  user->>browser: Input text to the HTML input field
  
  user->>browser: Click the save button
  Note right of browser: The browser execute submit event

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note/ <br> body:{"note":"Hello World"}
  activate server
  server->>browser: HTTP 302: Found <br> Location:https://studies.cs.helsinki.fi/exampleapp/notes
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
  activate server
  server->>browser: HTTP 304: Not modified <br> HTML document: notes
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  server->>browser: HTTP 304: Not modified <br> CSS file: main.css
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
  activate server
  server->>browser: HTTP 304: Not modified <br> JS file: main.js
  deactivate server

  Note right of browser: The browser load data.json from the server by execute JavaScript code from main.js

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server->>browser: HTTP 200: OK <br> body:[...,{"content":"Hello World","date":"2025-01-31"}]
  deactivate server

  Note right of browser: browser renders notes by executing callback function

```
