module.exports = {
  getHomePage: (req, res) => {
    let query = "SELECT * FROM `tasks` ORDER BY task_deadline";
    db.query(query, (err, result) => {
      if (err) {
        res.redirect('/');
      }
      res.render('index.ejs', {
        pageTitle: 'My To Do List',
        tasks: result
      });
    });
  },
};