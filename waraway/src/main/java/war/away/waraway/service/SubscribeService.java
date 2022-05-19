package war.away.waraway.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import war.away.waraway.infrastructure.entities.Subscribe;
import war.away.waraway.infrastructure.repository.SubscribeRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class SubscribeService {

    private SubscribeRepository subscribeRepository;

    @Autowired
    public SubscribeService(SubscribeRepository subscribeRepository) {
        this.subscribeRepository = subscribeRepository;
    }

    public ResponseEntity addSubscription(Subscribe subscribe) {
        subscribeRepository.save(subscribe);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<List<Subscribe>> getAllSubscribers() {
        List<Subscribe> subscribers = subscribeRepository.findAll();
        return new ResponseEntity<>(subscribers, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<String> deleteSubscribeById(Long id) {
        this.subscribeRepository.deleteSubscribeById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
