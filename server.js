const path = require("path") // import path from 'path'
const express = require("express"); // import express from 'express'
const bodyParser = require("body-parser"); // import bodyParser from 'body-parser'
const nodemailer = require("nodemailer"); // import nodemailer from 'nodemailer'
const favicon = require("serve-favicon"); // import favicon from 'serve-favicon'
const existence = require("email-existence"); // import existence from 'email-existence'
const client = require("@mailchimp/mailchimp_marketing"); // import client from '@mailchimp/mailchimp_marketing'
const cors = require("cors"); // import cors from cors
const { connect } = require("mongoose");
const { Experience, Project, Course } = require("./mongodb");
const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "static")));
app.use(favicon(path.join(__dirname, "favicon.ico")));
app.use(cors());
app.set("view engine", "ejs");
app.set("views", "templates");

connect('mongodb://localhost:27017/jdgh');

client.setConfig({
    apiKey: '09ba4af739c3234e2eb78b9aed0a9301-us5',
    server: 'us5'
});

app.get("/", (req, res) => {
    Experience.find({}, 'company title responsibilities', {sort: {startYear: -1}, limit: 3}, (err1, experiences) => {
        if (err1) throw err1;
        Project.find({}, 'name target img description', {limit: 3}, (err2, projects) => {
            if (err2) throw err2;
            Course.find({}, 'name link year', {sort: {year: -1}, limit: 7}, (err3, courses) => {
                if (err3) throw err3;
                res.render("index", {
                    title: "Jorge Gallego - Full Stack Web Developer",
                    path: req.path,
                    experiences,
                    projects,
                    courses
                });
            })
        })
    });
});

app.post("/", (req, res) => {
    const email = req.body.email, name = req.body.name, service = req.body.service, message = req.body.message;
    existence.check(email, (error, response) => {
        if (error || !response) {
            res.redirect("/#contact");
        } else if (response) {
            let new_client = {
                members: [
                    {
                        email_address: email,
                        status: 'subscribed',
                        merge_fields: {
                            NAME: name,
                            SERVICE: service,
                            MESSAGE: message
                        }
                    }
                ]
            };
            const run = async () => {
                const response = await client.lists.batchListMembers('74e5c3cff7', new_client);
                if (response.error_count === 0)
                {
                    res.redirect("/");
                }
                else
                {
                    error = response.errors[0].error_code;
                    if (error === 'ERROR_CONTACT_EXISTS') {
                        new_client.update_existing = true;
                        run();
                    } else {
                        res.redirect("/#contact");
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'jorgegallegoherrera@gmail.com',
                                pass: 'wlirdcsmlnppjgzy'
                            }
                        });
                        let mailOptions = {
                            from: "'Jorge Gallego' jorgegallegoherrera@gmail.com",
                            to: `'${name}' ${email}`,
                            subject: "Thanks for your interest!",
                            html: `
                                    <h1 style="text-align:center;padding-bottom:1%;border-bottom:1px solid;">Thank you for your interest!</h1>
                                    <p>
                                        I have received your request.
                                        I will now review it and get back to you with a response as soon as possible.
                                    </p>
                                    <p>
                                        I look forward to working with you soon.
                                    </p>
                                    <div style='padding:1%;border-top:1px solid;'>
                                            Jorge Gallego
                                            <br>
                                            Full Stack Web Developer
                                            <br>
                                            Cra 102B # 148 - 31, 3-6-101
                                            <br>
                                            Bogotá D.C., Colombia
                                    </div>
                                `
                        };
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) console.error(error);
                            else if (info) console.log(info.response);
                        });
                    }
                }
            }
            run();
        }
    });
});

app.get("/portfolio", (req, res) => {
    Project.find({}, (err, projects) => {
        res.render("portfolio", {
            title: "My Portfolio - Jorge Gallego",
            path: req.path,
            projects
        });
    });
});

app.get("/robots.txt", (req, res ) => {
    res.sendFile(path.join(__dirname, "robots.txt"));
});

app.get("/sitemap.xml", (req, res) => {
    res.sendFile(path.join(__dirname, "sitemap.xml"));
});

app.all(["*/robots", "*/robots.txt"], (req, res) => {
    res.redirect("/robots.txt");
});

app.all(["*/sitemap", "*/sitemap.xml"], (req, res) => {
    res.redirect("/sitemap.xml");
});

app.listen(port);