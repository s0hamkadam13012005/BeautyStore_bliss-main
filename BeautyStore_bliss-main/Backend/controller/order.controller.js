import Order from "../models/order.model.js";
import asyncHandler from "express-async-handler";


// Create new Order

const createOrder = asyncHandler(async (req, res)=>{
    const order = new Order(req.body);
    const savedOrder = await order.save();

    if(!savedOrder){
      res.status(400);
      throw new Error("Order can not be created");
    }
    else{
      res.status(201).json(savedOrder)
    }
})


//Update Order

const updateOrder = asyncHandler(async(req,res)=>{
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {$set :  req.body},
    {new : true}
  );

  if(!updatedOrder){
    res.status(400);
    throw new Error("Order can not be updated");
  }else{
    res.status(200).json(updatedOrder);
  }
})

//Delete Order

const deleteOrder = asyncHandler(async(req,res)=>{

  const deletedOrder = await Order.findByIdAndDelete(req.params.id);

  if(!deletedOrder){
    res.status(400);
    throw new Error("Order can not be deleted");
  }
  else{
    res.status(200).json("Order deleted successfully");
  }
})

//Get User Order

const getUserOrder = asyncHandler(async(req,res)=>{
  const orders = await Order.find({userId : req.params.userId}).reverse();
  if(!orders){
    res.status(400);
    throw new Error("No Order found for this user");
  }
  else{
    res.status(200).json(orders);
  }
});

//Get All Orders

const getAllOrders = asyncHandler(async(req,res)=>{
  const orders = await Order.find();
  if(!orders || orders.length === 0){
    res.status(400);
    throw new Error("No Orders found");
  }
  else{
   res.status(200).json({ message: "Order deleted successfully" });

  }
})


export { createOrder, updateOrder, deleteOrder, getUserOrder, getAllOrders }