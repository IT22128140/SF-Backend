// POST - Register a new user
router.post('/register', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = new User({ email, password });
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });



  app.post('/api/RegisterEmp', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {FirstName,LaststName,emailAddress,phoneNumber,password,password2,EmployeeType} = req.body;
  
    try {
      const userDoc = await User.create({
        FirstName,
        LaststName,
        emailAddress,
        phoneNumber,
        password,
        EmployeeType,
        password2:bcrypt.hashSync(password,password2, bcryptSalt),
      });
      res.json(userDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  
  });