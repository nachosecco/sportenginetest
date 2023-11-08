import nodemailer from 'nodemailer';

export const emailSignup = async (data) => {
    const { email, name, token } = data;

    // TODO: mover a  variables env
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // info del email
      const info = await transport.sendMail({
        from: '"Rugby MERN " <correo@rugbymern.com>',
        to: email,
        subject: "Rugby MERN - Confirma tu cuenta",
        text: "Confirma tu cuenta",
        html: `
            <p>Hola ${name}, comprueba tu cuenta de Rugby MERN</p>
            <p>Tu cuenta ya está casi lista, solo tienes que confirmarla en el siguiente enlace:
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>
            </p>
        `

      })
};

export const emailForgotPassword = async (data) => {
  const { email, name, token } = data;
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
    });

    // info del email
    const info = await transport.sendMail({
      from: '"Rugby MERN " <correo@rugbymern.com>',
      to: email,
      subject: "Rugby MERN - Reestablece tu contraseña",
      text: "Reestablece tu contraseña",
      html: `
          <p>Hola ${name}, haz solicitado reestablecer tu contraseña</p>
          <p>Sigue el siguiente enlace para generar una nueva contraseña:
              <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer cuenta</a>
          </p>
      `

    })
};