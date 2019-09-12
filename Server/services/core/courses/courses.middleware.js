const express = require("express");
const router = express.Router();
const url = require("url");

module.exports = server => {
  router.get("/courses", (req, res, next) => {
    let url_parts = url.parse(req.originalUrl, true),
      query = url_parts.query,
      from = query.start || 0,
      to = +query.start + +query.count,
      sort = query.sort,
      queryStr = query.query,
      courses = server.db.getState().courses;

    if (!!query.textFragment) {
      courses = courses.filter(
        course =>
          course.name
            .concat(course.description)
            .toUpperCase()
            .indexOf(query.textFragment.toUpperCase()) >= 0
      );
    }

    if (courses.length < to || !to) {
      to = courses.length;
    }
    courses = courses.slice(from, to);

    res.json(courses);
  });

  /*
  router.delete("/courses/:id", (req, res, next) => {
    let courses = server.db.getState().courses;

    server.db.delete(
      courses.find(course => {
        course.id === req.params.id;
      })
    
    )})


  router.post("/courses/new", (req, res, next) => {
    newCourse = req.body;
    courses = server.db.getState().courses;
    courses.push(newCourse);
    courses.res.json(courses);
  });

  router.put("/courses/edit", (req, res, next) => {
    let courses = server.db.getState().courses;
    updCourse = courses.find(course => {
      course.id === req.body.id;
    });
    updCourse.title = req.body.title;
    updCourse.description = req.body.description;
    updCourse.length = req.body.length;
    updCourse.authors = req.body.authors;
  });
*/

  return router;
};
