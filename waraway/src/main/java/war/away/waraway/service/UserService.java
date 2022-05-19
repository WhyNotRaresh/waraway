package war.away.waraway.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import war.away.waraway.infrastructure.entities.User;
import war.away.waraway.infrastructure.repository.UserRepository;

import javax.transaction.Transactional;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User createUser(User user) {
        User userIfExists = userRepository.findByEmail(user.getEmail());
        if (userIfExists != null) {
            return userIfExists;
        }
        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
