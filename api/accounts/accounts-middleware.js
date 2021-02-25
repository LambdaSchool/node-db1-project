exports.checkAccountPayload = (req, res, next) => {
  if(!req.body) {
    res.status(400).json({error: "No Account"})
  } else if(!req.name || !req.budget) {
    res.status(400).json({error: "name and budget are required"})
  } else if(is_string(req.name) == false) {
    res.status(400).json({error: "name of account must be a string"})
  } else if(req.name.length < 3) {
    res.status(400).json({error: "name of account must be between 3 and 100"})
  } else if(is_num(req.budget) !== true) {
    res.status(400).json({error: "budget of account must be a number"})
  } else if(req.budget < 0 || req.budget > 1000000) {
    res.status(400).json({error: "budget of account is either too large or too small"})
  } else {
    req.selectedAccount = req.body
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const findName = req.Accounts.map(account => account.name == req.body.name)
  if(findName) {
    res.status(400).json({error: "That name is already taken"})
  }
}

exports.checkAccountId = async (req, res, next) => {
  const account = req.Accounts.map(account => account.id == req.params.id)
  if(!account) {
    res.status(400).json({error: "account not found"})
  } else {
    req.accountInfo = account
    next()
  }
}
