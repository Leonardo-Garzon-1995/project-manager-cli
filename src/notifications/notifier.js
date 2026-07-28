// import 'dotenv/config'
import { getResendClient } from '../config/resend.js' 
import * as logger from '../helpers/logger.js'
import { NotificationError } from '../errors.js'


/**
 * 
 * @param {string} subjectText 
 * @param {string} htmlMessage 
 */

export default class Notify {
    static async directEmail(subjectText, htmlMessage) {
        try {

            const resend = getResendClient()

            const { data, error } = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: 'lgarzonlc@gmail.com',
                replyTo: 'lgarzonlc@gmail.com',
                subject: subjectText || "No subject",
                html: htmlMessage || 'No body'
            })
            if (error) {
                throw new NotificationError(error.message)
            }

            logger.info(`Email has been succesfully sent. Email id: ${data.id}`)
            
        } catch(err) {
            logger.error(err.stack)
        }
    }

    static async scheduledEmail(subjectText, htmlMessage, schedule) {
        try {

            const resend = getResendClient()
            
            const { data, error } = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: 'lgarzonlc@gmail.com',
                replyTo: 'lgarzonlc@gmail.com',
                subject: subjectText || "No subject",
                html: htmlMessage || 'No body',
                scheduledAt: schedule || 'in 5 min'
            })
            if (error) {
                throw new NotificationError(error.message)
            }

            logger.info(`Task email has been succesfully sent. Email id: ${data.id}`)
            
        } catch(err) {
            logger.error(err.stack)
        }
    }
}
