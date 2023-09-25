const express = require("express")
const router = new express.Router()
const cart = require("../../models/cart")

router.post("/add-to-cart", async (req, res) => {
    try {
        const uid = req.body.uid;
        const product = req.body.product;

        const existingCart = await cart.findOne({ uid });

        if (!existingCart) {
            const newCart = new cart({
                uid,
                products: [product]
            });

            await newCart.save();
        } else if (existingCart.products.some(item => item.pid === product.pid)) {
            return res.status(200).json({ message: "Already added to cart" });
        } else {
            existingCart.products.push(product);
            await existingCart.save();
        }

        res.status(201).json({ message: "Insertion successful" })
    } catch (e) {
        console.log(e)
        res.status(201).json({ message: "Internal server error" })
    }
})

router.patch("/update-cart-qty", async (req, res) => {
    try {
        const uid = req.body.uid
        const pid = req.body.pid
        const qty = req.body.qty

        const updatedProduct = await cart.findOneAndUpdate({ uid, "products.pid": pid }, { $set: { "products.$.qty": qty } })

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found in the cart" });
        }

        res.status(201).json({ message: 'Updation successful' })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.delete("/delete-cart-product", async (req, res) => {
    try {
        const uid = req.body.uid
        const pid = req.body.pid

        const delProduct = await cart.findOneAndUpdate({ uid }, { $pull: { products: { pid } } })

        if (!delProduct) {
            return res.status(404).json({ message: "Product not found in the cart" });
        }

        if (!delProduct.products.some(product => product.pid === pid)) {
            return res.status(404).json({ message: "Product not found in the cart" });
        }

        if (delProduct.products.length < 2) {
            await cart.deleteOne({ uid })
        }
        res.status(201).json({ message: 'Deletion successful' })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.get("/read-cart-data/:uid", async (req, res) => {
    try {
        const uid = req.params.uid
        const data = await cart.findOne({ uid }, { _id: 0, __v: 0, uid: 0 })
        if (!data) {
            return res.status(200).json({ message: "No data" })
        }
        res.status(200).send(data)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = router