const express = require("express");
const Cake = require("../../models/Cake");
const { findById } = require("../../models/User");

const router = express.Router();

router.use((res, req, next) => {
    next();
});

// View all the cakes
router.get("/api/cake", async (req, res) => {
    try {
        const cakes = await Cake.find();
        // console.log("Orders: ", cakes);
        res.status(200).json(cakes);
    } catch (error) {
        console.error("Failed to retrieve orders:", error);
        res.status(500).json({ msg: error });
    }
});

// View cake by id
router.get("/api/cake/:id", async (req, res) => {
    try {
        const cakes = await Cake.find({_id : req.params.id});
        // console.log("Orders: ", cakes);
        res.status(200).json(cakes);
    } catch (error) {
        console.error("Failed to retrieve cakes:", error);
        res.status(500).json({ msg: "Failed to retrieve cake" });
    }
});

// Save cake in database
router.post("/api/cake", async (req, res) => {

    Cake.find({ name: req.body.name }).then(async (data, error) => {
        if (data.length == 0) {
            // console.log("Data: ", data, data.length);

            const cake = new Cake({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                flavors: req.body.flavors,
                sizes: req.body.sizes,
                ingredients: req.body.ingredients,
                image: req.body.image,
                category: req.body.category,
                ratings: req.body.ratings,
                stock: req.body.stock,
            });
            try {
                const savedCake = await cake.save();
                // console.log("Cake created:", savedCake);

                res.status(200).json({"Cake Created" : savedCake});
            } catch (error) {
                console.error("Failed to create cake:", error);
            }
        } else {
            console.log("Error: ", {msg : "Add Unique Name"});
            res.status(400).json({msg : "Add Unique Name"});
        }
    });
});

// Update cake
// router.put("/api/cake/:id", async (res, req)=> {
// 
// })



// Delete a cake
router.delete("/api/cake"  , async (req, res) => {
    try{
        await Cake.deleteMany({});
        res.status(200).json({"Status: " : "All cakes deleted succesfully"});
    }catch (error){
        console.error("Failed to delete cakes: ", error);
    }
})


module.exports = router;
