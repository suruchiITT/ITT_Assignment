import nodemailer from "nodemailer";
import env from "../config/env";

const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  auth: env.smtp.user
    ? { user: env.smtp.user, pass: env.smtp.pass }
    : undefined,
});

export function sendInvitationEmail(
  toEmail: string,
  projectName: string,
  inviterName: string,
  role: string,
  token: string,
): void {
  const link = `${env.frontendUrl}/invitations/accept?token=${token}`;
  const subject = `[SmartTask] ${inviterName} invited you to join '${projectName}'`;
  const text = `Hi,\n\n${inviterName} has invited you to join '${projectName}' as a ${role.toLowerCase()}.\n\nAccept invitation: ${link}\n\nThis link expires in ${env.invitationExpiryDays} days.\n\n— SmartTask`;

  setImmediate(async () => {
    try {
      await transporter.sendMail({
        from: env.smtp.from,
        to: toEmail,
        subject,
        text,
      });
    } catch (err) {
      console.error("[Email] Invitation email failed:", (err as Error).message);
    }
  });
}

export function sendRemovalNotificationEmail(
  toEmail: string,
  projectName: string,
): void {
  const subject = `[SmartTask] You have been removed from '${projectName}'`;
  const text = `Hi,\n\nYou have been removed from '${projectName}' by a project admin.\n\n— SmartTask`;

  setImmediate(async () => {
    try {
      await transporter.sendMail({
        from: env.smtp.from,
        to: toEmail,
        subject,
        text,
      });
    } catch (err) {
      console.error("[Email] Removal email failed:", (err as Error).message);
    }
  });
}

export function sendPasswordResetEmail(
  toEmail: string,
  resetToken: string,
): void {
  const link = `${env.frontendUrl}/reset-password?token=${resetToken}`;
  const subject = `[SmartTask] Reset your password`;
  const text = `Hi,\n\nWe received a request to reset your SmartTask password.\n\nReset password: ${link}\n\nThis link expires in ${env.passwordResetExpiryMinutes} minutes.\n\nIf you did not request this, you can ignore this email.\n\n- SmartTask`;

  setImmediate(async () => {
    try {
      await transporter.sendMail({
        from: env.smtp.from,
        to: toEmail,
        subject,
        text,
      });
    } catch (err) {
      console.error(
        "[Email] Password reset email failed:",
        (err as Error).message,
      );
    }
  });
}
