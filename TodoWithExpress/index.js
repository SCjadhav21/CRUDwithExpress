const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

// Get request
app.get("/", (req, res) => {
  let data = fs.readFileSync("./db.json", "utf-8");
  const parseData = JSON.parse(data);

  res.send(parseData);
});

// Post request
// post like {"name":"test","city":"test2"}

app.post("/postNewStudent", (req, res) => {
  let data = fs.readFileSync("./db.json", "utf-8");

  const parseData = JSON.parse(data);

  parseData.students.push(req.body);
  fs.writeFileSync("./db.json", JSON.stringify(parseData));
  res.send("data added to database");
});

// Post request
// post like {"name":"xyz","sub":"xyz2"}

app.post("/postNewTeacher", (req, res) => {
  let data = fs.readFileSync("./db.json", "utf-8");

  const parseData = JSON.parse(data);

  parseData.teachers.push(req.body);
  fs.writeFileSync("./db.json", JSON.stringify(parseData));
  res.send("data added to database");
});

// delete request
// delete like : {name:"abc"}

app.delete("/deleteStudentByName", (req, res) => {
  let data = fs.readFileSync("./db.json", "utf-8");

  const parseData = JSON.parse(data);
  const name = req.body.name;
  let count = 0;
  let chagedData = parseData.students.filter((student) => {
    if (student.name !== name) {
      count++;
      return student;
    }
  });
  if (count == parseData.students.length) {
    res.send(`data with name ${name} not found`);
  } else {
    parseData.students = chagedData;
    fs.writeFileSync("./db.json", JSON.stringify(parseData));

    res.send(`data with name ${name} is deleted`);
  }
});

// delete request
// delete like : {name:"abc"}

app.delete("/deleteTeacherByName", (req, res) => {
  let data = fs.readFileSync("./db.json", "utf-8");

  const parseData = JSON.parse(data);
  const name = req.body.name;
  let count = 0;
  let chagedData = parseData.teachers.filter((teacher) => {
    if (teacher.name !== name) {
      count++;
      return teacher;
    }
  });
  if (count == parseData.teachers.length) {
    res.send(`data with name ${name} not found`);
  } else {
    parseData.teachers = chagedData;
    fs.writeFileSync("./db.json", JSON.stringify(parseData));

    res.send(`data with name ${name} is deleted`);
  }
});

// patch request
// update like : {name:"abc",changewith:"xyz"}

app.patch("/UpdateStudentName", (req, res) => {
  let data = fs.readFileSync("./db.json", "utf-8");

  const parseData = JSON.parse(data);
  const name = req.body.name;
  const nameChange = req.body.changewith;
  let count = 0;
  let chagedData = parseData.students.map((student) => {
    if (student.name !== name) {
      count++;
      return student;
    } else {
      return {
        ...student,
        name: nameChange,
      };
    }
  });
  if (count == parseData.students.length) {
    res.send(`data with name ${name} not found`);
  } else {
    parseData.students = chagedData;
    fs.writeFileSync("./db.json", JSON.stringify(parseData));

    res.send(`data with name ${name} is upadate with name ${nameChange}`);
  }
});

// patch request
// update like : {name:"abc",changewith:"xyz"}

app.patch("/UpadateTeacherName", (req, res) => {
  let data = fs.readFileSync("./db.json", "utf-8");

  const parseData = JSON.parse(data);
  const name = req.body.name;
  const nameChange = req.body.changewith;
  let count = 0;
  let chagedData = parseData.teachers.map((teacher) => {
    if (teacher.name !== name) {
      count++;
      return teacher;
    } else {
      return {
        ...teacher,
        name: nameChange,
      };
    }
  });
  console.log(chagedData);
  if (count == parseData.teachers.length) {
    res.send(`data with name ${name} not found`);
  } else {
    parseData.teachers = chagedData;
    fs.writeFileSync("./db.json", JSON.stringify(parseData));

    res.send(`data with name ${name} is upadate with name ${nameChange}`);
  }
});

app.listen(4500, () => {
  console.log("listening on port 4500...");
});
