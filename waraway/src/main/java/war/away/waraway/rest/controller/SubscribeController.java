package war.away.waraway.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import war.away.waraway.infrastructure.entities.Subscribe;
import war.away.waraway.service.SubscribeService;

import java.util.List;

@RestController
@CrossOrigin("*")
public class SubscribeController {

    private SubscribeService subscribeService;

    @Autowired
    public SubscribeController(SubscribeService subscribeService) {
        this.subscribeService = subscribeService;
    }

    @PostMapping(path = "/offers/subscribe")
    public ResponseEntity subscribe(@RequestBody Subscribe subscribe) {
        return subscribeService.addSubscription(subscribe);
    }

    @GetMapping(value = "/protected/subscribe/all")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<List<Subscribe>> getAllSubscribers() {
        return this.subscribeService.getAllSubscribers();
    }

    @DeleteMapping(path = "/protected/subscribe/{id}")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<String> deleteSubscribe(@PathVariable Long id) {
        return this.subscribeService.deleteSubscribeById(id);
    }


}
