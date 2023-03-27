const {PrismaClient} = require("@prisma/client");
const sharp = require("sharp");

const {uploadImage, getImage} = require("../utils/imageUpload");
const prisma = new PrismaClient();

class Controller {
    static async createUser(req,res) {
        const {education, city, mobile, usia, date,name} = req.body;
        const image = req.files[0];
        try {
            await uploadImage(image.originalname, image.buffer, image.mimetype);
            const data = await prisma.user.create({
                data: {
                    education,
                    city,
                    mobile,
                    name,
                    birth:new Date(date),
                    usia:+usia,
                    image:image.originalname
                }
            });
            res.status(200).json({message:"Success Created"})
        } catch (error) {
            res.status(500).json({message:"something woring"});
        }
    }

    static async getAllUser(req,res) {
        try {
            const user = await prisma.user.findMany();
            for (let x of user) {
                const data = await getImage(x.image);
                x.imageUrl = data;
            }
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({message:"something woring"});
        }
    }

    static async getOneUser(req,res) {
        const {id} = req.params;
        try {
            const user = await prisma.user.findFirst({
                where: {id:+id}
            })
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json({message:"something woring"});
        }
    }

    static async editUser(req,res) {
        const {id} = req.params
        const image = req?.files ? req.files[0] : null;
        try {
            if(image) await uploadImage(image.originalname, image.buffer, image.mimetype);
            const data = await prisma.user.update({
                where: {id:+id},
                data: req.body
            });
            res.status(200).json({message:"Update Success"});
        } catch (error) {
            res.status(500).json({message:"something woring"});
        }
    }
}

module.exports = Controller;