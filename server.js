const App = require("./src/app")
const port = process.env.PORT || 4000

App.listen(port, () => {
    console.log(`Backend is running in port: ${4000}`)
})