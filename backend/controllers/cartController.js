import userModel from "../models/userModel.js"

// add product to user cart 

const addToCart = async (req, res) => {

  try {

    const { itemId, size } = req.body;
    const userId = req.user.id;

    const userData = await userModel.findById(userId);

    // ✅ FIX 1: Initialize cartData if empty
    let cartData = userData.cartData || {};

    if (cartData[itemId]) {

      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }

    } else {

      cartData[itemId] = {};
      cartData[itemId][size] = 1;

    }

    // ✅ FIX 2: Save properly
    userData.cartData = cartData;

    // ✅ FIX 3: Mark modified (IMPORTANT)
    userData.markModified("cartData");

    await userData.save();

    res.json({
      success: true,
      message: "Added to cart"
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });
  }
};

// Update user cart
const updateCart = async(req,res) =>{
    try {
        const {userId , itemId ,size,quantity} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size] =quantity

        await userModel.findByIdAndUpdate(userId,{cartData})

        res.json({
            success:true,
            message:"cart Updated"
        })
    } catch (error) {
        console.log(error)
    }
}


// Get User cart
const getUserCart = async(req,res) =>{
    try {
        const {userId} =req.body
         const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;
        res.json({
            success:true,
            cartData:userData.cartData
        })

    } catch (error) {
        console.log(error)
    }
}

export {addToCart,updateCart,getUserCart};