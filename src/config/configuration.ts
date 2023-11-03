import * as process from "process";

export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    db_url:process.env.DATABASE_URL,
    password_character_set:process.env.PASSWORD_CHARACTER_SET,
    aws_accessKey:process.env.AWS_ACCESS_KEY,
    aws_secretKey: process.env.AWS_SECRETKEY,
    mail_userName:process.env.MAIL_USERNAME,
    mail_password:process.env.MAIL_PASSWORD,
    mail_email:process.env.MAIL_EMAIL,
    jwt_secret:process.env.JWT_SECRET
});
