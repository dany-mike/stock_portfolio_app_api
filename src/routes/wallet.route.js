const router = require('express').Router()
const addStockToWallet = require('../controllers/wallet/addStockToWallet.controller')
const createWallet = require('../controllers/wallet/createWallet.controller')
const deleteStock = require('../controllers/wallet/deleteStock.controller')
const deleteWallet = require('../controllers/wallet/deleteWallet.controller')
const editStock = require('../controllers/wallet/editStock.controller')
const editWallet = require('../controllers/wallet/editWallet.controller')
const getWalletsByUsername = require('../controllers/wallet/getWalletsByUsername.controller')
const getWalletContent = require('../controllers/wallet/getWalletContent.controller')
const serialization = require('../middlewares/serialization.middleware')
const verify = require('./verifyToken.route')

//Create a wallet 
router.post('/add-wallet/:username', verify, createWallet, serialization)

//Update a wallet
router.patch('/edit-wallet/:username/:walletId', editWallet, serialization)

//Delete a wallet
router.delete('/delete-wallet/:username/:walletId', deleteWallet, serialization)

// Get wallets by username
router.get('/:username/', verify, getWalletsByUsername, serialization)

// Watch the content of one wallet
router.get('/:username/:walletId', getWalletContent, serialization)

// Add into a wallet by username and wallet id
router.post('/add-stock/:username/:walletId/:symbol', verify, addStockToWallet, serialization)

// Update a wallet by user_id and wallet id
router.patch('/edit-stock/:username/:walletId/:symbol', verify, editStock, serialization)

// Delete a stock by username and wallet id
router.delete('/delete-stock/:username/:walletId/:symbol', verify, deleteStock ,serialization)

module.exports = router