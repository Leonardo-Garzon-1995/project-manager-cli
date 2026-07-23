import 'dotenv/config'
import { Resend } from 'resend'
import * as logger from "../helpers/logger.js"

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * 
 * @param {string} subjectText 
 * @param {string} htmlMessage 
 */
export default async function notify(subjectText, htmlMessage, schedule) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'lgarzonlc@gmail.com',
            replyTo: 'lgarzonlc@gmail.com',
            subject: subjectText || "No subject",
            html: htmlMessage || 'Something went wrong',
            scheduledAt: schedule || 'now'
        })
        if (error) {
            throw new Error(error)
        }

        logger.info(`Task email has been succesfully sent. Email id: ${data.id}`)

        
    } catch(err) {
        console.error(err)
    }
}