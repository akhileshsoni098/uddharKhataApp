const CustomerDetailsModel = require("../models/customerDetailsModel")

const cloudinary = require("cloudinary").v2;


exports.createCustomerDetails = async (req, res)=>{
    try{

        ///// here will be req.user._id

const data = req.body
const {customerName,village,contact,date} = data

if(!customerName){
return res.status(400).json({status:false ,message:"Please Provide Customer Name"})
}
if(!village){
    return res.status(400).json({status:false ,message:"Please Provide Customer village Name"})
    }
    if(!contact){
        return res.status(400).json({status:false ,message:"Please Provide Customer contact Number"})
        }

        if (req.files && req.files.attachment) {
            const attachmentfile = req.files.attachment;
            const result = await cloudinary.uploader.upload(
              attachmentfile.tempFilePath,
              {
                resource_type: "attachments",
                folder: "attachmet_CustomerDetails",
              }
            );
      
            //  Cloudinary result 
            console.log(result.secure_url, result.public_id)
      
            data.attachment = {
              url: result.secure_url,
              public_Id: result.public_id,
            };
          }


const saveCustomerDetailsData = await CustomerDetailsModel.create(data)

res.status(200).json({status:true, message:"successfully created Customer Details", data:saveCustomerDetailsData})

    }catch(err){
        res.status(500).json({status:false ,message:err.message})
    }
}


exports.updateCustomerDetails = async (req, res) => {
  try {
    const data = req.body;
    const customerID = req.params; 

// here will be req.user._id


    if (!customerID) {
      return res.status(400).json({ status: false, message: "Invalid Customer ID" });
    }

    const existingCustomer = await CustomerDetailsModel.findById(customerID);

    if (!existingCustomer) {
      return res.status(404).json({ status: false, message: "Customer not found" });
    }

    if (req.files && req.files.attachment) {
      const attachmentFile = req.files.attachment;
      const result = await cloudinary.uploader.upload(attachmentFile.tempFilePath, {
        resource_type: "attachments",
        folder: "attachment_CustomerDetails",
      });

      // Cloudinary result
      console.log(result.secure_url, result.public_id);

      data.attachment = {
        url: result.secure_url,
        public_Id: result.public_id,
      };

      if (existingCustomer.attachment && existingCustomer.attachment.public_Id) {
        await cloudinary.uploader.destroy(existingCustomer.attachment.public_Id);
      }

    }

    const updatedCustomerDetails = await CustomerDetailsModel.findOneAndUpdate(
      { _id: customerID },
      { $set: data },
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Customer details updated successfully",
      data: updatedCustomerDetails,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


exports.getCustomerDetailsByFilterQuery = async (req, res)=>{

    // here will be req.user._id for authentication 

    try {
        const {
          day,
          month,
          year,
          customerName,
          village,
          contact,
          minRestPendingAmount,
          maxRestPendingAmount,
        } = req.query;
    
        const filter = {};
    
        if (day) filter["date.day"] = day;
        if (month) filter["date.month"] = month;
        if (year) filter["date.year"] = year;
        if (customerName) filter["customerName"] = customerName;
        if (village) filter["village"] = village;
        if (contact) filter["contact"] = contact;
    
        if (minRestPendingAmount || maxRestPendingAmount) {

          filter["restPendingAmount"] = {};
    
          if (minRestPendingAmount) {
            filter["restPendingAmount"]["$gte"] = parseFloat(minRestPendingAmount);
          }
    
          if (maxRestPendingAmount) {
            filter["restPendingAmount"]["$lt"] = parseFloat(maxRestPendingAmount);
          }
        }
    
        const users = await CustomerDetailsModel.find(filter);
    
        res.status(200).json({ status: true, data: users });
      } catch (error) {
        res.status(500).json({ status: false, message: error.message });
      }
}


exports.deleteCustomerDetails = async(req , res)=>{

    try{

const customerID = req.params

if(!customerID){
    return res.status(404).json({status:false , message:"Customer Details not found by This Id "})
}

const deleteCustomerDetailsData = await CustomerDetailsModel.findOneAndUpdate({isDeteted:false, _id:customerID},{isDeleted:true}, {new:true})

if(!deleteCustomerDetailsData){
    return res.status(404).json({status:false ,message:"Customer data not found"})
}
res.status(204).json({staus:true , message:"Customer data deleted successfully"})
    }catch(err){
        res.status(500).json({status:false , message:err.message})
    }
}