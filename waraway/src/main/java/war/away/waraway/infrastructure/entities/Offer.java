package war.away.waraway.infrastructure.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "offer")
@Table(name = "offer")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @Column(length = 150)
    private String phoneNumber;

    @Column(nullable = false, length = 150)
    private String departurePoint;

    @Column(length = 150)
    private String arrivalPoint;

    @Column(length = 150)
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @Temporal(TemporalType.DATE)
    private Date departureDate;

    @Column()
    private String originLat;

    @Column()
    private String originLong;

    @Column()
    private String destLat;

    @Column()
    private String destLong;

    @Column()
    private String distance;

    @Column()
    private Integer personNumber;

    @Column()
    private Boolean pets;

    @Column()
    private String description;
}
