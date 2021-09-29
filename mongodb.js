const { connect, Schema, model } = require("mongoose");

connect('mongodb://localhost:27017/jdgh');

const experienceSchema = new Schema({
    company: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    responsibilities: {
        type: [String],
        required: true
    },
    startYear: {
        type: Number,
        required: true
    },
    endYear: String
});

const Experience = new model('Experience', experienceSchema);

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    img: {
        source: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            required: true
        }
    },
    description: {
        type: String,
        required: true
    }
});

const Project = new model('Project', projectSchema);

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    link: String,
    year: {
        type: Number,
        default: new Date().getFullYear()
    }
});

const Course = new model('Course', courseSchema);

module.exports = {
    Experience,
    Project,
    Course
}