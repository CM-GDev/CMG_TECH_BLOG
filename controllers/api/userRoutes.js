const router = require('express').Router();
const { User } = require('../../models');

//api/users (for new accounts: signup)
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//api/users/login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    console.log("post body info:")
    console.log(req.body)
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again1' });
      return;
    }
    console.log(userData)
    const validPassword = await userData.checkPassword(req.body.password);
    
    console.log("does password match?:")
    console.log(validPassword)

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again2' });
      return;
    }
    console.log("this step happend")
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
      // res.redirect('/dashboard');
    });

  } catch (err) {
    console.log("this is the error")
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
