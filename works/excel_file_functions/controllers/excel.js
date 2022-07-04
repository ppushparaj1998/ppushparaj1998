const multer = require('multer')
const XLSX = require('xlsx')

class ExcelController {
    constructor() { }
    async upload(req, res) {
        try {
            return res.status(200).send({ status: 200, status: true, message: "File Upload Successfully"})
        } catch (error) {
            console.log("Error--->", error)
            return res.status(400).send({ status: 400, status: false, message: "Failed to upload file", error: error.message})
        }
    }
    async getCount(req, res) {
        try {
            var workbook = XLSX.readFile('uploads/Book1.xlsx');
            var sheet_name_list = workbook.SheetNames;
            // console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

            let wallet_address = data.map(({ WALLET_ADDRESS }) => WALLET_ADDRESS)
            const lowercase_address = wallet_address.map(element => {
                return element.toLowerCase();
            });
            // console.log("Elements---------->", wallet_address)
            // console.log("Elements---------LowerCase-------------->", lower)
            const toFindDuplicates = lowercase_address => lowercase_address.filter((item, index) => lowercase_address.indexOf(item) !== index)
            const duplicateElements = toFindDuplicates(lowercase_address);
            const count = duplicateElements.length

            // console.log("Duplicate Elements--------------->",duplicateElements);

            const output = {
                data : duplicateElements,
                count : count
            }

            if(duplicateElements.length>0){
                return res.status(200).send({ status: 400, status: false, message: "Duplicate Wallet Address Found", data: output })
            } else {
                return res.status(200).send({ status: 200, status: true, message: "Duplicate Wallet Address Not Found"})
            }           
        } catch (error) {
            console.log("Error--->", error)
            return res.status(400).send({ status: 400, status: false, message: "Failed to upload file"})
        }
    }
}

module.exports = ExcelController;