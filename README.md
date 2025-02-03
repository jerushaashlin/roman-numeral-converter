# Roman Numeral Converter

## Overview:
This project is a full-stack application that converts numbers (1-3999) into Roman numerals. It includes:
- A Node.js backend (Express.js) providing an API endpoint for numeral conversion.
- A React frontend (using Adobe React Spectrum) for a modern and accessible UI.
- CORS enabled to allow cross origin requests between the frontend and backend.
- Nodemon for automatic backend restarts during development.
- Concurrently for simultaneous frontend and backend execution with a single command.
- Logging using Winston for better debugging and monitoring. 
- Dockerized backend for production-ready deployment.

## Getting Started:

- Clone the repository 
```sh
git clone https://github.com/jerushaashlin/roman-numeral-converter.git 
cd roman-numeral-converter
```

- Install Dependencies
```sh
	npm install
```

- Start the backend server
```sh
	npm run server
```

	The backend runs on: http://localhost:8080/


- Install frontend dependencies
```sh
cd client
npm install
```

- Start the front end client
```sh
npm start
```

	The frontend runs on: http://localhost:3000/

- Run both frontend and backend simultaneously 
	To run both frontend and backend concurrently, use:
```sh
npm run dev
```

## API Specification:
### Endpoint: Convert to Roman Numerals

```sh
GET http://localhost:8080/romannumeral?query={integer}
```

URL: http://localhost:8080/romannumeral?query={integer}
Method: GET
Query Parameter:
query: An integer between 1 and 3999.

### Response:

```json
{
"input": "10",
"output": "X"
}
```

### Error Handling:
### If input is out of range (1-3999):

```json
{
 "error": "Invalid input. Please enter a number between 1 and 3999."
]
```

### If input is not a valid number:

```json
{
"error": "Invalid input. Only integers are allowed."
}
```

## Roman Numeral Specification:
This project follows the standard rules of Roman numerals, as referenced in: 
**[Wikipedia - Roman Numerals](https://en.wikipedia.org/wiki/Roman_numerals)**

### Rules:
- Basic Symbols: 
I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000
- Additive Notation: (Sum values when placed in descending order)
III = 3, XX = 20, CL = 150
- Subtractive Notation: (Subtract when a smaller numeral comes before a larger one)
IV = 4, IX = 9, XL = 40, XC = 90
- Valid Range:
1 to 3999 (higher values require non-standard extensions).

## Frontend UI - React + Adobe React Spectrum:
### Features Added:
- An input field to enter numbers.
- A convert button to trigger API calls.
- A result display for roman numeral conversion output.
- Realtime validation
- Uses Adobe React Spectrum for a modern and accessible UI
- Auto reload during development (npm run dev)
- Added winston logger

## Logging with Winston: (Backend)
The backend uses winston logger for better debugging
Logs are saved in logs/app.log.

```sh
npm run server
```
### Example log output:

```pgsql
[INFO] - 2025-02-02T12:00:00.000Z - Server started on port 8080
[INFO] - 2025-02-02T12:01:00.000Z - GET /romannumeral?query=10 - 200 OK
```
## Docker:
The backend can be containerized for production ready deployment.

- Build docker image

```sh
docker build -t roman-numeral-converter .
```

- Run the docker container

```sh
docker run -p 8080:8080 roman-numeral-converter
```

## Health check API

```sh
GET http://localhost:8080/health
```

Once running, verify the service,
http://localhost:8080/health

### Response:

```json
{
  "status": "ok",
  "uptime": 12345,
  "timestamp": 1700000000000
}
```






