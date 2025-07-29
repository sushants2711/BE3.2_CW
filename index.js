import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express()

const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const cars = [
    { id: 1, make: "Toyota", model: "Camry", year: 2002 },
    { id: 2, make: "Honda", model: "Civic", year: 2005 },
    { id: 3, make: "Ford", model: "Focus", year: 2010 },
    { id: 4, make: "Chevrolet", model: "Impala", year: 2012 },
    { id: 5, make: "Nissan", model: "Altima", year: 2015 },
    { id: 6, make: "BMW", model: "3 Series", year: 2018 },
    { id: 7, make: "Audi", model: "A4", year: 2017 },
    { id: 8, make: "Hyundai", model: "Elantra", year: 2013 },
    { id: 9, make: "Kia", model: "Optima", year: 2014 },
    { id: 10, make: "Volkswagen", model: "Jetta", year: 2016 },
    { id: 11, make: "Mercedes-Benz", model: "C-Class", year: 2019 }
];


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

// delete route
app.delete("/cars/:id", (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id are missing"
                })
        }

        const numId = parseInt(id)

        const index = cars.findIndex((curr) => curr.id === numId)
        // console.log(index)

        if (index === -1) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Car not found"
                })
        } else {
            cars.splice(index, 1)
            return res
                .status(200)
                .json({
                    success: true,
                    message: "card deleted successfully"
                })
        }
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            })
    }
})

app.listen(PORT, () => {
    console.log(`server in running on http://localhost:${PORT}`)
})