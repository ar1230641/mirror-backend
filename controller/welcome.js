
exports.welcome = async (req, res) => {
    try {
        return res.status(200).json({
            status: true,
            statusCode: 200,
            response: "Welcome to CRUD",
        });
    } catch (error) {
        return res.status(422).json({
            status: false,
            statusCode: 422,
            message: "Some technincal Issue",
        });
    }
}


