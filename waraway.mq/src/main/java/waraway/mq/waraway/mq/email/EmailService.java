package waraway.mq.waraway.mq.email;

import com.sun.mail.smtp.SMTPTransport;
import org.springframework.stereotype.Service;
import waraway.mq.waraway.mq.dto.MqObject;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Properties;

import static waraway.mq.waraway.mq.email.EmailConstant.*;


@Service
public class EmailService {

    public void sendEmail(MqObject mqObject) throws MessagingException {
        Message message = createEmail(mqObject);
        SMTPTransport smtpTransport = (SMTPTransport) getEmailSession().getTransport(SIMPLE_MAIL_TRANSFER_PROTOCOL);
        smtpTransport.connect(GMAIL_SMTP_SERVER, USERNAME, PASSWORD);
        smtpTransport.sendMessage(message, message.getAllRecipients());
        smtpTransport.close();
    }

    private Message createEmail(MqObject mqObject) throws MessagingException {
        Message message = new MimeMessage(getEmailSession());
        message.setFrom(new InternetAddress(FROM_EMAIL));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(mqObject.getEmailDest(), false));
        message.setRecipients(Message.RecipientType.CC, InternetAddress.parse(CC_EMAIL, false));
        message.setSubject(EMAIL_SUBJECT);
        message.setText("Hello " + mqObject.getEmailDest() + ", \n \n There is a new offer "
                + (mqObject.getSubscriptionType() == "DEPARTURE"? "leaving from " : "going to ")
                + mqObject.getSubscriptionLocation() + "."
                + "\n Details: "
                + "\n \t Phone: " + mqObject.getOfferPhone()
                + "\n \t Email: " + mqObject.getOfferEmail()
                + "\n \t Departure date: " + mqObject.getOfferDate()
                + "\n \t Departure location: " + mqObject.getOfferDeparturePoint()
                + "\n \t Arrival location: " + mqObject.getOfferArrivalPoint()
                + "\n \n The Support Team");
        message.setSentDate(new Date());
        message.saveChanges();
        return message;
    }

    private Session getEmailSession() {
        Properties properties = System.getProperties();
        properties.put(SMTP_HOST, GMAIL_SMTP_SERVER);
        properties.put(SMTP_AUTH, true);
        properties.put(SMTP_PORT, DEFAULT_PORT);
        properties.put(SMTP_STARTTLS_ENABLE, true);
        properties.put(SMTP_STARTTLS_REQUIRED, true);
        return Session.getInstance(properties, null);
    }
}
