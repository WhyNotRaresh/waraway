package waraway.mq.waraway.mq.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MqObject implements Serializable {
    String emailDest;
    String subscriptionLocation;
    String subscriptionType;

    String offerEmail;
    String offerPhone;
    String offerDeparturePoint;
    String offerArrivalPoint;
    String offerDepartureDate;
    Date offerDate;

}
