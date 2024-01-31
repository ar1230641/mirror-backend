
const qa = {
    APP_PORT: 7001,
    NODE_ENV: "qa",
    MONGO_URL: "mongodb+srv://sr706557:9tc4Mqba8G7dE7yR@cluster0.vegfvje.mongodb.net/live?retryWrites=true&w=majority",
};
module.exports = {
    apps: [
        {
            name: "anurag_23",
            script: "index.js",
            env_qa: qa,
            watch: true,
        },
    ],
};