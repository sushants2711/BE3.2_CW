import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express()

const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const cars = [
    { id: 1, make: "Toyota", model: "Camry", year: 2002 }
]

app.get("/", (req, res) => {
    res.send("Hello,  Express")
})

app.post("/cars", (req, res) => {
    const newCar = req.body;

    try {
        if (!newCar.make || !newCar.model || !newCar.year) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "All fields are required"
                })
        }

        cars.push(newCar);
        return res
            .status(201)
            .json({
                success: true,
                message: "Car added successfully",
                data: newCar
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.messageß
            })
    }

})

app.get("/cars", (req, res) => {
    res.send(cars)
})

app.listen(PORT, () => {
    console.log(`server in running on http://localhost:${PORT}`)
})