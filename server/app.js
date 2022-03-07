const express = require("express");
const https = require('https');
const PORT = process.env.PORT || 5001;
const axios = require('axios');
const app = express();
const path=require("path")
app.get("/api", async (req, res) => {
  //res.json({ message: "Hello from server!" });
  
  
    const response = await axios({
			url: "https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68",
			method: "get",
		});
    console.log(response)
    res.status(200).json(response.data);


});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
app.use(express.static(path.resolve(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});
