const express = require("express")
const { createCustomerDetails, updateCustomerDetails, getCustomerDetailsByFilterQuery, deleteCustomerDetails } = require("../controllers/customerDetailsController")

const router = express.Router()

router.route("createCustomerDetails").post(createCustomerDetails)
router.route("updateCustomerDetails").put(updateCustomerDetails)
router.route("getFilteredCustomerDetails").get(getCustomerDetailsByFilterQuery)
router.route("deleteCustomerDetails").put(deleteCustomerDetails)



module.exports = router