import nodemailer from 'nodemailer';

export async function POST(req) {
    const { to, subject, message } = await req.json()
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or any other email service
        secure: true,
        host: 'smtp.gmail.com',
        port: 456,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: message,
        });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}