package war.away.waraway.rabbitmq;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import war.away.waraway.infrastructure.dto.MqObject;

@Service
public class WarawaySender {

    @Autowired
    private RabbitTemplate template;

    @Value("${spring.rabbitmq.exchange}")
    private String exchange;
    
    @Value("${spring.rabbitmq.routingkey}")
    private String routingkey;

    public void send(MqObject mqObject) {
        var objMap = new ObjectMapper();
        try {
            this.template.convertAndSend(exchange, routingkey, objMap.writeValueAsString(mqObject));
        } catch (JsonProcessingException e) {
            System.out.println(e);
        }
    }
}
