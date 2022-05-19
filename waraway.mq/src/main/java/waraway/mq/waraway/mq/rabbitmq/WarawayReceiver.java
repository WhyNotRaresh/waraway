package waraway.mq.waraway.mq.rabbitmq;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import waraway.mq.waraway.mq.dto.MqObject;
import waraway.mq.waraway.mq.email.EmailService;

import javax.mail.MessagingException;

@Service
public class WarawayReceiver {

    @Autowired
    private EmailService emailService;

    @RabbitListener(queues = "${spring.rabbitmq.queue}")
    public void receive(String mqObject) throws JsonProcessingException, MessagingException {
        var objMap = new ObjectMapper();
        MqObject mq = objMap.readValue(mqObject, MqObject.class);
        System.out.println("Sending mail to " + mq.getEmailDest());
        emailService.sendEmail(mq);
    }

}
