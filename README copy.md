1. Install json-server (globally):
    npm install -g json-server
2. Navigate to your project folder (if not already)
    cd your-angular-project
3. Run the server with your JSON file:
   json-server --watch src/app/assets/movies.json --port 3000

   Now josn file can be accessed with following URL and can be used with HTTPClient:
http://localhost:3000/movies