import 'dotenv/config'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * 
 * @param {string} subjectText 
 * @param {string} htmlMessage 
 */
export default async function notify(subjectText, htmlMessage) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'lgarzonlc@gmail.com',
            replyTo: 'lgarzonlc@gmail.com',
            subject: subjectText || "No subject",
            html: htmlMessage || 'Something went wrong'
        })
        if (error) {
            throw new Error(error)
        }

        console.log(`Message sent. msg id: ${data.id}`)

        
    } catch(err) {
        console.error(err)
    }
    
}