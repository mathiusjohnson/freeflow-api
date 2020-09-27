const router = require("express").Router();

module.exports = (db) => {
  router.get("/user_profiles", (req, res) => {
    db.query(
      `
    SELECT users.username, avatar, users.id 
    FROM user_profiles
    JOIN users ON user_id = users.id;
    `
    ).then((data) => {
      res.json(data.rows);
    });
  });

  // router.get("/user_profiles/profile", (req, res) => {
  //   // const queryParams = [4];
  //   db.query(
  //     `SELECT users.id,avatar,location, is_mentor, is_student, users.username
  //   FROM user_profiles
  //   JOIN users on  user_profiles.user_id = users.id;`
  //   )
  //     .then((data) => {
  //       res.json(data.rows);
  //     })
  //     .catch((err) => {
  //       console.log("error from users");
  //     });
  // });

  router.get("/user_profiles/mentor_points/:id", (req, res) => {
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
      // console.log('mentorPoints', data.rows)
      // console.log(userId);
      res.json(data.rows);
    });
  });

  router.get("/user_profiles/student_points/:id", (req, res) => {
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
      // console.log('studentPoints', data.rows)
      // console.log(userId);
      res.json(data.rows);
    });
  });

  return router;
};
