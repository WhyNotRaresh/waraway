package war.away.waraway.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import war.away.waraway.infrastructure.entities.User;
import war.away.waraway.service.UserService;

@RestController
@CrossOrigin("*")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(path = "/protected/user/create")
    public User createUser(@RequestBody User user) {
        return this.userService.createUser(user);
    }

    @GetMapping(path = "/protected/user/{email}")
    public User createUser(@PathVariable String email) {
        return this.userService.getUserByEmail(email);
    }
}
