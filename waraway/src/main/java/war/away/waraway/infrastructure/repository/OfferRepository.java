package war.away.waraway.infrastructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import war.away.waraway.infrastructure.entities.Offer;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface OfferRepository extends JpaRepository<Offer, Long> {
    @Modifying
    @Query("delete from offer o where o.id = :id")
    void deleteOfferById(@Param("id") Long id);

    List<Offer> findAllByUser_Id(Long id);
}
