const express = require("express");
const bodyParser = require("body-parser");
const nanoid = require("nanoid");
const db = require("./database");
const resolveLogic = require("./resolveLogic");

const port = 8000;
const app = express();
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/forms", (req, res) => res.json(db.get("forms").value()));

app.get("/forms/:formId", (req, res) => {
  const form = db
    .get("forms")
    .find({ id: req.params.formId })
    .value();
  res.json(form);
});

app.post("/forms", (req, res) => {
  const form = {
    ...req.body,
    id: nanoid(10),
    dateCreated: Date.now(),
    dateModified: Date.now()
  };
  db.get("forms")
    .push(form)
    .write();
  res.json(form);
});

app.put("/forms/:formId", (req, res) => {
  const form = req.body;
  db.get("forms")
    .find({ id: req.params.formId })
    .assign({ definition: form.definition, dateModified: Date.now() })
    .write();
  res.json(form);
});

app.get("/records", (req, res) => {
  try {
    res.json(
      db
        .get("records")
        .value()
        .map(rec => ({
          ...rec,
          title:
            rec.title ||
            (
              (
                db
                  .get("forms")
                  .find({ id: rec.wizardId })
                  .value() || {}
              ).definition || {}
            ).title ||
            "Untitled Record"
        }))
    );
  } catch (e) {
    res.status(500).json(e);
  }
});

app.get("/records/:recordId", (req, res) => {
  const record = db
    .get("records")
    .find({ id: req.params.recordId })
    .value();
  res.json(record);
});

app.post("/records", (req, res) => {
  let record = { ...req.body, id: nanoid(10) };
  const form = db
    .get("forms")
    .find({ id: record.wizardId })
    .value();
  const {
    title = form.definition.title,
    status = "approved",
    fee = 0
  } = resolveLogic(form, {values: record.values, user: db.get("user").value()});
  record = { ...record, title, status, fee };
  db.get("records")
    .push(record)
    .write();
  res.json(record);
});

app.put("/records/:recordId", (req, res) => {
  const record = req.body;
  db.get("records")
    .find({ id: req.params.recordId })
    .assign({ values: form.values })
    .write();
  res.json(form);
});

app.listen(port, () => console.log(`Forms listening on port ${port}!`));
