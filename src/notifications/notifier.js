import 'dotenv/config'
import { Resend } from 'resend'
import * as logger from '../helpers/logger.js'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * 
 * @param {string} subjectText 
 * @param {string} htmlMessage 
 */

export default class Notify {
    static async directEmail(subjectText, htmlMessage) {
        try {
            const { data, error } = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: 'lgarzonlc@gmail.com',
                replyTo: 'lgarzonlc@gmail.com',
                subject: subjectText || "No subject",
                html: htmlMessage || 'No body'
            })
            if (error) {
                throw new Error(error.message)
            }

            logger.info(`Email has been succesfully sent. Email id: ${data.id}`)

            
        } catch(err) {
            logger.error(err.stack)
        }
    }

    static async scheduledEmail(subjectText, htmlMessage, schedule) {
        try {
            const { data, error } = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: 'lgarzonlc@gmail.com',
                replyTo: 'lgarzonlc@gmail.com',
                subject: subjectText || "No subject",
                html: htmlMessage || 'No body',
                scheduledAt: schedule || 'in 5 min'
            })
            if (error) {
                throw new Error(error.message)
            }

            logger.info(`Task email has been succesfully sent. Email id: ${data.id}`)

            
        } catch(err) {
            logger.error(err.stack)
        }
    }

}
