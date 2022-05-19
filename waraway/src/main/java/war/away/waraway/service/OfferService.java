package war.away.waraway.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import war.away.waraway.infrastructure.dto.MqObject;
import war.away.waraway.infrastructure.entities.Offer;
import war.away.waraway.infrastructure.entities.Subscribe;
import war.away.waraway.infrastructure.entities.User;
import war.away.waraway.infrastructure.repository.OfferRepository;
import war.away.waraway.infrastructure.repository.SubscribeRepository;
import war.away.waraway.infrastructure.repository.UserRepository;
import war.away.waraway.rabbitmq.WarawaySender;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class OfferService {

    private WarawaySender warawaySender;
    private OfferRepository offerRepository;

    private UserRepository userRepository;
    private SubscribeRepository subscribeRepository;

    @Autowired
    public OfferService(WarawaySender warawaySender,
                        OfferRepository offerRepository,
                        UserRepository userRepository,
                        SubscribeRepository subscribeRepository) {
        this.warawaySender = warawaySender;
        this.offerRepository = offerRepository;
        this.userRepository = userRepository;
        this.subscribeRepository = subscribeRepository;
    }

    @Transactional
    public Offer createOffer(Offer offer) {
        User user = userRepository.findByEmail(offer.getUser().getEmail());
        offer.setUser(user);
        Offer createdOffer = offerRepository.save(offer);
        if (createdOffer != null)
            notify(offer);
        return offer;
    }

    @Transactional
    public ResponseEntity<String> deleteOfferById(Long id) {
        this.offerRepository.deleteOfferById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<List<Offer>> getAllOffers() {
        List<Offer> offers = offerRepository.findAll();
        return new ResponseEntity<>(offers, HttpStatus.OK);
    }

    public ResponseEntity<List<Offer>> getAllOffersByUserId(Long id) {
        List<Offer> offers = offerRepository.findAllByUser_Id(id);
        return new ResponseEntity<>(offers, HttpStatus.OK);
    }

    private void  notify(Offer offer) {
        List<Subscribe> departureSubscribe = subscribeRepository.findAllByDeparture(offer.getDeparturePoint());
        List<Subscribe> arrivalSubscribe = subscribeRepository.findAllByArrival(offer.getArrivalPoint());

        departureSubscribe.forEach(
                x -> warawaySender.send(new MqObject(
                        x.getEmail(),
                        x.getLocation(),
                        x.getType(),
                        offer.getUser().getEmail(),
                        offer.getPhoneNumber(),
                        offer.getDeparturePoint(),
                        offer.getArrivalPoint(),
                        offer.getArrivalPoint(),
                        offer.getDepartureDate()
                ))
        );

        arrivalSubscribe.forEach(
                x -> warawaySender.send(new MqObject(
                        x.getEmail(),
                        x.getLocation(),
                        x.getType(),
                        offer.getUser().getEmail(),
                        offer.getPhoneNumber(),
                        offer.getDeparturePoint(),
                        offer.getArrivalPoint(),
                        offer.getArrivalPoint(),
                        offer.getDepartureDate()
                ))
        );

    }

}
