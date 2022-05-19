package war.away.waraway.infrastructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import war.away.waraway.infrastructure.entities.Subscribe;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface SubscribeRepository  extends JpaRepository<Subscribe, Long> {

    @Query(value = "select * from subscribe s where position(s.location in :location) > 0  and s.type = 'DEPARTURE'",
            nativeQuery = true)
    List<Subscribe> findAllByDeparture(@Param("location") String departurePoint);

    @Query(value = "select * from subscribe s where position(s.location in :location) > 0 and s.type = 'ARRIVAL'",
            nativeQuery = true)
    List<Subscribe> findAllByArrival(@Param("location") String arrivalPoint);

    @Modifying
    @Query("delete from subscribe s where s.id = :id")
    void deleteSubscribeById(Long id);

}
