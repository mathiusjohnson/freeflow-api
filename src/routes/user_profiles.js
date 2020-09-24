const router = require("express").Router();

module.exports = (db) => {
  router.get("/user_profiles", (req, res) => {
    db.query(`SELECT * FROM user_profiles;`).then((data) => {
      res.json(data.rows);
    });
  });

  router.get("/user_profiles/mentor_points/", (req, res) => {
    // ********
    // const userId = req.body.userId;
    // ********

    // hard coded for now...
    const userId = 4;

    db.query(
      `
      SELECT SUM(mentor_rating) as mentorRating
      FROM tutor_experiences
      JOIN users ON mentor_id = users.id
      WHERE users.id = $1;
    `,
      [userId]
    ).then((data) => {
      res.json(data.rows);
    });
  });

  router.get("/user_profiles/student_points/", (req, res) => {
    // ********
    // const userId = req.body.userId;
    // ********

    // hard coded for now...
    const userId = 4;

    db.query(
      `
      SELECT SUM(student_rating) as studentRating
      FROM tutor_experiences
      JOIN users ON student_id = users.id
      WHERE users.id = $1;
    `,
      [userId]
    ).then((data) => {
      console.log("studentPoints", data.rows);
      console.log(userId);
      res.json(data.rows);
    });
  });

  return router;
};
