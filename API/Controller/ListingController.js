const Listing = require('../models/listingmodel');
const errorHandler = require('../utils/error')

exports.createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
}

exports.deleteListing= async(req,res,next)=>{
  try {
    const listing = await Listing.findById(req.params.id);
    if(!listing){
  return next(errorHandler(404,'listing not found'));
} 
if(req.user.id!== listing.userRef){
  return next(errorHandler(401,'you can only delete your own listing'));
}
try {
  await Listing.findByIdAndDelete(req.params.id)
  
} catch (error) {
  next(error)
}
  } catch (error) {
    next (error)
  }
}
