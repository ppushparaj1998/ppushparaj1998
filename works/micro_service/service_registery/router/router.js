const router = require('express').Router();

const serviceRegistry = require('../lib/service_registery');

router.put('/register/:servicename/:serviceversion/:serviceport', (req, res) => {
    const { servicename, serviceversion, serviceport } = req.params;
    console.log("req.params-------------------------------------->", req.params)
    const serviceip = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;
    console.log("serviceip----------------------------->", serviceip)
    console.log("Serviceversion-------------------------->", serviceversion)
    const serviceKey = serviceRegistry.register(servicename , serviceversion, serviceip, serviceport);
    console.log("serviceKey-------------------->", serviceKey)
    return res.json({ result: serviceKey })
})

router.delete('/register/:servicename/:serviceversion/:serviceport', (req,res)=> {
    const { servicename, serviceversion, serviceport } = req.params;
    const serviceip = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

    const serviceKey = serviceRegistry.unregister(servicename, serviceversion, serviceip, serviceport);
    return res.json({ result: serviceKey })
})

router.get('/find/:servicename/:serviceversion', async (req, res) => {
    const { servicename, serviceversion } = req.params;
    console.log("servicename, serviceversion--------------------------->", servicename, serviceversion)
    const svc = await serviceRegistry.get(servicename,serviceversion);
    console.log("SVC-------------------------------------->", svc)
    if(!svc) return res.status(404).json({ result : 'service not found'})
    return res.json(svc)
})

module.exports = router;