package war.away.waraway.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import war.away.waraway.infrastructure.entities.Offer;
import war.away.waraway.service.OfferService;

import java.util.List;

@RestController
@CrossOrigin("*")
public class OfferController {

    private OfferService offerService;

    @Autowired
    public OfferController(OfferService offerService) {
        this.offerService = offerService;
    }

    @PostMapping(path = "/protected/offer/create")
    public Offer createOffer(@RequestBody Offer offer) {
        return this.offerService.createOffer(offer);
    }

    @DeleteMapping(path = "/protected/offer/{id}")
    public ResponseEntity<String> deleteOffer(@PathVariable Long id) {
        return this.offerService.deleteOfferById(id);
    }

    @GetMapping(value = "/offers/all")
    public ResponseEntity<List<Offer>> getAllOffers() {
        return this.offerService.getAllOffers();
    }

    @GetMapping(path = "/protected/offers/{id}")
    public ResponseEntity<List<Offer>> getAllOffersByUserId(@PathVariable Long id) {
        return this.offerService.getAllOffersByUserId(id);
    }
}
